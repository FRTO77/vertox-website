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
  User as UserIcon
} from 'lucide-react';
import { getCurrentUser, signOut, onAuthStateChange, User } from '@/lib/auth';
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
  hideSidebar?: boolean;
}

export function DashboardLayout({ children, hideSidebar = false }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = onAuthStateChange((authUser) => {
      setUser(authUser);
      setLoading(false);
      if (!authUser) {
        navigate('/signin');
      }
    });

    // Check for existing session
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        navigate('/signin');
      }
    };
    checkUser();

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (nickname: string) => {
    return nickname.slice(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  if (hideSidebar) {
    return <div className="min-h-screen bg-background w-full">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 top-0 h-screen bg-sidebar/80 backdrop-blur-xl border-r border-sidebar-border/50 flex flex-col z-40"
      >
        {/* Logo */}
        <div className="h-[72px] flex items-center justify-between px-5 border-b border-sidebar-border/50">
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl font-semibold tracking-tight gradient-text whitespace-nowrap"
                >
                  VertoX
                </motion.span>
              )}
            </AnimatePresence>
            {collapsed && (
              <span className="text-xl font-semibold gradient-text">V</span>
            )}
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-300',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                )}
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[14px] font-medium whitespace-nowrap overflow-hidden"
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
        <div className="p-4 border-t border-sidebar-border/50">
          <Link to="/download">
            <Button 
              variant="glass" 
              className={cn(
                'w-full justify-start gap-3 h-10',
                collapsed && 'justify-center px-2'
              )}
            >
              <Download className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span className="text-[14px]">Download</span>}
            </Button>
          </Link>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border/50">
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  'w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-sidebar-accent transition-all duration-300',
                  collapsed && 'justify-center'
                )}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-border/50" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-sm font-medium text-primary ring-2 ring-primary/20">
                    {getInitials(user.nickname)}
                  </div>
                )}
                {!collapsed && (
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium truncate">{user.nickname}</p>
                    <p className="text-xs text-muted-foreground/80 capitalize">{user.plan} Plan</p>
                  </div>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-52 p-1.5 bg-card/95 backdrop-blur-xl border-border/60 shadow-xl">
              <div className="space-y-0.5">
                <Link
                  to="/dashboard/account"
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-secondary/60 transition-all duration-200 text-sm"
                >
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                  My Account
                </Link>
                <Link
                  to="/dashboard/settings"
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-secondary/60 transition-all duration-200 text-sm"
                >
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  Settings
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-secondary/60 transition-all duration-200 text-sm"
                >
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  Support
                </Link>
                <div className="h-px bg-border/50 my-1" />
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-destructive/10 transition-all duration-200 text-sm text-destructive"
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
          className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-card border border-border/60 flex items-center justify-center hover:bg-secondary transition-all duration-300 shadow-sm"
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main
        className={cn(
          'flex-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          collapsed ? 'ml-[72px]' : 'ml-[256px]'
        )}
      >
        {children}
      </main>
    </div>
  );
}
