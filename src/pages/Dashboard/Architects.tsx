
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Star, Briefcase, Phone, Mail, ChevronDown, User, Calendar, GraduationCap } from "lucide-react";

// Mock data for architects
const architects = [
  {
    id: 1,
    name: "Marina Santos",
    photo: "",
    initials: "MS",
    location: "São Paulo, SP",
    experience: 12,
    specialties: ["Arquitetura residencial", "Design de interiores"],
    rating: 4.9,
    reviewCount: 48,
    description: "Arquiteta com vasta experiência em projetos residenciais de alto padrão e especificações técnicas de materiais nobres.",
    currentCompany: "Studio Arquitetura Premium",
    education: "Universidade de São Paulo (USP)",
    age: 38,
    phone: "(11) 98765-4321",
    email: "marina@studioarquitetura.com",
    projects: [
      { name: "Residência Jardins", type: "Residencial", year: 2022 },
      { name: "Casa de Praia Guarujá", type: "Residencial", year: 2021 },
      { name: "Apartamento Jardim Europa", type: "Residencial", year: 2020 },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    ],
    verified: true,
  },
  {
    id: 2,
    name: "Rafael Mendonça",
    photo: "",
    initials: "RM",
    location: "Rio de Janeiro, RJ",
    experience: 8,
    specialties: ["Comercial", "Hotelaria"],
    rating: 4.7,
    reviewCount: 32,
    description: "Especialista em projetos comerciais e hoteleiros com foco em sustentabilidade e materiais naturais.",
    currentCompany: "Arquitetura Comercial RJ",
    education: "PUC-Rio",
    age: 35,
    phone: "(21) 99876-5432",
    email: "rafael@arquiteturacomercial.com",
    projects: [
      { name: "Hotel Barra da Tijuca", type: "Hotelaria", year: 2022 },
      { name: "Restaurante Gávea", type: "Comercial", year: 2021 },
      { name: "Escritório Centro RJ", type: "Comercial", year: 2020 },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudCUyMGRlc2lnbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    ],
    verified: true,
  },
  {
    id: 3,
    name: "Camila Rocha",
    photo: "",
    initials: "CR",
    location: "Belo Horizonte, MG",
    experience: 5,
    specialties: ["Paisagismo", "Sustentabilidade"],
    rating: 4.5,
    reviewCount: 18,
    description: "Arquiteta com foco em projetos sustentáveis e integração com a natureza utilizando materiais locais.",
    currentCompany: "Verde Projetos",
    education: "UFMG",
    age: 32,
    phone: "(31) 98745-6321",
    email: "camila@verdeprojetos.com",
    projects: [
      { name: "Praça Central Nova Lima", type: "Paisagismo", year: 2022 },
      { name: "Casa Sustentável Serra", type: "Residencial", year: 2021 },
      { name: "Jardim Corporativo", type: "Comercial", year: 2020 },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1626863905121-3b0649a3a4b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGxhbmRzY2FwZSUyMGRlc2lnbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3VzdGFpbmFibGUlMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29ycG9yYXRlJTIwZ2FyZGVufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    ],
    verified: false,
  },
  {
    id: 4,
    name: "Lucas Oliveira",
    photo: "",
    initials: "LO",
    location: "Curitiba, PR",
    experience: 15,
    specialties: ["Restauro", "Patrimônio histórico"],
    rating: 4.8,
    reviewCount: 42,
    description: "Especializado em restauração e preservação de patrimônio histórico com técnicas tradicionais e contemporâneas.",
    currentCompany: "Restaura Arquitetura",
    education: "UFPR",
    age: 45,
    phone: "(41) 98765-1234",
    email: "lucas@restaurarq.com",
    projects: [
      { name: "Casarão Centro Histórico", type: "Restauro", year: 2022 },
      { name: "Teatro Municipal", type: "Restauro", year: 2020 },
      { name: "Museu da Cidade", type: "Restauro", year: 2019 },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1577058761439-1ad3ed77f115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGlzdG9yaWMlMjBidWlsZGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1563341591-ad0a750911cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGhlYXRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1580285249903-3e1a89198973?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzZXVtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    ],
    verified: true,
  },
  {
    id: 5,
    name: "Fernanda Lima",
    photo: "",
    initials: "FL",
    location: "Salvador, BA",
    experience: 7,
    specialties: ["Arquitetura tropical", "Projetos turísticos"],
    rating: 4.6,
    reviewCount: 26,
    description: "Arquiteta com projetos que integram a arquitetura contemporânea com elementos da cultura regional.",
    currentCompany: "F.Lima Arquitetura",
    education: "UFBA",
    age: 34,
    phone: "(71) 99876-5432",
    email: "fernanda@flima.arq.br",
    projects: [
      { name: "Pousada Praia do Forte", type: "Hotelaria", year: 2021 },
      { name: "Casa Itapuã", type: "Residencial", year: 2020 },
      { name: "Centro Cultural Pelourinho", type: "Cultural", year: 2019 },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVhY2glMjBob3RlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dHJvcGljYWwlMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1594388437493-9febb5f394e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y3VsdHVyYWwlMjBjZW50ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    ],
    verified: false,
  }
];

