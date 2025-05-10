
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Pricing = () => {
  const plans = [
    {
      name: "Essencial",
      price: "Grátis",
      description: "Para pequenas empresas iniciando a prospecção digital",
      features: [
        "10 leads qualificados por semana",
        "Dados básicos de contato",
        "Acesso ao painel web",
        "Exportação para Google Sheets",
        "Suporte por e-mail"
      ],
      mostPopular: false,
      cta: "Começar grátis"
    },
    {
      name: "Profissional",
      price: "R$ 497",
      period: "/mês",
      description: "Para empresas que buscam escalar as vendas B2B",
      features: [
        "30 leads qualificados por semana",
        "Dados completos de contato (incluindo decisores)",
        "Personalização de perfil de cliente ideal",
        "Integração com WhatsApp e e-mail",
        "Templates de abordagem prontos",
        "Relatórios de desempenho",
        "Suporte prioritário"
      ],
      mostPopular: true,
      cta: "Experimentar por 7 dias"
    },
    {
      name: "Enterprise",
      price: "R$ 997",
      period: "/mês",
      description: "Para grandes produtores com necessidades específicas",
      features: [
        "50+ leads qualificados por semana",
        "Dados avançados e insights de mercado",
        "Automação de abordagem inicial",
        "Integrações com CRMs",
        "API disponível",
        "Gestor de conta dedicado",
        "Treinamento da equipe"
      ],
      mostPopular: false,
      cta: "Falar com consultor"
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-stone-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-stone-800 mb-4">Planos <span className="text-amber-600">acessíveis</span> para qualquer porte</h2>
          <p className="text-stone-600 text-xl">
            Escolha o plano que melhor se adapta às necessidades da sua empresa e comece a gerar leads qualificados hoje mesmo
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`border ${plan.mostPopular ? 'border-amber-500 shadow-lg shadow-amber-100' : 'border-stone-200'} relative`}
            >
              {plan.mostPopular && (
                <div className="absolute -top-4 inset-x-0 mx-auto w-40 bg-amber-500 text-stone-900 font-medium py-1 px-3 rounded-full text-sm text-center">
                  Mais popular
                </div>
              )}
              
              <CardHeader className={`pb-8 ${plan.mostPopular ? 'pt-8' : 'pt-6'}`}>
                <CardTitle className="text-xl font-semibold text-stone-800">{plan.name}</CardTitle>
                <CardDescription className="mt-2 text-stone-500">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-stone-900">{plan.price}</span>
                  {plan.period && <span className="text-stone-500 ml-1">{plan.period}</span>}
                </div>
              </CardHeader>
              
              <CardContent className="pb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-amber-500 mr-2 mt-0.5 shrink-0" />
                      <span className="text-stone-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pt-4">
                <Button 
                  className={`w-full ${plan.mostPopular ? 'bg-amber-500 hover:bg-amber-600 text-stone-900' : 'bg-white border border-stone-300 text-stone-800 hover:bg-stone-50'}`}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
