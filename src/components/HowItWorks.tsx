
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { ProfileIcon, AISearchIcon, LeadListIcon, ContactIcon } from "./Assets";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: "01",
      title: "Defina seu perfil de cliente ideal",
      description: "Informe quais tipos de materiais você vende, regiões de atuação e perfil ideal de cliente.",
      icon: ProfileIcon
    },
    {
      number: "02",
      title: "Nossa IA inicia a busca",
      description: "Nossos algoritmos vasculham a web e bases de dados exclusivas em busca de leads que correspondam ao seu perfil.",
      icon: AISearchIcon
    },
    {
      number: "03",
      title: "Receba leads qualificados",
      description: "Toda semana você recebe uma lista de leads com alto potencial de compra, incluindo dados de contato.",
      icon: LeadListIcon
    },
    {
      number: "04",
      title: "Inicie o contato de forma otimizada",
      description: "Contate os leads com nossos templates e automações ou exporte para seu CRM para seguir o processo de vendas.",
      icon: ContactIcon
    }
  ];

  return (
    <section className="py-24 bg-white" id="howItWorks">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-stone-800 mb-4">Como <span className="text-amber-600">funciona</span></h2>
          <p className="text-stone-600 text-xl">
            Um processo simples e eficiente para transformar sua prospecção em um fluxo contínuo de oportunidades
          </p>
        </div>
        
        <div className="relative">
          {/* Linha conectora vertical */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-amber-200 -translate-x-1/2 z-0"></div>
          
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`lg:grid lg:grid-cols-2 gap-8 items-center ${index % 2 !== 0 ? 'lg:rtl' : ''}`}>
                  <div className={`mb-8 lg:mb-0 text-center lg:text-left ${index % 2 !== 0 ? 'lg:text-right' : ''}`}>
                    <span className="inline-block text-amber-500 text-5xl font-bold mb-4">{step.number}</span>
                    <h3 className="text-2xl font-semibold mb-4 text-stone-800">{step.title}</h3>
                    <p className="text-stone-600 max-w-md mx-auto lg:mx-0">{step.description}</p>
                  </div>
                  
                  <div className="bg-stone-50 rounded-xl border border-stone-100 p-6 relative">
                    {/* Ponto na linha do tempo */}
                    <div className="hidden lg:flex absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-amber-500 rounded-full items-center justify-center z-10">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    
                    <div className="h-48 bg-stone-50 rounded-lg flex items-center justify-center">
                      {step.icon && <step.icon />}
                    </div>
                  </div>
                </div>
                
                {/* Seta para baixo entre os passos */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <ArrowDown className="text-amber-300 h-8 w-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              size="lg" 
              className="bg-amber-500 hover:bg-amber-600 text-stone-900"
              onClick={() => navigate('/signup')}
            >
              Comece agora mesmo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
