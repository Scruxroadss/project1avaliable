
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Check, ChevronDown, Smartphone, FileSpreadsheet, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const IntegrationsPage: React.FC = () => {
  const { toast } = useToast();
  
  const handleConnect = (service: string) => {
    toast({
      title: "Conectando a " + service,
      description: "Iniciando processo de conexão...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Integrações</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* WhatsApp Integration */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-green-500" />
                WhatsApp
              </CardTitle>
              <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-100">Desconectado</Badge>
            </div>
            <CardDescription>
              Receba novos leads diretamente no WhatsApp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-stone-600">
              Conecte seu WhatsApp para receber notificações instantâneas quando novos leads chegarem. Ideal para resposta rápida.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between pt-4 border-t">
            <Button variant="outline" className="w-full" onClick={() => handleConnect("WhatsApp")}>
              Conectar WhatsApp
            </Button>
          </CardFooter>
        </Card>
        
        {/* Google Sheets Integration */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-green-500" />
                Google Sheets
              </CardTitle>
              <Badge variant="outline" className="bg-amber-50 text-amber-600 hover:bg-amber-100">Pendente</Badge>
            </div>
            <CardDescription>
              Exporte seus leads automaticamente para planilhas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-stone-600">
              Mantenha planilhas atualizadas com todos os seus leads. Configure exportação automática diária, semanal ou mensal.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between pt-4 border-t">
            <Button variant="outline" className="w-full" onClick={() => handleConnect("Google Sheets")}>
              Continuar Configuração
            </Button>
          </CardFooter>
        </Card>
        
        {/* CRM Integration */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-500" />
                CRMs
              </CardTitle>
              <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-100">Conectado</Badge>
            </div>
            <CardDescription>
              Sincronize leads com seu sistema de CRM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-stone-600 mb-4">
              Mantenha seu CRM atualizado com leads qualificados. Suporte para os principais sistemas do mercado.
            </p>
            
            <Collapsible className="border rounded-md">
              <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left">
                <span className="font-medium">Detalhes da Conexão</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 border-t">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Serviço conectado</span>
                    <span className="text-sm font-medium">RD Station</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status da sincronização</span>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">Ativo</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Última sincronização</span>
                    <span className="text-sm">Hoje, 14:30</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
          <CardFooter className="flex justify-between pt-4 border-t">
            <Button variant="outline" className="w-full">
              Gerenciar Conexão
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Integrações Disponíveis em Breve</CardTitle>
          <CardDescription>
            Estamos trabalhando para adicionar mais integrações ao Radar B2B
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Pipedrive</h3>
              <p className="text-sm text-stone-600">Sincronize leads diretamente para seu funil de vendas no Pipedrive.</p>
              <Badge variant="outline" className="mt-3 bg-stone-50">Em breve</Badge>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">HubSpot</h3>
              <p className="text-sm text-stone-600">Integração completa com a plataforma de marketing e vendas da HubSpot.</p>
              <Badge variant="outline" className="mt-3 bg-stone-50">Em breve</Badge>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Email Marketing</h3>
              <p className="text-sm text-stone-600">Crie campanhas segmentadas baseadas nos leads capturados.</p>
              <Badge variant="outline" className="mt-3 bg-stone-50">Em breve</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationsPage;
