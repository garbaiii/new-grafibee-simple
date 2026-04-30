const CONSENT_STORAGE_KEY = 'grafibee-cookie-consent';
const CONSENT_VERSION = 1;
const CONSENT_TTL_DAYS = 180;
const FALLBACK_GA_MEASUREMENT_ID = 'G-FHE5R0K353';

type ConsentDecision = 'accepted' | 'rejected';

interface StoredConsent {
  version: number;
  decision: ConsentDecision;
  savedAt: number;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    __grafibeeAnalyticsLoaded?: boolean;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID ?? FALLBACK_GA_MEASUREMENT_ID;

const gtag = (...args: unknown[]) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
};

const isConsentExpired = (savedAt: number) => {
  const ttlMs = CONSENT_TTL_DAYS * 24 * 60 * 60 * 1000;
  return Date.now() - savedAt > ttlMs;
};

export const getStoredConsent = (): StoredConsent | null => {
  const rawConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (!rawConsent) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawConsent) as Partial<StoredConsent>;
    const hasValidDecision = parsed.decision === 'accepted' || parsed.decision === 'rejected';

    if (
      parsed.version !== CONSENT_VERSION
      || !hasValidDecision
      || typeof parsed.savedAt !== 'number'
      || isConsentExpired(parsed.savedAt)
    ) {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
      return null;
    }

    return parsed as StoredConsent;
  } catch {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    return null;
  }
};

const setConsentDefault = () => {
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500,
  });
};

const updateConsent = (decision: ConsentDecision) => {
  const analyticsStatus = decision === 'accepted' ? 'granted' : 'denied';

  gtag('consent', 'update', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: analyticsStatus,
    functionality_storage: 'granted',
    security_storage: 'granted',
  });
};

const loadAnalytics = () => {
  if (!GA_MEASUREMENT_ID || window.__grafibeeAnalyticsLoaded) {
    return;
  }

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  window.__grafibeeAnalyticsLoaded = true;
};

export const initializeCookieConsent = () => {
  window.dataLayer = window.dataLayer || [];
  setConsentDefault();

  const consent = getStoredConsent();
  if (!consent) {
    return;
  }

  updateConsent(consent.decision);
  if (consent.decision === 'accepted') {
    loadAnalytics();
  }
};

export const saveConsentDecision = (decision: ConsentDecision) => {
  const consent: StoredConsent = {
    version: CONSENT_VERSION,
    decision,
    savedAt: Date.now(),
  };

  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  updateConsent(decision);

  if (decision === 'accepted') {
    loadAnalytics();
  }
};
