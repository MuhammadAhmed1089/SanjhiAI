import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import FloatingField from '../../components/FloatingField';

/* ── Muted icon themes (same palette as signup) ── */
const ICON_THEMES = {
  identity: 'bg-[#006972]',
  password: 'bg-[#4a5670]',
};

/**
 * Detect whether the input is an email or phone number.
 * - Contains '@' → email
 * - Starts with '+' or all digits (with optional leading +) → phone
 * - Otherwise → unknown
 */
function detectInputType(value) {
  if (!value) return 'unknown';
  if (value.includes('@')) return 'email';
  const stripped = value.replace(/[\s\-()]/g, '');
  if (/^\+?\d{3,}$/.test(stripped)) return 'phone';
  return 'unknown';
}

export default function LoginForm() {
  const navigate = useNavigate();

  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const inputType = detectInputType(identity);

  function handleSubmit(e) {
    e.preventDefault();
    // For preview, navigate to dashboard
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative py-6 px-4">
      {/* Animated background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Glass card */}
      <div className="glass-card w-full max-w-lg relative z-10 p-5 md:p-6 animate-fade-up">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 left-3 md:top-4 md:left-4 w-8 h-8 rounded-full flex items-center justify-center text-deep-navy/50 hover:text-deep-navy hover:bg-white/50 transition-all"
        >
          <Icon name="arrow_back_ios" size={16} />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="font-headline text-[26px] md:text-[34px] leading-tight font-bold text-deep-navy mb-0.5">
            Welcome Back
          </h1>
          <p className="font-body text-[13px] text-on-surface-variant">
            Log in to your Sanjhi account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          {/* ── Email / Phone ── */}
          <div className="relative">
            <FloatingField
              icon={inputType === 'email' ? 'mail' : 'smartphone'}
              theme={ICON_THEMES.identity}
              label="Email or Phone Number"
              active={identity.length > 0}
            >
              <input
                type="text"
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                placeholder=""
                className="field-input"
                autoComplete="username"
              />
            </FloatingField>

            {/* Detection indicator */}
            {identity.length > 2 && inputType !== 'unknown' && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 animate-fade-in">
                <span className={`text-[10px] font-label font-semibold px-2 py-0.5 rounded-full ${
                  inputType === 'email'
                    ? 'bg-sky-100 text-sky-700'
                    : 'bg-teal-100 text-teal-700'
                }`}>
                  {inputType === 'email' ? 'Email' : 'Phone'}
                </span>
              </div>
            )}
          </div>

          {/* ── Password ── */}
          <FloatingField
            icon="lock"
            theme={ICON_THEMES.password}
            label="Password"
            active={password.length > 0}
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-on-surface-variant hover:text-deep-navy transition-colors p-1"
              >
                <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={20} />
              </button>
            }
          >
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              className="field-input pr-11"
              autoComplete="current-password"
            />
          </FloatingField>

          {/* Forgot password */}
          <div className="flex justify-end -mt-1">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="font-label text-[12px] font-semibold text-teal-emerald hover:text-secondary transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* ── Submit ── */}
          <button
            type="submit"
            className="mt-2 w-full font-label text-[14px] font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-r from-teal-emerald to-teal-emerald/80 text-white shadow-lg shadow-teal-emerald/20 hover:shadow-xl hover:shadow-teal-emerald/30 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!identity || !password}
          >
            Log In
            <Icon name="arrow_forward" size={18} />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="font-body text-[13px] text-on-surface-variant">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="font-label text-[13px] font-semibold text-teal-emerald hover:text-secondary underline underline-offset-4 decoration-teal-emerald/30 transition-all"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
