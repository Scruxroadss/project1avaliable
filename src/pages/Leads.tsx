
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Leads = () => {
  const navigate = useNavigate();
  
  const leads = [
    {
      id: 1,
      company: "Construtora Rio Verde Ltda",
      location: "São Paulo, SP",
      industry: "Construção Civil",
      contact: "Carlos Silva",
      position: "Comprador",
      match: 95
    },
    {
      id: 2,
      company: "Arquitetura Moderna S.A.",
      location: "Rio de Janeiro, RJ",
      industry: "Arquitetura",
      contact: "Ana Paula Mendes",
      position: "Diretora",
      match: 87
    },
    {
      id: 3,
      company: "Plaza Empreendimentos",
      location: "Belo Horizonte, MG",
      industry: "Incorporadora",
      contact: "Roberto Alves",
      position: "Gerente de Projetos",
      match: 84
    },
    {
      id: 4,
      company: "Costa Azul Resorts",
      location: "Salvador, BA",
      industry: "Hotelaria",
      contact: "Márcia Gomes",
      position: "Diretora Executiva",
      match: 79
    },
    {
      id: 5,
      company: "Vitória Construções",
      location: "Vitória, ES",
      industry: "Construção Civil",
      contact: "Pedro Martins",
      position: "Comprador Sênior",
      match: 76
    }
  ];
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-6">Seus Leads Qualificados</h1>
            <p className="text-lg mb-10 max-w-3xl text-stone-600">
              Aqui estão seus leads da semana, selecionados com base no seu perfil de cliente ideal.
              Cada lead foi verificado e qualificado por nossa equipe.
            </p>
            
            <div className="bg-white rounded-xl shadow-md border border-stone-200 overflow-hidden">
              <div className="p-6 border-b border-stone-200 bg-stone-50 flex justify-between items-center">
                <h2 className="font-bold text-xl">Leads desta semana</h2>
                <div className="flex items-center gap-2">
                  <span className="text-stone-600">Classificar por:</span>
                  <select className="bg-white border border-stone-200 rounded-md px-2 py-1 text-sm">
                    <option>% de Match</option>
                    <option>Empresa A-Z</option>
                    <option>Localização</option>
                    <option>Setor</option>
                  </select>
                </div>
              </div>
              
              <div className="divide-y divide-stone-100">
                {leads.map((lead) => (
                  <div key={lead.id} className="p-6 hover:bg-stone-50 transition-colors">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium text-lg">{lead.company}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full ${lead.match > 90 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {lead.match}% Match
                      </span>
                    </div>
                    <p className="text-stone-600 mb-3">{lead.location} • {lead.industry}</p>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center text-stone-700">
                        <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                        {lead.contact}, {lead.position}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver detalhes
                        </Button>
                        <Button size="sm" className="h-8 bg-amber-500 hover:bg-amber-600 text-stone-900">
                          Contatar
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 border-t border-stone-200 bg-stone-50 text-center">
                <p className="text-stone-600 mb-3">
                  Você tem acesso a 5 de 10 leads disponíveis no plano gratuito.
                </p>
                <Button 
                  className="bg-amber-500 hover:bg-amber-600 text-stone-900"
                  onClick={() => navigate('/signup')}
                >
                  Fazer upgrade para ver todos os leads
                </Button>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
              >
                Voltar para a página inicial
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Leads;
