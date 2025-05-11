
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleDemoClick = () => {
    navigate('/demo');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-stone-50/30 py-16 sm:py-24">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-100 mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-amber-200 mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="max-w-2xl" variants={itemVariants}>
            <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span className="bg-amber-500 w-2 h-2 rounded-full mr-2"></span>
              Plataforma de prospecção inteligente
            </div>

            <h1 className="mb-6 text-4xl sm:text-5xl font-bold tracking-tight text-balance">
              <span className="block font-bold text-stone-800">Prospecção inteligente para o</span>
              <span className="text-amber-500 relative">
                setor de rochas ornamentais
                <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 300 6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M300 3C175 3 175 3.00001 125 3.00001C75 3.00001 75 3 0 3" stroke="#F9802D" strokeWidth="5" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl mb-8 text-stone-600 max-w-lg">
              Descubra <span className="highlight">leads qualificados</span> semanalmente para sua empresa 
              de mármore e granito. Sem trabalho manual, sem desperdiçar tempo.
            </p>
            
            <motion.div 
              className="space-y-4 mb-8"
              variants={{ 
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 }
                }
              }}
              initial="hidden"
              animate="visible"
            >
              {[
                { text: "Receba até ", highlight: "50 leads qualificados", rest: " semanalmente" },
                { text: "Dados completos: ", highlight: "contatos, decisores, interesse", rest: "" },
                { text: "Integração com ", highlight: "CRM e WhatsApp", rest: "" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex items-start"
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    visible: { x: 0, opacity: 1, transition: { duration: 0.4 } }
                  }}
                >
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-amber-600" />
                    </div>
                  </div>
                  <p className="text-stone-700">
                    {item.text}
                    <span className="font-semibold">{item.highlight}</span>
                    {item.rest}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-base h-12 px-6"
                onClick={() => navigate('/signup')}
              >
                Começar grátis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-stone-300 hover:bg-stone-50 rounded-lg text-base h-12 px-6"
                onClick={handleDemoClick}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver demonstração
              </Button>
            </motion.div>
            
            <p className="text-stone-500 text-sm mt-4">
              Não precisa de cartão de crédito | Plano gratuito disponível
            </p>
          </motion.div>
          
          <motion.div 
            className="lg:ml-auto"
            variants={itemVariants}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div 
              className="bg-white rounded-2xl shadow-soft border border-stone-200 overflow-hidden"
              animate={isHovered ? { y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)" } : {}}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-6 sm:p-8">
                <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-100">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-amber-800">Leads desta semana</h3>
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                      10 novos
                    </span>
                  </div>
                  <p className="text-amber-600 mt-1">Leads qualificados disponíveis para contato</p>
                </div>
                
                <div className="space-y-5">
                  {[
                    {
                      name: "Construtora Rio Verde Ltda",
                      location: "São Paulo, SP",
                      industry: "Construção Civil",
                      contact: "Carlos Silva, Comprador",
                      match: 95
                    },
                    {
                      name: "Arquitetos Associados",
                      location: "Rio de Janeiro, RJ",
                      industry: "Arquitetura",
                      contact: "Maria Oliveira, Diretora",
                      match: 92
                    },
                    {
                      name: "Elementos Design",
                      location: "Belo Horizonte, MG",
                      industry: "Design de Interiores",
                      contact: "Paulo Santos, Proprietário",
                      match: 88
                    }
                  ].map((lead, idx) => (
                    <motion.div 
                      key={idx} 
                      className="border-b border-stone-100 pb-5 last:border-b-0 last:pb-0"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                    >
                      <div className="flex justify-between mb-1.5">
                        <h4 className="font-medium text-stone-900">{lead.name}</h4>
                        <span 
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            lead.match > 90 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {lead.match}% Match
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-stone-500">
                          {lead.location} • {lead.industry}
                        </p>
                      </div>
                      <div className="flex items-center text-sm mt-2 justify-between">
                        <span className="flex items-center text-stone-600">
                          <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1.5"></span>
                          {lead.contact}
                        </span>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                          Ver detalhes
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <Button 
                  className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white"
                  onClick={() => navigate('/signup')}
                >
                  Ver todos os leads
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
