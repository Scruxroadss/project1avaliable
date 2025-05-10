
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.password || !formData.company) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    // Show success message
    toast({
      title: "Conta criada com sucesso",
      description: "Bem-vindo ao Radar de Oportunidades B2B!",
    });

    // Navigate to dashboard after successful signup
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-6">Comece Grátis</h1>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-stone-600">
              Crie sua conta gratuita na MineraLeads e comece a receber leads qualificados semanalmente.
            </p>
            
            <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md border border-stone-100">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2 text-left">
                  <label htmlFor="name" className="text-sm font-medium text-stone-700">Nome completo</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Seu nome" 
                  />
                </div>
                
                <div className="space-y-2 text-left">
                  <label htmlFor="email" className="text-sm font-medium text-stone-700">Email profissional</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="seu@email.com" 
                  />
                </div>
                
                <div className="space-y-2 text-left">
                  <label htmlFor="password" className="text-sm font-medium text-stone-700">Senha</label>
                  <input 
                    type="password" 
                    id="password" 
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Crie uma senha segura" 
                  />
                </div>
                
                <div className="space-y-2 text-left">
                  <label htmlFor="company" className="text-sm font-medium text-stone-700">Empresa</label>
                  <input 
                    type="text" 
                    id="company" 
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Nome da sua empresa" 
                  />
                </div>
                
                <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-stone-900">
                  Criar conta gratuita
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              
              <p className="mt-4 text-sm text-stone-500">
                Ao criar uma conta, você concorda com nossos
                <a href="#" className="text-amber-600 hover:underline mx-1">Termos de Serviço</a>
                e
                <a href="#" className="text-amber-600 hover:underline ml-1">Política de Privacidade</a>.
              </p>
            </div>
            
            <p className="mt-8 text-stone-500">
              Já possui uma conta?
              <Button variant="link" className="p-0 h-auto text-amber-600 hover:underline ml-1"
                onClick={() => navigate('/dashboard/login')}>
                Entrar
              </Button>
            </p>
            
            <Button 
              variant="outline" 
              className="mt-6" 
              onClick={() => navigate('/')}
            >
              Voltar para a página inicial
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
