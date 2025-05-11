
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, ChevronDown } from 'lucide-react';
import { materialTypes, originRegions, priceRanges } from '@/data/marketPricesData';

interface MaterialsFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  materialFilter: string;
  setMaterialFilter: (value: string) => void;
  originFilter: string;
  setOriginFilter: (value: string) => void;
  priceFilter: string;
  setPriceFilter: (value: string) => void;
}

const MaterialsFilter: React.FC<MaterialsFilterProps> = ({
  searchTerm,
  setSearchTerm,
  materialFilter,
  setMaterialFilter,
  originFilter,
  setOriginFilter,
  priceFilter,
  setPriceFilter
}) => {
  return (
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
  );
};

export default MaterialsFilter;
