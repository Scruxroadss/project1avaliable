
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
  LineChart,
  CandlestickChart
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
    name: "Quartzito Mont Blanc",
    category: "quartzito",
    origin: "Brasil",
    priceM2: 2450.00,
    trend: "up",
    percentChange: 8.7,
    priceHistory: [
      { date: '01/2023', price: 2250, open: 2230, high: 2270, low: 2210, close: 2250 },
      { date: '02/2023', price: 2280, open: 2250, high: 2300, low: 2240, close: 2280 },
      { date: '03/2023', price: 2320, open: 2280, high: 2350, low: 2270, close: 2320 },
      { date: '04/2023', price: 2380, open: 2320, high: 2400, low: 2310, close: 2380 },
      { date: '05/2023', price: 2420, open: 2380, high: 2450, low: 2370, close: 2420 },
      { date: '06/2023', price: 2450, open: 2420, high: 2480, low: 2410, close: 2450 },
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
      { date: '01/2023', price: 1320, open: 1340, high: 1350, low: 1315, close: 1320 },
      { date: '02/2023', price: 1325, open: 1320, high: 1335, low: 1310, close: 1325 },
      { date: '03/2023', price: 1310, open: 1325, high: 1330, low: 1300, close: 1310 },
      { date: '04/2023', price: 1300, open: 1310, high: 1320, low: 1290, close: 1300 },
      { date: '05/2023', price: 1290, open: 1300, high: 1310, low: 1280, close: 1290 },
      { date: '06/2023', price: 1280, open: 1290, high: 1300, low: 1270, close: 1280 },
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
      { date: '01/2023', price: 670, open: 675, high: 680, low: 665, close: 670 },
      { date: '02/2023', price: 665, open: 670, high: 675, low: 660, close: 665 },
      { date: '03/2023', price: 660, open: 665, high: 670, low: 655, close: 660 },
      { date: '04/2023', price: 655, open: 660, high: 665, low: 650, close: 655 },
      { date: '05/2023', price: 650, open: 655, high: 660, low: 645, close: 650 },
      { date: '06/2023', price: 650, open: 650, high: 655, low: 645, close: 650 },
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
      { date: '01/2023', price: 2040, open: 2020, high: 2060, low: 2010, close: 2040 },
      { date: '02/2023', price: 2070, open: 2040, high: 2090, low: 2030, close: 2070 },
      { date: '03/2023', price: 2110, open: 2070, high: 2130, low: 2060, close: 2110 },
      { date: '04/2023', price: 2130, open: 2110, high: 2150, low: 2100, close: 2130 },
      { date: '05/2023', price: 2160, open: 2130, high: 2180, low: 2120, close: 2160 },
      { date: '06/2023', price: 2180, open: 2160, high: 2200, low: 2150, close: 2180 },
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
      { date: '01/2023', price: 1540, open: 1530, high: 1550, low: 1520, close: 1540 },
      { date: '02/2023', price: 1550, open: 1540, high: 1560, low: 1535, close: 1550 },
      { date: '03/2023', price: 1560, open: 1550, high: 1570, low: 1545, close: 1560 },
      { date: '04/2023', price: 1570, open: 1560, high: 1580, low: 1555, close: 1570 },
      { date: '05/2023', price: 1575, open: 1570, high: 1585, low: 1565, close: 1575 },
      { date: '06/2023', price: 1580, open: 1575, high: 1590, low: 1570, close: 1580 },
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
      { date: '01/2023', price: 715, open: 710, high: 720, low: 705, close: 715 },
      { date: '02/2023', price: 717, open: 715, high: 725, low: 710, close: 717 },
      { date: '03/2023', price: 718, open: 717, high: 725, low: 715, close: 718 },
      { date: '04/2023', price: 720, open: 718, high: 725, low: 715, close: 720 },
      { date: '05/2023', price: 722, open: 720, high: 730, low: 718, close: 722 },
      { date: '06/2023', price: 720, open: 722, high: 725, low: 715, close: 720 },
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

// Chart types
const chartTypes = [
  { value: "line", label: "Linha", icon: LineChart },
  { value: "bar", label: "Barras", icon: BarChart4 },
  { value: "candle", label: "Candlestick", icon: CandlestickChart }
];

const CandlestickChart = ({ data, height = 300 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <RechartsTooltip 
          labelFormatter={(value) => `Data: ${value}`}
          formatter={(value, name) => {
            if (name === "high") return [`Máxima: ${formatCurrency(value)}`];
            if (name === "low") return [`Mínima: ${formatCurrency(value)}`];
            if (name === "open") return [`Abertura: ${formatCurrency(value)}`];
            if (name === "close") return [`Fechamento: ${formatCurrency(value)}`];
            return [formatCurrency(value), name];
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

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(value);
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
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart
              data={selectedMaterial.priceHistory}
              margin={{
                top: 20,
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
                formatter={(value: number, name) => {
                  const formattedValue = formatCurrency(value);
                  switch(name) {
                    case 'high': return ['Máximo', formattedValue];
                    case 'low': return ['Mínimo', formattedValue];
                    case 'open': return ['Abertura', formattedValue];
                    case 'close': return ['Fechamento', formattedValue];
                    default: return [name, formattedValue];
                  }
                }}
              />
              {selectedMaterial.priceHistory.map((entry, index) => {
                const isUp = entry.close >= entry.open;
                const color = isUp ? "#22c55e" : "#ef4444";
                
                return (
                  <g key={`candle-${index}`}>
                    <line 
                      x1={(index + 0.5) * (100 / selectedMaterial.priceHistory.length) + '%'} 
                      y1={entry.low} 
                      x2={(index + 0.5) * (100 / selectedMaterial.priceHistory.length) + '%'} 
                      y2={entry.high}
                      stroke={color} 
                      strokeWidth={2}
                    />
                    <rect 
                      x={(index + 0.3) * (100 / selectedMaterial.priceHistory.length) + '%'} 
                      y={Math.min(entry.open, entry.close)} 
                      width={(0.4 * (100 / selectedMaterial.priceHistory.length)) + '%'} 
                      height={Math.abs(entry.close - entry.open)}
                      fill={color}
                    />
                  </g>
                );
              })}
              <Bar dataKey="high" fill="transparent" />
              <Bar dataKey="low" fill="transparent" />
            </ComposedChart>
          </ResponsiveContainer>
        );
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Chart Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="overflow-hidden dark:bg-stone-900 dark:border-stone-700">
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg dark:text-white">
                        {selectedMaterial.name}
                      </CardTitle>
                      <CardDescription className="dark:text-stone-400">
                        {selectedMaterial.category.charAt(0).toUpperCase() + selectedMaterial.category.slice(1)} • {selectedMaterial.origin}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Tabs defaultValue={chartType} className="w-full">
                        <TabsList className="h-8 dark:bg-stone-800">
                          {chartTypes.map(type => (
                            <TabsTrigger 
                              key={type.value} 
                              value={type.value} 
                              className="text-xs dark:data-[state=active]:bg-stone-700 dark:data-[state=active]:text-stone-100"
                              onClick={() => setChartType(type.value)}
                            >
                              <type.icon className="h-4 w-4 mr-1" />
                              {type.label}
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
                      <div className="text-sm text-stone-500 dark:text-stone-400">Preço Atual</div>
                      <div className="text-3xl font-bold dark:text-white">
                        {formatCurrency(selectedMaterial.priceM2)}<span className="text-sm font-normal">/m²</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {selectedMaterial.trend === 'up' ? (
                        <Badge className="flex items-center gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                          +{selectedMaterial.percentChange}%
                        </Badge>
                      ) : selectedMaterial.trend === 'down' ? (
                        <Badge className="flex items-center gap-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30">
                          <ArrowDownRight className="h-3.5 w-3.5" />
                          {selectedMaterial.percentChange}%
                        </Badge>
                      ) : (
                        <Badge className="flex items-center gap-1 bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800">
                          {selectedMaterial.percentChange}%
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full h-72 transition-all duration-300">
                    {renderChart()}
                  </div>
                </CardContent>
                <CardFooter className="pt-3 border-t text-xs dark:border-stone-700 text-stone-500 dark:text-stone-400">
                  <div className="flex items-center gap-1">
                    <Info className="h-3.5 w-3.5" />
                    <span>Dados coletados automaticamente de marketplaces, sites especializados e redes do setor via crawling e IA proprietária. Última atualização: 01/05/2023.</span>
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
              <Card className="dark:bg-stone-900 dark:border-stone-700">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
                    <DollarSign className="h-5 w-5 text-amber-500" /> 
                    Comparativo de Preços
                  </CardTitle>
                  <CardDescription className="dark:text-stone-400">
                    Preços médios por categoria de material
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['mármore', 'granito', 'quartzito'].map((category) => {
                      const categoryMaterials = materials.filter(m => m.category === category);
                      const avgPrice = categoryMaterials.reduce((acc, curr) => acc + curr.priceM2, 0) / categoryMaterials.length;
                      
                      return (
                        <Card key={category} className="shadow-none border dark:bg-stone-800 dark:border-stone-700 bg-stone-50 border-stone-100">
                          <CardHeader className="pb-2 pt-4">
                            <CardTitle className="text-base capitalize dark:text-white">
                              {category}s
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold dark:text-white">{formatCurrency(avgPrice)}</div>
                            <div className="text-xs mt-1 dark:text-stone-400 text-stone-500">
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
            <Card className="dark:bg-stone-900 dark:border-stone-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between dark:text-white">
                  <span>Materiais</span>
                  <Badge className="text-xs bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800">
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
                    className="pl-9 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-100 bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium dark:text-stone-300 text-stone-700">Filtros</span>
                    {(materialFilter !== "all" || originFilter !== "all" || priceFilter !== "all") && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs h-7 px-2 dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-stone-800"
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
                      <SelectTrigger className="dark:bg-stone-800 dark:border-stone-700 dark:text-stone-100 bg-white">
                        <SelectValue placeholder="Tipo de material" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-stone-800 dark:border-stone-700 dark:text-stone-100">
                        {materialTypes.map(type => (
                          <SelectItem 
                            key={type.value} 
                            value={type.value}
                            className="dark:focus:bg-stone-700 dark:focus:text-stone-100"
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
                      <SelectTrigger className="dark:bg-stone-800 dark:border-stone-700 dark:text-stone-100 bg-white">
                        <SelectValue placeholder="Origem" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-stone-800 dark:border-stone-700 dark:text-stone-100">
                        {originRegions.map(region => (
                          <SelectItem 
                            key={region.value} 
                            value={region.value}
                            className="dark:focus:bg-stone-700 dark:focus:text-stone-100"
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
                      <SelectTrigger className="dark:bg-stone-800 dark:border-stone-700 dark:text-stone-100 bg-white">
                        <SelectValue placeholder="Faixa de preço" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-stone-800 dark:border-stone-700 dark:text-stone-100">
                        {priceRanges.map(range => (
                          <SelectItem 
                            key={range.value} 
                            value={range.value}
                            className="dark:focus:bg-stone-700 dark:focus:text-stone-100"
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
                            ? "dark:bg-stone-700 dark:text-stone-100 bg-amber-50 border border-amber-200"
                            : "dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-100 bg-stone-50 hover:bg-stone-100 border border-transparent"
                        }`}
                        onClick={() => setSelectedMaterial(material)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium dark:text-stone-100">{material.name}</h3>
                          <Badge
                            className={`${
                              material.trend === 'up'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : material.trend === 'down'
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
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
                          <div className="text-xs dark:text-stone-400 text-stone-500">
                            <span className="capitalize">{material.category}</span> • {material.origin}
                          </div>
                          <div className="font-semibold dark:text-stone-200">{formatCurrency(material.priceM2)}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center rounded-lg dark:bg-stone-800 dark:text-stone-400 bg-stone-50 text-stone-500">
                      <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Nenhum material encontrado com os filtros selecionados.</p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setMaterialFilter("all");
                          setOriginFilter("all");
                          setPriceFilter("all");
                          setSearchTerm("");
                        }}
                        className="mt-2 text-xs h-8"
                      >
                        Limpar filtros
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
                  onClick={reloadData}
                >
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Atualizar dados
                </Button>
              </CardFooter>
            </Card>
            
            {/* Help Card */}
            <Card className="dark:bg-stone-900 dark:border-stone-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg dark:text-white">
                  Sobre os dados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-3 dark:text-stone-300 text-stone-700">
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
                  className="w-full dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
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
