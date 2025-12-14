import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUp, setCurrentUser } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Eye, EyeOff, Check, Phone, Mail, ArrowRight } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

type AuthMethod = 'email' | 'phone';
type PhoneStep = 'input' | 'verify';

// Country codes for phone registration
const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+7', country: 'RU', flag: '🇷🇺' },
  { code: '+998', country: 'UZ', flag: '🇺🇿' },
  { code: '+7', country: 'KZ', flag: '🇰🇿' },
  { code: '+34', country: 'ES', flag: '🇪🇸' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+82', country: 'KR', flag: '🇰🇷' },
];

export default function SignUp() {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email');
  
  // Email registration state
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Phone registration state
  const [phoneStep, setPhoneStep] = useState<PhoneStep>('input');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [phoneNickname, setPhoneNickname] = useState('');
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const passwordRequirements = [
    { met: password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(password), text: 'One uppercase letter' },
    { met: /[0-9]/.test(password), text: 'One number' },
  ];

  // Email registration handler
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const user = await signUp(nickname, password);
      setCurrentUser(user);
      toast({
        title: 'Account created!',
        description: 'Welcome to VertoX',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Sign up failed',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Phone registration - send OTP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.trim() || phoneNumber.length < 6) {
      toast({
        title: 'Invalid phone number',
        description: 'Please enter a valid phone number',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    // Simulate sending OTP (in real app, this would call an API)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Code sent!',
      description: `Verification code sent to ${countryCode} ${phoneNumber}`,
    });
    
    setPhoneStep('verify');
    setLoading(false);
  };

  // Phone registration - verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otpCode.length !== 6) {
      toast({
        title: 'Invalid code',
        description: 'Please enter the 6-digit verification code',
        variant: 'destructive',
      });
      return;
    }

    if (!phoneNickname.trim()) {
      toast({
        title: 'Nickname required',
        description: 'Please enter a nickname',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    // Simulate OTP verification (in real app, this would verify with backend)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any 6-digit code
    try {
      const user = await signUp(phoneNickname, 'phone-auth-' + Date.now());
      setCurrentUser(user);
      toast({
        title: 'Account created!',
        description: 'Welcome to VertoX',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Verification failed',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: 'Code resent!',
      description: `New verification code sent to ${countryCode} ${phoneNumber}`,
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 hero-gradient grain">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Card */}
        <div className="glass-card p-8">
          <div className="text-center mb-6">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold gradient-text">VertoX</span>
            </Link>
            <h1 className="text-2xl font-bold mb-2">Create your account</h1>
            <p className="text-muted-foreground">Start your free trial today</p>
          </div>

          {/* Auth Method Toggle */}
          <div className="flex gap-2 p-1 bg-secondary/30 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => { setAuthMethod('email'); setPhoneStep('input'); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                authMethod === 'email'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Mail className="h-4 w-4" />
              Email
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod('phone')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                authMethod === 'phone'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Phone className="h-4 w-4" />
              Phone
            </button>
          </div>

          <AnimatePresence mode="wait">
            {authMethod === 'email' ? (
              <motion.form
                key="email-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleEmailSubmit}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="nickname">Nickname</Label>
                  <Input
                    id="nickname"
                    type="text"
                    placeholder="Choose a nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                    className="h-12 bg-secondary/50 border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 bg-secondary/50 border-border pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {/* Password requirements */}
                  <div className="space-y-1 mt-2">
                    {passwordRequirements.map((req, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <Check className={`h-3 w-3 ${req.met ? 'text-accent' : 'text-muted-foreground'}`} />
                        <span className={req.met ? 'text-accent' : 'text-muted-foreground'}>{req.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-12 bg-secondary/50 border-border"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full" 
                  disabled={loading || password.length < 8}
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="phone-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <AnimatePresence mode="wait">
                  {phoneStep === 'input' ? (
                    <motion.form
                      key="phone-input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSendOTP}
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <div className="flex gap-2">
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="h-12 px-3 bg-secondary/50 border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                          >
                            {countryCodes.map((cc) => (
                              <option key={cc.country} value={cc.code}>
                                {cc.flag} {cc.code}
                              </option>
                            ))}
                          </select>
                          <Input
                            type="tel"
                            placeholder="Phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                            required
                            className="h-12 bg-secondary/50 border-border flex-1"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          We will send a 6-digit verification code
                        </p>
                      </div>

                      <Button 
                        type="submit" 
                        variant="hero" 
                        size="lg" 
                        className="w-full" 
                        disabled={loading || phoneNumber.length < 6}
                      >
                        {loading ? 'Sending code...' : (
                          <>
                            Send Verification Code
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.form
                      key="phone-verify"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleVerifyOTP}
                      className="space-y-5"
                    >
                      <div className="text-center mb-4">
                        <p className="text-sm text-muted-foreground">
                          Enter the 6-digit code sent to
                        </p>
                        <p className="font-medium text-foreground">
                          {countryCode} {phoneNumber}
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={6}
                          value={otpCode}
                          onChange={(value) => setOtpCode(value)}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phoneNickname">Choose a nickname</Label>
                        <Input
                          id="phoneNickname"
                          type="text"
                          placeholder="Your nickname"
                          value={phoneNickname}
                          onChange={(e) => setPhoneNickname(e.target.value)}
                          required
                          className="h-12 bg-secondary/50 border-border"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        variant="hero" 
                        size="lg" 
                        className="w-full" 
                        disabled={loading || otpCode.length !== 6 || !phoneNickname.trim()}
                      >
                        {loading ? 'Verifying...' : 'Verify & Create Account'}
                      </Button>

                      <div className="flex items-center justify-between text-sm">
                        <button
                          type="button"
                          onClick={() => { setPhoneStep('input'); setOtpCode(''); }}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          ← Change number
                        </button>
                        <button
                          type="button"
                          onClick={handleResendCode}
                          disabled={loading}
                          className="text-primary hover:underline"
                        >
                          Resend code
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/signin" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
