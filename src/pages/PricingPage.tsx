import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for trying out VertoX',
    features: [
      '100 minutes/month',
      '10 languages',
      'Standard audio quality',
      'Web access only',
      'Community support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$20',
    period: '/month',
    description: 'For professionals and creators',
    features: [
      'Unlimited minutes',
      '30+ languages',
      'HD audio quality',
      'Voice cloning',
      'Desktop & mobile apps',
      'Priority support',
      'API access (limited)',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$45',
    period: '/month',
    description: 'For teams and businesses',
    features: [
      'Everything in Pro',
      'Unlimited API access',
      'Custom voice training',
      'Advanced analytics',
      'Team management',
      'Dedicated support',
      'Custom integrations',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations',
    features: [
      'Everything in Premium',
      'On-premise deployment',
      'Custom SLA',
      'SSO & SAML',
      'Audit logs',
      'Dedicated account manager',
      'Custom development',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        <section className="py-20 hero-gradient grain">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Simple, transparent pricing
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that's right for you. All plans include a 7-day free trial.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative glass-card p-6 flex flex-col ${
                    plan.popular ? 'border-primary' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/signup">
                    <Button
                      variant={plan.popular ? 'hero' : 'glass'}
                      className="w-full"
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
