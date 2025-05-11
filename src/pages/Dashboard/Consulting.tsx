
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Users, 
  LineChart, 
  PieChart, 
  Smartphone, 
  Trophy, 
  Check, 
  ChevronRight, 
  Calendar,
  ArrowUpRight,
  User2
} from "lucide-react";

const Consulting: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Solicitação enviada",
      description: "Nossa equipe entrará em contato em até 24 horas úteis.",
    });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="text-3xl font-bold tracking-tight dark:text-white">Consultoria Especializada</h1>
        <p className="text-stone-600 dark:text-stone-400 mt-1">
          Acelere seu crescimento com nossa consultoria personalizada para empresas do setor de rochas ornamentais
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna principal */}
        <motion.div 
          className="lg:col-span-2 space-y-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Hero card */}
          <motion.div variants={fadeIn}>
            <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-amber-50 to-stone-50 dark:from-stone-900 dark:to-stone-950 dark:border-stone-800">
              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 space-y-4">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400">Exclusivo Plano Expansão Total</Badge>
                  <h2 className="text-2xl font-bold dark:text-white">Transforme sua estratégia de vendas com especialistas do setor</h2>
                  <p className="text-stone-600 dark:text-stone-400">
                    Nossa consultoria premium oferece um diagnóstico completo e plano de ação personalizado para 
                    aumentar suas vendas e melhorar processos internos.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-amber-500 hover:bg-amber-600 text-stone-900">
                      Agendar diagnóstico inicial
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800">
                      Conhecer mais
                    </Button>
                  </div>
                </div>
                <div className="flex-shrink-0 w-full md:w-1/3 aspect-square bg-stone-200 dark:bg-stone-800 rounded-xl overflow-hidden relative flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                    alt="Consultoria AxieStone"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent"></div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Key benefits */}
          <motion.div variants={fadeIn} className="space-y-4">
            <h2 className="text-xl font-semibold dark:text-white flex items-center gap-2">
              <Brain className="h-5 w-5 text-amber-500" />
              Benefícios Principais
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="dark:bg-stone-900 dark:border-stone-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg dark:text-white flex items-center">
                    <Users className="h-5 w-5 text-amber-500 mr-2" />
                    Treinamento de Equipe
                  </CardTitle>
                </CardHeader>
                <CardContent className="dark:text-stone-300">
                  <p>Capacitação personalizada para sua equipe de vendas com técnicas específicas para o mercado de rochas ornamentais.</p>
                </CardContent>
              </Card>
              
              <Card className="dark:bg-stone-900 dark:border-stone-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg dark:text-white flex items-center">
                    <LineChart className="h-5 w-5 text-amber-500 mr-2" />
                    Diagnóstico de Processos
                  </CardTitle>
                </CardHeader>
                <CardContent className="dark:text-stone-300">
                  <p>Análise completa do seu funil de vendas, identificando gargalos e oportunidades de melhoria.</p>
                </CardContent>
              </Card>
              
              <Card className="dark:bg-stone-900 dark:border-stone-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg dark:text-white flex items-center">
                    <PieChart className="h-5 w-5 text-amber-500 mr-2" />
                    Inteligência de Mercado
                  </CardTitle>
                </CardHeader>
                <CardContent className="dark:text-stone-300">
                  <p>Insights exclusivos sobre tendências, concorrentes e novas oportunidades no setor de rochas ornamentais.</p>
                </CardContent>
              </Card>
              
              <Card className="dark:bg-stone-900 dark:border-stone-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg dark:text-white flex items-center">
                    <Smartphone className="h-5 w-5 text-amber-500 mr-2" />
                    Tecnologia Aplicada
                  </CardTitle>
                </CardHeader>
                <CardContent className="dark:text-stone-300">
                  <p>Implementação de ferramentas tecnológicas para otimizar processos e aumentar a eficiência operacional.</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
          
          {/* Results section */}
          <motion.div variants={fadeIn}>
            <Card className="dark:bg-stone-900 dark:border-stone-700">
              <CardHeader>
                <CardTitle className="text-xl dark:text-white flex items-center">
                  <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                  Resultados Comprovados
                </CardTitle>
                <CardDescription className="dark:text-stone-400">
                  Empresas que implementaram nossa consultoria especializada
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800">
                    <div className="text-3xl font-bold text-amber-600 mb-1">+73%</div>
                    <p className="text-sm text-stone-600 dark:text-stone-400">Aumento em vendas</p>
                  </div>
                  <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800">
                    <div className="text-3xl font-bold text-amber-600 mb-1">-35%</div>
                    <p className="text-sm text-stone-600 dark:text-stone-400">Redução no ciclo de vendas</p>
                  </div>
                  <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800">
                    <div className="text-3xl font-bold text-amber-600 mb-1">+42%</div>
                    <p className="text-sm text-stone-600 dark:text-stone-400">Aumento em ticket médio</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start pt-4 border-t dark:border-stone-700">
                <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">
                  *Média de resultados obtidos por clientes após 6 meses de implementação
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="dark:border-stone-700">Marmorarias Brasil</Badge>
                  <Badge variant="outline" className="dark:border-stone-700">StoneTech SP</Badge>
                  <Badge variant="outline" className="dark:border-stone-700">Granitos Premium</Badge>
                  <Badge variant="outline" className="dark:border-stone-700">+ 16 empresas</Badge>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
          
          {/* Process */}
          <motion.div variants={fadeIn}>
            <Card className="dark:bg-stone-900 dark:border-stone-700">
              <CardHeader>
                <CardTitle className="text-xl dark:text-white">Como funciona</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 flex items-center justify-center mr-3 mt-0.5">1</div>
                    <div>
                      <h3 className="font-medium dark:text-white">Diagnóstico Inicial</h3>
                      <p className="text-stone-600 dark:text-stone-400 mt-1">
                        Análise completa da sua operação atual, identificando pontos fortes e oportunidades de melhoria
                        em vendas, marketing e processos internos.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 flex items-center justify-center mr-3 mt-0.5">2</div>
                    <div>
                      <h3 className="font-medium dark:text-white">Plano de Ação Personalizado</h3>
                      <p className="text-stone-600 dark:text-stone-400 mt-1">
                        Desenvolvemos estratégias específicas para seu negócio, considerando seu orçamento, recursos
                        e objetivos a curto, médio e longo prazo.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 flex items-center justify-center mr-3 mt-0.5">3</div>
                    <div>
                      <h3 className="font-medium dark:text-white">Implementação Assistida</h3>
                      <p className="text-stone-600 dark:text-stone-400 mt-1">
                        Nossa equipe trabalha junto com você na implementação das mudanças, garantindo a correta
                        execução das estratégias propostas.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 flex items-center justify-center mr-3 mt-0.5">4</div>
                    <div>
                      <h3 className="font-medium dark:text-white">Acompanhamento e Ajustes</h3>
                      <p className="text-stone-600 dark:text-stone-400 mt-1">
                        Monitoramento contínuo dos resultados, com reuniões mensais para análise de indicadores e
                        ajustes necessários nas estratégias.
                      </p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* Sidebar */}
        <motion.div 
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Form card */}
          <motion.div variants={fadeIn}>
            <Card className="dark:bg-stone-900 dark:border-stone-700">
              <CardHeader className="pb-2">
                <CardTitle className="dark:text-white">Solicite um contato</CardTitle>
                <CardDescription className="dark:text-stone-400">
                  Preencha o formulário e nossa equipe entrará em contato
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-stone-300" htmlFor="name">Nome completo</label>
                    <Input id="name" placeholder="Seu nome" className="dark:bg-stone-800 dark:border-stone-700" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-stone-300" htmlFor="company">Empresa</label>
                    <Input id="company" placeholder="Nome da sua empresa" className="dark:bg-stone-800 dark:border-stone-700" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-stone-300" htmlFor="email">E-mail</label>
                    <Input id="email" type="email" placeholder="seu@email.com" className="dark:bg-stone-800 dark:border-stone-700" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-stone-300" htmlFor="phone">Telefone</label>
                    <Input id="phone" placeholder="(00) 00000-0000" className="dark:bg-stone-800 dark:border-stone-700" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-stone-300" htmlFor="message">Mensagem (opcional)</label>
                    <Textarea 
                      id="message" 
                      placeholder="Descreva brevemente seu interesse na consultoria"
                      rows={3}
                      className="resize-none dark:bg-stone-800 dark:border-stone-700"
                    />
                  </div>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-stone-900" type="submit">
                    Enviar solicitação
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Consultant card */}
          <motion.div variants={fadeIn}>
            <Card className="dark:bg-stone-900 dark:border-stone-700">
              <CardHeader>
                <CardTitle className="dark:text-white text-lg">Conheça nossos consultores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center overflow-hidden">
                    <User2 className="h-6 w-6 text-stone-400" />
                  </div>
                  <div>
                    <h3 className="font-medium dark:text-white">Carlos Mendes</h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400">Especialista em Vendas B2B</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center overflow-hidden">
                    <User2 className="h-6 w-6 text-stone-400" />
                  </div>
                  <div>
                    <h3 className="font-medium dark:text-white">Ana Oliveira</h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400">Especialista em Processos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center overflow-hidden">
                    <User2 className="h-6 w-6 text-stone-400" />
                  </div>
                  <div>
                    <h3 className="font-medium dark:text-white">Roberto Santos</h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400">Especialista em Tecnologia</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full flex items-center justify-center mt-2 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800">
                  Ver todos os consultores
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* FAQ card */}
          <motion.div variants={fadeIn}>
            <Card className="dark:bg-stone-900 dark:border-stone-700">
              <CardHeader>
                <CardTitle className="dark:text-white text-lg">Perguntas frequentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium dark:text-white">Qual o investimento necessário?</h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                    O serviço de consultoria está disponível no plano Expansão Total, com valor a partir de R$ 13.997/mês.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">Quanto tempo dura o processo?</h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                    O programa padrão tem duração de 3 meses, mas pode ser estendido conforme necessidade.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">Preciso estar no plano Expansão Total?</h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                    Sim, a consultoria especializada é um benefício exclusivo do plano Expansão Total.
                  </p>
                </div>
                <Button variant="link" className="p-0 h-auto text-amber-600 dark:text-amber-400">Ver todas as perguntas</Button>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Testimonial card */}
          <motion.div variants={fadeIn}>
            <Card className="bg-stone-50 dark:bg-stone-900 dark:border-stone-700 overflow-hidden">
              <div className="px-6 pt-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <User2 className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-medium dark:text-white">Roberto Almeida</h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400">Diretor • Mármores & Granitos Brasil</p>
                  </div>
                </div>
              </div>
              <CardContent className="pt-4">
                <div className="text-stone-600 dark:text-stone-300 relative">
                  <span className="text-4xl text-amber-300 dark:text-amber-700 absolute top-0 left-0">"</span>
                  <p className="pl-6 pt-2">
                    A consultoria transformou a maneira como abordamos nossos clientes. Os resultados foram imediatos: aumentamos em 58% nossas vendas já no primeiro trimestre.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Call to action */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.5 }}
      >
        <Card className="mt-8 border-0 shadow-lg bg-gradient-to-r from-amber-500 to-amber-600 text-stone-900 dark:text-stone-50">
          <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Pronto para transformar seu negócio?</h2>
              <p className="opacity-90">
                Agende agora uma consulta inicial gratuita com nossos especialistas
              </p>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5" />
                <span>Sem compromisso</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>30 minutos de diagnóstico inicial</span>
              </div>
            </div>
            <div>
              <Button className="bg-white hover:bg-stone-100 text-amber-600" size="lg">
                Agendar consulta gratuita
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Consulting;
