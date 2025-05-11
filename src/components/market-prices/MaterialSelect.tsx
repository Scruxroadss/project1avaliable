
import React, { useRef, useState } from 'react';
import { materials } from '@/data/marketPricesData';
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface MaterialSelectProps {
  selectedMaterial: any;
  setSelectedMaterial: (material: any) => void;
}

const MaterialSelect: React.FC<MaterialSelectProps> = ({ selectedMaterial, setSelectedMaterial }) => {
  const [open, setOpen] = useState(false);
  const [materialSearchValue, setMaterialSearchValue] = useState("");
  const selectMaterialTrigger = useRef<HTMLButtonElement>(null);

  return (
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
  );
};

export default MaterialSelect;
