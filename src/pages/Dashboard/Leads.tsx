
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, FileDown, Filter, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useToast } from '@/hooks/use-toast';
import LeadDetailsModal from '@/components/LeadDetailsModal';

// Dados de exemplo para os leads
const leadsData = [
  {
    id: 1,
    company: "Marmoraria Estrela",
    location: "São Paulo, SP",
    industry: "Construção Civil",
    contact: "Carlos Silva",
    position: "Diretor",
    match: 95,
    email: "carlos@marmorariaestrela.com.br",
    phone: "(11) 98765-4321",
    lastProject: "Reforma do Shopping Plaza Central - Fornecimento e instalação de granito em 15 lojas e áreas comuns",
    foundedYear: 2005,
    employeeCount: "50-100",
    recentPurchases: [
      "500m² de Granito Preto São Gabriel",
      "200m² de Mármore Travertino",
      "Equipamentos de corte CNC"
    ],
    notes: "Empresa com forte presença no mercado corporativo. Buscando novos fornecedores para projetos comerciais de grande porte."
  },
  {
    id: 2,
    company: "GraniPrima",
    location: "Rio de Janeiro, RJ",
    industry: "Decoração",
    contact: "Ana Oliveira",
    position: "Gerente Comercial",
    match: 88,
    email: "ana@graniprima.com.br",
    phone: "(21) 98765-1234",
    lastProject: "Bancos privados do Centro Empresarial - Instalação de tampos de granito e mármore",
    foundedYear: 2010,
    employeeCount: "10-50",
    recentPurchases: [
      "300m² de Mármore Carrara",
      "Materiais para polimento"
    ]
  },
  {
    id: 3,
    company: "EcoMarble",
    location: "Belo Horizonte, MG",
    industry: "Decoração Sustentável",
    contact: "Roberto Santos",
    position: "CEO",
    match: 92,
    email: "roberto@ecomarble.com.br",
    phone: "(31) 99876-5432",
    foundedYear: 2015,
    employeeCount: "10-50",
    notes: "Foco em projetos ecologicamente corretos e materiais sustentáveis."
  },
  {
    id: 4,
    company: "Granitos Premium",
    location: "Campinas, SP",
    industry: "Construção Civil",
    contact: "Márcia Lima",
    position: "Diretora de Compras",
    match: 85,
    email: "marcia@granitospremium.com",
    phone: "(19) 98765-8765",
    foundedYear: 2008,
    employeeCount: "50-100"
  },
  {
    id: 5,
    company: "Pedras & Arte",
    location: "Curitiba, PR",
    industry: "Design de Interiores",
    contact: "Paulo Mendes",
    position: "Proprietário",
    match: 93,
    email: "paulo@pedrasearte.com.br",
    phone: "(41) 99876-1234",
    lastProject: "Residências de luxo no condomínio Villa Toscana",
    foundedYear: 2012,
    employeeCount: "10-50",
    recentPurchases: [
      "200m² de Granito Verde Ubatuba",
      "150m² de Mármore Crema Marfil"
    ],
    notes: "Especialista em projetos residenciais de alto padrão. Interesse em materiais exclusivos."
  }
];

const LeadsPage: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<typeof leadsData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Busca realizada",
      description: `Resultados para: ${searchQuery}`,
    });
  };

  const handleAction = (leadId: number, action: 'contacted' | 'lost' | 'closed') => {
    const messages = {
      contacted: "Lead marcado como contatado",
      lost: "Lead marcado como perdido",
      closed: "Lead marcado como fechado com sucesso!",
    };
    toast({
      title: messages[action],
      description: `Lead ID: ${leadId}`,
      variant: action === 'closed' ? 'default' : (action === 'lost' ? 'destructive' : undefined),
    });
  };

  const handleExport = () => {
    toast({
      title: "Leads exportados",
      description: "Arquivo CSV gerado com sucesso",
    });
  };

  const openLeadDetails = (lead: typeof leadsData[0]) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const filteredLeads = leadsData.filter(lead =>
    lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Meus Leads</h1>
        <Button className="bg-amber-500 hover:bg-amber-600" onClick={handleExport}>
          <FileDown className="mr-2 h-4 w-4" />
          Exportar leads
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Leads</CardTitle>
          <CardDescription>Gerencie todos os leads recebidos pela sua empresa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-500" />
                <Input
                  placeholder="Buscar por empresa, localização ou contato..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" variant="outline">Buscar</Button>
            </form>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Match</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map(lead => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.company}</TableCell>
                    <TableCell>{lead.location}</TableCell>
                    <TableCell>{lead.industry}</TableCell>
                    <TableCell>{lead.contact}, {lead.position}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${lead.match > 90 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {lead.match}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                          onClick={() => openLeadDetails(lead)}
                        >
                          Ver detalhes
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-green-600 border-green-200 hover:border-green-400 hover:bg-green-50"
                          onClick={() => handleAction(lead.id, 'contacted')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Contatado
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-amber-600 border-amber-200 hover:border-amber-400 hover:bg-amber-50"
                          onClick={() => handleAction(lead.id, 'closed')}
                        >
                          <DollarSign className="h-4 w-4 mr-1" />
                          Fechado
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 border-red-200 hover:border-red-400 hover:bg-red-50"
                          onClick={() => handleAction(lead.id, 'lost')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Perdido
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      <LeadDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lead={selectedLead}
      />
    </div>
  );
};

export default LeadsPage;
