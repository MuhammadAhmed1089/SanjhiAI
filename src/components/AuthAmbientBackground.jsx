import logo from '../assets/screen.png';
import Icon from './Icon';

const PARTICLES = [
  { x: 10, y: 18, size: 5, delay: 0, dur: 6 },
  { x: 25, y: 52, size: 3, delay: 1.2, dur: 8 },
  { x: 45, y: 14, size: 4, delay: 2.5, dur: 7 },
  { x: 62, y: 68, size: 6, delay: 0.7, dur: 5 },
  { x: 75, y: 32, size: 3, delay: 3.1, dur: 9 },
  { x: 86, y: 78, size: 5, delay: 1.8, dur: 6.5 },
  { x: 32, y: 85, size: 4, delay: 4.0, dur: 7.5 },
  { x: 90, y: 20, size: 3, delay: 0.4, dur: 8.5 },
  { x: 52, y: 48, size: 6, delay: 2.0, dur: 5.5 },
  { x: 70, y: 88, size: 4, delay: 3.5, dur: 7 },
];

const TICKER_ITEMS = [
  { icon: 'verified_user', text: 'Sanjhi — Verified Peer-to-Peer Savings Platform', color: 'text-[#006972]' },
  { icon: 'shield', text: '100% Encrypted & Bank-Grade Security', color: 'text-emerald-600' },
  { icon: 'groups', text: 'Join Trusted Committee Savings Pools', color: 'text-[#006972]' },
  { icon: 'auto_awesome', text: 'AI-Powered Smart Recommendations', color: 'text-amber-700' },
];

export default function AuthAmbientBackground({ showTicker = false, children }) {
  return (
    <div className="min-h-screen bg-white text-deep-navy font-body antialiased relative overflow-x-hidden flex flex-col justify-between">
      {/* Ambient background layer - exact match with User Dashboard */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #006972 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Slow-drifting color gradient blobs */}
        <div className="absolute w-[540px] h-[540px] rounded-full bg-[#006972]/8 blur-3xl top-[-140px] left-[-140px] animate-float-y-slow pointer-events-none" />
        <div
          className="absolute w-[420px] h-[420px] rounded-full bg-amber-400/8 blur-3xl bottom-[5%] right-[-100px] pointer-events-none"
          style={{ animation: 'float-y 9s ease-in-out infinite 2s' }}
        />
        <div
          className="absolute w-[360px] h-[360px] rounded-full bg-[#006972]/5 blur-3xl top-[40%] right-[10%] pointer-events-none"
          style={{ animation: 'float-y 11s ease-in-out infinite 1s' }}
        />

        {/* Drifting particle effects */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#006972] particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: 0.22,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Sanjhi logo watermark - Responsive for all screen sizes */}
        <img
          src={logo}
          alt=""
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] md:w-[720px] lg:w-[950px] xl:w-[1150px] opacity-[0.045] select-none pointer-events-none transition-all duration-300"
          style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(85%) saturate(1450%) hue-rotate(152deg)' }}
        />
      </div>

      {/* Optional Top Live Ticker */}
      {showTicker && (
        <div className="relative z-30 bg-[#006972]/8 border-b border-[#006972]/15 overflow-hidden h-9 flex items-center shrink-0">
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex whitespace-nowrap animate-ticker gap-0">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-6 font-label text-[12px] font-semibold">
                <Icon name={item.icon} size={14} className={item.color} />
                <span className="text-deep-navy/70">{item.text}</span>
                <span className="mx-3 text-[#006972]/30">•</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
