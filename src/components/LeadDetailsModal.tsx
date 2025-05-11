
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface LeadDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId?: string | number;
}

interface LeadDetail {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: 'novo' | 'contatado' | 'qualificado' | 'negociação' | 'fechado';
  value: number;
  date: string;
  notes: string;
  interactions: {
    type: string;
    date: string;
    description: string;
  }[];
  documents: {
    name: string;
    type: string;
    date: string;
  }[];
  materials: {
    name: string;
    quantity: string;
  }[];
}

// Função auxiliar para criar dados de demonstração
const createDemoLead = (id: string | number): LeadDetail => {
  return {
    id,
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    source: "Facebook Ads",
    status: "qualificado",
    value: 75000,
    date: "2023-05-15",
    notes: "Cliente interessado em mármores importados para projeto residencial de alto padrão. Tem urgência para finalizar em 3 meses.",
    interactions: [
      {
        type: "Email",
        date: "2023-05-15",
        description: "Enviado catálogo de produtos"
      },
      {
        type: "Chamada",
        date: "2023-05-17",
        description: "Apresentação inicial dos materiais disponíveis"
      },
      {
        type: "Reunião",
        date: "2023-05-20",
        description: "Demonstração de amostras na loja"
      }
    ],
    documents: [
      {
        name: "Orçamento inicial",
        type: "PDF",
        date: "2023-05-18"
      },
      {
        name: "Catálogo personalizado",
        type: "PDF",
        date: "2023-05-16"
      }
    ],
    materials: [
      {
        name: "Mármore Carrara",
        quantity: "35m²"
      },
      {
        name: "Granito Verde Ubatuba",
        quantity: "12m²"
      }
    ]
  };
};

export function LeadDetailsModal({ isOpen, onClose, leadId }: LeadDetailsModalProps) {
  const [leadData, setLeadData] = useState<LeadDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen && leadId) {
      setIsLoading(true);
      // Simulando carregamento de dados
      setTimeout(() => {
        // Em uma implementação real, aqui seria feita uma chamada à API
        setLeadData(createDemoLead(leadId));
        setIsLoading(false);
      }, 800);
    }
  }, [isOpen, leadId]);

  // Cores por status
  const statusColors: Record<string, string> = {
    novo: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    contatado: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    qualificado: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    negociação: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    fechado: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
  };

  // Formatar valor para moeda brasileira
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Formatar data para formato brasileiro
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 border-4 border-t-amber-500 border-stone-200 rounded-full animate-spin"></div>
          </div>
        ) : leadData ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex flex-wrap items-center gap-3">
                {leadData.name}
                <Badge className={`${statusColors[leadData.status]} ml-2`}>
                  {leadData.status.charAt(0).toUpperCase() + leadData.status.slice(1)}
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-base flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-4 mt-2">
                <div>
                  <span className="font-medium text-stone-600 dark:text-stone-300">Email:</span> {leadData.email}
                </div>
                <div>
                  <span className="font-medium text-stone-600 dark:text-stone-300">Telefone:</span> {leadData.phone}
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="mt-2">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                  <TabsTrigger value="interactions">Interações</TabsTrigger>
                  <TabsTrigger value="documents">Documentos</TabsTrigger>
                  <TabsTrigger value="materials">Materiais</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="grid gap-4 mb-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg bg-stone-50 dark:bg-stone-900/50 dark:border-stone-800">
                          <h3 className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-1">Origem</h3>
                          <p className="text-lg font-medium">{leadData.source}</p>
                        </div>
                        <div className="p-4 border rounded-lg bg-stone-50 dark:bg-stone-900/50 dark:border-stone-800">
                          <h3 className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-1">Valor Estimado</h3>
                          <p className="text-lg font-medium text-emerald-600 dark:text-emerald-500">{formatCurrency(leadData.value)}</p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-stone-100 dark:bg-stone-800 px-4 py-2 font-medium">Detalhes do Lead</div>
                        <div className="p-4 space-y-3">
                          <div>
                            <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400">Data de Entrada</h4>
                            <p>{formatDate(leadData.date)}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400">Observações</h4>
                            <p className="text-stone-700 dark:text-stone-300 whitespace-pre-wrap">{leadData.notes}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="interactions">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ul className="space-y-3">
                      {leadData.interactions.map((interaction, idx) => (
                        <li key={idx} className="border rounded-lg p-4 bg-white dark:bg-stone-950 dark:border-stone-800">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between mb-1">
                            <h3 className="font-medium">{interaction.type}</h3>
                            <Badge variant="outline" className="w-fit dark:border-stone-700">
                              {formatDate(interaction.date)}
                            </Badge>
                          </div>
                          <p className="text-stone-700 dark:text-stone-300">{interaction.description}</p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="documents">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ul className="space-y-2">
                      {leadData.documents.map((doc, idx) => (
                        <li key={idx} className="border rounded-lg p-3 flex items-center justify-between bg-white dark:bg-stone-950 dark:border-stone-800">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-md bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                              {doc.type}
                            </div>
                            <span>{doc.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-stone-500 dark:text-stone-400">{formatDate(doc.date)}</span>
                            <Button variant="outline" size="sm">Ver</Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="materials">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="border rounded-lg overflow-hidden dark:border-stone-800">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50">
                            <th className="text-left p-3">Material</th>
                            <th className="text-right p-3">Quantidade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leadData.materials.map((material, idx) => (
                            <tr key={idx} className={`border-b dark:border-stone-800 ${idx % 2 === 0 ? 'bg-white dark:bg-stone-950' : 'bg-stone-50 dark:bg-stone-900/20'}`}>
                              <td className="p-3">{material.name}</td>
                              <td className="p-3 text-right">{material.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={onClose} className="mt-4">
                Fechar
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-stone-600 dark:text-stone-400">Nenhum dado encontrado para este lead.</p>
            <Button variant="outline" onClick={onClose} className="mt-4">
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default LeadDetailsModal;
