
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  remember: z.boolean().default(false)
});

const LoginPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false
    }
  });
  
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
    // Simulação de login bem-sucedido
    toast({
      title: "Login realizado com sucesso",
      description: "Bem-vindo ao Radar de Oportunidades B2B!",
    });
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mb-1">Radar<span className="text-stone-800">B2B</span></h2>
          <p className="text-stone-600">Acesse sua conta para gerenciar leads</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-stone-600 cursor-pointer">Lembrar de mim</FormLabel>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600">
                  Entrar
                </Button>
              </form>
            </Form>
            
            <div className="mt-4">
              <Link to="/dashboard/forgot-password">
                <Button variant="link" className="p-0 h-auto text-amber-600 hover:text-amber-700">
                  Esqueceu sua senha?
                </Button>
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-stone-500">ou</span>
              </div>
            </div>
            
            <div className="text-center">
              <span className="text-stone-600 text-sm">Não tem uma conta?</span>{' '}
              <Link to="/dashboard/register">
                <Button variant="link" className="p-0 h-auto text-amber-600 hover:text-amber-700">
                  Registre-se
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

// Precisamos importar o Checkbox que está sendo usado no formulário
import { Checkbox } from "@/components/ui/checkbox";

export default LoginPage;
