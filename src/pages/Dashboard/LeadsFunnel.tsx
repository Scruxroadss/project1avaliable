
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, Plus, Edit, Trash2, MoreHorizontal, User, Building, DollarSign, Package, Clock, PlusCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Definição de tipos
type Tag = {
  id: string;
  name: string;
  color: string;
};

type Lead = {
  id: string;
  company: string;
  value: number;
  material: string;
  lastContact: Date | null;
  tags: Tag[];
};

type Column = {
  id: string;
  title: string;
  items: Lead[];
};

// Mock data para leads
const initialData: Column[] = [
  {
    id: 'new',
    title: 'Novo Lead',
    items: [
      {
        id: 'lead-1',
        company: 'Construtora Alpha',
        value: 25000,
        material: 'Mármore Carrara',
        lastContact: new Date(2023, 4, 15),
        tags: [{ id: 'tag-1', name: 'Prioritário', color: 'red' }]
      },
      {
        id: 'lead-2',
        company: 'Arquitetos Associados',
        value: 12000,
        material: 'Granito Preto São Gabriel',
        lastContact: new Date(2023, 4, 20),
        tags: [{ id: 'tag-2', name: 'Retorno', color: 'blue' }]
      }
    ]
  },
  {
    id: 'contacted',
    title: 'Contato Feito',
    items: [
      {
        id: 'lead-3',
        company: 'Engenharia Beta',
        value: 18500,
        material: 'Quartizito Branco',
        lastContact: new Date(2023, 4, 22),
        tags: [{ id: 'tag-3', name: 'Em análise', color: 'yellow' }]
      }
    ]
  },
  {
    id: 'meeting',
    title: 'Reunião Marcada',
    items: [
      {
        id: 'lead-4',
        company: 'Construtora Delta',
        value: 35000,
        material: 'Mármore Travertino',
        lastContact: new Date(2023, 4, 25),
        tags: [{ id: 'tag-4', name: 'Presencial', color: 'green' }]
      }
    ]
  },
  {
    id: 'negotiation',
    title: 'Negociação',
    items: [
      {
        id: 'lead-5',
        company: 'Incorporadora Gama',
        value: 65000,
        material: 'Granito Branco Itaúnas',
        lastContact: new Date(2023, 4, 28),
        tags: [{ id: 'tag-5', name: 'Proposta', color: 'purple' }]
      }
    ]
  },
  {
    id: 'closed',
    title: 'Fechado',
    items: [
      {
        id: 'lead-6',
        company: 'Construtora Omega',
        value: 42000,
        material: 'Mármore Calacatta',
        lastContact: new Date(2023, 5, 1),
        tags: [{ id: 'tag-6', name: 'Concluído', color: 'green' }]
      }
    ]
  }
];

// Componentes auxiliares
const SortableItem = ({ lead }: { lead: Lead }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: lead.id,
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-3 cursor-grab"
    >
      <LeadCard lead={lead} />
    </div>
  );
};

