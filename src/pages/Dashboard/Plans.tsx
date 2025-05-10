
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PlansPage: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubscribe = (plan: string) => {
    toast({
      title: "Assinatura iniciada",
      description: `Você selecionou o plano ${plan}. Redirecionando para pagamento...`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Planos e Pagamentos</h1>
        <p className="text-stone-600 mt-1">Escolha o plano ideal para o crescimento do seu negócio</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Free Plan */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Plano Gratuito</CardTitle>
              <Badge className="bg-green-50 text-green-600 hover:bg-green-100">Ativo</Badge>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold">R$ 0</span>
              <span className="text-stone-500 ml-1">/mês</span>
            </div>
            <CardDescription className="mt-2">
              Ideal para pequenas empresas que estão começando
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-stone-600">10 leads qualificados por mês</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-stone-600">Acesso ao painel básico</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-stone-600">1 integração (WhatsApp)</span>
              </li>
              <li className="flex items-start text-stone-400">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>Sem filtros regionais</span>
              </li>
              <li className="flex items-start text-stone-400">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>Sem suporte prioritário</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-stone-200 text-stone-800 hover:bg-stone-300" disabled>
              Plano Atual
            </Button>
          </CardFooter>
        </Card>
        
        {/* Essential Plan */}
        <Card className="border-amber-200 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-500 text-white px-4 py-1 rounded-bl-lg text-xs font-medium">Mais Popular</div>
          <CardHeader>
            <CardTitle>Plano Essencial</CardTitle>
            <div className="mt-4">
              <span className="text-3xl font-bold">R$ 397</span>
              <span className="text-stone-500 ml-1">/mês</span>
            </div>
            <CardDescription className="mt-2">
              Para empresas que buscam crescimento constante
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-stone-600">40 leads qualificados por mês</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-stone-600">Acesso ao painel completo</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-stone-600">Todas as integrações disponíveis</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-stone-600">Filtros regionais</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-stone-600">Suporte via email</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-amber-500 hover:bg-amber-600" onClick={() => handleSubscribe("Essencial")}>
              Assinar Agora
            </Button>
          </CardFooter>
        </Card>
        
        {/* Premium Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Plano Premium</CardTitle>
            <div className="mt-4">
              <span className="text-3xl font-bold">R$ 697</span>
              <span className="text-stone-500 ml-1">/mês</span>
            </div>
            <CardDescription className="mt-2">
              Solução completa para empresas estabelecidas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-stone-600">100 leads qualificados por mês</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-stone-600">Painel avançado com análises</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-stone-600">Todas as integrações + API</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-stone-600">Filtros avançados (região, porte)</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-stone-600">Suporte prioritário (WhatsApp)</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-stone-600">Consultoria mensal de vendas</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handleSubscribe("Premium")}>
              Assinar Agora
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Planos Corporativos</CardTitle>
            <CardDescription>
              Soluções personalizadas para grandes empresas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 space-y-3">
                <h3 className="font-semibold text-lg">Precisa de mais leads ou recursos personalizados?</h3>
                <p className="text-stone-600">
                  Oferecemos planos corporativos com volumes maiores de leads, personalização de filtros, 
                  integração com seus sistemas internos e acompanhamento dedicado.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Volume personalizado de leads</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Integrações personalizadas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Gerente de conta dedicado</span>
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0">
                <Button className="px-8" size="lg">Entre em contato</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="border-t pt-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Perguntas Frequentes</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium">Como funciona a cobrança?</h3>
            <p className="text-stone-600 mt-1">As assinaturas são mensais e renovadas automaticamente. Você pode cancelar a qualquer momento.</p>
          </div>
          <div>
            <h3 className="font-medium">Posso mudar de plano depois?</h3>
            <p className="text-stone-600 mt-1">Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças serão aplicadas no próximo ciclo de cobrança.</p>
          </div>
          <div>
            <h3 className="font-medium">Como são selecionados os leads?</h3>
            <p className="text-stone-600 mt-1">Nossa IA analisa milhares de fontes para identificar empresas que demonstram interesse em produtos de mármore e granito, criando um perfil de match com sua empresa.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;
