import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Globe, 
  Moon, 
  Sun, 
  Lock, 
  Mail,
  CreditCard,
  Check
} from 'lucide-react';
import { getSettings, saveSettings, applyTheme, supportedLanguages } from '@/lib/settings';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const plans = [
  { id: 'free', name: 'Free', price: '$0', features: ['100 minutes/month', 'Basic languages', 'Standard quality'] },
  { id: 'pro', name: 'Pro', price: '$20', features: ['Unlimited minutes', 'All languages', 'HD audio', 'Voice cloning'] },
  { id: 'premium', name: 'Premium', price: '$45', features: ['Everything in Pro', 'Priority support', 'API access', 'Custom integrations'] },
  { id: 'enterprise', name: 'Enterprise', price: 'Custom', features: ['Custom solutions', 'Dedicated support', 'SLA', 'On-premise option'] },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState(getSettings());
  const [isDark, setIsDark] = useState(settings.theme === 'dark');
  const { toast } = useToast();

  useEffect(() => {
    applyTheme(settings.theme);
  }, [settings.theme]);

  const handleThemeToggle = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    const updated = saveSettings({ theme: newTheme });
    setSettings(updated);
    applyTheme(newTheme);
    toast({ title: `${newTheme === 'dark' ? 'Dark' : 'Light'} mode enabled` });
  };

  const handleLanguageChange = (value: string) => {
    const updated = saveSettings({ language: value });
    setSettings(updated);
    toast({ title: 'Language updated' });
  };

  const handleTargetLanguageChange = (value: string) => {
    const updated = saveSettings({ targetLanguage: value });
    setSettings(updated);
    toast({ title: 'Target language updated' });
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and account settings</p>
        </motion.div>

        <div className="space-y-6">
          {/* Language Settings */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">Language Settings</h2>
                <p className="text-sm text-muted-foreground">Set your preferred languages</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Your Language</Label>
                <Select value={settings.language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="h-12 bg-secondary/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {supportedLanguages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Target Language</Label>
                <Select value={settings.targetLanguage} onValueChange={handleTargetLanguageChange}>
                  <SelectTrigger className="h-12 bg-secondary/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {supportedLanguages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  {isDark ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
                </div>
                <div>
                  <h2 className="font-semibold">Appearance</h2>
                  <p className="text-sm text-muted-foreground">
                    {isDark ? 'Dark mode enabled' : 'Light mode enabled'}
                  </p>
                </div>
              </div>
              <Switch checked={isDark} onCheckedChange={handleThemeToggle} />
            </div>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">Security</h2>
                <p className="text-sm text-muted-foreground">Manage your security settings</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-muted-foreground">Update your password</p>
                  </div>
                </div>
                <Button variant="glass" size="sm">Change</Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Change Email</p>
                    <p className="text-sm text-muted-foreground">Update your email address</p>
                  </div>
                </div>
                <Button variant="glass" size="sm">Change</Button>
              </div>
            </div>
          </motion.div>

          {/* Plans & Credits */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="font-semibold">Plans & Credits</h2>
                <p className="text-sm text-muted-foreground">Manage your subscription</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-4 rounded-xl border transition-colors ${
                    plan.id === 'free'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{plan.name}</h3>
                    {plan.id === 'free' && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-bold mb-4">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {plan.id !== 'free' && (
                    <Button variant="glass" className="w-full mt-4" size="sm">
                      Upgrade
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
