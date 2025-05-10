
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Demo = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-6">Agendar Demonstração</h1>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-stone-600">
              Complete o formulário abaixo para agendar uma demonstração personalizada da plataforma MineraLeads.
            </p>
            
            <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md border border-stone-100">
              <form className="space-y-6">
                <div className="space-y-2 text-left">
                  <label htmlFor="name" className="text-sm font-medium text-stone-700">Nome completo</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Seu nome" 
                  />
                </div>
                
                <div className="space-y-2 text-left">
                  <label htmlFor="email" className="text-sm font-medium text-stone-700">Email profissional</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="seu@email.com" 
                  />
                </div>
                
                <div className="space-y-2 text-left">
                  <label htmlFor="company" className="text-sm font-medium text-stone-700">Empresa</label>
                  <input 
                    type="text" 
                    id="company" 
                    className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Nome da sua empresa" 
                  />
                </div>
                
                <div className="space-y-2 text-left">
                  <label htmlFor="phone" className="text-sm font-medium text-stone-700">Telefone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="(00) 00000-0000" 
                  />
                </div>
                
                <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-stone-900">
                  Agendar demonstração
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
            
            <p className="mt-8 text-stone-500">
              Prefere falar diretamente conosco? Entre em contato pelo WhatsApp: 
              <a href="https://wa.me/5527999999999" className="text-amber-600 hover:underline ml-1">
                (27) 99999-9999
              </a>
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

export default Demo;
