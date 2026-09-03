import { useNavigate } from 'react-router-dom';
import logo from '../../assets/screen.png';

export default function Loading() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white relative flex flex-col items-center justify-center p-4 overflow-hidden selection:bg-transparent">
      {/* ── Ambient Dashboard Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #006972 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute w-[520px] h-[520px] rounded-full bg-[#006972]/6 blur-3xl top-[-120px] left-[-120px] animate-float-y-slow" />
        <div className="absolute w-[380px] h-[380px] rounded-full bg-amber-400/6 blur-3xl bottom-[-80px] right-[-80px]" />
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] opacity-[0.035] select-none pointer-events-none"
          style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(85%) saturate(1450%) hue-rotate(152deg)' }}
        />
      </div>

      {/* ── Central Glass Card ── */}
      <div className="relative z-10 flex flex-col items-center text-center p-8 sm:p-10 rounded-3xl bg-white/85 backdrop-blur-xl border border-[#006972]/15 shadow-[0_24px_60px_-15px_rgba(0,105,114,0.14)] animate-fade-in max-w-[360px] w-full">
        {/* Logo Container with Glowing Ring */}
        <div className="relative w-24 h-24 flex items-center justify-center mb-6">
          <div className="absolute -inset-2 rounded-3xl border-2 border-[#006972]/20 border-t-[#006972] animate-spin" />
          <div className="w-20 h-20 rounded-2xl bg-white p-3 shadow-md border border-[#006972]/15 flex items-center justify-center">
            <img src={logo} alt="Sanjhi Logo" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Text Details with clear, generous line spacing */}
        <div className="flex flex-col items-center gap-1.5 mb-6">
          <h1 className="font-headline font-extrabold text-[#006972] text-[26px] tracking-tight">Sanjhi</h1>
          <p className="font-urdu text-[22px] text-deep-navy font-bold leading-relaxed">سانجھی</p>
          <span className="font-label text-[11px] uppercase tracking-widest font-bold text-[#006972]/70 mt-1">
            Community Savings · Trusted Pools
          </span>
        </div>

        {/* Centered Progress Bar */}
        <div className="w-full max-w-[200px] h-2 rounded-full bg-[#006972]/10 overflow-hidden border border-[#006972]/10 mb-3.5">
          <div
            className="h-full rounded-full animate-shimmer"
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, #006972, #10b981, #d4af37, #006972)',
              backgroundSize: '200% 100%',
            }}
          />
        </div>

        <span className="font-body text-[12px] text-on-surface-variant font-medium flex items-center gap-2 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping-slow" />
          Loading experience...
        </span>

        {/* Home fallback button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 text-[11px] font-label font-bold text-[#006972]/60 hover:text-[#006972] transition-colors"
        >
          Taking too long? Go to Dashboard →
        </button>
      </div>
    </div>
  );
}