const LeadCard = ({ lead }: { lead: Lead }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return (
    <>
      <Card className="bg-white dark:bg-stone-800 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-stone-900 dark:text-stone-100">{lead.company}</h3>
            <MoreHorizontal className="h-5 w-5 text-stone-400 cursor-pointer" />
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-stone-600 dark:text-stone-300">
              <DollarSign className="h-4 w-4 mr-1 text-stone-400 dark:text-stone-500" />
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lead.value)}
            </div>
            <div className="flex items-center text-sm text-stone-600 dark:text-stone-300">
              <Package className="h-4 w-4 mr-1 text-stone-400 dark:text-stone-500" />
              {lead.material}
            </div>
            <div className="flex items-center text-sm text-stone-600 dark:text-stone-300">
              <Clock className="h-4 w-4 mr-1 text-stone-400 dark:text-stone-500" />
              Último contato: {lead.lastContact ? format(lead.lastContact, 'dd/MM/yyyy') : 'N/A'}
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex flex-wrap gap-1">
            {lead.tags.map((tag) => (
              <Badge 
                key={tag.id} 
                variant="outline" 
                className={`bg-${tag.color}-100 text-${tag.color}-800 dark:bg-${tag.color}-900/30 dark:text-${tag.color}-400 border-${tag.color}-200 dark:border-${tag.color}-800/30 text-xs`}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Lead</DialogTitle>
            <DialogDescription>Visualize e edite as informações deste lead.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="company">Empresa</Label>
              <Input id="company" defaultValue={lead.company} />
            </div>
            <div>
              <Label htmlFor="value">Valor estimado</Label>
              <Input id="value" type="number" defaultValue={lead.value} />
            </div>
            <div>
              <Label htmlFor="material">Material</Label>
              <Input id="material" defaultValue={lead.material} />
            </div>
            <div>
              <Label>Último contato</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {lead.lastContact ? format(lead.lastContact, 'PPP', { locale: ptBR }) : <span>Selecione uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={lead.lastContact || undefined}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {lead.tags.map((tag) => (
                  <div key={tag.id} className={`bg-${tag.color}-100 text-${tag.color}-800 dark:bg-${tag.color}-900/30 dark:text-${tag.color}-400 px-3 py-1 rounded-full text-xs flex items-center gap-1`}>
                    {tag.name}
                    <X className="h-3 w-3 cursor-pointer" />
                  </div>
                ))}
                <Button variant="outline" size="sm" className="h-6 px-2 rounded-full">
                  <PlusCircle className="h-3 w-3 mr-1" />
                  Adicionar
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => setIsDialogOpen(false)}>Salvar alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const LeadFunnelPage = () => {
  const [columns, setColumns] = useState<Column[]>(initialData);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [newLead, setNewLead] = useState<Partial<Lead>>({
    company: '',
    value: 0,
    material: '',
    lastContact: null,
    tags: []
  });
  const [newLeadColumn, setNewLeadColumn] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handler para início de arrastar
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id as string);
    
    // Identifica a coluna do item
    const columnId = columns.find(col => 
      col.items.some(item => item.id === active.id)
    )?.id || null;
    
    setActiveColumn(columnId);
  }

  // Handler para final de arrastar
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (over) {
      // Identifica as colunas de origem e destino
      let sourceColumnId = '';
      let destinationColumnId = '';
      let sourceIndex = -1;
      let destinationIndex = -1;
      
      columns.forEach(column => {
        const sourceItemIndex = column.items.findIndex(item => item.id === active.id);
        if (sourceItemIndex >= 0) {
          sourceColumnId = column.id;
          sourceIndex = sourceItemIndex;
        }
        
        const overItemIndex = column.items.findIndex(item => item.id === over.id);
        if (overItemIndex >= 0) {
          destinationColumnId = column.id;
          destinationIndex = overItemIndex;
        }
      });
      
      // Se o item estiver sendo movido dentro da mesma coluna
      if (sourceColumnId === destinationColumnId && sourceIndex !== -1 && destinationIndex !== -1) {
        const newColumns = [...columns];
        const columnIndex = newColumns.findIndex(col => col.id === sourceColumnId);
        
        newColumns[columnIndex].items = arrayMove(
          newColumns[columnIndex].items,
          sourceIndex,
          destinationIndex
        );
        
        setColumns(newColumns);
      } 
      // Se o item estiver sendo movido entre colunas
      else if (sourceColumnId && destinationColumnId) {
        const newColumns = [...columns];
        const sourceColIndex = newColumns.findIndex(col => col.id === sourceColumnId);
        const destColIndex = newColumns.findIndex(col => col.id === destinationColumnId);
        
        const [movedItem] = newColumns[sourceColIndex].items.splice(sourceIndex, 1);
        newColumns[destColIndex].items.splice(destinationIndex, 0, movedItem);
        
        setColumns(newColumns);
      }
      // Se o item estiver sendo movido para uma coluna vazia
      else if (sourceColumnId && over.id) {
        const columnId = over.id as string;
        const isColumn = columns.some(col => col.id === columnId);
        
        if (isColumn) {
          const newColumns = [...columns];
          const sourceColIndex = newColumns.findIndex(col => col.id === sourceColumnId);
          const destColIndex = newColumns.findIndex(col => col.id === columnId);
          
          const [movedItem] = newColumns[sourceColIndex].items.splice(sourceIndex, 1);
          newColumns[destColIndex].items.push(movedItem);
          
          setColumns(newColumns);
        }
      }
    }
    
    setActiveId(null);
    setActiveColumn(null);
  }

  // Adicionar uma nova coluna
  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      const newColumn: Column = {
        id: `column-${Date.now()}`,
        title: newColumnTitle,
        items: []
      };
      
      setColumns([...columns, newColumn]);
      setNewColumnTitle('');
      setIsAddingColumn(false);
    }
  };

  // Adicionar um novo lead
  const handleAddLead = () => {
    if (newLead.company && newLeadColumn) {
      const lead: Lead = {
        id: `lead-${Date.now()}`,
        company: newLead.company || '',
        value: newLead.value || 0,
        material: newLead.material || '',
        lastContact: newLead.lastContact || null,
        tags: newLead.tags || []
      };
      
      const newColumns = [...columns];
      const columnIndex = newColumns.findIndex(col => col.id === newLeadColumn);
      
      if (columnIndex !== -1) {
        newColumns[columnIndex].items.push(lead);
        setColumns(newColumns);
      }
      
      setNewLead({
        company: '',
        value: 0,
        material: '',
        lastContact: null,
        tags: []
      });
      setNewLeadColumn('');
      setIsAddingLead(false);
    }
  };

  // Encontrar o lead ativo
  const activeLead = activeId ? columns
    .flatMap(column => column.items)
    .find(item => item.id === activeId) : null;

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">Funil de Leads</h1>
            <p className="text-stone-600 dark:text-stone-400 mt-1">Gerencie e acompanhe o status dos seus leads</p>
          </div>
          <div className="space-x-2">
            <Dialog open={isAddingLead} onOpenChange={setIsAddingLead}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Lead
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Lead</DialogTitle>
                  <DialogDescription>Insira as informações do novo lead.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="new-company">Empresa</Label>
                    <Input 
                      id="new-company" 
                      value={newLead.company || ''} 
                      onChange={(e) => setNewLead({...newLead, company: e.target.value})} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-value">Valor estimado</Label>
                    <Input 
                      id="new-value" 
                      type="number" 
                      value={newLead.value || ''} 
                      onChange={(e) => setNewLead({...newLead, value: parseFloat(e.target.value)})} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-material">Material</Label>
                    <Input 
                      id="new-material" 
                      value={newLead.material || ''} 
                      onChange={(e) => setNewLead({...newLead, material: e.target.value})} 
                    />
                  </div>
                  <div>
                    <Label>Data de contato</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newLead.lastContact ? format(newLead.lastContact, 'PPP', { locale: ptBR }) : <span>Selecione uma data</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newLead.lastContact || undefined}
                          onSelect={(date) => setNewLead({...newLead, lastContact: date})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>Etapa do funil</Label>
                    <Select onValueChange={setNewLeadColumn}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma etapa" />
                      </SelectTrigger>
                      <SelectContent>
                        {columns.map(column => (
                          <SelectItem key={column.id} value={column.id}>
                            {column.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingLead(false)}>Cancelar</Button>
                  <Button onClick={handleAddLead}>Adicionar Lead</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddingColumn} onOpenChange={setIsAddingColumn}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Etapa
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Etapa</DialogTitle>
                  <DialogDescription>Crie uma nova etapa para o funil de vendas.</DialogDescription>
                </DialogHeader>
                <div>
                  <Label htmlFor="column-title">Nome da etapa</Label>
                  <Input 
                    id="column-title" 
                    value={newColumnTitle} 
                    onChange={(e) => setNewColumnTitle(e.target.value)} 
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingColumn(false)}>Cancelar</Button>
                  <Button onClick={handleAddColumn}>Adicionar Etapa</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </motion.div>

      <div className="overflow-x-auto pb-6">
        <div className="min-w-[900px]">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
          >
            <div className="grid grid-cols-5 gap-4">
              {columns.map((column) => (
                <div
                  key={column.id}
                  className="bg-stone-100 dark:bg-stone-900/60 p-4 rounded-lg"
                >
                  <h3 className="font-medium text-stone-900 dark:text-stone-100 mb-4 flex items-center justify-between">
                    <span>{column.title}</span>
                    <Badge variant="secondary" className="ml-2">
                      {column.items.length}
                    </Badge>
                  </h3>
                  
                  <SortableContext
                    items={column.items.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="min-h-[200px]">
                      {column.items.map((item) => (
                        <SortableItem key={item.id} lead={item} />
                      ))}
                    </div>
                  </SortableContext>
                </div>
              ))}
            </div>
            
            <DragOverlay>
              {activeId && activeLead ? (
                <div className="opacity-80">
                  <LeadCard lead={activeLead} />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default LeadFunnelPage;
