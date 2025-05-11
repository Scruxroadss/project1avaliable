
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  FileDown,
  Filter,
  CheckCircle,
  XCircle,
  DollarSign,
  ChevronDown,
  User,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Tag
} from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

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
    notes: "Empresa com forte presença no mercado corporativo. Buscando novos fornecedores para projetos comerciais de grande porte.",
    status: "new"
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
    ],
    status: "contacted"
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
    notes: "Foco em projetos ecologicamente corretos e materiais sustentáveis.",
    status: "closed"
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
    employeeCount: "50-100",
    status: "contacted"
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
    notes: "Especialista em projetos residenciais de alto padrão. Interesse em materiais exclusivos.",
    status: "lost"
  }
];

// Componente para estatísticas de leads
const LeadStatistics = () => {
  const stats = [
    { label: "Novos", value: 18, color: "bg-amber-100 text-amber-800" },
    { label: "Contatados", value: 32, color: "bg-blue-100 text-blue-800" },
    { label: "Fechados", value: 7, color: "bg-green-100 text-green-800" },
    { label: "Perdidos", value: 5, color: "bg-red-100 text-red-800" }
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-stone-500 text-sm font-medium">{stat.label}</span>
            <Badge variant="outline" className={stat.color}>{stat.value}</Badge>
          </div>
          <div className="text-2xl font-bold">{Math.round((stat.value / 62) * 100)}%</div>
          <div className="h-1.5 w-full bg-stone-100 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full rounded-full ${stat.color.includes('amber') ? 'bg-amber-500' : 
                         stat.color.includes('blue') ? 'bg-blue-500' : 
                         stat.color.includes('green') ? 'bg-green-500' : 'bg-red-500'}`} 
              style={{ width: `${(stat.value / 62) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Componente para o status do lead com estilo visual
const LeadStatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    new: "bg-amber-100 text-amber-800 border-amber-200",
    contacted: "bg-blue-100 text-blue-800 border-blue-200",
    closed: "bg-green-100 text-green-800 border-green-200",
    lost: "bg-red-100 text-red-800 border-red-200"
  };
  
  const statusLabels = {
    new: "Novo",
    contacted: "Contatado",
    closed: "Fechado",
    lost: "Perdido"
  };
  
  const statusKey = status as keyof typeof statusStyles;
  
  return (
    <Badge variant="outline" className={cn("font-medium", statusStyles[statusKey])}>
      {statusLabels[statusKey]}
    </Badge>
  );
};

