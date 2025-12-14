import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUp, setCurrentUser, getUsers } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Eye, EyeOff, Check, Phone, ArrowRight } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

type RegistrationStep = 'credentials' | 'phone-verify';

// Country codes for phone registration
const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States' },
  { code: '+44', country: 'UK', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France' },
  { code: '+995', country: 'GE', flag: '🇬🇪', name: 'Georgia' },
  { code: '+7', country: 'RU', flag: '🇷🇺', name: 'Russia' },
  { code: '+998', country: 'UZ', flag: '🇺🇿', name: 'Uzbekistan' },
  { code: '+7', country: 'KZ', flag: '🇰🇿', name: 'Kazakhstan' },
  { code: '+34', country: 'ES', flag: '🇪🇸', name: 'Spain' },
  { code: '+86', country: 'CN', flag: '🇨🇳', name: 'China' },
  { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japan' },
  { code: '+82', country: 'KR', flag: '🇰🇷', name: 'South Korea' },
];

export default function SignUp() {
  const [step, setStep] = useState<RegistrationStep>('credentials');
  
  // Email registration state
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Phone verification state (after initial registration)
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const passwordRequirements = [
    { met: password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(password), text: 'One uppercase letter' },
    { met: /[0-9]/.test(password), text: 'One number' },
  ];

  // Email registration handler - moves to phone step
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (!passwordRequirements.every(req => req.met)) {
      toast({
        title: 'Password requirements not met',
        variant: 'destructive',
      });
      return;
    }

    // Check if nickname is already taken BEFORE moving to phone step
    const users = getUsers();
    const nicknameExists = Object.values(users).some(
      u => u.user.nickname.toLowerCase() === nickname.toLowerCase()
    );
    
    if (nicknameExists) {
      toast({
        title: 'Nickname already taken',
        description: 'Please choose a different nickname',
        variant: 'destructive',
      });
      return;
    }

    // Move to phone verification step
    setStep('phone-verify');
  };

  // Google sign up handler - moves to phone step
  const handleGoogleSignUp = async () => {
    setLoading(true);
    
    // Simulate Google OAuth (in real app, this would redirect to Google)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Set a placeholder nickname from "Google account"
    setNickname('GoogleUser');
    setPassword('google-auth-' + Date.now());
    
    toast({
      title: 'Google account connected',
      description: 'Please verify your phone number to complete registration',
    });
    
    setLoading(false);
    setStep('phone-verify');
  };

  // Send OTP
  const handleSendOTP = async () => {
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
    
    setOtpSent(true);
    setLoading(false);
  };

  // Verify OTP and complete registration
  const handleVerifyAndComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otpCode.length !== 6) {
      toast({
        title: 'Invalid code',
        description: 'Please enter the 6-digit verification code',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    // Simulate OTP verification and account creation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
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
        title: 'Registration failed',
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

  const handleChangeNumber = () => {
    setOtpSent(false);
    setOtpCode('');
  };

  const handleBackToCredentials = () => {
    setStep('credentials');
    setOtpSent(false);
    setOtpCode('');
    setPhoneNumber('');
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
              <span className="text-2xl font-semibold tracking-tight gradient-text">VertoX</span>
            </Link>
            
            <AnimatePresence mode="wait">
              {step === 'credentials' ? (
                <motion.div
                  key="credentials-header"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h1 className="text-2xl font-semibold tracking-tight mb-2">Create your account</h1>
                  <p className="text-muted-foreground/90">Start your free trial today</p>
                </motion.div>
              ) : (
                <motion.div
                  key="phone-header"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h1 className="text-2xl font-semibold tracking-tight mb-2">Verify your phone</h1>
                  <p className="text-muted-foreground/90">Add your phone number to secure your account</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {step === 'credentials' ? (
              <motion.div
                key="credentials-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <form onSubmit={handleEmailSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="nickname">Nickname</Label>
                    <Input
                      id="nickname"
                      type="text"
                      placeholder="Choose a nickname"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      required
                      className="h-12 bg-secondary/40 border-border/60"
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
                        className="h-12 bg-secondary/40 border-border/60 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {/* Password requirements */}
                    <div className="space-y-1.5 mt-3">
                      {passwordRequirements.map((req, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <Check className={`h-3 w-3 transition-colors ${req.met ? 'text-accent' : 'text-muted-foreground/50'}`} />
                          <span className={`transition-colors ${req.met ? 'text-accent' : 'text-muted-foreground/70'}`}>{req.text}</span>
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
                      className="h-12 bg-secondary/40 border-border/60"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full" 
                    disabled={loading || !passwordRequirements.every(req => req.met) || !nickname.trim()}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-card text-muted-foreground">or continue with</span>
                  </div>
                </div>

                {/* Google Sign Up */}
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full h-12"
                  onClick={handleGoogleSignUp}
                  disabled={loading}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {loading ? 'Connecting...' : 'Google'}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="phone-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <form onSubmit={handleVerifyAndComplete} className="space-y-5">
                  {/* Phone input section */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      Phone Number
                    </Label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        disabled={otpSent}
                        className="h-12 px-3 bg-secondary/40 border border-border/60 rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
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
                        disabled={otpSent}
                        className="h-12 bg-secondary/40 border-border/60 flex-1 disabled:opacity-60"
                      />
                    </div>
                    
                    {!otpSent && (
                      <Button 
                        type="button"
                        variant="heroOutline" 
                        size="lg" 
                        className="w-full" 
                        onClick={handleSendOTP}
                        disabled={loading || phoneNumber.length < 6}
                      >
                        {loading ? 'Sending code...' : 'Send Verification Code'}
                      </Button>
                    )}
                  </div>

                  {/* OTP verification section - shows after code is sent */}
                  <AnimatePresence>
                    {otpSent && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-5"
                      >
                        <div className="text-center py-2">
                          <p className="text-sm text-muted-foreground/90">
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

                        <Button 
                          type="submit" 
                          variant="hero" 
                          size="lg" 
                          className="w-full" 
                          disabled={loading || otpCode.length !== 6}
                        >
                          {loading ? 'Creating account...' : 'Verify & Create Account'}
                        </Button>

                        <div className="flex items-center justify-between text-sm">
                          <button
                            type="button"
                            onClick={handleChangeNumber}
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                {/* Back to credentials */}
                <div className="mt-6 pt-4 border-t border-border/50">
                  <button
                    type="button"
                    onClick={handleBackToCredentials}
                    className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to registration
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 text-center text-sm text-muted-foreground/90">
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
