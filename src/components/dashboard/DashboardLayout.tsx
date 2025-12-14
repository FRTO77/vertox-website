import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Video, 
  Settings, 
  Mic, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  HelpCircle,
  Download,
  User
} from 'lucide-react';
import { getCurrentUser, signOut, User as UserType } from '@/lib/auth';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const navItems = [
  { name: 'VertoX LLM', href: '/dashboard/llm', icon: MessageSquare },
  { name: 'VertoX Meet', href: '/dashboard/meet', icon: Video },
  { name: 'Your Voice', href: '/dashboard/voice', icon: Mic },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/signin');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const getInitials = (nickname: string) => {
    return nickname.slice(0, 2).toUpperCase();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-40"
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-xl font-bold gradient-text whitespace-nowrap"
                >
                  VertoX
                </motion.span>
              )}
            </AnimatePresence>
            {collapsed && (
              <span className="text-xl font-bold gradient-text">V</span>
            )}
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Download Button */}
        <div className="p-3 border-t border-sidebar-border">
          <a href="#download" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="glass" 
              className={cn(
                'w-full justify-start gap-3',
                collapsed && 'justify-center px-2'
              )}
            >
              <Download className="h-5 w-5 shrink-0" />
              {!collapsed && <span>Download</span>}
            </Button>
          </a>
        </div>

        {/* User Profile */}
        <div className="p-3 border-t border-sidebar-border">
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  'w-full flex items-center gap-3 p-2 rounded-xl hover:bg-sidebar-accent transition-colors',
                  collapsed && 'justify-center'
                )}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
                    {getInitials(user.nickname)}
                  </div>
                )}
                {!collapsed && (
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium truncate">{user.nickname}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.plan} Plan</p>
                  </div>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-48 p-2 bg-card border-border">
              <div className="space-y-1">
                <Link
                  to="/dashboard/account"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary transition-colors text-sm"
                >
                  <User className="h-4 w-4" />
                  My Account
                </Link>
                <Link
                  to="/dashboard/settings"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary transition-colors text-sm"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                <a
                  href="#support"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary transition-colors text-sm"
                >
                  <HelpCircle className="h-4 w-4" />
                  Support
                </a>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-secondary transition-colors text-sm text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-secondary/80 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main
        className={cn(
          'flex-1 transition-all duration-200',
          collapsed ? 'ml-[72px]' : 'ml-[240px]'
        )}
      >
        {children}
      </main>
    </div>
  );
}
