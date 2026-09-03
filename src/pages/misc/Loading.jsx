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
        <div className="absolute w-[480px] h-[480px] rounded-full bg-[#006972]/8 blur-3xl top-[-120px] left-[-120px] animate-float-y-slow" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#d4af37]/9 blur-3xl bottom-[-80px] right-[-80px]" />
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] max-w-[80vw] opacity-[0.035] select-none pointer-events-none"
          style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(85%) saturate(1450%) hue-rotate(152deg)' }}
        />
      </div>

      {/* ── Central Glass Card ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-[44px_36px_38px] rounded-[32px] bg-white/88 backdrop-blur-[18px] border-[1.5px] border-[#006972]/16 shadow-[0_24px_64px_-15px_rgba(0,105,114,0.14),0_4px_16px_rgba(0,0,0,0.03)] animate-fade-in max-w-[92vw] w-[390px] min-h-[470px]">
        {/* Logo Container with Pulsing Ring */}
        <div className="relative w-24 h-24 flex items-center justify-center mb-6 shrink-0">
          <div className="absolute -inset-1.5 rounded-[2rem] border-2 border-[#006972]/22 animate-pulse" />
          <div className="absolute -inset-3.5 rounded-[2.25rem] border-[1.5px] border-[#006972]/10" />
          <div className="w-[88px] h-[88px] rounded-[1.75rem] bg-white p-3 shadow-[0_12px_32px_rgba(0,105,114,0.15),0_2px_6px_rgba(0,0,0,0.04)] border-2 border-[#006972]/16 flex items-center justify-center">
            <img src={logo} alt="Sanjhi Logo" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Brand Text Details with generous line spacing */}
        <div className="flex flex-col items-center gap-2.5 mb-7">
          <h1 className="font-headline text-[28px] font-extrabold text-[#006972] tracking-tight leading-[1.25] mb-0.5">Sanjhi</h1>
          <p className="font-urdu text-[25px] text-deep-navy font-bold leading-[1.7] mb-0.5">سانجھی</p>
          <span className="font-label text-[11px] uppercase tracking-[0.16em] font-bold text-[#006972]/80 mt-1">
            Community Savings · Trusted Pools
          </span>
        </div>

        {/* Progress Section */}
        <div className="w-full flex flex-col items-center gap-3.5">
          <div className="w-full max-w-[230px] h-[6px] rounded-full bg-[#006972]/12 overflow-hidden border border-[#006972]/10">
            <div
              className="h-full rounded-full animate-shimmer"
              style={{
                width: '100%',
                background: 'linear-gradient(90deg, #006972, #10b981, #d4af37, #006972)',
                backgroundSize: '250% 100%',
              }}
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#006972]/7 border border-[#006972]/14 font-label text-[11px] font-semibold text-[#006972]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Loading experience...</span>
          </div>
        </div>

        {/* Home fallback button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-5 text-[11px] font-label font-bold text-[#006972]/60 hover:text-[#006972] transition-colors cursor-pointer border-none bg-transparent"
        >
          Taking too long? Go to Dashboard →
        </button>
      </div>
    </div>
  );
}
