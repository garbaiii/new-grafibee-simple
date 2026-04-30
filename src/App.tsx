import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Footer from './components/Footer';
import CookieConsentBanner from './components/CookieConsentBanner';
import { getStoredConsent, saveConsentDecision } from './lib/cookieConsent';
import autoLuceImage from '../munkak/autoluce.png';
import zoraPlusImage from '../munkak/zorapluskft.png';
import holziMaxImage from '../munkak/holzimaxkft.png';

const workItems = [
  {
    title: 'AutoLuce',
    description: 'Autókozmetikai és tisztasági márka modern, bizalmat építő arculattal.',
    href: 'https://autoluce.hu',
    image: autoLuceImage,
    alt: 'AutoLuce referencia',
  },
  {
    title: 'Zora Plus Kft',
    description: 'Faipari és megmunkálási vállalkozás erős, megbízható online jelenléte.',
    href: 'https://zorapluskft.hu',
    image: zoraPlusImage,
    alt: 'Zora Plus Kft referencia',
  },
  {
    title: 'HolziMax Kft',
    description: 'Építőanyag és tűzifa profilhoz illesztett informatív, konverzióra épített weboldal.',
    href: 'https://holzimaxkft.hu',
    image: holziMaxImage,
    alt: 'HolziMax Kft referencia',
  },
] as const;

const normalizePathname = (pathname: string) => pathname.replace(/\/+$/, '') || '/';

const getLocationState = () => ({
  pathname: normalizePathname(window.location.pathname),
  hash: window.location.hash,
});

