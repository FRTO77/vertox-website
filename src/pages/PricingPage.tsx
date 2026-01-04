import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
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
    hasYearly: false,
  },
  {
    id: 'weekly',
    name: 'Weekly',
    monthlyPrice: 6,
    yearlyPrice: 6,
    period: '/week',
    description: 'Flexible weekly access',
    features: [
      '500 minutes/week',
      '20 languages',
      'HD audio quality',
      'Web & mobile access',
      'Email support',
    ],
    cta: 'Start Weekly',
    popular: false,
    hasYearly: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 20,
    yearlyPrice: 192, // $16/month billed yearly (20% off)
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
    hasYearly: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: 45,
    yearlyPrice: 432, // $36/month billed yearly (20% off)
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
    hasYearly: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: null,
    yearlyPrice: null,
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
    hasYearly: false,
  },
];

export default function PricingPage() {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  const handlePlanSelect = (planId: string) => {
    if (planId === 'enterprise') {
      navigate('/contact');
    } else {
      navigate(`/checkout?plan=${planId}&billing=${isYearly ? 'yearly' : 'monthly'}`);
    }
  };

  const getDisplayPrice = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === null) return 'Custom';
    if (plan.monthlyPrice === 0) return '$0';
    
    if (isYearly && plan.hasYearly) {
      const monthlyEquivalent = Math.round(plan.yearlyPrice / 12);
      return `$${monthlyEquivalent}`;
    }
    return `$${plan.monthlyPrice}`;
  };

  const getDisplayPeriod = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === null) return '';
    if (plan.id === 'weekly') return '/week';
    return '/month';
  };

  const getSavingsLabel = (plan: typeof plans[0]) => {
    if (!plan.hasYearly || !isYearly) return null;
    const monthlyCost = plan.monthlyPrice! * 12;
    const savings = monthlyCost - plan.yearlyPrice;
    return `Save $${savings}/year`;
  };

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
              className="text-center mb-12"
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Simple, transparent pricing
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Choose the plan that's right for you. All plans include a 7-day free trial.
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex items-center gap-4 p-1.5 bg-secondary/50 backdrop-blur-sm rounded-full border border-border/50">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    !isYearly
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {!isYearly && (
                    <motion.div
                      layoutId="billing-toggle"
                      className="absolute inset-0 bg-primary rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">Monthly</span>
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    isYearly
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isYearly && (
                    <motion.div
                      layoutId="billing-toggle"
                      className="absolute inset-0 bg-primary rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">Yearly</span>
                </button>
                <AnimatePresence>
                  {isYearly && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8, x: -10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: -10 }}
                      className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full"
                    >
                      Save 20%
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
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

                  <div className="mb-2">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${plan.id}-${isYearly}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-baseline"
                      >
                        <span className="text-4xl font-bold">{getDisplayPrice(plan)}</span>
                        <span className="text-muted-foreground">{getDisplayPeriod(plan)}</span>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="h-6 mb-4">
                    <AnimatePresence>
                      {getSavingsLabel(plan) && (
                        <motion.span
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="inline-block px-2 py-0.5 bg-accent/20 text-accent text-xs font-medium rounded"
                        >
                          {getSavingsLabel(plan)}
                        </motion.span>
                      )}
                      {isYearly && plan.hasYearly && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="block text-xs text-muted-foreground mt-1"
                        >
                          Billed ${plan.yearlyPrice}/year
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? 'hero' : 'glass'}
                    className="w-full"
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
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
