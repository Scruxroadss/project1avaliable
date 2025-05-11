
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface MaterialsTableProps {
  filteredMaterials: any[];
  setSelectedMaterial: (material: any) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setMaterialFilter: (value: string) => void;
  setOriginFilter: (value: string) => void;
  setPriceFilter: (value: string) => void;
}

const MaterialsTable: React.FC<MaterialsTableProps> = ({
  filteredMaterials,
  setSelectedMaterial,
  searchTerm,
  setSearchTerm,
  setMaterialFilter,
  setOriginFilter,
  setPriceFilter
}) => {
  return (
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
  );
};

export default MaterialsTable;
