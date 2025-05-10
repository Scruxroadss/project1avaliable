
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Antes, nossos vendedores perdiam horas no Instagram procurando clientes. Com a MineraLeads, recebemos leads qualificados toda semana e aumentamos nossas vendas em 40%.",
      author: "Ricardo Almeida",
      role: "Diretor Comercial",
      company: "Granitos Premium",
      avatar: "RA"
    },
    {
      quote: "A MineraLeads nos ajudou a encontrar clientes específicos para nossos materiais exclusivos. Os dados de contato são precisos e já fechamos 3 grandes negócios no primeiro mês.",
      author: "Carla Martins",
      role: "Gerente de Vendas",
      company: "Mármores Cachoeiro",
      avatar: "CM"
    },
    {
      quote: "O que mais me impressionou foi a qualidade dos leads. São empresas que realmente estão procurando os materiais que vendemos, com dados completos até do decisor.",
      author: "Felipe Costa",
      role: "Proprietário",
      company: "FC Rochas",
      avatar: "FC"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-stone-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="mb-4 text-white">O que nossos <span className="text-amber-400">clientes</span> dizem</h2>
          <p className="text-stone-300 text-xl">
            Empresas do setor de rochas ornamentais que já transformaram sua prospecção com a MineraLeads
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-stone-800 border-stone-700">
              <CardContent className="pt-6">
                <div className="mb-6">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className="text-amber-400 mr-1">★</span>
                  ))}
                </div>
                <blockquote className="text-stone-200 mb-8">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4 border-2 border-amber-500">
                    <AvatarFallback className="bg-amber-600 text-white">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-white">{testimonial.author}</div>
                    <div className="text-stone-400 text-sm">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
