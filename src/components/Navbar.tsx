
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Minera<span className="text-stone-800">Leads</span></span>
            </a>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-stone-600 hover:text-amber-600 transition-colors">Funcionalidades</a>
            <a href="#pricing" className="text-stone-600 hover:text-amber-600 transition-colors">Planos</a>
            <a href="#testimonials" className="text-stone-600 hover:text-amber-600 transition-colors">Depoimentos</a>
            <a href="#faq" className="text-stone-600 hover:text-amber-600 transition-colors">FAQ</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-stone-300 text-stone-600 hover:text-amber-600 hover:border-amber-600" 
              onClick={() => navigate('/dashboard/login')}>Entrar</Button>
            <Button className="bg-amber-500 hover:bg-amber-600" 
              onClick={() => navigate('/signup')}>Começar Grátis</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a href="#features" className="block py-2 text-stone-600 hover:text-amber-600">Funcionalidades</a>
            <a href="#pricing" className="block py-2 text-stone-600 hover:text-amber-600">Planos</a>
            <a href="#testimonials" className="block py-2 text-stone-600 hover:text-amber-600">Depoimentos</a>
            <a href="#faq" className="block py-2 text-stone-600 hover:text-amber-600">FAQ</a>
            <div className="pt-4 flex flex-col space-y-4">
              <Button variant="outline" className="w-full border-stone-300 text-stone-600 hover:text-amber-600 hover:border-amber-600"
                onClick={() => navigate('/dashboard/login')}>Entrar</Button>
              <Button className="w-full bg-amber-500 hover:bg-amber-600"
                onClick={() => navigate('/signup')}>Começar Grátis</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
