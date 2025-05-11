
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
  ChevronDown,
  BarChart4,
  LineChart
} from "lucide-react";
import { 
  LineChart as RechartsLineChart,
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
  AreaChart,
  ComposedChart,
  Cell
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
      { date: '01/2023', price: 1720, open: 1700, high: 1750, low: 1690, close: 1720 },
      { date: '02/2023', price: 1740, open: 1720, high: 1760, low: 1710, close: 1740 },
      { date: '03/2023', price: 1770, open: 1740, high: 1790, low: 1730, close: 1770 },
      { date: '04/2023', price: 1800, open: 1770, high: 1820, low: 1760, close: 1800 },
      { date: '05/2023', price: 1830, open: 1800, high: 1850, low: 1790, close: 1830 },
      { date: '06/2023', price: 1850, open: 1830, high: 1880, low: 1820, close: 1850 },
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
      { date: '01/2023', price: 775, open: 770, high: 780, low: 768, close: 775 },
      { date: '02/2023', price: 778, open: 775, high: 785, low: 770, close: 778 },
      { date: '03/2023', price: 782, open: 778, high: 790, low: 775, close: 782 },
      { date: '04/2023', price: 779, open: 782, high: 785, low: 775, close: 779 },
      { date: '05/2023', price: 777, open: 779, high: 780, low: 770, close: 777 },
      { date: '06/2023', price: 780, open: 777, high: 785, low: 775, close: 780 },
    ]
  },
  {
    id: 3,
    name: "Mármore Travertino Romano",
    category: "mármore",
    origin: "Itália",
    priceM2: 1450.00,
    trend: "down",
    percentChange: -2.1,
    priceHistory: [
      { date: '01/2023', price: 1500, open: 1500, high: 1520, low: 1480, close: 1500 },
      { date: '02/2023', price: 1510, open: 1500, high: 1530, low: 1490, close: 1510 },
      { date: '03/2023', price: 1490, open: 1510, high: 1515, low: 1480, close: 1490 },
      { date: '04/2023', price: 1470, open: 1490, high: 1505, low: 1460, close: 1470 },
      { date: '05/2023', price: 1450, open: 1470, high: 1480, low: 1440, close: 1450 },
      { date: '06/2023', price: 1430, open: 1450, high: 1460, low: 1420, close: 1430 },
    ]
  },
  {
    id: 4,
    name: "Quartzito Super White",
    category: "quartzito",
    origin: "Brasil",
    priceM2: 2100.00,
    trend: "up",
    percentChange: 3.8,
    priceHistory: [
      { date: '01/2023', price: 1950, open: 1950, high: 1980, low: 1940, close: 1950 },
      { date: '02/2023', price: 1980, open: 1950, high: 2000, low: 1945, close: 1980 },
      { date: '03/2023', price: 2020, open: 1980, high: 2040, low: 1975, close: 2020 },
      { date: '04/2023', price: 2050, open: 2020, high: 2070, low: 2010, close: 2050 },
      { date: '05/2023', price: 2080, open: 2050, high: 2100, low: 2040, close: 2080 },
      { date: '06/2023', price: 2100, open: 2080, high: 2120, low: 2070, close: 2100 },
    ]
  },
  {
    id: 5,
    name: "Granito Verde Ubatuba",
    category: "granito",
    origin: "Brasil",
    priceM2: 690.00,
    trend: "stable",
    percentChange: 0.7,
    priceHistory: [
      { date: '01/2023', price: 680, open: 680, high: 690, low: 675, close: 680 },
      { date: '02/2023', price: 683, open: 680, high: 695, low: 678, close: 683 },
      { date: '03/2023', price: 686, open: 683, high: 695, low: 681, close: 686 },
      { date: '04/2023', price: 688, open: 686, high: 698, low: 680, close: 688 },
      { date: '05/2023', price: 690, open: 688, high: 700, low: 685, close: 690 },
      { date: '06/2023', price: 690, open: 690, high: 695, low: 685, close: 690 },
    ]
  }
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

// Chart types
const chartTypes = [
  { value: "line", label: "Linha", icon: LineChart },
  { value: "bar", label: "Barras", icon: BarChart4 },
  { value: "candle", label: "Candlestick", icon: BarChart4 }
];

// Helper function to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(value);
};

