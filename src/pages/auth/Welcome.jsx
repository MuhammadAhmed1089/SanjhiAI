import { useNavigate } from 'react-router-dom';
import logo from '../../assets/screen.png';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row bg-white overflow-hidden">
      {/* ── Left Panel ── */}
      <div className="relative w-full lg:w-1/2 h-[33%] md:h-[38%] lg:h-full bg-white lg:bg-[#006972] flex flex-col justify-between py-2 px-6 md:p-8 lg:p-16 overflow-hidden shrink-0">
        {/* Soft texture overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.35) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {/* Center logo */}
        <div className="relative z-10 flex flex-col items-center text-center my-auto">
          <img
            alt="Sanjhi Logo"
            src={logo}
            className="w-40 md:w-64 object-contain logo-3d-green block lg:hidden"
          />
          <img
            alt="Sanjhi Logo"
            src={logo}
            className="w-80 object-contain logo-3d hidden lg:block"
          />
        </div>

        {/* Bottom tagline / English caption */}
        <div className="relative z-10 w-full text-center lg:text-left">
          <h2 className="text-[#006972] lg:text-white font-headline text-[16px] md:text-[32px] lg:text-[42px] leading-tight font-bold">
            Collective Sharing.<br />Shared Success.
          </h2>
        </div>

        {/* Decorative wave shape on right edge (desktop only) */}
        <div className="hidden lg:block absolute top-0 -right-[1px] h-full w-16 z-20 glossy-wave">
          <svg viewBox="0 0 100 800" preserveAspectRatio="none" className="h-full w-full">
            <path d="M0,0 C60,150 20,300 60,450 C90,580 20,650 40,800 L100,800 L100,0 Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="relative w-full lg:w-1/2 flex-1 flex flex-col justify-start lg:justify-center pt-2 p-4 md:p-12 lg:p-16 bg-white dotted-pattern overflow-y-auto lg:overflow-visible">
        <div className="max-w-md mx-auto lg:mx-0 w-full flex flex-col gap-3 md:gap-5">
          {/* Heading */}
          <div className="flex flex-col items-center text-center lg:items-end lg:text-right w-full">
            <h1 className="font-headline text-[24px] md:text-[40px] font-bold text-[#006972] leading-tight">
              Welcome to Sanjhi
            </h1>
            <p className="font-headline text-[16px] md:text-[22px] text-[#006972] mt-0.5">
              سانجھی میں خوش آمدید
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 md:gap-4 mt-1">
            <button
              onClick={() => navigate('/signup')}
              className="w-full py-3.5 md:py-4 rounded-full font-label text-[15px] font-bold text-white bg-[#006972] active:scale-[0.98] transition-all shadow-md hover-glow"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3.5 md:py-4 rounded-full font-label text-[15px] font-bold text-[#006972] border-2 border-[#006972] bg-white active:scale-[0.98] transition-all hover-glow"
            >
              Login
            </button>
          </div>

          {/* How it works */}
          <div>
            <h3 className="font-label text-[13px] md:text-[14px] font-semibold text-deep-navy mb-3 md:mb-4">
              How it works
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <Feature icon="groups" label="Join a Group" />
              <Feature icon="swap_horiz" label="Share Resources" />
              <Feature icon="verified_user" label="Build Trust Together" />
            </div>
          </div>
        </div>

        {/* Floating grid/menu button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#006972] text-white flex items-center justify-center shadow-lg hover:bg-[#005a62] active:scale-95 transition-all z-30"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>apps</span>
        </button>
      </div>
    </div>
  );
}

function Feature({ icon, label }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 hover-glow-icon cursor-pointer">
      <div className="w-14 h-14 rounded-full bg-[#006972]/5 flex items-center justify-center text-[#006972] icon-bg border border-transparent hover:border-[#006972]/20">
        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>{icon}</span>
      </div>
      <span className="font-body text-[12px] md:text-[13px] font-medium text-on-surface leading-tight">{label}</span>
    </div>
  );
}
