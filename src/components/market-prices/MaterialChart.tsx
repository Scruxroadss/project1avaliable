
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, ArrowUpRight, ArrowDownRight, TrendingUp, RefreshCw, Loader2 } from 'lucide-react';
import ZoomableChart from '@/components/charts/ZoomableChart';
import { formatCurrency } from '@/utils/formatters';

interface MaterialChartProps {
  selectedMaterial: any;
  chartType: string;
  dataLoaded: boolean;
  reloadData: () => void;
  isDark: boolean;
}

const MaterialChart: React.FC<MaterialChartProps> = ({ 
  selectedMaterial, 
  chartType, 
  dataLoaded, 
  reloadData,
  isDark
}) => {
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

  return (
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
  );
};

export default MaterialChart;
