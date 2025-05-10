
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    // Navegamos para página de demonstração (poderíamos também abrir um modal)
    navigate('/demo');
  };

  return (
    <div className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="absolute inset-y-0 -right-10 w-[40%] bg-stone-50/50 skew-x-[-10deg] transform origin-top-right"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="mb-6">
              <span className="block font-bold text-stone-800">Prospecção inteligente para o</span>
              <span className="block text-amber-600">setor de rochas ornamentais</span>
            </h1>
            <p className="text-xl mb-8 text-stone-600">
              Descubra <span className="highlight">leads qualificados</span> semanalmente para sua empresa 
              de mármore e granito. Sem trabalho manual, sem desperdiçar tempo.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-amber-500 flex-shrink-0 mt-1" />
                <p className="text-stone-700">Receba até <span className="font-semibold">50 leads qualificados</span> semanalmente</p>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-amber-500 flex-shrink-0 mt-1" />
                <p className="text-stone-700">Dados completos: <span className="font-semibold">contatos, decisores, interesse</span></p>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-amber-500 flex-shrink-0 mt-1" />
                <p className="text-stone-700">Integração com <span className="font-semibold">CRM e WhatsApp</span></p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-semibold">
                Começar grátis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-stone-300"
                onClick={handleDemoClick}
              >
                Ver demonstração
              </Button>
            </div>
            
            <p className="text-stone-500 text-sm mt-4">
              Não precisa de cartão de crédito | Plano gratuito disponível
            </p>
          </div>
          
          <div className="lg:ml-auto lg:mr-0 lg:max-w-md xl:max-w-lg animate-slide-up">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200">
              <div className="p-8">
                <div className="bg-amber-50 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-medium text-amber-800 mb-1">Leads desta semana</h3>
                  <p className="text-amber-600">10 novos leads qualificados disponíveis</p>
                </div>
                
                <div className="space-y-5">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="border-b border-stone-100 pb-5 last:border-b-0 last:pb-0">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium text-stone-900">Construtora Rio Verde Ltda</h4>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">95% Match</span>
                      </div>
                      <p className="text-sm text-stone-500 mb-2">São Paulo, SP • Construção Civil</p>
                      <div className="flex items-center text-sm space-x-4">
                        <span className="flex items-center text-stone-600">
                          <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1"></span>
                          Carlos Silva, Comprador
                        </span>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                          Ver detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-stone-900"
                  onClick={() => navigate('/leads')}
                >
                  Ver todos os leads
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
