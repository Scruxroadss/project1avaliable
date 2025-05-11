
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Calendar, Info, PieChart, Users, TrendingUp, Zap, BarChart3, Building, MessageCircle } from "lucide-react";

const Consulting = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  return (
    <div className="container mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-8">
          <Badge className="mb-4" variant="outline">Premium</Badge>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
            Consultoria Especializada
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Transforme seu negócio com nossa consultoria personalizada exclusiva para empresas do setor de rochas ornamentais
          </p>
        </motion.div>

        {/* Main Value Proposition */}
        <motion.div variants={itemVariants}>
          <Card className="border-none bg-gradient-to-r from-amber-500 to-amber-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Seu parceiro estratégico para crescimento acelerado</CardTitle>
              <CardDescription className="text-white/90">
                Consultoria premium com foco em resultados concretos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Nossa consultoria especializada oferece diagnóstico personalizado, implementação de melhorias e acompanhamento contínuo para empresas do setor de rochas ornamentais que desejam elevar seu patamar de vendas e operações.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-white bg-amber-600 rounded-full p-1" />
                  <span>Aumento médio de 34% em vendas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-white bg-amber-600 rounded-full p-1" />
                  <span>Otimização de processos internos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-white bg-amber-600 rounded-full p-1" />
                  <span>Capacitação personalizada da equipe</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-white bg-amber-600 rounded-full p-1" />
                  <span>Implementação de tecnologia comercial</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Calendar className="mr-2 h-4 w-4" />
                Agendar uma conversa
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Services Overview */}
        <motion.div variants={itemVariants}>
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Nossa abordagem</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                Um processo estruturado para transformar desafios em oportunidades e impulsionar o crescimento da sua empresa
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <PieChart className="h-5 w-5 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">1. Diagnóstico completo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-600 text-sm">
                    Análise detalhada do seu negócio, processos comerciais, equipe e resultados para identificar oportunidades de melhoria.
                  </p>
                </CardContent>
              </Card>
              
              {/* Card 2 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <Zap className="h-5 w-5 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">2. Plano de ação</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-600 text-sm">
                    Desenvolvimento de estratégias personalizadas com metas claras, indicadores de performance e prazos definidos.
                  </p>
                </CardContent>
              </Card>
              
              {/* Card 3 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="h-5 w-5 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">3. Implementação e acompanhamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-600 text-sm">
                    Suporte contínuo na implementação das ações, com reuniões periódicas para análise de resultados e ajustes necessários.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* Specialized Services */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Serviços especializados</CardTitle>
              <CardDescription>
                Soluções customizadas para as necessidades específicas do seu negócio
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
              <Tabs defaultValue="training" className="w-full">
                <TabsList className="w-full justify-start mb-4 overflow-x-auto">
                  <TabsTrigger value="training" className="flex gap-2 items-center">
                    <Users className="h-4 w-4" /> Treinamento de vendedores
                  </TabsTrigger>
                  <TabsTrigger value="processes" className="flex gap-2 items-center">
                    <BarChart3 className="h-4 w-4" /> Processos internos
                  </TabsTrigger>
                  <TabsTrigger value="technology" className="flex gap-2 items-center">
                    <Building className="h-4 w-4" /> Tecnologia comercial
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="training" className="space-y-4">
                  <div className="space-y-4 pt-2">
                    <h3 className="text-lg font-medium">Treinamento personalizado para equipes de vendas</h3>
                    <p className="text-stone-600">
                      Capacitamos sua equipe comercial com técnicas avançadas de vendas específicas para o mercado de rochas ornamentais, desde a abordagem inicial até o fechamento e pós-venda.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="bg-stone-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Habilidades desenvolvidas</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Técnicas de prospecção qualificada</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Argumentação técnica sobre materiais</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Negociação e tratamento de objeções</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Gestão de carteira de clientes</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-stone-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Metodologia</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Workshops presenciais</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Role-plays de situações reais</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Acompanhamento em campo</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Feedback individual e coletivo</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="processes" className="space-y-4">
                  <div className="space-y-4 pt-2">
                    <h3 className="text-lg font-medium">Otimização de processos internos</h3>
                    <p className="text-stone-600">
                      Reformulamos os fluxos de trabalho para eliminar ineficiências, reduzir custos e melhorar a experiência do cliente, desde o primeiro contato até a entrega final do projeto.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="bg-stone-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Áreas de atuação</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Gestão de estoque e logística</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Fluxo de orçamentos e aprovações</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Processos de medição e instalação</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Controle de qualidade e pós-venda</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-stone-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Benefícios</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Redução de tempo em até 40%</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Minimização de erros e retrabalho</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Aumento da satisfação do cliente</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Otimização de recursos humanos</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="technology" className="space-y-4">
                  <div className="space-y-4 pt-2">
                    <h3 className="text-lg font-medium">Implementação de tecnologia comercial</h3>
                    <p className="text-stone-600">
                      Integramos sistemas e ferramentas digitais para modernizar seu negócio, tornando-o mais competitivo e capacitado para atender às demandas do mercado atual.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="bg-stone-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Soluções tecnológicas</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">CRM especializado para o setor</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Visualização 3D de projetos</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Automação de orçamentos</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Controle digital de estoque</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-stone-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Resultados</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Agilidade em processos comerciais</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Melhor experiência para o cliente</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Decisões baseadas em dados</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Integração entre departamentos</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center pt-6">
              <Button>
                <Info className="mr-2 h-4 w-4" />
                Saiba mais sobre nossos serviços
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Testimonials */}
        <motion.div variants={itemVariants}>
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">O que nossos clientes dizem</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                Empresas que transformaram seus resultados com nossa consultoria
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <Card className="bg-stone-50 border-none">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">
                    "Resultados surpreendentes"
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-600 text-sm">
                    "O treinamento da nossa equipe de vendas resultou em um aumento de 42% no fechamento de negócios em apenas 3 meses. A metodologia é prática e os consultores realmente entendem do setor de rochas."
                  </p>
                </CardContent>
                <CardFooter>
                  <div>
                    <p className="font-medium text-sm">Carlos Mendes</p>
                    <p className="text-stone-500 text-xs">Diretor, Marmoraria Elite</p>
                  </div>
                </CardFooter>
              </Card>
              
              {/* Testimonial 2 */}
              <Card className="bg-stone-50 border-none">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">
                    "Otimização completa"
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-600 text-sm">
                    "A consultoria reformulou nossos processos internos, eliminando gargalos que nem sabíamos que existiam. Reduzimos o tempo de entrega em 30% e melhoramos a satisfação dos clientes."
                  </p>
                </CardContent>
                <CardFooter>
                  <div>
                    <p className="font-medium text-sm">Ana Paula Costa</p>
                    <p className="text-stone-500 text-xs">Gestora, Pedras Premium</p>
                  </div>
                </CardFooter>
              </Card>
              
              {/* Testimonial 3 */}
              <Card className="bg-stone-50 border-none">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">
                    "Transformação digital"
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-600 text-sm">
                    "A implementação do CRM e das ferramentas de visualização 3D revolucionou nossa forma de trabalhar. Os clientes ficam impressionados e nossos vendedores têm mais confiança para fechar negócios."
                  </p>
                </CardContent>
                <CardFooter>
                  <div>
                    <p className="font-medium text-sm">Roberto Silva</p>
                    <p className="text-stone-500 text-xs">CEO, Marmoraria Silva</p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants}>
          <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100">
            <CardHeader>
              <Badge className="w-fit mb-2" variant="outline">Exclusivo Plano GrowthHacking</Badge>
              <CardTitle className="text-2xl">Pronto para transformar seu negócio?</CardTitle>
              <CardDescription>
                Agende uma conversa com nossos especialistas e descubra como podemos impulsionar seus resultados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Consultoria inicial gratuita</p>
                  <p className="text-sm text-stone-600">Análise preliminar do seu negócio sem compromisso</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Agenda flexível</p>
                  <p className="text-sm text-stone-600">Horários que se adaptam à sua disponibilidade</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="w-full sm:w-auto">
                <Calendar className="mr-2 h-4 w-4" />
                Agendar consultoria
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Info className="mr-2 h-4 w-4" />
                Solicitar informações
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Estrelinha para os depoimentos
const Star = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

export default Consulting;
