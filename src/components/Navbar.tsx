import { useState, type MouseEvent, type ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/grafibee_logo.svg';

const Navbar = ({ onNavigate }: { onNavigate: (path: string) => void }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileOpen(false);

  const handleNavigate = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    closeMobileMenu();
    onNavigate(path);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-deep-black/85 backdrop-blur-xl border-b border-primary/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <a
          href="/"
          onClick={handleNavigate('/')}
          className="inline-flex items-center gap-3 text-xl sm:text-2xl font-display font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
        >
          <span className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30 p-1.5 shadow-[0_0_24px_rgba(128,59,178,0.28)]">
            <img src={logo} alt="Grafibee logo" className="w-full h-full object-contain" />
          </span>
          <span>
            grafibee<span className="text-primary">.</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-12">
          <NavLink href="/#work" onNavigate={onNavigate}>Munkáink</NavLink>
          <NavLink href="/#services" onNavigate={onNavigate}>Szolgáltatások</NavLink>
          <NavLink href="/#contact" onNavigate={onNavigate}>Kapcsolat</NavLink>
        </div>
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label="Mobil menü megnyitása"
            aria-expanded={isMobileOpen}
            className="p-2 rounded hover:bg-primary/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {isMobileOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5 text-primary" />}
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <div className="md:hidden border-t border-primary/20 bg-deep-black/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 items-start">
            <NavLink href="/#home" onNavigate={onNavigate} onClick={closeMobileMenu}>Főoldal</NavLink>
            <NavLink href="/#work" onNavigate={onNavigate} onClick={closeMobileMenu}>Munkáink</NavLink>
            <NavLink href="/#services" onNavigate={onNavigate} onClick={closeMobileMenu}>Szolgáltatások</NavLink>
            <NavLink href="/#contact" onNavigate={onNavigate} onClick={closeMobileMenu}>Kapcsolat</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({
  href,
  children,
  onNavigate,
  onClick,
}: {
  href: string;
  children: ReactNode;
  onNavigate: (path: string) => void;
  onClick?: () => void;
}) => (
  <a
    href={href}
    onClick={(event) => {
      event.preventDefault();
      onClick?.();
      onNavigate(href);
    }}
    className="relative text-white/80 hover:text-primary transition-colors duration-300 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
  </a>
);

export default Navbar;