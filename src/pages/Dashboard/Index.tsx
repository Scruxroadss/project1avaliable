
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChartContainer } from '@/components/ui/chart';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Dados de exemplo para o dashboard
const weeklyLeadsData = [
  { name: 'Seg', leads: 4 },
  { name: 'Ter', leads: 3 },
  { name: 'Qua', leads: 5 },
  { name: 'Qui', leads: 2 },
  { name: 'Sex', leads: 6 },
  { name: 'Sáb', leads: 1 },
  { name: 'Dom', leads: 3 },
];

const conversionData = [
  { name: 'Semana 1', recebidos: 24, contatados: 18, convertidos: 5 },
  { name: 'Semana 2', recebidos: 28, contatados: 22, convertidos: 7 },
  { name: 'Semana 3', recebidos: 32, contatados: 28, convertidos: 9 },
  { name: 'Semana 4', recebidos: 30, contatados: 25, convertidos: 8 },
];

const recentLeads = [
  { id: 1, company: "Marmoraria Estrela", location: "São Paulo, SP", contact: "Carlos Silva", match: 95 },
  { id: 2, company: "GraniPrima", location: "Rio de Janeiro, RJ", contact: "Ana Oliveira", match: 88 },
  { id: 3, company: "EcoMarble", location: "Belo Horizonte, MG", contact: "Roberto Santos", match: 92 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button className="bg-amber-500 hover:bg-amber-600">
          <FileDown className="mr-2 h-4 w-4" />
          Exportar leads
        </Button>
      </div>
      
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Desta Semana</CardTitle>
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">+5%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-stone-500 mt-1">12 contatos realizados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Este Mês</CardTitle>
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">+12%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">114</div>
            <p className="text-xs text-stone-500 mt-1">85 contatos realizados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">+3%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.5%</div>
            <p className="text-xs text-stone-500 mt-1">Aumento de 3% este mês</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7/10</div>
            <p className="text-xs text-stone-500 mt-1">No plano gratuito</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Leads por Dia</CardTitle>
            <CardDescription>Quantidade de leads recebidos na última semana</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={{
              leads: { label: "Leads", color: "#f59e0b" }
            }}>
              <LineChart data={weeklyLeadsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#f59e0b" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Conversões</CardTitle>
            <CardDescription>Leads recebidos, contatados e convertidos por semana</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={{
              recebidos: { label: "Recebidos", color: "#f59e0b" },
              contatados: { label: "Contatados", color: "#0ea5e9" },
              convertidos: { label: "Convertidos", color: "#10b981" }
            }}>
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="recebidos" 
                  stroke="#f59e0b" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="contatados" 
                  stroke="#0ea5e9" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="convertidos" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Leads */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Leads Recentes</CardTitle>
            <CardDescription>Últimos leads recebidos na sua conta</CardDescription>
          </div>
          <Link to="/dashboard/leads">
            <Button variant="ghost" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
              Ver todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-2 text-left text-sm font-medium text-stone-500">Empresa</th>
                  <th className="py-3 px-2 text-left text-sm font-medium text-stone-500">Localização</th>
                  <th className="py-3 px-2 text-left text-sm font-medium text-stone-500">Contato</th>
                  <th className="py-3 px-2 text-right text-sm font-medium text-stone-500">Match</th>
                  <th className="py-3 px-2 text-right text-sm font-medium text-stone-500">Ações</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map(lead => (
                  <tr key={lead.id} className="border-b hover:bg-stone-50">
                    <td className="py-3 px-2 text-sm font-medium">{lead.company}</td>
                    <td className="py-3 px-2 text-sm text-stone-600">{lead.location}</td>
                    <td className="py-3 px-2 text-sm text-stone-600">{lead.contact}</td>
                    <td className="py-3 px-2 text-right">
                      <Badge variant="outline" className={`${lead.match > 90 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {lead.match}%
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <Link to={`/dashboard/leads/${lead.id}`}>
                        <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                          Ver detalhes
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
