
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    setFormData({
      ...formData,
      [id]: value
    });
    
    // Limpa o erro do campo que está sendo editado
    if (errors[id as keyof typeof errors]) {
      setErrors({
        ...errors,
        [id]: ''
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Senha é obrigatória';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Nome da empresa é obrigatório';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, corrija os campos destacados.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulando um atraso da API
    setTimeout(() => {
      toast({
        title: "Conta criada com sucesso",
        description: "Bem-vindo ao Radar de Oportunidades B2B!",
      });
      
      // Navegação para o dashboard após cadastro bem-sucedido
      navigate('/dashboard');
      setIsSubmitting(false);
    }, 1500);
  };
  
  const features = [
    "Acesso a 10 leads gratuitos por semana",
    "Exportação para WhatsApp e Excel",
    "Contatos diretos dos decisores",
    "Suporte por chat"
  ];
  
  return (
    <div className="min-h-screen bg-stone-50/50">
      <Navbar />
      <main className="py-12 lg:py-20 animate-fade-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-block bg-amber-100 text-amber-800 font-medium rounded-full px-4 py-1 text-sm mb-6">
                Comece grátis, sem cartão de crédito
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-balance">
                Cadastre-se e tenha acesso a <span className="text-amber-500">leads B2B qualificados</span> para sua empresa
              </h1>
              <p className="text-lg mb-8 text-stone-600 max-w-lg mx-auto lg:mx-0">
                Entre para a comunidade de empresas que estão prospectando de forma inteligente e automatizada.
              </p>
              
              <div className="bg-white/80 backdrop-blur-sm border border-stone-100 rounded-xl p-6 mb-8 shadow-sm">
                <h3 className="text-lg font-medium mb-4">No plano gratuito você recebe:</h3>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-3 mt-1 bg-amber-100 rounded-full p-0.5">
                        <Check className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-stone-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-soft border border-stone-100 p-8 lg:p-10 animate-zoom-in">
              <h2 className="text-2xl font-bold mb-6">Crie sua conta</h2>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-stone-700">
                    Nome completo
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors",
                      errors.name ? "border-red-300 bg-red-50" : "border-stone-300"
                    )}
                    placeholder="Seu nome" 
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-stone-700">
                    Email profissional
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors",
                      errors.email ? "border-red-300 bg-red-50" : "border-stone-300"
                    )}
                    placeholder="seu@email.com" 
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-stone-700">
                    Senha
                  </label>
                  <input 
                    type="password" 
                    id="password" 
                    value={formData.password}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors",
                      errors.password ? "border-red-300 bg-red-50" : "border-stone-300"
                    )}
                    placeholder="Crie uma senha segura" 
                  />
                  {errors.password && (
                    <p className="text-xs text-red-600 mt-1">{errors.password}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-stone-700">
                    Empresa
                  </label>
                  <input 
                    type="text" 
                    id="company" 
                    value={formData.company}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors",
                      errors.company ? "border-red-300 bg-red-50" : "border-stone-300"
                    )}
                    placeholder="Nome da sua empresa" 
                  />
                  {errors.company && (
                    <p className="text-xs text-red-600 mt-1">{errors.company}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white text-base rounded-lg shadow transition-all duration-200 hover:shadow-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Criando conta...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Criar conta gratuita
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>
              </form>
              
              <p className="mt-6 text-sm text-stone-500 text-center">
                Ao criar uma conta, você concorda com nossos
                <a href="#" className="text-amber-600 hover:text-amber-700 hover:underline mx-1">Termos de Serviço</a>
                e
                <a href="#" className="text-amber-600 hover:text-amber-700 hover:underline ml-1">Política de Privacidade</a>.
              </p>
              
              <div className="mt-8 text-center">
                <p className="text-stone-600">
                  Já possui uma conta?
                  <Button 
                    variant="link" 
                    className="text-amber-600 hover:text-amber-700 hover:underline p-0 h-auto font-medium ml-1"
                    onClick={() => navigate('/dashboard/login')}
                  >
                    Entrar
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
