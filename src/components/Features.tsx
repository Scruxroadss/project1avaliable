
import { Search, Target, Clock, UserCheck, RefreshCw, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: <Search className="h-10 w-10 p-2 bg-amber-100 text-amber-600 rounded-lg" />,
      title: "Prospecção automatizada",
      description: "Nossa IA vasculha a web 24/7 para encontrar empresas que precisam dos seus materiais específicos"
    },
    {
      icon: <Target className="h-10 w-10 p-2 bg-amber-100 text-amber-600 rounded-lg" />,
      title: "Segmentação precisa",
      description: "Filtre leads por região, tipo de projeto, porte e histórico de compras"
    },
    {
      icon: <Clock className="h-10 w-10 p-2 bg-amber-100 text-amber-600 rounded-lg" />,
      title: "Leads em tempo real",
      description: "Receba notificações quando novos leads qualificados forem identificados"
    },
    {
      icon: <UserCheck className="h-10 w-10 p-2 bg-amber-100 text-amber-600 rounded-lg" />,
      title: "Contatos dos decisores",
      description: "Acesse diretamente quem toma as decisões de compra, sem intermediários"
    },
    {
      icon: <RefreshCw className="h-10 w-10 p-2 bg-amber-100 text-amber-600 rounded-lg" />,
      title: "Atualizações semanais",
      description: "Novos leads qualificados toda semana, sempre atualizados e verificados"
    },
    {
      icon: <Share2 className="h-10 w-10 p-2 bg-amber-100 text-amber-600 rounded-lg" />,
      title: "Integrações flexíveis",
      description: "Exporte para Google Sheets, WhatsApp, e-mail ou seu CRM preferido"
    }
  ];

  return (
    <section id="features" className="py-24 bg-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-stone-800 mb-4">Como a <span className="text-amber-600">MineraLeads</span> transforma sua prospecção</h2>
          <p className="text-stone-600 text-xl">
            Automatizamos todo o processo de busca e qualificação de leads para você focar apenas em fechar negócios
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-stone-200 hover:shadow-md transition-shadow duration-300 bg-white">
              <CardContent className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-stone-800">{feature.title}</h3>
                <p className="text-stone-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
