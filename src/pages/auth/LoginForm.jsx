import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/screen.png';

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('hello123@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    navigate('/dashboard');
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen py-6 px-4 overflow-y-auto flex items-center justify-center relative jali-pattern">
      {/* Ambient glowing orbs (Decorative) */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary-fixed opacity-20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-tertiary-fixed opacity-20 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <main className="w-full max-w-[460px] relative z-10 my-auto">
        <div className="bg-surface-container-lowest rounded-xl p-5 md:p-8 shadow-[0_24px_64px_-12px_rgba(0,105,114,0.08),0_0_0_1px_rgba(116,119,125,0.1)] flex flex-col items-center">
          
          {/* Header area with back button */}
          <div className="w-full flex items-center justify-between mb-2">
            <button
              onClick={() => navigate('/')}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-variant/50 transition-colors text-outline cursor-pointer"
              aria-label="Go back"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
            </button>
            <div className="w-9 h-9"></div> {/* Spacer */}
          </div>

          <div className="text-center mb-6 w-full flex flex-col items-center">
            <img
              alt="Sanjhi Handshake Logo"
              src={logo}
              className="w-20 h-20 md:w-28 md:h-28 mb-3 object-contain logo-green drop-shadow-md"
            />
            <h1 className="text-[26px] md:text-[38px] leading-tight font-bold text-primary mb-1 font-display-lg">
              Welcome Back
            </h1>
            <p className="font-body-md text-[14px] md:text-[16px] text-on-surface-variant">
              Log in to your Sanjhi account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5">
            
            {/* Email Field */}
            <div className="relative group">
              <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center text-on-surface-variant group-focus-within:text-secondary transition-colors z-10 pointer-events-none">
                <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                </div>
              </div>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full h-11 pl-[52px] pr-16 bg-primary-fixed text-on-primary-fixed border-0 rounded-lg focus:ring-2 focus:ring-secondary transition-shadow font-body-md text-[15px] outline-none"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-surface-container-lowest rounded text-secondary font-label-sm text-[10px] uppercase tracking-wider shadow-xs">
                Email
              </div>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center text-on-surface-variant group-focus-within:text-secondary transition-colors z-10 pointer-events-none">
                <div className="w-9 h-9 bg-surface-tint rounded-full flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                </div>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-11 pl-[52px] pr-12 bg-primary-fixed text-on-primary-fixed border-0 rounded-lg focus:ring-2 focus:ring-secondary transition-shadow font-body-md text-[15px] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 h-full w-11 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>

            <div className="flex justify-end w-full">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="font-label-sm text-label-sm text-secondary hover:text-on-secondary-container transition-colors bg-transparent border-none cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary py-3.5 px-6 rounded-lg font-label-sm text-label-sm flex items-center justify-center gap-2 transition-all active:scale-95 duration-200 mt-1 shadow-sm hover:shadow-md cursor-pointer"
            >
              Log In
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-body-md text-[14px] text-on-surface-variant">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-secondary font-bold hover:underline underline-offset-4 decoration-2 bg-transparent border-none cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="fixed bottom-8 right-8 w-12 h-12 bg-secondary text-on-secondary rounded-full shadow-lg flex items-center justify-center hover:bg-on-secondary-fixed-variant transition-colors active:scale-90 z-50 hidden md:flex cursor-pointer"
        aria-label="Dashboard widgets"
      >
        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>widgets</span>
      </button>
    </div>
  );
}
