
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, BarChart4 } from 'lucide-react';
import { timePeriods } from '@/data/marketPricesData';

interface ChartControlsProps {
  timePeriod: string;
  setTimePeriod: (value: string) => void;
  chartType: string;
  setChartType: (value: string) => void;
}

const ChartControls: React.FC<ChartControlsProps> = ({ 
  timePeriod, 
  setTimePeriod, 
  chartType, 
  setChartType 
}) => {
  const chartTypes = [
    { value: "line", label: "Linha", icon: LineChart },
    { value: "bar", label: "Barras", icon: BarChart4 },
    { value: "candle", label: "Candlestick", icon: BarChart4 }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4">
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
          {chartTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <button
                key={type.value}
                className={`flex-1 flex items-center justify-center py-2 px-3 text-sm transition-colors ${
                  chartType === type.value
                    ? "bg-amber-500 text-white"
                    : "bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900"
                }`}
                onClick={() => setChartType(type.value)}
              >
                <IconComponent className="h-4 w-4 mr-1.5" />
                {type.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChartControls;