// Regions for filtering
const regions = [
  { value: "all", label: "Todas as regiões" },
  { value: "SP", label: "São Paulo" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PR", label: "Paraná" },
  { value: "BA", label: "Bahia" },
  { value: "other", label: "Outras regiões" }
];

// Specialties for filtering
const specialties = [
  { value: "all", label: "Todas as especialidades" },
  { value: "Arquitetura residencial", label: "Arquitetura residencial" },
  { value: "Design de interiores", label: "Design de interiores" },
  { value: "Comercial", label: "Comercial" },
  { value: "Hotelaria", label: "Hotelaria" },
  { value: "Paisagismo", label: "Paisagismo" },
  { value: "Sustentabilidade", label: "Sustentabilidade" },
  { value: "Restauro", label: "Restauro" },
  { value: "Patrimônio histórico", label: "Patrimônio histórico" },
  { value: "Arquitetura tropical", label: "Arquitetura tropical" },
  { value: "Projetos turísticos", label: "Projetos turísticos" }
];

// Experience levels for filtering
const experienceLevels = [
  { value: "all", label: "Qualquer experiência" },
  { value: "0-5", label: "0-5 anos" },
  { value: "6-10", label: "6-10 anos" },
  { value: "11+", label: "11+ anos" }
];

const Architects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [filteredArchitects, setFilteredArchitects] = useState(architects);
  const [selectedArchitect, setSelectedArchitect] = useState<typeof architects[0] | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);

  useEffect(() => {
    let results = architects;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(architect => 
        architect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        architect.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply region filter
    if (regionFilter !== 'all') {
      results = results.filter(architect => architect.location.includes(regionFilter));
    }
    
    // Apply specialty filter
    if (specialtyFilter !== 'all') {
      results = results.filter(architect => 
        architect.specialties.some(specialty => specialty === specialtyFilter)
      );
    }
    
    // Apply experience filter
    if (experienceFilter !== 'all') {
      if (experienceFilter === '0-5') {
        results = results.filter(architect => architect.experience <= 5);
      } else if (experienceFilter === '6-10') {
        results = results.filter(architect => architect.experience > 5 && architect.experience <= 10);
      } else if (experienceFilter === '11+') {
        results = results.filter(architect => architect.experience > 10);
      }
    }
    
    setFilteredArchitects(results);
  }, [searchTerm, regionFilter, specialtyFilter, experienceFilter]);

  const handleSelectArchitect = (architect: typeof architects[0]) => {
    setSelectedArchitect(architect);
    setIsDetailView(true);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setIsDetailView(false);
    setSelectedArchitect(null);
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
              <h1 className="text-3xl font-bold mb-2">Arquitetos</h1>
              <p className="text-stone-500">Encontre os melhores profissionais de arquitetura para seus projetos</p>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
              <Input
                placeholder="Buscar por nome ou local..."
                className="pl-9 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select 
              value={regionFilter} 
              onValueChange={setRegionFilter}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Filtrar por região" />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={specialtyFilter} 
              onValueChange={setSpecialtyFilter}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Filtrar por especialidade" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map(specialty => (
                  <SelectItem key={specialty.value} value={specialty.value}>
                    {specialty.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={experienceFilter} 
              onValueChange={setExperienceFilter}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Filtrar por experiência" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map(level => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filteredArchitects.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredArchitects.map((architect) => (
                <motion.div key={architect.id} variants={itemVariants}>
                  <Card 
                    className="h-full transition-all duration-200 hover:shadow-md cursor-pointer"
                    onClick={() => handleSelectArchitect(architect)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border border-stone-200">
                            {architect.photo ? (
                              <AvatarImage src={architect.photo} alt={architect.name} />
                            ) : (
                              <AvatarFallback className="bg-stone-100 text-stone-600">
                                {architect.initials}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{architect.name}</CardTitle>
                            <CardDescription className="flex items-center text-xs">
                              <MapPin className="h-3 w-3 mr-1" />
                              {architect.location}
                            </CardDescription>
                          </div>
                        </div>
                        {architect.verified && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                            Verificado
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-stone-50 text-stone-700">
                          <Briefcase className="h-3 w-3 mr-1" /> {architect.experience} anos
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                          <span className="text-sm font-medium">{architect.rating}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-sm text-stone-600 line-clamp-3">{architect.description}</p>
                    </CardContent>
                    <CardFooter className="pt-3 border-t flex-wrap gap-2">
                      {architect.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-stone-50">
                          {specialty}
                        </Badge>
                      ))}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <Card className="py-12 flex flex-col items-center justify-center bg-stone-50/50">
              <CardContent className="text-center space-y-4">
                <div className="mx-auto bg-amber-100 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                  <User className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-medium">Nenhum arquiteto encontrado</h3>
                <p className="text-stone-500 text-sm max-w-md">
                  Não encontramos arquitetos com os filtros selecionados. Tente mudar os filtros ou a busca.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setRegionFilter('all');
                    setSpecialtyFilter('all');
                    setExperienceFilter('all');
                  }}
                >
                  Limpar filtros
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      ) : selectedArchitect ? (
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
            <h2 className="text-lg font-medium">Perfil do Arquiteto</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Header */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-stone-200">
                      {selectedArchitect.photo ? (
                        <AvatarImage src={selectedArchitect.photo} alt={selectedArchitect.name} />
                      ) : (
                        <AvatarFallback className="text-xl bg-stone-100 text-stone-600">
                          {selectedArchitect.initials}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="text-xl">{selectedArchitect.name}</CardTitle>
                        {selectedArchitect.verified && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">Verificado</Badge>
                        )}
                      </div>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedArchitect.location}
                      </CardDescription>
                    </div>
                    <div className="flex items-center bg-stone-50 px-4 py-2 rounded-lg">
                      <div>
                        <div className="flex items-center gap-1 justify-center">
                          <span className="text-lg font-bold">{selectedArchitect.rating}</span>
                          <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                        </div>
                        <div className="text-xs text-stone-500 text-center">
                          {selectedArchitect.reviewCount} avaliações
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-stone-50 text-stone-700">
                      <Briefcase className="h-3.5 w-3.5 mr-1" /> 
                      {selectedArchitect.experience} anos de experiência
                    </Badge>
                    <Badge variant="outline" className="bg-stone-50 text-stone-700">
                      <Calendar className="h-3.5 w-3.5 mr-1" /> 
                      {selectedArchitect.age} anos
                    </Badge>
                    <Badge variant="outline" className="bg-stone-50 text-stone-700">
                      <GraduationCap className="h-3.5 w-3.5 mr-1" /> 
                      {selectedArchitect.education}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Sobre</h3>
                    <p className="text-stone-700">{selectedArchitect.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Especialidades</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedArchitect.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="bg-stone-50">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Empresa atual</h3>
                    <p className="text-stone-700">{selectedArchitect.currentCompany}</p>
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
              
              {/* Project Gallery */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Projetos</CardTitle>
                  <CardDescription>Trabalhos recentes do arquiteto</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {selectedArchitect.projects.map((project, index) => (
                      <div key={project.name} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{project.name}</h3>
                          <Badge variant="outline" className="bg-stone-50">
                            {project.year}
                          </Badge>
                        </div>
                        <p className="text-sm text-stone-500">{project.type}</p>
                        {selectedArchitect.gallery[index] && (
                          <div className="aspect-video bg-stone-100 rounded-lg overflow-hidden">
                            <img 
                              src={selectedArchitect.gallery[index]} 
                              alt={project.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Reviews */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Avaliações</CardTitle>
                  <CardDescription>O que clientes dizem sobre {selectedArchitect.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b pb-4 last:border-0">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-stone-100 text-stone-600 text-xs">
                                C{review}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">Cliente {review}</p>
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
                          <span className="text-xs text-stone-400">{review * 3} meses atrás</span>
                        </div>
                        <p className="text-sm text-stone-600">
                          {review === 1 ? 
                            "Profissional extremamente competente e comprometida. O projeto ficou exatamente como eu imaginava." :
                            review === 2 ? 
                            "Ótima arquiteta, soube entender nossas necessidades e entregar um projeto funcional e bonito." :
                            "Conhecimento técnico impressionante, especialmente na escolha dos materiais. Recomendo!"
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="w-full">Ver todas as {selectedArchitect.reviewCount} avaliações</Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Informações de contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-stone-400" />
                      <span>{selectedArchitect.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-stone-400" />
                      <span>{selectedArchitect.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-stone-400" />
                      <span>{selectedArchitect.location}</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Ligar agora
                  </Button>
                  <Button variant="outline" className="w-full">Adicionar aos favoritos</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Arquitetos similares</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {architects
                    .filter(a => a.id !== selectedArchitect.id)
                    .slice(0, 3)
                    .map((architect) => (
                      <div 
                        key={architect.id} 
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-stone-50 cursor-pointer"
                        onClick={() => handleSelectArchitect(architect)}
                      >
                        <Avatar className="h-8 w-8">
                          {architect.photo ? (
                            <AvatarImage src={architect.photo} alt={architect.name} />
                          ) : (
                            <AvatarFallback className="bg-stone-100 text-stone-600">
                              {architect.initials}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{architect.name}</p>
                          <div className="flex items-center text-xs text-stone-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {architect.location}
                          </div>
                        </div>
                        <div className="flex items-center text-amber-500">
                          <Star className="h-3.5 w-3.5 fill-amber-500" />
                          <span className="text-xs font-medium ml-0.5">{architect.rating}</span>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Empresas parceiras</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-stone-500 mb-3">
                    Empresas que já trabalharam com {selectedArchitect.name}
                  </p>
                  <div className="space-y-2">
                    {['Marmoraria Elite', 'Granittos Premium', 'Serraria São Paulo'].map((company, idx) => (
                      <div key={idx} className="bg-stone-50 p-2 rounded-md text-sm">
                        {company}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default Architects;
