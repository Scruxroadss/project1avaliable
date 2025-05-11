
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ArrowRightLeft,
  CreditCard, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  User,
  Store,
  Briefcase,
  TrendingUp,
  Info,
  LayoutKanban
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ModeToggle } from './mode-toggle';
import { motion } from 'framer-motion';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fecha sidebar automaticamente em telas pequenas ao navegar
  useEffect(() => {
    if (windowWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname, windowWidth]);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Meus Leads', href: '/dashboard/leads', icon: Users },
    { name: 'Funil de Leads', href: '/dashboard/funnel', icon: LayoutKanban },
    { name: 'Marketplace', href: '/dashboard/marketplace', icon: Store },
    { name: 'Arquitetos', href: '/dashboard/architects', icon: Briefcase },
    { name: 'Preço do Mercado', href: '/dashboard/market-prices', icon: TrendingUp },
    { name: 'Consultoria', href: '/dashboard/consulting', icon: Info },
    { name: 'Integrações', href: '/dashboard/integrations', icon: ArrowRightLeft },
    { name: 'Planos', href: '/dashboard/plans', icon: CreditCard },
    { name: 'Configurações', href: '/dashboard/settings', icon: Settings },
  ];

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
    // Redirecionamento para a home após logout
    navigate('/');
  };
  
  const userName = "João Silva"; // Poderia vir da API ou Context
  const userInitials = "JS";

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50/50 to-white dark:from-stone-900 dark:to-stone-950 flex overflow-hidden transition-colors duration-300">
      {/* Sidebar - versão para desktop */}
      <div className={cn(
        "fixed top-0 left-0 z-30 h-full lg:translate-x-0 transition-all duration-300 w-64 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full bg-white dark:bg-stone-950 border-r border-stone-100 dark:border-stone-800 shadow-sm">
          <div className="flex h-16 items-center px-4 border-b border-stone-100 dark:border-stone-800">
            <div 
              onClick={() => navigate('/')}
              className="flex items-center cursor-pointer"
            >
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                Axie<span className="text-stone-800 dark:text-white">Stone</span>
              </span>
            </div>
            <button 
              className="lg:hidden ml-auto text-stone-500 hover:text-amber-600 transition-colors"
              onClick={toggleSidebar}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
                        : "text-stone-600 dark:text-stone-400 hover:bg-amber-50/50 hover:text-amber-600 dark:hover:bg-amber-900/10 dark:hover:text-amber-400"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                        isActive ? "text-amber-500" : "text-stone-400 group-hover:text-amber-500"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                    {item.name === "Meus Leads" && (
                      <span className="ml-auto inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 rounded-full animate-pulse-soft">
                        3
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="p-4 border-t border-stone-100 dark:border-stone-800">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full flex items-center justify-start px-4 py-2 text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/10 dark:hover:text-red-400 rounded-lg transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5 text-stone-400" aria-hidden="true" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay para mobile quando sidebar está aberto */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-20" 
          onClick={toggleSidebar}
        />
      )}

      {/* Conteúdo principal */}
      <div className="flex-1 min-w-0 lg:ml-64 transition-all duration-300">
        {/* Header da aplicação */}
        <header className="bg-white dark:bg-stone-950 shadow-sm border-b border-stone-100 dark:border-stone-800 z-10 sticky top-0">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center flex-1">
              <button
                className="lg:hidden text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-500 mr-4 focus:outline-none"
                onClick={toggleSidebar}
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <div className="max-w-md w-full lg:max-w-xs hidden sm:block">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-stone-400" />
                  </div>
                  <Input 
                    type="search" 
                    placeholder="Buscar leads, empresas..." 
                    className="pl-10 bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-700 focus:border-amber-500 dark:focus:border-amber-600 rounded-full text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ModeToggle />
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-full relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="p-1.5 flex items-center gap-2 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    <Avatar className="h-8 w-8 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">{userName}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">Premium</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-stone-500 dark:text-stone-400 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center gap-2 p-2 border-b dark:border-stone-700">
                    <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 w-10 h-10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium dark:text-stone-100">{userName}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">contato@empresa.com</p>
                    </div>
                  </div>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/plans')}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Meu plano</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Conteúdo da página */}
        <main className="p-4 sm:p-6 lg:p-8 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
