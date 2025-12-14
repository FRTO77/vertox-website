import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Check, CreditCard, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
  'France', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 
  'Denmark', 'Finland', 'Switzerland', 'Austria', 'Belgium', 'Ireland',
  'Poland', 'Portugal', 'Japan', 'South Korea', 'Singapore', 'India',
  'Brazil', 'Mexico', 'Argentina', 'Other'
];

const plans: Record<string, { name: string; price: string; period: string; features: string[] }> = {
  free: {
    name: 'Free',
    price: '$0',
    period: '/month',
    features: ['100 minutes/month', '10 languages', 'Standard audio quality', 'Web access only', 'Community support'],
  },
  pro: {
    name: 'Pro',
    price: '$20',
    period: '/month',
    features: ['Unlimited minutes', '30+ languages', 'HD audio quality', 'Voice cloning', 'Desktop & mobile apps', 'Priority support', 'API access (limited)'],
  },
  premium: {
    name: 'Premium',
    price: '$45',
    period: '/month',
    features: ['Everything in Pro', 'Unlimited API access', 'Custom voice training', 'Advanced analytics', 'Team management', 'Dedicated support', 'Custom integrations'],
  },
  enterprise: {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['Everything in Premium', 'On-premise deployment', 'Custom SLA', 'SSO & SAML', 'Audit logs', 'Dedicated account manager', 'Custom development'],
  },
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan') || 'pro';
  const plan = plans[planId] || plans.pro;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'stripe' | 'paypal' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Billing form state
  const [billingAddress, setBillingAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  
  // Card details state (for Stripe)
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  useEffect(() => {
    const user = getCurrentUser();
    setIsLoggedIn(!!user);
  }, []);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handlePayment = () => {
    if (!selectedPayment) return;
    if (selectedPayment === 'stripe' && (!cardNumber || !expiryDate || !cvv || !cardName)) {
      alert('Please fill in all card details');
      return;
    }
    if (!billingAddress || !city || !postalCode || !country) {
      alert('Please fill in your billing address');
      return;
    }
    
    setIsProcessing(true);
    // Mock payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // In a real implementation, this would redirect to the payment provider
      alert(`Redirecting to ${selectedPayment === 'stripe' ? 'Stripe' : 'PayPal'} checkout...`);
    }, 1500);
  };

  if (planId === 'enterprise') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-3xl font-bold mb-4">Enterprise Plan</h1>
              <p className="text-muted-foreground mb-8">
                For enterprise pricing, please contact our sales team to discuss your specific needs.
              </p>
              <Button onClick={() => navigate('/contact')} size="lg">
                Contact Sales
              </Button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate('/pricing')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pricing
          </Button>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-6 glass-card">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="border-b border-border pb-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{plan.name} Plan</span>
                    <span className="font-bold">{plan.price}{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Billed monthly • Cancel anytime
                  </p>
                </div>

                <div className="space-y-2 mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Includes:</h3>
                  {plan.features.slice(0, 5).map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {plan.features.length > 5 && (
                    <p className="text-sm text-muted-foreground">
                      + {plan.features.length - 5} more features
                    </p>
                  )}
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total Today</span>
                    <span>{plan.price === '$0' ? 'Free' : plan.price}</span>
                  </div>
                  {plan.price !== '$0' && (
                    <p className="text-sm text-muted-foreground mt-1">
                      7-day free trial included
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-6 glass-card">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                {!isLoggedIn && (
                  <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
                    <p className="text-sm text-muted-foreground mb-3">
                      Please sign in or create an account to continue
                    </p>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/signin')}
                      >
                        Sign In
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => navigate('/signup')}
                      >
                        Sign Up
                      </Button>
                    </div>
                  </div>
                )}

                {/* Billing Address Section */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Billing Address</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="address" className="text-xs text-muted-foreground">Street Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Main Street"
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                        disabled={!isLoggedIn && plan.price !== '$0'}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="city" className="text-xs text-muted-foreground">City</Label>
                        <Input
                          id="city"
                          placeholder="New York"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          disabled={!isLoggedIn && plan.price !== '$0'}
                        />
                      </div>
                      <div>
                        <Label htmlFor="postal" className="text-xs text-muted-foreground">Postal Code</Label>
                        <Input
                          id="postal"
                          placeholder="10001"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          disabled={!isLoggedIn && plan.price !== '$0'}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="country" className="text-xs text-muted-foreground">Country</Label>
                      <Select value={country} onValueChange={setCountry} disabled={!isLoggedIn && plan.price !== '$0'}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-sm font-medium">Payment Method</h3>
                  {/* Stripe Option */}
                  <button
                    onClick={() => setSelectedPayment('stripe')}
                    disabled={!isLoggedIn && plan.price !== '$0'}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedPayment === 'stripe'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground/50'
                    } ${!isLoggedIn && plan.price !== '$0' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-[#635BFF] rounded flex items-center justify-center">
                        <span className="text-white font-bold text-xs">stripe</span>
                      </div>
                      <div>
                        <p className="font-medium">Credit / Debit Card</p>
                        <p className="text-sm text-muted-foreground">
                          Visa, Mastercard, Amex & more
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* PayPal Option */}
                  <button
                    onClick={() => setSelectedPayment('paypal')}
                    disabled={!isLoggedIn && plan.price !== '$0'}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedPayment === 'paypal'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground/50'
                    } ${!isLoggedIn && plan.price !== '$0' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-[#003087] rounded flex items-center justify-center">
                        <span className="text-white font-bold text-xs">PayPal</span>
                      </div>
                      <div>
                        <p className="font-medium">PayPal</p>
                        <p className="text-sm text-muted-foreground">
                          Pay with your PayPal account
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Card Details (shown when Stripe is selected) */}
                {selectedPayment === 'stripe' && (
                  <div className="mb-6 p-4 border border-border rounded-lg bg-muted/30">
                    <h3 className="text-sm font-medium mb-3">Card Details</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="cardName" className="text-xs text-muted-foreground">Name on Card</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber" className="text-xs text-muted-foreground">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="expiry" className="text-xs text-muted-foreground">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-xs text-muted-foreground">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                            maxLength={4}
                            type="password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full"
                  size="lg"
                  disabled={!selectedPayment || isProcessing || (!isLoggedIn && plan.price !== '$0')}
                  onClick={handlePayment}
                >
                  {isProcessing ? (
                    'Processing...'
                  ) : plan.price === '$0' ? (
                    'Start Free Plan'
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Start Free Trial
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secure payment powered by industry standards</span>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
