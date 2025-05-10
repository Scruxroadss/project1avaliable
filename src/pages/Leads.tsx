
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LeadDetailsModal from "@/components/LeadDetailsModal";
import { toast } from "@/hooks/use-toast";

const Leads = () => {
  const navigate = useNavigate();
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  const leads = [
    {
      id: 1,
      company: "Construtora Rio Verde Ltda",
      location: "São Paulo, SP",
      industry: "Construção Civil",
      contact: "Carlos Silva",
      position: "Comprador",
      match: 95,
      email: "carlos.silva@rioverde.com.br",
      phone: "(11) 98765-4321",
      foundedYear: 2003,
      employeeCount: "50-100",
      lastProject: "Edifício residencial de alto padrão com fachada em granito negro no Morumbi, finalizado há 3 meses.",
      recentPurchases: [
        "Mármore Carrara (80m²) em Abril 2023",
        "Granito Preto São Gabriel (120m²) em Janeiro 2023"
      ],
      notes: "Empresa com foco em construções de alto padrão, utiliza materiais premium e tem histórico de compras recorrentes de rochas ornamentais."
    },
    {
      id: 2,
      company: "Arquitetura Moderna S.A.",
      location: "Rio de Janeiro, RJ",
      industry: "Arquitetura",
      contact: "Ana Paula Mendes",
      position: "Diretora",
      match: 87,
      email: "ana.mendes@arquiteturamoderna.com.br",
      phone: "(21) 97654-3210",
      foundedYear: 2010,
      employeeCount: "10-50",
      lastProject: "Reforma de hotel boutique na Zona Sul com amplo uso de mármores para banheiros e áreas comuns.",
      recentPurchases: [
        "Mármore Travertino (40m²) em Maio 2023"
      ],
      notes: "Estúdio de arquitetura premiado, especializado em projetos comerciais de alto padrão."
    },
    {
      id: 3,
      company: "Plaza Empreendimentos",
      location: "Belo Horizonte, MG",
      industry: "Incorporadora",
      contact: "Roberto Alves",
      position: "Gerente de Projetos",
      match: 84,
      email: "r.alves@plazaempreendimentos.com.br",
      phone: "(31) 98876-5432",
      foundedYear: 1998,
      employeeCount: "100-500",
      lastProject: "Shopping center com praça central revestida em mármore importado.",
      recentPurchases: [
        "Granito Verde Ubatuba (200m²) em Março 2023",
        "Mármore Creme Marfil (150m²) em Fevereiro 2023"
      ]
    },
    {
      id: 4,
      company: "Costa Azul Resorts",
      location: "Salvador, BA",
      industry: "Hotelaria",
      contact: "Márcia Gomes",
      position: "Diretora Executiva",
      match: 79,
      email: "marcia@costaazulresorts.com.br",
      phone: "(71) 99887-6655",
      foundedYear: 2015,
      employeeCount: "100-500",
      lastProject: "Renovação de lobby e áreas de piscina com mármores e granitos",
      recentPurchases: [
        "Mármore Branco Especial (60m²) em Junho 2023"
      ]
    },
    {
      id: 5,
      company: "Vitória Construções",
      location: "Vitória, ES",
      industry: "Construção Civil",
      contact: "Pedro Martins",
      position: "Comprador Sênior",
      match: 76,
      email: "pedro.martins@vitoriaconstrucoes.com.br",
      phone: "(27) 98765-1234",
      foundedYear: 2005,
      employeeCount: "10-50",
      lastProject: "Condomínio residencial com bancadas em granito para todas as unidades."
    }
  ];

  const handleViewDetails = (lead: any) => {
    setSelectedLead(lead);
    setIsDetailsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
  };
  
  const handleContact = (leadId: number) => {
    toast({
      title: "Contato iniciado",
      description: "Em breve você receberá mais informações sobre este lead.",
    });
  };
  
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
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8"
                          onClick={() => handleViewDetails(lead)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver detalhes
                        </Button>
                        <Button 
                          size="sm" 
                          className="h-8 bg-amber-500 hover:bg-amber-600 text-stone-900"
                          onClick={() => handleContact(lead.id)}
                        >
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

      <LeadDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseModal}
        lead={selectedLead}
      />
    </div>
  );
};

export default Leads;
