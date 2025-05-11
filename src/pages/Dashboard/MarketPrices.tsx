
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/components/theme-provider";

// Import components
import MaterialSelect from '@/components/market-prices/MaterialSelect';
import ChartControls from '@/components/market-prices/ChartControls';
import MaterialChart from '@/components/market-prices/MaterialChart';
import MaterialsFilter from '@/components/market-prices/MaterialsFilter';
import MaterialsTable from '@/components/market-prices/MaterialsTable';

// Import data
import { materials } from '@/data/marketPricesData';

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

  // Reload chart data
  const reloadData = () => {
    setDataLoaded(false);
    setTimeout(() => {
      setDataLoaded(true);
    }, 1500);
  };

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
                <MaterialSelect 
                  selectedMaterial={selectedMaterial}
                  setSelectedMaterial={setSelectedMaterial}
                />
                
                <ChartControls
                  timePeriod={timePeriod}
                  setTimePeriod={setTimePeriod}
                  chartType={chartType}
                  setChartType={setChartType}
                />
              </div>
              
              <MaterialChart 
                selectedMaterial={selectedMaterial}
                chartType={chartType}
                dataLoaded={dataLoaded}
                reloadData={reloadData}
                isDark={isDark}
              />
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
              <MaterialsFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                materialFilter={materialFilter}
                setMaterialFilter={setMaterialFilter}
                originFilter={originFilter}
                setOriginFilter={setOriginFilter}
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
              />
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <MaterialsTable
              filteredMaterials={filteredMaterials}
              setSelectedMaterial={setSelectedMaterial}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setMaterialFilter={setMaterialFilter}
              setOriginFilter={setOriginFilter}
              setPriceFilter={setPriceFilter}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketPrices;