// Custom candlestick chart component
const CustomCandleChart = ({ data, height = 300 }: { data: any[]; height?: number }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <RechartsTooltip 
          labelFormatter={(value) => `Data: ${value}`}
          formatter={(value, name) => {
            if (name === "high") return [`Máxima: ${formatCurrency(value as number)}`];
            if (name === "low") return [`Mínima: ${formatCurrency(value as number)}`];
            if (name === "open") return [`Abertura: ${formatCurrency(value as number)}`];
            if (name === "close") return [`Fechamento: ${formatCurrency(value as number)}`];
            return [formatCurrency(value as number), name];
          }}
        />
        {data.map((entry, index) => (
          <g key={`candle-${index}`}>
            {/* Vertical line from high to low */}
            <line
              x1={index + 0.5}
              y1={entry.high}
              x2={index + 0.5}
              y2={entry.low}
              stroke="#8884d8"
            />
            {/* Horizontal box from open to close */}
            <rect
              x={index + 0.3}
              y={Math.min(entry.open, entry.close)}
              width={0.4}
              height={Math.abs(entry.close - entry.open)}
              fill={entry.open > entry.close ? "#ff7675" : "#55efc4"}
            />
          </g>
        ))}
        <Bar 
          dataKey="high" 
          fill="#55efc4" 
          opacity={0} 
          yAxisId={0} 
        />
        <Bar 
          dataKey="low" 
          fill="#ff7675" 
          opacity={0} 
          yAxisId={0} 
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

const MarketPrices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [materialFilter, setMaterialFilter] = useState("all");
  const [originFilter, setOriginFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [timePeriod, setTimePeriod] = useState("6m");
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [chartType, setChartType] = useState("line");
  const [dataLoaded, setDataLoaded] = useState(true);
  
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

  // Reload chart data
  const reloadData = () => {
    setDataLoaded(false);
    setTimeout(() => {
      setDataLoaded(true);
    }, 1500);
  };

  const renderChart = () => {
    if (!dataLoaded) {
      return (
        <div className="flex items-center justify-center h-72 bg-stone-50 dark:bg-stone-800/30 rounded-lg">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mb-4"></div>
            <p className="text-stone-500 dark:text-stone-400">Carregando dados do mercado...</p>
          </div>
        </div>
      );
    }

    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={selectedMaterial.priceHistory}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F9802D" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F9802D" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="price"
                stroke="#F9802D"
                fillOpacity={1}
                fill="url(#colorPrice)"
                strokeWidth={2}
                dot={{ fill: '#F9802D', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={selectedMaterial.priceHistory}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#525252' : '#e5e5e5'} />
              <XAxis dataKey="date" stroke={theme === 'dark' ? '#a8a29e' : '#78716c'} />
              <YAxis stroke={theme === 'dark' ? '#a8a29e' : '#78716c'} tickFormatter={(value) => `R$${value}`} />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#292524' : 'white',
                  borderColor: theme === 'dark' ? '#525252' : '#e5e5e5',
                  color: theme === 'dark' ? 'white' : 'black'
                }}
                formatter={(value: number) => [formatCurrency(value), "Preço"]}
              />
              <Bar dataKey="price" fill="#F9802D" radius={[4, 4, 0, 0]}>
                {selectedMaterial.priceHistory.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={index === selectedMaterial.priceHistory.length - 1 ? '#F9802D' : '#FFB57A'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      case 'candle':
        return <CustomCandleChart data={selectedMaterial.priceHistory} />;
      default:
        return null;
    }
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
            <h1 className="text-3xl font-bold mb-2 dark:text-white">Preço do Mercado</h1>
            <p className="text-stone-500 dark:text-stone-400">Acompanhe as tendências de preços das rochas ornamentais</p>
          </div>
        </motion.div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Evolução de Preços</CardTitle>
            <CardDescription>
              Acompanhe a variação de preços dos materiais em diferentes períodos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">Material</label>
                  <Select 
                    value={selectedMaterial.id.toString()} 
                    onValueChange={(value) => {
                      const material = materials.find(m => m.id.toString() === value);
                      if (material) setSelectedMaterial(material);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um material" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((material) => (
                        <SelectItem key={material.id} value={material.id.toString()}>
                          {material.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full sm:w-48">
                  <label className="text-sm font-medium mb-1 block">Período</label>
                  <Select 
                    value={timePeriod}
                    onValueChange={setTimePeriod}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      {timePeriods.map((period) => (
                        <SelectItem key={period.value} value={period.value}>
                          {period.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full sm:w-48">
                  <label className="text-sm font-medium mb-1 block">Tipo de gráfico</label>
                  <div className="flex rounded-md overflow-hidden border border-stone-200 dark:border-stone-800">
                    {chartTypes.map((type) => (
                      <button
                        key={type.value}
                        className={`flex-1 flex items-center justify-center py-2 text-sm ${
                          chartType === type.value
                            ? "bg-amber-500 text-white"
                            : "bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900"
                        }`}
                        onClick={() => setChartType(type.value)}
                      >
                        <type.icon className="h-4 w-4 mr-1" />
                        {type.value === 'candle' ? 'Candle' : type.value === 'bar' ? 'Barras' : 'Linha'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-stone-950 rounded-lg p-4 border border-stone-100 dark:border-stone-800">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200">{selectedMaterial.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700">
                        {selectedMaterial.category.charAt(0).toUpperCase() + selectedMaterial.category.slice(1)}
                      </Badge>
                      <Badge variant="outline" className="text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700">
                        {selectedMaterial.origin}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-stone-900 dark:text-white">
                      {formatCurrency(selectedMaterial.priceM2)}
                      <span className="text-sm font-normal text-stone-500 dark:text-stone-400">/m²</span>
                    </div>
                    <div className={`flex items-center justify-end mt-1 ${
                      selectedMaterial.trend === "up" 
                        ? "text-green-600 dark:text-green-500" 
                        : selectedMaterial.trend === "down" 
                        ? "text-red-600 dark:text-red-500"
                        : "text-amber-600 dark:text-amber-500"
                    }`}>
                      {selectedMaterial.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : selectedMaterial.trend === "down" ? (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      )}
                      {selectedMaterial.percentChange > 0 ? "+" : ""}
                      {selectedMaterial.percentChange.toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                {renderChart()}
                
                <div className="mt-2 text-xs text-stone-500 dark:text-stone-400 flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  Dados coletados automaticamente de marketplaces, sites especializados e redes do setor via crawling e IA proprietária.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Lista de Materiais</CardTitle>
                <CardDescription>
                  Compare os preços e tendências de diferentes tipos de rochas ornamentais
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative w-full sm:w-60">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-500" />
                  <Input
                    type="search"
                    placeholder="Buscar material..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filtros
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  {/* Filter dropdown content */}
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stone-100 dark:border-stone-800">
                    <th className="text-left p-4 font-medium text-stone-500 dark:text-stone-400">Material</th>
                    <th className="text-left p-4 font-medium text-stone-500 dark:text-stone-400">Tipo</th>
                    <th className="text-left p-4 font-medium text-stone-500 dark:text-stone-400">Origem</th>
                    <th className="text-right p-4 font-medium text-stone-500 dark:text-stone-400">Preço/m²</th>
                    <th className="text-right p-4 font-medium text-stone-500 dark:text-stone-400">Variação</th>
                    <th className="text-right p-4 font-medium text-stone-500 dark:text-stone-400">Tendência</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMaterials.map((material) => (
                    <tr key={material.id} className="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900/40 cursor-pointer transition-colors" onClick={() => setSelectedMaterial(material)}>
                      <td className="p-4 font-medium">{material.name}</td>
                      <td className="p-4">{material.category.charAt(0).toUpperCase() + material.category.slice(1)}</td>
                      <td className="p-4">{material.origin}</td>
                      <td className="p-4 text-right font-medium">{formatCurrency(material.priceM2)}</td>
                      <td className={`p-4 text-right ${
                        material.percentChange > 0 
                          ? "text-green-600 dark:text-green-500" 
                          : material.percentChange < 0 
                          ? "text-red-600 dark:text-red-500"
                          : "text-amber-600 dark:text-amber-500"
                      }`}>
                        {material.percentChange > 0 ? "+" : ""}
                        {material.percentChange.toFixed(1)}%
                      </td>
                      <td className="p-4 text-right">
                        {material.trend === "up" ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Alta
                          </Badge>
                        ) : material.trend === "down" ? (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            Queda
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Estável
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketPrices;