const WorkCarousel = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [cardTransforms, setCardTransforms] = useState<Record<string, { scale: number; rotateY: number; opacity: number; z: number; translateX: number }>>({});

  const calculateTransforms = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const scrollLeft = viewport.scrollLeft;
    const viewportWidth = viewport.clientWidth;
    const center = scrollLeft + viewportWidth / 2;

    const transforms: typeof cardTransforms = {};
    const cylinderRadius = viewportWidth / Math.PI;

    workItems.forEach((item) => {
      const cards = viewport.querySelectorAll(`[data-card="${item.title}"]`);
      if (cards.length === 0) return;

      const card = cards[0] as HTMLElement;
      const cardLeft = card.offsetLeft;
      const cardWidth = card.offsetWidth;
      const cardCenter = cardLeft + cardWidth / 2;

      const distanceFromCenter = cardCenter - center;
      const angle = distanceFromCenter / cylinderRadius;

      const scale = Math.cos(angle * 0.5) * 0.85 + 0.15;
      const rotateY = -angle * (180 / Math.PI) * 0.45;
      const opacity = Math.max(0.3, Math.cos(angle * 0.6));
      const z = Math.cos(angle) * cylinderRadius - cylinderRadius;
      const translateX = Math.sin(angle) * cylinderRadius * 0.00000000001;

      transforms[item.title] = { scale, rotateY, opacity, z, translateX };
    });

    setCardTransforms(transforms);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      event.preventDefault();
      viewport.scrollBy({ left: event.deltaY, behavior: 'smooth' });
    };

    const handleScroll = () => calculateTransforms();

    viewport.addEventListener('wheel', handleWheel, { passive: false });
    viewport.addEventListener('scroll', handleScroll);

    calculateTransforms();

    return () => {
      viewport.removeEventListener('wheel', handleWheel);
      viewport.removeEventListener('scroll', handleScroll);
    };
  }, [calculateTransforms]);

  return (
    <div className="mt-10">
      <div
        ref={viewportRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ perspective: '1600px' }}
      >
        <div className="flex w-max pb-3 snap-x snap-mandatory px-4">
          {workItems.map((item) => {
            const transform = cardTransforms[item.title] || { scale: 1, rotateY: 0, opacity: 1, z: 0, translateX: 0 };

            return (
              <motion.article
                key={item.title}
                data-card={item.title}
                initial={{ opacity: 1 }}
                animate={{
                  scale: transform.scale,
                  rotateY: transform.rotateY,
                  opacity: transform.opacity,
                  z: transform.z,
                  x: transform.translateX,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.5 }}
                className="snap-start shrink-0 w-[50vw] max-w-[400px] rounded-[1.75rem] border border-white/20 bg-white/8 backdrop-blur-xl p-4 sm:p-5 text-left shadow-[0_20px_80px_rgba(128,59,178,0.2),inset_0_1px_1px_rgba(255,255,255,0.08)]"
                style={{
                  transformStyle: 'preserve-3d' as const,
                }}
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.title} referencia megnyitasa`}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-[1.25rem]"
                >
                  <div className="relative overflow-hidden rounded-[1.25rem] border border-white/20 bg-[#0c0c10]">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="h-[280px] sm:h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm sm:text-base text-white/70 leading-relaxed">{item.description}</p>
                    </div>
                    <span className="mt-1 text-xs uppercase tracking-[0.24em] text-primary/80 whitespace-nowrap">
                      Megnyitás
                    </span>
                  </div>
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const HomePage = () => (
  <>
    <Hero />
    <section id="work" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Eddigi <span className="text-primary">munkáink</span>
      </h2>
      <p className="text-white/70 max-w-2xl mx-auto mb-2">
            Itt láthatod néhány korábbi munkánkat, amelyekben gyors, tiszta és skálázható
            frontend megoldásokat szállítottunk.
      </p>
      <WorkCarousel />
    </section>
    <Services />
    <section id="contact" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
        Beszéljünk a <span className="text-primary">projektedről</span>
      </h2>
      <p className="text-white/70 max-w-2xl mx-auto mb-8">
        Írj nekünk és 24 órán belül visszajelzünk egy konkrét, létszámolható következő lépéssel.
      </p>
      <a
        href="mailto:chat@grafibee.hu"
        className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all shadow-[0_0_24px_rgba(128,59,178,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        chat@grafibee.hu
      </a>
    </section>
  </>
);

const LegalPageShell = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="py-28 sm:py-32 px-4 sm:px-6 max-w-4xl mx-auto text-left">
    <div className="rounded-3xl border border-primary/20 bg-deep-black p-6 sm:p-10 shadow-[0_16px_48px_rgba(128,59,178,0.12)]">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-center">{title}</h1>
      <div className="space-y-6">{children}</div>
    </div>
  </section>
);

const PrivacyPage = () => (
  <LegalPageShell title="Adatkezelési tájékoztató">
    <p className="text-white/70 text-sm sm:text-base text-center">
      Grafibee – Garbai Zoltán e.v.
    </p>

    <p className="text-white/70 text-sm sm:text-base">
      Ez a tájékoztató összefoglalja, hogy a Grafibee (Garbai Zoltán e.v.) miként kezeli a
      személyes adatokat a weboldal látogatása, illetve az üzleti kapcsolattartás során.
    </p>

    <div className="space-y-5 text-sm sm:text-base text-white/70">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-2">1. Az adatkezelő adatai</h2>
        <ul className="space-y-1">
          <li><span className="text-white">Név:</span> Garbai Zoltán e.v.</li>
          <li><span className="text-white">E-mail cím:</span> zoltan.garbai@grafibee.hu</li>
          <li><span className="text-white">Székhely:</span> 9012 Győr, Cseresznyés utca 2.</li>
          <li><span className="text-white">Adószám:</span> 42976954-1-28</li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-2">2. Kezelt adatok köre és célja</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-white mb-1">A. Weboldal látogatása (Sütik / Cookies)</h3>
            <p>
              A honlap a Google Analytics szolgáltatást használja látogatottsági statisztikák
              készítéséhez. Ez segít nekünk megérteni, hogyan használják a látogatók az oldalt.
            </p>
            <ul className="mt-2 space-y-1">
              <li><span className="text-white">Kezelt adat:</span> Anonimizált IP-cím, a látogatás időpontja, megtekintett oldalak.</li>
              <li><span className="text-white">Jogalap:</span> Az Ön hozzájárulása (a süti-sáv elfogadásával).</li>
              <li><span className="text-white">Időtartam:</span> A Google Analytics beállításai szerinti időtartam.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-1">B. Kapcsolattartás és szerződéskötés</h3>
            <p>
              Mivel a weboldalon nincs közvetlen üzenetküldő űrlap, az adatkezelés akkor kezdődik,
              amikor Ön e-mailben vagy telefonon megkeres minket.
            </p>
            <ul className="mt-2 space-y-1">
              <li><span className="text-white">Kezelt adatok:</span> Név, e-mail cím, telefonszám, számlázási adatok (szerződés esetén).</li>
              <li><span className="text-white">Cél:</span> Ajánlatadás, szerződés teljesítése, üzleti kommunikáció.</li>
              <li><span className="text-white">Jogalap:</span> Szerződés előkészítése vagy teljesítése.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-1">C. Marketing célú megkeresések</h3>
            <p>
              Amennyiben korábban már kapcsolatban álltunk üzleti célból, a jövőben küldhetünk Önnek
              releváns szakmai híreket vagy ajánlatokat.
            </p>
            <p className="mt-2">
              <span className="text-white">Jogalap:</span> Jogos érdek. Önnek bármikor joga van tiltakozni ezen megkeresések ellen.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-2">3. Adatfeldolgozók és adattovábbítás</h2>
        <p>
          Az adatokat bizalmasan kezeljük, azokat harmadik félnek nem adjuk el. Az alábbi szolgáltatókat vesszük igénybe:
        </p>
        <ul className="mt-2 space-y-1">
          <li>NAV Online Számlázó: A számlázási kötelezettség teljesítéséhez.</li>
          <li>Tárhelyszolgáltató: Websupport Magyarország Kft.</li>
          <li>Google LLC: Az Analytics szolgáltatás révén (statisztikai adatok).</li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-2">4. Az adatkezelés időtartama</h2>
        <ul className="space-y-1">
          <li><span className="text-white">Üzleti levelezés:</span> A kapcsolat fennállásáig, vagy a szerződés megszűnésétől számított 5 évig (elévülési idő).</li>
          <li><span className="text-white">Számviteli bizonylatok:</span> A törvényi előírásoknak megfelelően 8 évig (a számlázási adatok esetében).</li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-2">5. Az Ön jogai</h2>
        <p>Ön bármikor kérheti:</p>
        <ul className="mt-2 space-y-1">
          <li>Tájékoztatását személyes adatai kezeléséről.</li>
          <li>Adatainak helyesbítését vagy törlését (a jogszabályi kereteken belül).</li>
          <li>Az adatkezelés korlátozását vagy az adathordozhatóságot.</li>
        </ul>
        <p className="mt-2">
          Kérelmét a <span className="text-white">zoltan.garbai@grafibee.hu</span> e-mail címen nyújthatja be.
          Jogérvényesítési lehetőségeivel a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH) is fordulhat.
        </p>
      </div>
    </div>
  </LegalPageShell>
);

const ImpresszumPage = () => (
  <LegalPageShell title="Impresszum">
    <div className="space-y-4 text-sm sm:text-base text-white/70 text-center">
      <p>Grafibee</p>
      <ul className="space-y-1 text-left max-w-md mx-auto">
        <li><span className="text-white">Név:</span> Garbai Zoltán e.v.</li>
        <li><span className="text-white">Székhely:</span> 9012 Győr, Cseresznyés utca 2.</li>
        <li><span className="text-white">E-mail:</span> zoltan.garbai@grafibee.hu</li>
        <li><span className="text-white">Adószám:</span> 42976954-1-28</li>
      </ul>
      <p>
        Garbai Zoltán egyéni vállalkozóként működő szolgáltató.
      </p>
    </div>
  </LegalPageShell>
);

function App() {
  const [locationState, setLocationState] = useState(getLocationState);
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(() => getStoredConsent() === null);

  useEffect(() => {
    const handlePopState = () => setLocationState(getLocationState());

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });

    if (locationState.pathname === '/' && locationState.hash) {
      const targetId = locationState.hash.replace('#', '');
      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
    }
  }, [locationState.pathname, locationState.hash]);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setLocationState(getLocationState());
  };

  const currentPage = locationState.pathname === '/adatkezelesi-tajekoztato'
    ? <PrivacyPage />
    : locationState.pathname === '/impresszum'
      ? <ImpresszumPage />
      : <HomePage />;

  return (
    <>
      <Navbar onNavigate={navigateTo} />
      <main>
        {currentPage}
      </main>
      <Footer
        onNavigate={navigateTo}
        onOpenCookieSettings={() => setIsCookieBannerVisible(true)}
      />
      <CookieConsentBanner
        onNavigate={navigateTo}
        isVisible={isCookieBannerVisible}
        onAccept={() => {
          saveConsentDecision('accepted');
          setIsCookieBannerVisible(false);
        }}
        onReject={() => {
          saveConsentDecision('rejected');
          setIsCookieBannerVisible(false);
        }}
      />
    </>
  );
}

export default App;
