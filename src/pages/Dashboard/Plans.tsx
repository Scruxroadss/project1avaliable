
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Rocket, Shield, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PlansPage: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubscribe = (plan: string) => {
    toast({
      title: "Assinatura iniciada",
      description: `Você selecionou o plano ${plan}. Redirecionando para pagamento...`,
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold tracking-tight dark:text-white">Planos e Assinaturas</h1>
        <p className="text-stone-600 dark:text-stone-400 mt-1">Escolha o plano ideal para potencializar seus resultados com leads qualificados</p>
      </motion.div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Plano Inicial */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="border-stone-200 dark:border-stone-700 dark:bg-stone-900 h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Starter
                </CardTitle>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold dark:text-white">R$ 997</span>
                <span className="text-stone-500 dark:text-stone-400 ml-1">/mês</span>
              </div>
              <CardDescription className="mt-2 dark:text-stone-400">
                Para empresas que estão iniciando com prospecção estruturada
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600 dark:text-stone-300"><strong>20 leads</strong> qualificados por semana</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600 dark:text-stone-300">Acesso ao painel completo</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600 dark:text-stone-300">Integrações básicas (WhatsApp, Email)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600 dark:text-stone-300">Filtros regionais</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600 dark:text-stone-300">Suporte por email</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-stone-900" onClick={() => handleSubscribe("Starter")}>
                Assinar Agora
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
        
        {/* Plano Growth */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border-amber-200 dark:border-amber-800/50 shadow-md relative overflow-hidden h-full flex flex-col dark:bg-stone-900">
            <div className="absolute top-0 right-0 bg-amber-500 text-stone-900 px-4 py-1 rounded-bl-lg text-xs font-medium">Mais Popular</div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <Rocket className="h-5 w-5 text-amber-500" />
                Aceleração
              </CardTitle>
              <div className="mt-4">
                <span className="text-3xl font-bold dark:text-white">R$ 2.997</span>
                <span className="text-stone-500 dark:text-stone-400 ml-1">/mês</span>
              </div>
              <CardDescription className="mt-2 dark:text-stone-400">
                Para empresas em fase de crescimento e expansão
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600 dark:text-stone-300"><strong>50 leads</strong> qualificados por semana</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600 dark:text-stone-300">Acesso ao painel avançado com analytics</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600 dark:text-stone-300">Todas as integrações disponíveis</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600 dark:text-stone-300">Filtros avançados (região, porte, etc.)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600 dark:text-stone-300">Suporte prioritário via WhatsApp</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600 dark:text-stone-300">Relatórios de desempenho semanais</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-stone-900" onClick={() => handleSubscribe("Aceleração")}>
                Assinar Agora
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
        
        {/* Plano GrowthHacking */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="border-stone-200 dark:border-stone-700 dark:bg-stone-900 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <Brain className="h-5 w-5 text-amber-500" />
                Expansão Total
              </CardTitle>
              <div className="mt-4">
                <span className="text-3xl font-bold dark:text-white">R$ 13.997</span>
                <span className="text-stone-500 dark:text-stone-400 ml-1">/mês</span>
              </div>
              <CardDescription className="mt-2 dark:text-stone-400">
                Solução completa para crescimento acelerado
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600 dark:text-stone-300"><strong>80 leads</strong> qualificados por semana</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600 dark:text-stone-300">Painel executivo com BI integrado</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600 dark:text-stone-300">Integrações avançadas + API personalizada</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600 dark:text-stone-300">IA customizada para análise de leads</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600 dark:text-stone-300">Consultoria especializada mensal</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600 dark:text-stone-300">Gerente de conta dedicado</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-600 dark:text-stone-300">Treinamento in-company para equipe</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleSubscribe("Expansão Total")}>
                Assinar Agora
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-8"
      >
        <Card className="dark:bg-stone-900 dark:border-stone-700">
          <CardHeader>
            <CardTitle className="dark:text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-amber-500" />
              Planos Sob Medida
            </CardTitle>
            <CardDescription className="dark:text-stone-400">
              Soluções personalizadas para grandes empresas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 space-y-3">
                <h3 className="font-semibold text-lg dark:text-white">Precisa de mais leads ou recursos personalizados?</h3>
                <p className="text-stone-600 dark:text-stone-300">
                  Oferecemos planos corporativos com volumes maiores de leads, personalização de filtros, 
                  integração com seus sistemas internos e acompanhamento dedicado.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="dark:text-stone-300">Volume personalizado de leads</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="dark:text-stone-300">Integrações personalizadas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="dark:text-stone-300">Gerente de conta dedicado</span>
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0">
                <Button className="px-8 bg-amber-500 hover:bg-amber-600 text-stone-900" size="lg">Entre em contato</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="border-t pt-6 mt-6 dark:border-stone-700"
      >
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Perguntas Frequentes</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium dark:text-white">Como funciona a cobrança?</h3>
            <p className="text-stone-600 dark:text-stone-300 mt-1">As assinaturas são mensais e renovadas automaticamente. Você pode cancelar a qualquer momento.</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Posso mudar de plano depois?</h3>
            <p className="text-stone-600 dark:text-stone-300 mt-1">Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças serão aplicadas no próximo ciclo de cobrança.</p>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">Como são selecionados os leads?</h3>
            <p className="text-stone-600 dark:text-stone-300 mt-1">Nossa IA analisa milhares de fontes para identificar empresas que demonstram interesse em produtos de mármore e granito, criando um perfil de match com sua empresa.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlansPage;
