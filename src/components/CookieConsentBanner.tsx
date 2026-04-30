type CookieConsentBannerProps = {
  onNavigate: (path: string) => void;
  isVisible: boolean;
  onAccept: () => void;
  onReject: () => void;
};

const CookieConsentBanner = ({ onNavigate, isVisible, onAccept, onReject }: CookieConsentBannerProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-3 bottom-3 sm:inset-x-6 sm:bottom-6 z-[100]">
      <section
        role="dialog"
        aria-label="Sütibeállítások"
        className="mx-auto max-w-5xl rounded-2xl border border-primary/35 bg-deep-black/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      >
        <div className="p-5 sm:p-6 text-left">
          <h2 className="text-lg sm:text-xl font-semibold text-white">Sütibeállítások</h2>
          <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed">
            A weboldal működéséhez szükséges sütiket mindig használjuk. Elemzési (Google Analytics) sütiket csak az Ön
            hozzájárulásával aktiválunk, így megfelelünk az EU GDPR és ePrivacy elvárásoknak.
          </p>
          <p className="mt-2 text-sm sm:text-base text-white/75 leading-relaxed">
            A döntését bármikor módosíthatja a láblécben található "Sütibeállítások" gombbal.
          </p>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/adatkezelesi-tajekoztato')}
              className="self-start text-sm text-primary hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
            >
              Adatkezelési tájékoztató megnyitása
            </button>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end w-full sm:w-auto">
              <button
                type="button"
                onClick={onReject}
                className="w-full sm:w-auto min-h-11 px-5 py-2.5 rounded-lg border border-white/30 text-white font-medium hover:border-white/60 hover:bg-white/5 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Csak szükséges sütik
              </button>
              <button
                type="button"
                onClick={onAccept}
                className="w-full sm:w-auto min-h-11 px-5 py-2.5 rounded-lg border border-primary bg-primary text-white font-medium hover:bg-primary/90 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Összes elfogadása
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookieConsentBanner;