// Componente principal da página de leads
const LeadsPage: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<typeof leadsData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

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
      closed: "Lead fechado com sucesso!",
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

  const filteredLeads = leadsData.filter(lead => {
    // Filtro de busca
    const matchesSearch = 
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.industry.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtro de status
    const matchesFilter = currentFilter ? lead.status === currentFilter : true;
    
    return matchesSearch && matchesFilter;
  });

  // Rendering do Card de Lead
  const renderLeadCard = (lead: typeof leadsData[0]) => (
    <Card key={lead.id} className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center">
              {lead.company}
              {lead.match > 90 && (
                <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200">
                  Match {lead.match}%
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="flex items-center space-x-1">
              <MapPin className="h-3.5 w-3.5 text-stone-400" />
              <span>{lead.location}</span>
              <span className="mx-1">•</span>
              <Tag className="h-3.5 w-3.5 text-stone-400" />
              <span>{lead.industry}</span>
            </CardDescription>
          </div>
          <LeadStatusBadge status={lead.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-stone-700 space-x-2">
            <User className="h-4 w-4 text-stone-400" />
            <span className="font-medium">{lead.contact}, {lead.position}</span>
          </div>
          
          {lead.phone && (
            <div className="flex items-center text-sm text-stone-600 space-x-2">
              <Phone className="h-4 w-4 text-stone-400" />
              <span>{lead.phone}</span>
            </div>
          )}
          
          {lead.email && (
            <div className="flex items-center text-sm text-stone-600 space-x-2 truncate">
              <Mail className="h-4 w-4 text-stone-400 flex-shrink-0" />
              <span className="truncate">{lead.email}</span>
            </div>
          )}
          
          {lead.notes && (
            <div className="border-t pt-2 mt-2">
              <p className="text-sm text-stone-600 line-clamp-2">{lead.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
      <div className="px-6 py-3 bg-stone-50 border-t flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
          onClick={() => openLeadDetails(lead)}
        >
          Ver detalhes
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-stone-200 text-stone-600"
            >
              Ações <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>Alterar status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem 
              checked={lead.status === 'contacted'}
              onClick={() => handleAction(lead.id, 'contacted')}
              className="text-blue-600"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Contatado
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem 
              checked={lead.status === 'closed'}
              onClick={() => handleAction(lead.id, 'closed')}
              className="text-green-600"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Fechado
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem 
              checked={lead.status === 'lost'}
              onClick={() => handleAction(lead.id, 'lost')}
              className="text-red-600"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Perdido
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Meus Leads</h1>
        <Button 
          className="bg-amber-500 hover:bg-amber-600 text-white shadow-sm" 
          onClick={handleExport}
        >
          <FileDown className="mr-2 h-4 w-4" />
          Exportar leads
        </Button>
      </div>

      <LeadStatistics />

      <Card className="border-stone-100 shadow-sm overflow-visible">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
            <div>
              <CardTitle className="text-xl">Lista de Leads</CardTitle>
              <CardDescription>Gerencie todos os leads recebidos para sua empresa</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className={cn(
                  "border-stone-200", 
                  viewMode === 'table' && "bg-amber-50 text-amber-600 border-amber-200"
                )}
                onClick={() => setViewMode('table')}
                size="sm"
              >
                Lista
              </Button>
              <Button 
                variant="outline" 
                className={cn(
                  "border-stone-200", 
                  viewMode === 'card' && "bg-amber-50 text-amber-600 border-amber-200"
                )}
                onClick={() => setViewMode('card')}
                size="sm"
              >
                Cards
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-500" />
                <Input
                  placeholder="Buscar por empresa, localização ou contato..."
                  className="pl-9 border-stone-200 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" variant="outline" className="border-stone-200">Buscar</Button>
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2 border-stone-200">
                  <Filter className="h-4 w-4" />
                  {currentFilter ? `Filtro: ${currentFilter}` : "Filtros"}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filtrar por status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem 
                  checked={currentFilter === null}
                  onCheckedChange={() => setCurrentFilter(null)}
                >
                  Todos
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem 
                  checked={currentFilter === 'new'}
                  onCheckedChange={() => setCurrentFilter('new')}
                >
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
                    Novos
                  </span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem 
                  checked={currentFilter === 'contacted'}
                  onCheckedChange={() => setCurrentFilter('contacted')}
                >
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                    Contatados
                  </span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem 
                  checked={currentFilter === 'closed'}
                  onCheckedChange={() => setCurrentFilter('closed')}
                >
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Fechados
                  </span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem 
                  checked={currentFilter === 'lost'}
                  onCheckedChange={() => setCurrentFilter('lost')}
                >
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                    Perdidos
                  </span>
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 mb-4">
                <Search className="h-8 w-8 text-stone-400" />
              </div>
              <h3 className="text-lg font-medium text-stone-800 mb-2">Nenhum lead encontrado</h3>
              <p className="text-stone-600 max-w-md mx-auto">
                Tente ajustar seus filtros de busca ou aguarde novos leads que chegarão em breve.
              </p>
            </div>
          ) : viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLeads.map(lead => renderLeadCard(lead))}
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Status</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Match</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map(lead => (
                    <TableRow key={lead.id} className="hover:bg-stone-50/80">
                      <TableCell>
                        <LeadStatusBadge status={lead.status} />
                      </TableCell>
                      <TableCell className="font-medium">{lead.company}</TableCell>
                      <TableCell>{lead.location}</TableCell>
                      <TableCell>{lead.contact}, {lead.position}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${lead.match > 90 ? 'bg-green-100 text-green-800 border-green-200' : 'bg-amber-100 text-amber-800 border-amber-200'}`}>
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
          )}
        </CardContent>
        
        <div className="flex items-center justify-center p-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" className="hover:text-amber-600" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive className="bg-amber-50 text-amber-600 border-amber-200">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="hover:text-amber-600">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="hover:text-amber-600">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" className="hover:text-amber-600" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
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
