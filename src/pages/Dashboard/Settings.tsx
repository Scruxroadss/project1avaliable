
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const profileSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  company: z.string().min(2, 'Nome da empresa deve ter pelo menos 2 caracteres'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 caracteres'),
});

const notificationSchema = z.object({
  emailLeads: z.boolean().default(true),
  whatsappLeads: z.boolean().default(true),
  emailMarketing: z.boolean().default(false),
  weeklyReport: z.boolean().default(true),
});

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: 'João Silva',
      email: 'joao@example.com',
      company: 'Marmoraria Silva',
      phone: '(11) 98765-4321',
    },
  });
  
  const notificationForm = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailLeads: true,
      whatsappLeads: true,
      emailMarketing: false,
      weeklyReport: true,
    },
  });
  
  const onProfileSubmit = (values: z.infer<typeof profileSchema>) => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso",
    });
    console.log(values);
  };
  
  const onNotificationSubmit = (values: z.infer<typeof notificationSchema>) => {
    toast({
      title: "Preferências atualizadas",
      description: "Suas preferências de notificação foram salvas",
    });
    console.log(values);
  };
  
  const handlePasswordReset = () => {
    toast({
      title: "Link enviado",
      description: "Verifique seu email para redefinir sua senha",
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Configurações da Conta</h1>
      
      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>
            Gerencie suas informações pessoais e de contato
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={profileForm.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={profileForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferências de Notificação</CardTitle>
          <CardDescription>
            Escolha como deseja receber notificações e atualizações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...notificationForm}>
            <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-4">
              <div className="space-y-4">
                <FormField
                  control={notificationForm.control}
                  name="emailLeads"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Notificações por email</FormLabel>
                        <FormDescription>
                          Receba novos leads diretamente no seu email
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={notificationForm.control}
                  name="whatsappLeads"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Notificações por WhatsApp</FormLabel>
                        <FormDescription>
                          Receba novos leads diretamente no WhatsApp
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={notificationForm.control}
                  name="weeklyReport"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Relatório semanal</FormLabel>
                        <FormDescription>
                          Receba um resumo semanal dos seus leads e conversões
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={notificationForm.control}
                  name="emailMarketing"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Email marketing</FormLabel>
                        <FormDescription>
                          Receba dicas, novidades e promoções do Radar B2B
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
                  Salvar Preferências
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Segurança</CardTitle>
          <CardDescription>
            Gerencie suas credenciais de acesso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Redefinição de senha</h3>
              <p className="text-stone-600 text-sm mt-1">
                Enviaremos um link para seu email para redefinir sua senha
              </p>
              <div className="mt-4">
                <Button variant="outline" onClick={handlePasswordReset}>
                  Redefinir senha
                </Button>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium">Sessões ativas</h3>
              <p className="text-stone-600 text-sm mt-1">
                Você está conectado neste dispositivo
              </p>
              <div className="mt-4 p-3 border rounded-md flex justify-between items-center">
                <div>
                  <p className="font-medium">Chrome em Windows</p>
                  <p className="text-xs text-stone-500">São Paulo, SP • Ativo agora</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Atual</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Account Deletion */}
      <Card>
        <CardHeader>
          <CardTitle>Exclusão de Conta</CardTitle>
          <CardDescription>
            Remova permanentemente sua conta e todos os seus dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-stone-600 mb-4">
            Ao excluir sua conta, todos os seus dados serão permanentemente removidos de nosso sistema.
            Esta ação não pode ser desfeita.
          </p>
          <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
            Solicitar exclusão da conta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
