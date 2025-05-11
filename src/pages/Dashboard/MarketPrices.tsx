
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Calendar, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Filter,
  ChevronDown
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Mock data for market prices
const materials = [
  {
    id: 1,
    name: "Mármore Carrara",
    category: "mármore",
    origin: "Itália",
    priceM2: 1850.00,
    trend: "up",
    percentChange: 5.3,
    priceHistory: [
      { date: '2023-01', price: 1720 },
      { date: '2023-02', price: 1740 },
      { date: '2023-03', price: 1770 },
      { date: '2023-04', price: 1800 },
      { date: '2023-05', price: 1830 },
      { date: '2023-06', price: 1850 },
    ]
  },
  {
    id: 2,
    name: "Granito Preto São Gabriel",
    category: "granito",
    origin: "Brasil",
    priceM2: 780.00,
    trend: "stable",
    percentChange: 0.2,
    priceHistory: [
      { date: '2023-01', price: 775 },
      { date: '2023-02', price: 778 },
      { date: '2023-03', price: 782 },
      { date: '2023-04', price: 779 },
      { date: '2023-05', price: 777 },
      { date: '2023-06', price: 780 },
    ]
  },
  {
    id: 3,
    name: "Quartzito Mont Blanc",
    category: "quartzito",
    origin: "Brasil",
    priceM2: 2450.00,
    trend: "up",
    percentChange: 8.7,
    priceHistory: [
      { date: '2023-01', price: 2250 },
      { date: '2023-02', price: 2280 },
      { date: '2023-03', price: 2320 },
      { date: '2023-04', price: 2380 },
      { date: '2023-05', price: 2420 },
      { date: '2023-06', price: 2450 },
    ]
  },
  {
    id: 4,
    name: "Mármore Travertino",
    category: "mármore",
    origin: "Turquia",
    priceM2: 1280.00,
    trend: "down",
    percentChange: -3.2,
    priceHistory: [
      { date: '2023-01', price: 1320 },
      { date: '2023-02', price: 1325 },
      { date: '2023-03', price: 1310 },
      { date: '2023-04', price: 1300 },
      { date: '2023-05', price: 1290 },
      { date: '2023-06', price: 1280 },
    ]
  },
  {
    id: 5,
    name: "Granito Branco Siena",
    category: "granito",
    origin: "Brasil",
    priceM2: 650.00,
    trend: "down",
    percentChange: -2.1,
    priceHistory: [
      { date: '2023-01', price: 670 },
      { date: '2023-02', price: 665 },
      { date: '2023-03', price: 660 },
      { date: '2023-04', price: 655 },
      { date: '2023-05', price: 650 },
      { date: '2023-06', price: 650 },
    ]
  },
  {
    id: 6,
    name: "Quartzito Taj Mahal",
    category: "quartzito",
    origin: "Brasil",
    priceM2: 2180.00,
    trend: "up",
    percentChange: 6.8,
    priceHistory: [
      { date: '2023-01', price: 2040 },
      { date: '2023-02', price: 2070 },
      { date: '2023-03', price: 2110 },
      { date: '2023-04', price: 2130 },
      { date: '2023-05', price: 2160 },
      { date: '2023-06', price: 2180 },
    ]
  },
  {
    id: 7,
    name: "Mármore Crema Marfil",
    category: "mármore",
    origin: "Espanha",
    priceM2: 1580.00,
    trend: "up",
    percentChange: 2.5,
    priceHistory: [
      { date: '2023-01', price: 1540 },
      { date: '2023-02', price: 1550 },
      { date: '2023-03', price: 1560 },
      { date: '2023-04', price: 1570 },
      { date: '2023-05', price: 1575 },
      { date: '2023-06', price: 1580 },
    ]
  },
  {
    id: 8,
    name: "Granito Verde Ubatuba",
    category: "granito",
    origin: "Brasil",
    priceM2: 720.00,
    trend: "stable",
    percentChange: 0.7,
    priceHistory: [
      { date: '2023-01', price: 715 },
      { date: '2023-02', price: 717 },
      { date: '2023-03', price: 718 },
      { date: '2023-04', price: 720 },
      { date: '2023-05', price: 722 },
      { date: '2023-06', price: 720 },
    ]
  },
];

