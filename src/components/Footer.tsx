const Footer = ({
  onNavigate,
  onOpenCookieSettings,
}: {
  onNavigate: (path: string) => void;
  onOpenCookieSettings: () => void;
}) => {
  return (
    <footer className="bg-deep-black border-t border-primary/20 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-white/60 text-xs sm:text-sm gap-4 sm:gap-0">
        <div className="text-center sm:text-left">
          © {new Date().getFullYear()} grafibee. Minden jog fenntartva.
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          <a href="/adatkezelesi-tajekoztato" onClick={(event) => { event.preventDefault(); onNavigate('/adatkezelesi-tajekoztato'); }} className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded">Adatvédelem</a>
          <a href="/impresszum" onClick={(event) => { event.preventDefault(); onNavigate('/impresszum'); }} className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded">Impresszum</a>
          <button type="button" onClick={onOpenCookieSettings} className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded">Sütibeállítások</button>
          <a href="mailto:chat@grafibee.hu" className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded">chat@grafibee.hu</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;