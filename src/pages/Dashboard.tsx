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
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your activity overview.</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid sm:grid-cols-3 gap-4 mb-8"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className="text-sm text-accent mb-1">{stat.change}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link key={action.href} to={action.href}>
                <div className="glass-card p-6 h-full hover:border-primary/50 transition-all duration-200 group cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                    action.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
                  }`}>
                    <action.icon className={`h-6 w-6 ${
                      action.color === 'accent' ? 'text-accent' : 'text-primary'
                    }`} />
                  </div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
