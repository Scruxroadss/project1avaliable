
import { Instagram, Facebook, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div>
            <div className="mb-4 text-2xl font-bold text-white">
              Minera<span className="text-amber-400">Leads</span>
            </div>
            <p className="mb-6">
              Plataforma de prospecção automatizada para empresas de mármore e granito.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Empresa</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Sobre nós</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Parceiros</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Produto</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="hover:text-amber-400 transition-colors">Funcionalidades</a></li>
              <li><a href="#pricing" className="hover:text-amber-400 transition-colors">Planos</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Integrações</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Casos de uso</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-amber-400" />
                <a href="mailto:contato@mineraleads.com.br" className="hover:text-amber-400 transition-colors">contato@mineraleads.com.br</a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-amber-400" />
                <a href="tel:+5527999999999" className="hover:text-amber-400 transition-colors">(27) 99999-9999</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-800 pt-8 text-center md:flex md:justify-between md:text-left">
          <p>&copy; {currentYear} MineraLeads. Todos os direitos reservados.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">Termos de Uso</a>
            <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
