
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Star, Store, Building, Phone, Mail, ChevronDown } from "lucide-react";

// Mock data for marketplace companies
const companies = [
  {
    id: 1,
    name: "Marmoraria Elite",
    logo: "",
    initials: "ME",
    type: "marmoraria",
    location: "São Paulo, SP",
    rating: 4.8,
    reviewCount: 56,
    description: "Especializada em mármores importados e nacionais com acabamentos personalizados.",
    highlights: ["Mármores importados", "Entrega para todo Brasil", "Atendimento personalizado"],
    phone: "(11) 3456-7890",
    email: "contato@marmorariaelite.com",
    website: "marmorariaelite.com",
    verified: true,
    premium: true
  },
  {
    id: 2,
    name: "Galpão das Pedras",
    logo: "",
    initials: "GP",
    type: "galpão",
    location: "Cachoeiro de Itapemirim, ES",
    rating: 4.5,
    reviewCount: 32,
    description: "Grande variedade de pedras ornamentais em chapas brutas e beneficiadas.",
    highlights: ["Venda no atacado", "Chapas brutas", "Preços direto da fábrica"],
    phone: "(28) 3522-7890",
    email: "vendas@galpaodaspedras.com",
    website: "galpaodaspedras.com",
    verified: true,
    premium: false
  },
  {
    id: 3,
    name: "Serraria Nova Era",
    logo: "",
    initials: "SN",
    type: "serraria",
    location: "Belo Horizonte, MG",
    rating: 4.7,
    reviewCount: 41,
    description: "Serraria completa com equipamentos de última geração para cortes precisos.",
    highlights: ["Tecnologia italiana", "Atendimento 24h", "Entregas expressas"],
    phone: "(31) 3333-4444",
    email: "contato@serrariane.com",
    website: "serrariane.com",
    verified: true,
    premium: true
  },
  {
    id: 4,
    name: "Quartzito & Cia",
    logo: "",
    initials: "QC",
    type: "marmoraria",
    location: "Porto Alegre, RS",
    rating: 4.2,
    reviewCount: 28,
    description: "Especialistas em quartzitos e materiais exóticos para bancadas e revestimentos.",
    highlights: ["Materiais exclusivos", "Projetos personalizados", "Garantia estendida"],
    phone: "(51) 3222-1111",
    email: "vendas@quartzitocia.com",
    website: "quartzitocia.com",
    verified: true,
    premium: false
  },
  {
    id: 5,
    name: "Granito Total",
    logo: "",
    initials: "GT",
    type: "galpão",
    location: "Recife, PE",
    rating: 4.6,
    reviewCount: 37,
    description: "Maior distribuidor de granitos do Nordeste com entrega para todo o país.",
    highlights: ["Melhor preço", "Granitos exclusivos", "Exportação"],
    phone: "(81) 3566-7890",
    email: "comercial@granitototal.com",
    website: "granitototal.com",
    verified: false,
    premium: false
  },
];

