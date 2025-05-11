import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
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
  ZoomIn,
  RefreshCw,
  Loader2
} from 'lucide-react';
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
  Cell,
  ReferenceArea,
  ReferenceLine
} from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/components/theme-provider";

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
  { value: "7d", label: "7 dias" },
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
const CustomCandlestickChart = ({ data, height = 300 }: { data: any[]; height?: number }) => {
  const { theme } = useTheme();
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#525252' : '#e5e5e5'} />
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
          labelFormatter={(value) => `Data: ${value}`}
          formatter={(value: any, name: any) => {
            if (name === "high") return [`Máxima: ${formatCurrency(value)}`];
            if (name === "low") return [`Mínima: ${formatCurrency(value)}`];
            if (name === "open") return [`Abertura: ${formatCurrency(value)}`];
            if (name === "close") return [`Fechamento: ${formatCurrency(value)}`];
            return [formatCurrency(value), name];
          }}
        />
        {data.map((entry, index) => (
          <React.Fragment key={`candle-${index}`}>
            {/* Vertical line from high to low */}
            <ReferenceLine 
              segment={[
                { x: entry.date, y: entry.low },
                { x: entry.date, y: entry.high }
              ]} 
              stroke={entry.close >= entry.open ? "#16a34a" : "#dc2626"}
              strokeWidth={1}
              ifOverflow="visible"
            />
            {/* Rectangle for open to close */}
            <ReferenceArea
              x1={parseFloat(index) - 0.25}
              x2={parseFloat(index) + 0.25}
              y1={entry.open}
              y2={entry.close}
              fill={entry.close >= entry.open ? "#16a34a" : "#dc2626"}
              fillOpacity={0.8}
              ifOverflow="visible"
            />
          </React.Fragment>
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

// Custom tooltip for recharts
const CustomTooltip = ({ active, payload, label, theme }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={`${theme === 'dark' ? 'bg-stone-800 text-white' : 'bg-white text-stone-800'} p-3 rounded-lg shadow-lg border ${theme === 'dark' ? 'border-stone-700' : 'border-stone-200'}`}>
        <p className="font-medium">{`Data: ${label}`}</p>
        <p className="text-amber-500 font-medium">{`${formatCurrency(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
};

interface ZoomableChartProps {
  data: any[];
  type: string;
  height?: number;
  isDark: boolean;
}

const ZoomableChart: React.FC<ZoomableChartProps> = ({ data, type, height = 300, isDark }) => {
  const [leftIndex, setLeftIndex] = useState<number | null>(null);
  const [rightIndex, setRightIndex] = useState<number | null>(null);
  const [refAreaLeft, setRefAreaLeft] = useState<string | null>(null);
  const [refAreaRight, setRefAreaRight] = useState<string | null>(null);
  const [displayData, setDisplayData] = useState(data);

  useEffect(() => {
    setDisplayData(data);
  }, [data]);

  const getAxisYDomain = (from: number, to: number, ref: string, offset: number) => {
    const refData = displayData.slice(from, to);
    let [bottom, top] = [
      refData[0][ref], 
      refData[0][ref]
    ];
    
    refData.forEach((d: any) => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });

    return [(bottom | 0) - offset, (top | 0) + offset];
  };

  const zoom = () => {
    if (refAreaLeft === refAreaRight || !refAreaRight) {
      setRefAreaLeft(null);
      setRefAreaRight(null);
      return;
    }

    // Ensure leftIndex and rightIndex are set
    if (leftIndex !== null && rightIndex !== null) {
      const dataFromIndex = Math.min(leftIndex, rightIndex);
      const dataToIndex = Math.max(leftIndex, rightIndex);

      setDisplayData(data.slice(dataFromIndex, dataToIndex + 1));
    }

    setRefAreaLeft(null);
    setRefAreaRight(null);
  };

  const handleMouseDown = (e: any) => {
    if (!e) return;
    
    const { activeLabel } = e;
    setRefAreaLeft(activeLabel);
    const index = data.findIndex(item => item.date === activeLabel);
    if (index !== -1) setLeftIndex(index);
  };

  const handleMouseMove = (e: any) => {
    if (!e || !refAreaLeft) return;
    
    const { activeLabel } = e;
    setRefAreaRight(activeLabel);
    const index = data.findIndex(item => item.date === activeLabel);
    if (index !== -1) setRightIndex(index);
  };
  
  const resetZoom = () => {
    setDisplayData(data);
    setRefAreaLeft(null);
    setRefAreaRight(null);
    setLeftIndex(null);
    setRightIndex(null);
  };

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={displayData}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={zoom}
      >
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F9802D" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#F9802D" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke={isDark ? '#525252' : '#e5e5e5'} 
        />
        <XAxis 
          dataKey="date" 
          stroke={isDark ? '#a8a29e' : '#78716c'}
          padding={{ left: 30, right: 30 }}
        />
        <YAxis 
          stroke={isDark ? '#a8a29e' : '#78716c'}
          tickFormatter={(value) => `R$${value}`} 
          domain={['auto', 'auto']}
        />
        <RechartsTooltip
          content={<CustomTooltip theme={isDark ? 'dark' : 'light'} />}
          wrapperStyle={{ zIndex: 1000 }}
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke="#F9802D"
          fillOpacity={1}
          fill="url(#colorPrice)"
          strokeWidth={2}
          dot={{ fill: '#F9802D', r: 4 }}
          activeDot={{ r: 6, fill: '#F9802D', stroke: isDark ? 'white' : 'black', strokeWidth: 1 }}
          animationDuration={500}
          isAnimationActive={true}
        />
        {refAreaLeft && refAreaRight ? (
          <ReferenceArea
            x1={String(refAreaLeft)}
            x2={String(refAreaRight)}
            strokeOpacity={0.3}
            fill={isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
          />
        ) : null}
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={displayData}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={zoom}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#525252' : '#e5e5e5'} />
        <XAxis dataKey="date" stroke={isDark ? '#a8a29e' : '#78716c'} />
        <YAxis stroke={isDark ? '#a8a29e' : '#78716c'} tickFormatter={(value) => `R$${value}`} />
        <RechartsTooltip
          content={<CustomTooltip theme={isDark ? 'dark' : 'light'} />}
          wrapperStyle={{ zIndex: 1000 }}
        />
        <Bar 
          dataKey="price" 
          fill="#F9802D" 
          radius={[4, 4, 0, 0]}
          animationDuration={500}
        >
          {displayData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`}
              fill={index === displayData.length - 1 ? '#F9802D' : '#FFB57A'}
            />
          ))}
        </Bar>
        {refAreaLeft && refAreaRight ? (
          <ReferenceArea
            x1={String(refAreaLeft)}
            x2={String(refAreaRight)}
            strokeOpacity={0.3}
            fill={isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
          />
        ) : null}
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="relative">
      {type === 'line' && renderLineChart()}
      {type === 'bar' && renderBarChart()}
      {type === 'candle' && <CustomCandlestickChart data={displayData} height={height} />}
      
      {displayData.length < data.length && (
        <Button 
          variant="outline" 
          size="sm"
          className="absolute top-2 right-2 opacity-80 hover:opacity-100 z-10"
          onClick={resetZoom}
        >
          <ZoomIn className="h-4 w-4 mr-1" />
          Resetar Zoom
        </Button>
      )}
    </div>
  );
};

const MarketPrices = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [searchTerm, setSearchTerm] = useState("");
  const [materialFilter, setMaterialFilter] = useState("all");
  const [originFilter, setOriginFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [timePeriod, setTimePeriod] = useState("6m");
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [chartType, setChartType] = useState("line");
  const [dataLoaded, setDataLoaded] = useState(true);
  const [open, setOpen] = useState(false);
  const [materialSearchValue, setMaterialSearchValue] = useState("");
  
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
            <Loader2 className="inline-block animate-spin h-12 w-12 text-amber-500 mb-4" />
            <p className="text-stone-500 dark:text-stone-400">Carregando dados do mercado...</p>
          </div>
        </div>
      );
    }

    if (selectedMaterial.priceHistory.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-72 bg-stone-50 dark:bg-stone-800/30 rounded-lg">
          <Info className="h-12 w-12 text-stone-400 dark:text-stone-500 mb-2" />
          <p className="text-lg font-medium text-stone-700 dark:text-stone-300 mb-1">Sem dados disponíveis</p>
          <p className="text-stone-500 dark:text-stone-400 mb-4 text-center max-w-md">
            Não há dados históricos suficientes para exibir o gráfico deste material neste momento.
          </p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={reloadData}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Verificar novamente
          </Button>
        </div>
      );
    }

    return (
      <ZoomableChart 
        data={selectedMaterial.priceHistory} 
        type={chartType} 
        height={340}
        isDark={isDark}
      />
    );
  };

  const selectMaterialTrigger = useRef<HTMLButtonElement>(null);

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
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

        <Card className="overflow-hidden border-stone-200 dark:border-stone-800">
          <CardHeader className="pb-2">
            <CardTitle>Evolução de Preços</CardTitle>
            <CardDescription>
              Acompanhe a variação de preços dos materiais em diferentes períodos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block text-stone-700 dark:text-stone-300">Material</label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        ref={selectMaterialTrigger}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-800"
                      >
                        {selectedMaterial ? selectedMaterial.name : "Selecione um material"}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" style={{ width: selectMaterialTrigger.current?.offsetWidth }}>
                      <Command>
                        <CommandInput 
                          placeholder="Buscar material..." 
                          className="h-9"
                          value={materialSearchValue}
                          onValueChange={setMaterialSearchValue}
                        />
                        <CommandEmpty>Nenhum material encontrado.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {materials
                            .filter(material => material.name.toLowerCase().includes(materialSearchValue.toLowerCase()))
                            .map((material) => (
                              <CommandItem
                                key={material.id}
                                value={material.name}
                                onSelect={() => {
                                  setSelectedMaterial(material);
                                  setMaterialSearchValue("");
                                  setOpen(false);
                                }}
                                className="flex items-center justify-between"
                              >
                                <div>
                                  <span>{material.name}</span>
                                  <span className="ml-2 text-xs text-stone-500 dark:text-stone-400">
                                    {material.category.charAt(0).toUpperCase() + material.category.slice(1)}
                                  </span>
                                </div>
                                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                                  {formatCurrency(material.priceM2)}
                                </span>
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="w-full lg:w-48">
                  <label className="text-sm font-medium mb-1 block text-stone-700 dark:text-stone-300">Período</label>
                  <Select 
                    value={timePeriod}
                    onValueChange={setTimePeriod}
                  >
                    <SelectTrigger className="bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-800">
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
                
                <div className="w-full lg:w-auto">
                  <label className="text-sm font-medium mb-1 block text-stone-700 dark:text-stone-300">Tipo de gráfico</label>
                  <div className="flex rounded-md overflow-hidden border border-stone-200 dark:border-stone-800">
                    {chartTypes.map((type) => (
                      <button
                        key={type.value}
                        className={`flex-1 flex items-center justify-center py-2 px-3 text-sm transition-colors ${
                          chartType === type.value
                            ? "bg-amber-500 text-white"
                            : "bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900"
                        }`}
                        onClick={() => setChartType(type.value)}
                      >
                        <type.icon className="h-4 w-4 mr-1.5" />
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-stone-950 rounded-lg p-4 border border-stone-100 dark:border-stone-800 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200">{selectedMaterial.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
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
                        : "text-amber-600 dark:text-amber-400"
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
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`chart-${selectedMaterial.id}-${chartType}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderChart()}
                  </motion.div>
                </AnimatePresence>
                
                <div className="mt-3 text-xs text-stone-500 dark:text-stone-400 flex items-center">
                  <Info className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="italic">
                    Dados coletados automaticamente de marketplaces, sites especializados e redes do setor via crawling e IA proprietária.
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-stone-200 dark:border-stone-800">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Lista de Materiais</CardTitle>
                <CardDescription>
                  Compare os preços e tendências de diferentes tipos de rochas ornamentais
                </CardDescription>
              </div>
              <div className="flex gap-2 flex-col sm:flex-row">
                <div className="relative w-full sm:w-60">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-500" />
                  <Input
                    type="search"
                    placeholder="Buscar material..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-800"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-800">
                      <Filter className="h-4 w-4" />
                      Filtros
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="p-2">
                      <h4 className="mb-1 text-sm font-medium">Tipo de Material</h4>
                      <Select value={materialFilter} onValueChange={setMaterialFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione um tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {materialTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="p-2">
                      <h4 className="mb-1 text-sm font-medium">Origem</h4>
                      <Select value={originFilter} onValueChange={setOriginFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione uma origem" />
                        </SelectTrigger>
                        <SelectContent>
                          {originRegions.map((region) => (
                            <SelectItem key={region.value} value={region.value}>
                              {region.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="p-2">
                      <h4 className="mb-1 text-sm font-medium">Faixa de Preço</h4>
                      <Select value={priceFilter} onValueChange={setPriceFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione uma faixa" />
                        </SelectTrigger>
                        <SelectContent>
                          {priceRanges.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                              {range.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="p-2 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setMaterialFilter("all");
                          setOriginFilter("all");
                          setPriceFilter("all");
                        }} 
                        className="mr-2"
                      >
                        Limpar
                      </Button>
                      <Button size="sm">Aplicar</Button>
                    </div>
                  </DropdownMenuContent>
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
                  {filteredMaterials.length > 0 ? (
                    filteredMaterials.map((material) => (
                      <tr 
                        key={material.id} 
                        className="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900/40 cursor-pointer transition-colors" 
                        onClick={() => setSelectedMaterial(material)}
                      >
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-stone-500 dark:text-stone-400">
                        <div className="flex flex-col items-center">
                          <Search className="h-8 w-8 mb-2 text-stone-400 dark:text-stone-500" />
                          <p>Nenhum material encontrado com esses filtros.</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => {
                              setSearchTerm("");
                              setMaterialFilter("all");
                              setOriginFilter("all");
                              setPriceFilter("all");
                            }}
                          >
                            Limpar filtros
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
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
