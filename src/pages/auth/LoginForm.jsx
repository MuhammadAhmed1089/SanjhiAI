import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/screen.png';
import AuthAmbientBackground from '../../components/AuthAmbientBackground';
import Icon from '../../components/Icon';
import { loginWithPassword, sendOTP } from '../../services/authService';

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const passwordJustReset = location.state?.passwordReset === true;

  const [mode, setMode] = useState('password'); // 'password' | 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [ripples, setRipples] = useState({});

  // Auto-redirect if token is already present
  useEffect(() => {
    const token = localStorage.getItem('sanjhi_token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  function triggerRipple(e, key) {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipples((prev) => ({
      ...prev,
      [key]: { x: e.clientX - rect.left, y: e.clientY - rect.top, k: Date.now() },
    }));
    setTimeout(() => {
      setRipples((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }, 600);
  }

  // Quick Demo Login Action
  function fillDemoAccount(type = 'user') {
    if (type === 'admin') {
      setEmail('admin@sanjhi.pk');
      setPassword('Admin@Sanjhi2026');
    } else {
      setEmail('anika@sanjhi.pk');
      setPassword('User@Sanjhi2026');
    }
    setApiError('');
  }

  // Send OTP to email/phone and go to verification
  async function handleSendOTPDirect(targetEmail = email) {
    if (!targetEmail.trim()) {
      setApiError('Please enter your registered email or phone number first.');
      return;
    }
    setApiError('');
    setLoading(true);

    try {
      await sendOTP({ target: targetEmail.trim(), purpose: 'login' });
      navigate('/otp', {
        state: {
          target: targetEmail.trim(),
          purpose: 'login',
        },
      });
    } catch (err) {
      setApiError(err.message || 'Failed to send OTP verification code.');
    } finally {
      setLoading(false);
    }
  }

  // Handle password login submit
  async function handleSubmit(e) {
    e.preventDefault();
    setApiError('');
    setLoading(true);

    if (mode === 'otp') {
      return handleSendOTPDirect();
    }

    try {
      const res = await loginWithPassword({ target: email.trim(), password });
      
      // Save rememberMe preference if needed
      if (!rememberMe) {
        // Optional session-only flag
        sessionStorage.setItem('sanjhi_session_only', 'true');
      }

      const isAdmin = res?.user?.is_admin || email.trim().toLowerCase() === 'admin@sanjhi.pk';
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      const nextFailCount = failedAttempts + 1;
      setFailedAttempts(nextFailCount);

      if (nextFailCount >= 3) {
        setApiError('Incorrect password entered 3 times. Automatically switching to OTP verification...');
        setTimeout(() => handleSendOTPDirect(email.trim()), 1200);
      } else {
        setApiError(
          err.message ||
            `Incorrect password (${3 - nextFailCount} attempt${3 - nextFailCount === 1 ? '' : 's'} remaining).`
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthAmbientBackground showTicker={true}>
      <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-8 lg:py-12 flex flex-col items-center justify-center min-h-[calc(100vh-36px)]">
        
        {/* Main Dual-Panel Glassmorphic Container */}
        <div className="w-full bg-white/85 backdrop-blur-2xl border border-[#006972]/20 shadow-[0_24px_75px_-12px_rgba(0,105,114,0.22),0_0_0_1px_rgba(0,105,114,0.12)] rounded-2xl sm:rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 animate-fade-up">
          
          {/* Left Panel: Brand Showcase (Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 bg-[#006972] text-white p-10 relative overflow-hidden flex-col justify-between">
            {/* Background Dot Grid */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.9) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Glowing orb */}
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Back Navigation Button */}
            <div className="relative z-10">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-[13px] font-label font-bold border border-white/20 transition-all cursor-pointer"
              >
                <Icon name="arrow_back" size={16} />
                Back to Home
              </button>
            </div>

            {/* Middle Brand Showcase */}
            <div className="relative z-10 flex flex-col items-start my-auto space-y-4">
              <div className="w-32 h-32 rounded-2xl bg-white/95 backdrop-blur-md p-3 flex items-center justify-center shadow-xl shadow-black/10 border border-white/40 mb-1">
                <img
                  alt="Sanjhi Logo"
                  src={logo}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h2 className="font-headline text-[28px] font-bold leading-tight tracking-tight text-white">
                Secure Access to Your Savings Pools
              </h2>
              
              <div className="pt-2">
                <p className="font-urdu text-[20px] font-bold text-teal-100 leading-snug" dir="rtl">
                  آپ کی بچت اور کمیٹی کا بااعتماد پلیٹ فارم
                </p>
              </div>

              {/* Feature Pills */}
              <div className="space-y-2.5 pt-4 w-full">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="w-7 h-7 rounded-lg bg-emerald-400/20 flex items-center justify-center text-emerald-300">
                    <Icon name="shield" size={16} />
                  </div>
                  <span className="font-body text-[12px] font-medium text-white/90">PostgreSQL Ledger Security</span>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300">
                    <Icon name="auto_awesome" size={16} />
                  </div>
                  <span className="font-body text-[12px] font-medium text-white/90">Sanjhi AI Case & Payout Assistant</span>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="w-7 h-7 rounded-lg bg-teal-300/20 flex items-center justify-center text-teal-200">
                    <Icon name="verified" size={16} />
                  </div>
                  <span className="font-body text-[12px] font-medium text-white/90">CNIC Verified Trust Scores</span>
                </div>
              </div>
            </div>

            {/* Bottom Copyright */}
            <div className="relative z-10 text-[11px] font-body text-white/60">
              © 2026 Sanjhi AI. All rights reserved.
            </div>
          </div>

          {/* Right Panel: Login Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white/70">
            
            {/* Top Bar with Back Button (Mobile) & Quick Demo Switcher */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigate('/')}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full bg-[#006972]/10 text-[#006972] border border-[#006972]/15 active:scale-95 transition-all"
                aria-label="Go back"
              >
                <Icon name="arrow_back" size={18} />
              </button>

              <div className="ml-auto flex items-center gap-1.5 bg-[#006972]/5 p-1 rounded-full border border-[#006972]/10">
                <span className="font-label text-[11px] font-bold text-gray-500 px-2 hidden xs:inline">Quick Demo:</span>
                <button
                  type="button"
                  onClick={() => fillDemoAccount('user')}
                  className="px-2.5 py-1 rounded-full text-[11px] font-label font-bold bg-white text-[#006972] shadow-sm hover:bg-[#006972] hover:text-white transition-all cursor-pointer border-none"
                >
                  User
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount('admin')}
                  className="px-2.5 py-1 rounded-full text-[11px] font-label font-bold bg-[#006972] text-white shadow-sm hover:bg-[#00575f] transition-all cursor-pointer border-none"
                >
                  Super Admin
                </button>
              </div>
            </div>

            {/* Header / Logo (Mobile centered) */}
            <div className="text-left mb-6">
              <div className="lg:hidden flex items-center gap-3 mb-3 cursor-pointer" onClick={() => navigate('/')}>
                <img alt="Sanjhi Logo" src={logo} className="w-12 h-12 object-contain" />
                <span className="font-headline text-[22px] font-bold text-[#006972]">Sanjhi AI</span>
              </div>

              <h1 className="text-[26px] sm:text-[32px] font-bold text-deep-navy font-headline leading-tight tracking-tight">
                Welcome Back
              </h1>
              <p className="font-body text-[13.5px] text-on-surface-variant mt-1">
                Log in to access your committee rotation, payout schedules, and ledger.
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#006972]/8 rounded-2xl mb-6 border border-[#006972]/15">
              <button
                type="button"
                onClick={() => {
                  setMode('password');
                  setApiError('');
                }}
                className={`py-2 px-3 rounded-xl font-label text-[13px] font-bold transition-all border-none cursor-pointer flex items-center justify-center gap-1.5 ${
                  mode === 'password'
                    ? 'bg-white text-[#006972] shadow-sm'
                    : 'text-gray-600 hover:text-[#006972]'
                }`}
              >
                <Icon name="lock" size={16} />
                Password Login
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('otp');
                  setApiError('');
                }}
                className={`py-2 px-3 rounded-xl font-label text-[13px] font-bold transition-all border-none cursor-pointer flex items-center justify-center gap-1.5 ${
                  mode === 'otp'
                    ? 'bg-white text-[#006972] shadow-sm'
                    : 'text-gray-600 hover:text-[#006972]'
                }`}
              >
                <Icon name="sms" size={16} />
                Fast OTP Login
              </button>
            </div>

            {/* Password Reset Success Box */}
            {passwordJustReset && !apiError && (
              <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-[13px] font-body flex items-start gap-2.5 shadow-sm animate-fade-in">
                <Icon name="check_circle" size={18} className="shrink-0 mt-0.5 text-emerald-600" />
                <span>Your password has been reset successfully. Please log in with your new credentials.</span>
              </div>
            )}

            {/* API Error Box */}
            {apiError && (
              <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-[13px] font-body flex items-start gap-2.5 shadow-sm animate-fade-in">
                <Icon name="error" size={18} className="shrink-0 mt-0.5 text-rose-600" />
                <span>{apiError}</span>
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email / Phone Input */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="email" className="block font-label text-[13px] font-bold text-deep-navy">
                  Email Address or Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#006972]/10 flex items-center justify-center text-[#006972] group-focus-within:bg-[#006972] group-focus-within:text-white transition-all duration-200">
                    <Icon name="mail" size={18} />
                  </div>
                  <input
                    type="text"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. user@sanjhi.pk or 03001234567"
                    className="w-full h-12 pl-13 pr-4 bg-white border border-[#006972]/20 rounded-2xl focus:border-[#006972] focus:ring-4 focus:ring-[#006972]/10 transition-all font-body text-[14px] text-deep-navy outline-none shadow-sm"
                  />
                </div>
              </div>

              {/* Password Input (Only when mode === 'password') */}
              {mode === 'password' && (
                <div className="space-y-1.5 text-left animate-fade-in">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="block font-label text-[13px] font-bold text-deep-navy">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => navigate('/forgot-password')}
                      className="font-label text-[12px] font-semibold text-[#006972] hover:underline bg-transparent border-none cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#006972]/10 flex items-center justify-center text-[#006972] group-focus-within:bg-[#006972] group-focus-within:text-white transition-all duration-200">
                      <Icon name="lock" size={18} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-12 pl-13 pr-12 bg-white border border-[#006972]/20 rounded-2xl focus:border-[#006972] focus:ring-4 focus:ring-[#006972]/10 transition-all font-body text-[14px] text-deep-navy outline-none shadow-sm"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-gray-400 hover:text-[#006972] transition-colors cursor-pointer border-none bg-transparent"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#006972] focus:ring-[#006972]"
                  />
                  <span className="font-body text-[13px] text-on-surface-variant font-medium">Keep me logged in</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                onClick={(e) => triggerRipple(e, 'submit')}
                className="relative overflow-hidden w-full bg-[#006972] hover:bg-[#00575f] text-white py-3.5 px-6 rounded-2xl font-label text-[15px] font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] duration-200 mt-3 shadow-lg shadow-[#006972]/25 hover:shadow-xl cursor-pointer disabled:opacity-50 border-none"
              >
                {ripples.submit && (
                  <span
                    className="absolute rounded-full bg-white/30 w-32 h-32 -translate-x-1/2 -translate-y-1/2 animate-ping pointer-events-none"
                    style={{ left: ripples.submit.x, top: ripples.submit.y }}
                  />
                )}
                {loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    {mode === 'otp' ? 'Sending Code...' : 'Logging in...'}
                  </>
                ) : (
                  <>
                    {mode === 'otp' ? 'Send Verification OTP' : 'Log In to Account'}
                    <Icon name="arrow_forward" size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Bottom Create Account Link */}
            <div className="mt-6 pt-4 border-t border-[#006972]/10 text-center">
              <p className="font-body text-[14px] text-on-surface-variant">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/signup')}
                  className="text-[#006972] font-bold hover:underline underline-offset-4 bg-transparent border-none cursor-pointer"
                >
                  Create Account
                </button>
              </p>
            </div>

          </div>

        </div>
      </div>
    </AuthAmbientBackground>
  );
}
