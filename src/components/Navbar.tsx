
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.includes(path);
  };
  
  // Fecha menu mobile quando clicar em um link
  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled 
        ? "bg-white/90 backdrop-blur-md shadow-sm" 
        : "bg-white/80 backdrop-blur-sm"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent transition-all duration-300 hover:from-amber-500 hover:to-amber-400">
                Radar<span className="text-stone-800">B2B</span>
              </span>
            </a>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#features" isActive={isActive('#features')} onClick={() => handleNavigation('/#features')}>
              Funcionalidades
            </NavLink>
            <NavLink href="#pricing" isActive={isActive('#pricing')} onClick={() => handleNavigation('/#pricing')}>
              Planos
            </NavLink>
            <NavLink href="#testimonials" isActive={isActive('#testimonials')} onClick={() => handleNavigation('/#testimonials')}>
              Depoimentos
            </NavLink>
            <NavLink href="#faq" isActive={isActive('#faq')} onClick={() => handleNavigation('/#faq')}>
              FAQ
            </NavLink>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-stone-700 hover:text-amber-600 hover:bg-amber-50 rounded-full"
              onClick={() => navigate('/dashboard/login')}
            >
              Entrar
            </Button>
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-sm transition-all duration-300 hover:shadow-md" 
              onClick={() => navigate('/signup')}
            >
              Começar Grátis
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-stone-700 hover:bg-amber-50 hover:text-amber-600 rounded-full"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-300" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden bg-white border-b overflow-hidden transition-all duration-300 ease-in-out", 
          isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          <MobileNavItem href="#features" onClick={() => handleNavigation('/#features')}>
            Funcionalidades
          </MobileNavItem>
          <MobileNavItem href="#pricing" onClick={() => handleNavigation('/#pricing')}>
            Planos
          </MobileNavItem>
          <MobileNavItem href="#testimonials" onClick={() => handleNavigation('/#testimonials')}>
            Depoimentos
          </MobileNavItem>
          <MobileNavItem href="#faq" onClick={() => handleNavigation('/#faq')}>
            FAQ
          </MobileNavItem>
          <div className="pt-4 flex flex-col space-y-4">
            <Button 
              variant="ghost"
              className="w-full justify-center text-stone-700 hover:text-amber-600 hover:bg-amber-50/50 border border-stone-100 rounded-full"
              onClick={() => navigate('/dashboard/login')}
            >
              Entrar
            </Button>
            <Button 
              className="w-full justify-center bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-sm transition-all duration-200 hover:shadow"
              onClick={() => navigate('/signup')}
            >
              Começar Grátis
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Componentes auxiliares para melhorar a reutilização
const NavLink = ({ 
  href, 
  children, 
  isActive,
  onClick
}: { 
  href: string; 
  children: React.ReactNode; 
  isActive?: boolean;
  onClick?: () => void;
}) => {
  return (
    <a 
      href={href} 
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={cn(
        "relative text-stone-600 hover:text-amber-600 transition-colors duration-200 py-1",
        isActive && "text-amber-600 font-medium",
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center",
        isActive && "after:scale-x-100"
      )}
    >
      {children}
    </a>
  );
};

const MobileNavItem = ({ 
  href, 
  children, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode;
  onClick?: () => void; 
}) => {
  return (
    <a 
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }} 
      className="block py-2 px-3 text-stone-600 hover:text-amber-600 hover:bg-amber-50/50 rounded-lg transition-colors duration-200"
    >
      {children}
    </a>
  );
};

export default Navbar;