const companyTypes = [
  { value: 'all', label: 'Todos' },
  { value: 'marmoraria', label: 'Marmorarias' },
  { value: 'galpão', label: 'Galpões' },
  { value: 'serraria', label: 'Serrarias' },
  { value: 'distribuidora', label: 'Distribuidoras' },
  { value: 'outros', label: 'Outros' }
];

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [selectedCompany, setSelectedCompany] = useState<typeof companies[0] | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);

  useEffect(() => {
    let results = companies;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply type filter
    if (activeFilter !== 'all') {
      results = results.filter(company => company.type === activeFilter);
    }
    
    setFilteredCompanies(results);
  }, [searchTerm, activeFilter]);

  const handleSelectCompany = (company: typeof companies[0]) => {
    setSelectedCompany(company);
    setIsDetailView(true);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setIsDetailView(false);
    setSelectedCompany(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="container mx-auto">
      {!isDetailView ? (
        <div className="space-y-6">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
              <p className="text-stone-500">Encontre os melhores fornecedores e parceiros para seus projetos</p>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
              <Input
                placeholder="Buscar empresas ou locais..."
                className="pl-9 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>

          <div className="flex overflow-x-auto pb-2">
            <Tabs defaultValue={activeFilter} className="w-full">
              <TabsList className="w-full sm:w-auto inline-flex justify-start h-10 p-1">
                {companyTypes.map(type => (
                  <TabsTrigger 
                    key={type.value} 
                    value={type.value}
                    className="px-3 whitespace-nowrap"
                    onClick={() => setActiveFilter(type.value)}
                  >
                    {type.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {filteredCompanies.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredCompanies.map((company) => (
                <motion.div key={company.id} variants={itemVariants}>
                  <Card 
                    className="h-full transition-all duration-200 hover:shadow-md cursor-pointer"
                    onClick={() => handleSelectCompany(company)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <Avatar className={`h-10 w-10 border ${company.premium ? 'border-amber-300' : 'border-stone-200'}`}>
                            {company.logo ? (
                              <AvatarImage src={company.logo} alt={company.name} />
                            ) : (
                              <AvatarFallback className={`${company.premium ? 'bg-amber-50 text-amber-700' : 'bg-stone-100 text-stone-600'}`}>
                                {company.initials}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <CardTitle className="text-base flex items-center">
                              {company.name}
                              {company.verified && (
                                <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 text-xs">Verificada</Badge>
                              )}
                            </CardTitle>
                            <CardDescription className="flex items-center text-xs">
                              <MapPin className="h-3 w-3 mr-1" />
                              {company.location}
                            </CardDescription>
                          </div>
                        </div>
                        {company.premium && (
                          <Badge className="bg-amber-500">Premium</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="flex items-center text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${i < Math.floor(company.rating) ? 'fill-amber-500' : 'fill-none'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-stone-500 ml-1">
                          ({company.rating}) · {company.reviewCount} avaliações
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-sm text-stone-600 line-clamp-2">{company.description}</p>
                    </CardContent>
                    <CardFooter className="pt-0 flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs bg-stone-50">
                        {
                          company.type === 'marmoraria' ? <Store className="h-3 w-3 mr-1" /> :
                          company.type === 'galpão' ? <Building className="h-3 w-3 mr-1" /> :
                          <Store className="h-3 w-3 mr-1" />
                        }
                        {company.type === 'marmoraria' ? 'Marmoraria' :
                         company.type === 'galpão' ? 'Galpão' :
                         company.type === 'serraria' ? 'Serraria' : company.type}
                      </Badge>
                      {company.highlights.slice(0, 2).map((highlight, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-stone-50">
                          {highlight}
                        </Badge>
                      ))}
                      {company.highlights.length > 2 && (
                        <Badge variant="outline" className="text-xs bg-stone-50">
                          +{company.highlights.length - 2}
                        </Badge>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <Card className="py-12 flex flex-col items-center justify-center bg-stone-50/50">
              <CardContent className="text-center space-y-4">
                <div className="mx-auto bg-amber-100 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                  <Store className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-medium">Nenhuma empresa encontrada</h3>
                <p className="text-stone-500 text-sm max-w-md">
                  Não encontramos empresas com os filtros selecionados. Tente mudar os filtros ou a busca.
                </p>
                <Button onClick={() => {setSearchTerm(''); setActiveFilter('all');}}>
                  Limpar filtros
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      ) : selectedCompany ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" onClick={handleBackToList} className="p-2">
              <ChevronDown className="h-4 w-4 rotate-90" />
              <span className="ml-1">Voltar</span>
            </Button>
            <div className="h-6 w-px bg-stone-200"></div>
            <h2 className="text-lg font-medium">Detalhes da Empresa</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <Avatar className={`h-16 w-16 border-2 ${selectedCompany.premium ? 'border-amber-300' : 'border-stone-200'}`}>
                      {selectedCompany.logo ? (
                        <AvatarImage src={selectedCompany.logo} alt={selectedCompany.name} />
                      ) : (
                        <AvatarFallback className={`text-xl ${selectedCompany.premium ? 'bg-amber-50 text-amber-700' : 'bg-stone-100 text-stone-600'}`}>
                          {selectedCompany.initials}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="text-xl">{selectedCompany.name}</CardTitle>
                        {selectedCompany.verified && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">Verificada</Badge>
                        )}
                        {selectedCompany.premium && (
                          <Badge className="bg-amber-500">Premium</Badge>
                        )}
                      </div>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedCompany.location}
                      </CardDescription>
                    </div>
                    <div className="flex items-center bg-stone-50 px-4 py-2 rounded-lg">
                      <div>
                        <div className="flex items-center gap-1 justify-center">
                          <span className="text-lg font-bold">{selectedCompany.rating}</span>
                          <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                        </div>
                        <div className="text-xs text-stone-500 text-center">
                          {selectedCompany.reviewCount} avaliações
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-700">{selectedCompany.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-sm bg-stone-50">
                      {
                        selectedCompany.type === 'marmoraria' ? <Store className="h-3.5 w-3.5 mr-1" /> :
                        selectedCompany.type === 'galpão' ? <Building className="h-3.5 w-3.5 mr-1" /> :
                        <Store className="h-3.5 w-3.5 mr-1" />
                      }
                      {selectedCompany.type === 'marmoraria' ? 'Marmoraria' :
                       selectedCompany.type === 'galpão' ? 'Galpão' :
                       selectedCompany.type === 'serraria' ? 'Serraria' : selectedCompany.type}
                    </Badge>
                    {selectedCompany.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="outline" className="text-sm bg-stone-50">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3 border-t pt-4">
                  <Button className="w-full sm:w-auto">
                    <Phone className="h-4 w-4 mr-2" />
                    Entrar em contato
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar mensagem
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Materials Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Materiais em destaque</CardTitle>
                  <CardDescription>Principais materiais comercializados por esta empresa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="aspect-square bg-stone-100 rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                          Material {item}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Reviews Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Avaliações</CardTitle>
                  <CardDescription>O que nossos usuários dizem sobre esta empresa</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b pb-4 last:border-0">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-stone-100 text-stone-600 text-xs">
                                U{review}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">Usuário {review}</p>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < 5 - review % 2 ? 'fill-amber-500 text-amber-500' : 'fill-stone-200 text-stone-200'}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-stone-400">{review * 5} dias atrás</span>
                        </div>
                        <p className="text-sm text-stone-600">
                          {review === 1 ? 
                            "Excelente atendimento e qualidade de materiais. Recomendo fortemente para projetos de alto padrão." :
                            review === 2 ? 
                            "Bom atendimento, materiais dentro do esperado. Entrega demorou um pouco mais que o previsto." :
                            "Profissionais muito atenciosos e preços competitivos. Voltarei a fazer negócios com certeza."
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="w-full">Ver todas as {selectedCompany.reviewCount} avaliações</Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar with contact and info */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Informações de contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-stone-400" />
                      <span>{selectedCompany.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-stone-400" />
                      <span>{selectedCompany.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-stone-400" />
                      <a href={`https://${selectedCompany.website}`} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">
                        {selectedCompany.website}
                      </a>
                    </div>
                  </div>
                  <div className="h-40 bg-stone-100 rounded-lg flex items-center justify-center">
                    <p className="text-stone-400">Mapa de localização</p>
                  </div>
                </CardContent>
              </Card>
              
              {selectedCompany.premium && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Histórico de compras</CardTitle>
                    <CardDescription>Disponível para usuários premium</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[1, 2, 3].map((purchase) => (
                      <div key={purchase} className="bg-stone-50 p-3 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-sm">Pedido #{1000 + purchase}</span>
                          <span className="text-xs text-stone-500">{purchase * 10} dias atrás</span>
                        </div>
                        <p className="text-xs text-stone-600">
                          {purchase === 1 ? "45m² de Mármore Carrara" :
                           purchase === 2 ? "30m² de Granito Preto São Gabriel" :
                           "20m² de Quartzito Mont Blanc"}
                        </p>
                      </div>
                    ))}
                    <Button variant="link" className="w-full">Ver histórico completo</Button>
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Empresas similares</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {companies
                    .filter(c => c.id !== selectedCompany.id && c.type === selectedCompany.type)
                    .slice(0, 3)
                    .map((company) => (
                      <div 
                        key={company.id} 
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-stone-50 cursor-pointer"
                        onClick={() => handleSelectCompany(company)}
                      >
                        <Avatar className="h-8 w-8">
                          {company.logo ? (
                            <AvatarImage src={company.logo} alt={company.name} />
                          ) : (
                            <AvatarFallback className="bg-stone-100 text-stone-600">
                              {company.initials}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{company.name}</p>
                          <div className="flex items-center text-xs text-stone-500">
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500 mr-1" />
                            {company.rating}
                          </div>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
};

// Helper component for the globe icon
const Globe = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default Marketplace;
