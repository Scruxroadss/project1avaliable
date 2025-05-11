
// Mock data for market prices
export const materials = [
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
export const materialTypes = [
  { value: "all", label: "Todos os tipos" },
  { value: "mármore", label: "Mármores" },
  { value: "granito", label: "Granitos" },
  { value: "quartzito", label: "Quartzitos" },
];

// Origin regions for filtering
export const originRegions = [
  { value: "all", label: "Todas as origens" },
  { value: "Brasil", label: "Brasil" },
  { value: "Itália", label: "Itália" },
  { value: "Espanha", label: "Espanha" },
  { value: "Turquia", label: "Turquia" },
  { value: "outros", label: "Outros" }
];

// Price ranges for filtering
export const priceRanges = [
  { value: "all", label: "Todas as faixas" },
  { value: "0-1000", label: "Até R$ 1.000/m²" },
  { value: "1000-2000", label: "R$ 1.000 - R$ 2.000/m²" },
  { value: "2000+", label: "Acima de R$ 2.000/m²" }
];

// Time periods for the chart
export const timePeriods = [
  { value: "7d", label: "7 dias" },
  { value: "30d", label: "30 dias" },
  { value: "6m", label: "6 meses" },
  { value: "1y", label: "1 ano" }
];

// Chart types
export const chartTypes = [
  { value: "line", label: "Linha", icon: "LineChart" },
  { value: "bar", label: "Barras", icon: "BarChart4" },
  { value: "candle", label: "Candlestick", icon: "BarChart4" }
];
