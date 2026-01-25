import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  LayoutDashboard,
  LogOut, 
  Menu, 
  X,
  User as UserIcon 
} from 'lucide-react';
import { cn } from '@/lib/utils';


export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Tableau de bord', href: '/', icon: LayoutDashboard },
    { label: 'Projets', href: '/projects', icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r shadow-sm transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-6">
           <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center shadow-md">
                 <span className="font-logo font-bold text-white">EAS</span>
              </div>
              <span className="text-xl font-bold tracking-tight">Gestionnaire EAS</span>
           </div>
           <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
             <X className="h-5 w-5" />
           </Button>
        </div>

        <nav className="px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-gray-100 hover:text-gray-900"
              )}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50/50">
          <div className="flex items-center space-x-3 mb-4 px-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <UserIcon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.username}</p>
              <p className="text-xs text-muted-foreground">Gérant</p>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="bg-white border-b p-4 flex items-center justify-between md:hidden sticky top-0 z-30">
           <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                 <span className="font-logo font-bold text-white">EAS</span>
              </div>
              <span className="text-lg font-bold">EAS</span>
           </div>
           <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
             <Menu className="h-6 w-6" />
           </Button>
        </header>

        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
