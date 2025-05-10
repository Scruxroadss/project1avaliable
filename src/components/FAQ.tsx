
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Como a MineraLeads encontra leads qualificados para meu negócio?",
      answer: "Utilizamos inteligência artificial para monitorar múltiplas fontes de dados como Google, Instagram, LinkedIn, grupos de arquitetos e construtoras. Identificamos empresas que estão buscando ou utilizando materiais semelhantes aos que você vende, e coletamos dados de contato dessas empresas e seus decisores."
    },
    {
      question: "Quais informações recebo sobre cada lead?",
      answer: "Você recebe nome da empresa, localização, tipo de negócio, Instagram, site, e-mail, telefone, nome e cargo do decisor, além de insights sobre projetos atuais e histórico de compras quando disponíveis."
    },
    {
      question: "Posso definir características específicas para os leads que desejo receber?",
      answer: "Sim! Você pode configurar filtros como região geográfica, tipo de material (mármore, granito, quartzito etc.), porte da empresa, tipo de projeto (residencial, comercial) e muito mais."
    },
    {
      question: "Quantos leads novos posso esperar por semana?",
      answer: "Depende do plano escolhido. O plano gratuito oferece 10 leads por semana, o Profissional 30 leads e o Enterprise 50+ leads semanais, todos qualificados e relevantes para seu negócio."
    },
    {
      question: "Como faço para começar a usar a MineraLeads?",
      answer: "Basta criar uma conta gratuita, definir seu perfil de cliente ideal e personalizar suas preferências. Na mesma semana você já começará a receber seus primeiros leads qualificados."
    },
    {
      question: "É possível integrar com meu CRM ou outras ferramentas?",
      answer: "Sim! Oferecemos integrações com os principais CRMs do mercado, além de Google Sheets, e-mail e WhatsApp. Para integrações personalizadas, entre em contato com nossa equipe."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-stone-800 mb-4">Perguntas <span className="text-amber-600">frequentes</span></h2>
          <p className="text-stone-600 text-xl">
            Esclareça suas dúvidas sobre a MineraLeads e como ela pode ajudar sua empresa a encontrar leads qualificados
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium text-stone-800 hover:text-amber-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-stone-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