// Material types for filtering
const materialTypes = [
  { value: "all", label: "Todos os tipos" },
  { value: "mármore", label: "Mármores" },
  { value: "granito", label: "Granitos" },
  { value: "quartzito", label: "Quartzitos" },
];

// Origin regions for filtering
const originRegions = [
  { value: "all", label: "Todas as origens" },
  { value: "Brasil", label: "Brasil" },
  { value: "Itália", label: "Itália" },
  { value: "Espanha", label: "Espanha" },
  { value: "Turquia", label: "Turquia" },
  { value: "outros", label: "Outros" }
];

// Price ranges for filtering
const priceRanges = [
  { value: "all", label: "Todas as faixas" },
  { value: "0-1000", label: "Até R$ 1.000/m²" },
  { value: "1000-2000", label: "R$ 1.000 - R$ 2.000/m²" },
  { value: "2000+", label: "Acima de R$ 2.000/m²" }
];

// Time periods for the chart
const timePeriods = [
  { value: "30d", label: "30 dias" },
  { value: "6m", label: "6 meses" },
  { value: "1y", label: "1 ano" }
];

const MarketPrices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [materialFilter, setMaterialFilter] = useState("all");
  const [originFilter, setOriginFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [timePeriod, setTimePeriod] = useState("6m");
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  const filteredMaterials = materials.filter(material => {
    // Search filter
    if (searchTerm && !material.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Material type filter
    if (materialFilter !== "all" && material.category !== materialFilter) {
      return false;
    }
    
    // Origin filter
    if (originFilter !== "all" && material.origin !== originFilter) {
      return false;
    }
    
    // Price range filter
    if (priceFilter !== "all") {
      if (priceFilter === "0-1000" && material.priceM2 > 1000) {
        return false;
      } else if (priceFilter === "1000-2000" && (material.priceM2 < 1000 || material.priceM2 > 2000)) {
        return false;
      } else if (priceFilter === "2000+" && material.priceM2 < 2000) {
        return false;
      }
    }
    
    return true;
  });

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

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });
  };

  return (
    <div className="container mx-auto">
      <div className="space-y-6">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Preço do Mercado</h1>
            <p className="text-stone-500">Acompanhe as tendências de preços das rochas ornamentais</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={theme === "light" ? "default" : "outline"} 
              size="sm"
              onClick={() => setTheme("light")}
              className="w-20"
            >
              Claro
            </Button>
            <Button 
              variant={theme === "dark" ? "default" : "outline"} 
              size="sm"
              onClick={() => setTheme("dark")}
              className="w-20"
            >
              Escuro
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Chart Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className={`overflow-hidden ${theme === 'dark' ? 'bg-stone-900 text-stone-100 border-stone-700' : 'bg-white'}`}>
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className={`text-lg ${theme === 'dark' ? 'text-stone-100' : ''}`}>
                        {selectedMaterial.name}
                      </CardTitle>
                      <CardDescription className={theme === 'dark' ? 'text-stone-400' : ''}>
                        {selectedMaterial.category.charAt(0).toUpperCase() + selectedMaterial.category.slice(1)} • {selectedMaterial.origin}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Tabs defaultValue={timePeriod} className="w-full">
                        <TabsList className={`h-8 ${theme === 'dark' ? 'bg-stone-800' : ''}`}>
                          {timePeriods.map(period => (
                            <TabsTrigger 
                              key={period.value} 
                              value={period.value} 
                              className={`text-xs ${theme === 'dark' ? 'data-[state=active]:bg-stone-700 data-[state=active]:text-stone-100' : ''}`}
                              onClick={() => setTimePeriod(period.value)}
                            >
                              {period.label}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-stone-500">Preço Atual</div>
                      <div className="text-3xl font-bold">
                        {formatCurrency(selectedMaterial.priceM2)}<span className="text-sm font-normal">/m²</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {selectedMaterial.trend === 'up' ? (
                        <Badge className="flex items-center gap-1 bg-green-100 text-green-700 hover:bg-green-100">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                          +{selectedMaterial.percentChange}%
                        </Badge>
                      ) : selectedMaterial.trend === 'down' ? (
                        <Badge className="flex items-center gap-1 bg-red-100 text-red-700 hover:bg-red-100">
                          <ArrowDownRight className="h-3.5 w-3.5" />
                          {selectedMaterial.percentChange}%
                        </Badge>
                      ) : (
                        <Badge className="flex items-center gap-1 bg-stone-100 text-stone-700 hover:bg-stone-100">
                          {selectedMaterial.percentChange}%
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={selectedMaterial.priceHistory}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid 
                          strokeDasharray="3 3" 
                          stroke={theme === 'dark' ? '#525252' : '#e5e5e5'} 
                        />
                        <XAxis 
                          dataKey="date" 
                          stroke={theme === 'dark' ? '#a8a29e' : '#78716c'}
                        />
                        <YAxis 
                          stroke={theme === 'dark' ? '#a8a29e' : '#78716c'}
                          tickFormatter={(value) => `R$${value}`} 
                        />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: theme === 'dark' ? '#292524' : 'white',
                            borderColor: theme === 'dark' ? '#525252' : '#e5e5e5',
                            color: theme === 'dark' ? 'white' : 'black'
                          }}
                          formatter={(value: number) => [formatCurrency(value), "Preço"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke="#f9802d"
                          strokeWidth={2}
                          dot={{ fill: '#f9802d', r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className={`pt-3 border-t text-xs ${theme === 'dark' ? 'border-stone-700 text-stone-400' : 'text-stone-500'}`}>
                  <div className="flex items-center gap-1">
                    <Info className="h-3.5 w-3.5" />
                    <span>Dados atualizados em 01/05/2023. Fonte: Associação Brasileira da Indústria de Rochas Ornamentais</span>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Price Comparison Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className={theme === 'dark' ? 'bg-stone-900 text-stone-100 border-stone-700' : 'bg-white'}>
                <CardHeader>
                  <CardTitle className={`text-lg flex items-center gap-2 ${theme === 'dark' ? 'text-stone-100' : ''}`}>
                    <DollarSign className="h-5 w-5 text-amber-500" /> 
                    Comparativo de Preços
                  </CardTitle>
                  <CardDescription className={theme === 'dark' ? 'text-stone-400' : ''}>
                    Preços médios por categoria de material
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['mármore', 'granito', 'quartzito'].map((category) => {
                      const categoryMaterials = materials.filter(m => m.category === category);
                      const avgPrice = categoryMaterials.reduce((acc, curr) => acc + curr.priceM2, 0) / categoryMaterials.length;
                      
                      return (
                        <Card key={category} className={`shadow-none border ${theme === 'dark' ? 'bg-stone-800 border-stone-700' : 'bg-stone-50 border-stone-100'}`}>
                          <CardHeader className="pb-2 pt-4">
                            <CardTitle className={`text-base capitalize ${theme === 'dark' ? 'text-stone-100' : ''}`}>
                              {category}s
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(avgPrice)}</div>
                            <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>
                              Preço médio por m²
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Materials List Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <Card className={theme === 'dark' ? 'bg-stone-900 text-stone-100 border-stone-700' : 'bg-white'}>
              <CardHeader className="pb-3">
                <CardTitle className={`text-lg flex items-center justify-between ${theme === 'dark' ? 'text-stone-100' : ''}`}>
                  <span>Materiais</span>
                  <Badge className="text-xs bg-stone-100 text-stone-700 hover:bg-stone-100">
                    {filteredMaterials.length} itens
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Search and filters */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                  <Input
                    placeholder="Buscar material..."
                    className={`pl-9 ${theme === 'dark' ? 'bg-stone-800 border-stone-700 text-stone-100' : 'bg-white'}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-stone-300' : 'text-stone-700'}`}>Filtros</span>
                    {(materialFilter !== "all" || originFilter !== "all" || priceFilter !== "all") && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`text-xs h-7 px-2 ${theme === 'dark' ? 'text-stone-400 hover:text-stone-100 hover:bg-stone-800' : ''}`}
                        onClick={() => {
                          setMaterialFilter("all");
                          setOriginFilter("all");
                          setPriceFilter("all");
                        }}
                      >
                        Limpar todos
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Select 
                      value={materialFilter} 
                      onValueChange={setMaterialFilter}
                    >
                      <SelectTrigger className={theme === 'dark' ? 'bg-stone-800 border-stone-700 text-stone-100' : 'bg-white'}>
                        <SelectValue placeholder="Tipo de material" />
                      </SelectTrigger>
                      <SelectContent className={theme === 'dark' ? 'bg-stone-800 border-stone-700 text-stone-100' : ''}>
                        {materialTypes.map(type => (
                          <SelectItem 
                            key={type.value} 
                            value={type.value}
                            className={theme === 'dark' ? 'focus:bg-stone-700 focus:text-stone-100' : ''}
                          >
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select 
                      value={originFilter} 
                      onValueChange={setOriginFilter}
                    >
                      <SelectTrigger className={theme === 'dark' ? 'bg-stone-800 border-stone-700 text-stone-100' : 'bg-white'}>
                        <SelectValue placeholder="Origem" />
                      </SelectTrigger>
                      <SelectContent className={theme === 'dark' ? 'bg-stone-800 border-stone-700 text-stone-100' : ''}>
                        {originRegions.map(region => (
                          <SelectItem 
                            key={region.value} 
                            value={region.value}
                            className={theme === 'dark' ? 'focus:bg-stone-700 focus:text-stone-100' : ''}
                          >
                            {region.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select 
                      value={priceFilter} 
                      onValueChange={setPriceFilter}
                    >
                      <SelectTrigger className={theme === 'dark' ? 'bg-stone-800 border-stone-700 text-stone-100' : 'bg-white'}>
                        <SelectValue placeholder="Faixa de preço" />
                      </SelectTrigger>
                      <SelectContent className={theme === 'dark' ? 'bg-stone-800 border-stone-700 text-stone-100' : ''}>
                        {priceRanges.map(range => (
                          <SelectItem 
                            key={range.value} 
                            value={range.value}
                            className={theme === 'dark' ? 'focus:bg-stone-700 focus:text-stone-100' : ''}
                          >
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Materials list */}
                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {filteredMaterials.length > 0 ? (
                    filteredMaterials.map((material) => (
                      <div 
                        key={material.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedMaterial.id === material.id 
                            ? theme === 'dark' 
                              ? 'bg-stone-700 text-stone-100' 
                              : 'bg-amber-50 border border-amber-200'
                            : theme === 'dark'
                              ? 'bg-stone-800 hover:bg-stone-700 text-stone-100'
                              : 'bg-stone-50 hover:bg-stone-100 border border-transparent'
                        }`}
                        onClick={() => setSelectedMaterial(material)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-medium ${theme === 'dark' ? 'text-stone-100' : ''}`}>{material.name}</h3>
                          <Badge
                            className={`${
                              material.trend === 'up'
                                ? 'bg-green-100 text-green-700'
                                : material.trend === 'down'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-stone-100 text-stone-700'
                            } text-xs`}
                          >
                            {material.trend === 'up' ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : material.trend === 'down' ? (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            ) : null}
                            {material.trend === 'up' ? '+' : ''}{material.percentChange}%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className={`text-xs ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>
                            <span className="capitalize">{material.category}</span> • {material.origin}
                          </div>
                          <div className="font-semibold">{formatCurrency(material.priceM2)}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={`p-6 text-center rounded-lg ${theme === 'dark' ? 'bg-stone-800 text-stone-400' : 'bg-stone-50 text-stone-500'}`}>
                      <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Nenhum material encontrado com os filtros selecionados.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Help Card */}
            <Card className={theme === 'dark' ? 'bg-stone-900 text-stone-100 border-stone-700' : 'bg-white'}>
              <CardHeader className="pb-3">
                <CardTitle className={`text-lg ${theme === 'dark' ? 'text-stone-100' : ''}`}>
                  Sobre os dados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-sm space-y-3 ${theme === 'dark' ? 'text-stone-300' : 'text-stone-700'}`}>
                  <p>
                    Os preços apresentados são valores médios de mercado, obtidos através de pesquisas com fornecedores e associações do setor.
                  </p>
                  <p>
                    Fatores como qualidade do material, espessura, acabamento e região podem influenciar no preço final.
                  </p>
                  <p>
                    Última atualização: 01/05/2023
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className={`w-full ${theme === 'dark' ? 'border-stone-700 text-stone-300 hover:bg-stone-800' : ''}`}
                >
                  <Info className="h-4 w-4 mr-2" />
                  Solicitar informações detalhadas
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;
