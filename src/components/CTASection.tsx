
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  const handleStartFree = () => {
    navigate('/signup');
  };

  const handleViewDemo = () => {
    navigate('/demo');
  };

  return (
    <section className="bg-amber-500 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-stone-900">
          Pronto para transformar sua prospecção?
        </h2>
        <p className="text-xl mb-10 text-stone-800 max-w-2xl mx-auto">
          Comece a receber leads qualificados ainda esta semana. Plano gratuito disponível,
          sem necessidade de cartão de crédito.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-stone-900 hover:bg-stone-800 text-white"
            onClick={handleStartFree}
          >
            Começar grátis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-stone-700 text-stone-900 hover:bg-amber-600"
            onClick={handleViewDemo}
          >
            Agendar demonstração
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
