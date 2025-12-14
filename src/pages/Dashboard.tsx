import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { MessageSquare, Video, Mic, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Minutes Used', value: '124', change: '+12%', icon: TrendingUp },
  { label: 'Meetings', value: '8', change: '+3', icon: Video },
  { label: 'LLM Chats', value: '24', change: '+5', icon: MessageSquare },
];

const quickActions = [
  {
    title: 'VertoX LLM',
    description: 'Chat with AI in any language',
    icon: MessageSquare,
    href: '/dashboard/llm',
    color: 'primary',
  },
  {
    title: 'VertoX Meet',
    description: 'Start or join a meeting',
    icon: Video,
    href: '/dashboard/meet',
    color: 'accent',
  },
  {
    title: 'Your Voice',
    description: 'Record and train your voice',
    icon: Mic,
    href: '/dashboard/voice',
    color: 'primary',
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-8 lg:p-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-2">Dashboard</h1>
          <p className="text-muted-foreground/90">Welcome back! Here's your activity overview.</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid sm:grid-cols-3 gap-5 mb-10"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm text-muted-foreground/80 font-medium">{stat.label}</span>
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="flex items-end gap-2.5">
                <span className="text-3xl font-semibold tracking-tight">{stat.value}</span>
                <span className="text-sm text-accent mb-1 font-medium">{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-lg font-semibold tracking-tight mb-5">Quick Actions</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {quickActions.map((action, i) => (
              <motion.div
                key={action.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={action.href}>
                  <div className="glass-card p-6 h-full group cursor-pointer">
                    <div className={`w-12 h-12 rounded-xl mb-5 flex items-center justify-center transition-all duration-500 ${
                      action.color === 'accent' ? 'bg-accent/10 group-hover:bg-accent/15' : 'bg-primary/10 group-hover:bg-primary/15'
                    }`}>
                      <action.icon className={`h-5 w-5 ${
                        action.color === 'accent' ? 'text-accent' : 'text-primary'
                      }`} />
                    </div>
                    <h3 className="font-semibold mb-1.5 group-hover:text-primary transition-colors duration-300 tracking-tight">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/90 leading-relaxed">{action.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
