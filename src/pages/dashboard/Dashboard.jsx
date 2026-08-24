import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/Icon';
import logo from '../../assets/screen.png';
import { dashboardService } from '../../services';

/* ── Count-up hook ── */
function useCountUp(target, duration = 1400, active = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active || target <= 0) return;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - t, 3)) * target));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
}

/* ── Scroll-reveal hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── Helper skeleton bone ── */
function Bone({ className = '' }) {
  return <div className={`skeleton-bone ${className}`} />;
}

/* ── Ticker items ── */
const TICKER_ITEMS = [
  { icon: 'verified_user', text: 'Welcome to Sanjhi — Verified Peer-to-Peer Savings Platform', color: 'text-[#006972]' },
  { icon: 'shield', text: 'Your payments and trust score are secured via PostgreSQL ledger', color: 'text-emerald-600' },
  { icon: 'groups', text: 'Create or join a committee pool with friends & family anytime', color: 'text-[#006972]' },
  { icon: 'auto_awesome', text: 'Ask our AI Helper for advice on managing committee schedules', color: 'text-amber-700' },
];

/* ── Floating particle positions ── */
const PARTICLES = [
  { x: 12, y: 20, size: 5, delay: 0, dur: 6 },
  { x: 28, y: 55, size: 3, delay: 1.2, dur: 8 },
  { x: 48, y: 15, size: 4, delay: 2.5, dur: 7 },
  { x: 65, y: 70, size: 6, delay: 0.7, dur: 5 },
  { x: 78, y: 35, size: 3, delay: 3.1, dur: 9 },
  { x: 88, y: 80, size: 5, delay: 1.8, dur: 6.5 },
  { x: 35, y: 88, size: 4, delay: 4.0, dur: 7.5 },
  { x: 92, y: 22, size: 3, delay: 0.4, dur: 8.5 },
  { x: 55, y: 50, size: 6, delay: 2.0, dur: 5.5 },
  { x: 72, y: 90, size: 4, delay: 3.5, dur: 7 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // User state — initially null so no mock name flashes
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [activeFilter, setActiveFilter] = useState('all');
  const [ripples, setRipples] = useState({});

  const [targetScore, setTargetScore] = useState(0);
  const [targetTotal, setTargetTotal] = useState(0);
  const [targetPayout, setTargetPayout] = useState(0);
  const [nextPayoutInfo, setNextPayoutInfo] = useState(null);
  const [dbCommittees, setDbCommittees] = useState([]);
  const [dbNotifications, setDbNotifications] = useState([]);
  const [loadingBackend, setLoadingBackend] = useState(true);

  const trustScore = useCountUp(targetScore, 1600, !loadingBackend);
  const totalAmt = useCountUp(targetTotal, 1900, !loadingBackend);
  const nextPayoutAmt = useCountUp(targetPayout, 1700, !loadingBackend);

  const [heroRef, heroInView] = useInView(0.1);
  const [actionsRef, actionsInView] = useInView(0.1);
  const [committeeRef, committeeInView] = useInView(0.1);
  const [activityRef, activityInView] = useInView(0.1);

  useEffect(() => {
    // If navigation passed state user info, initialize with that
    if (location.state?.user?.full_name) {
      setUserName(location.state.user.full_name);
    }

    async function loadDashboardData() {
      try {
        const token = localStorage.getItem('sanjhi_token');
        if (!token) {
          setLoadingBackend(false);
          return;
        }

        const data = await dashboardService.getDashboardOverview();

        if (data?.user?.fullName) {
          setUserName(data.user.fullName);
          setUserEmail(data.user.email || '');
        } else if (data?.user?.email) {
          setUserName(data.user.email.split('@')[0]);
        }

        if (data?.trustScore?.score) {
          setTargetScore(data.trustScore.score);
        } else {
          setTargetScore(850); // default starting trust score
        }

        if (data?.financialSummary?.totalContributed !== undefined) {
          setTargetTotal(data.financialSummary.totalContributed);
        }

        if (data?.financialSummary?.nextPayout) {
          setNextPayoutInfo(data.financialSummary.nextPayout);
          setTargetPayout(data.financialSummary.nextPayout.amount || 0);
        }

        if (data?.committees && Array.isArray(data.committees)) {
          setDbCommittees(data.committees);
        }

        if (data?.recentNotifications && Array.isArray(data.recentNotifications)) {
          setDbNotifications(data.recentNotifications);
        }
      } catch (err) {
        console.log('Backend connection notice:', err.message);
      } finally {
        setLoadingBackend(false);
      }
    }

    loadDashboardData();
  }, [location]);

  function ripple(e, id) {
    const r = e.currentTarget.getBoundingClientRect();
    setRipples((p) => ({ ...p, [id]: { x: e.clientX - r.left, y: e.clientY - r.top, k: Date.now() } }));
    setTimeout(() => setRipples((p) => { const n = { ...p }; delete n[id]; return n; }), 700);
  }

  const navTabs = [
    { label: 'Home', icon: 'dashboard', path: '/dashboard' },
    { label: 'Pools', icon: 'groups', path: '/committee/1' },
    { label: 'Payments', icon: 'account_balance_wallet', path: '/payments' },
    { label: 'Support', icon: 'support_agent', path: '/support' },
    { label: 'Profile', icon: 'person', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-white text-deep-navy font-body antialiased relative overflow-x-hidden pb-28 md:pb-12">

      {/* ══════════════════════════════════════════════════ */}
      {/*  AMBIENT BACKGROUND LAYER                         */}
      {/* ══════════════════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.35]"
          style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #006972 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        {/* Slow-drifting colour blobs */}
        <div className="absolute w-[520px] h-[520px] rounded-full bg-[#006972]/6 blur-3xl top-[-120px] left-[-120px] animate-float-y-slow" />
        <div className="absolute w-[380px] h-[380px] rounded-full bg-amber-400/6 blur-3xl bottom-[10%] right-[-80px]"
          style={{ animation: 'float-y 9s ease-in-out infinite 2s' }} />

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <div key={i} className="absolute rounded-full bg-[#006972] particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: 0.18,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Sanjhi logo watermark */}
        <img src={logo} alt="" aria-hidden className="absolute bottom-[-40px] right-[-40px] w-[420px] sm:w-[520px] opacity-[0.04] select-none animate-float-y-slow"
          style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(85%) saturate(1450%) hue-rotate(152deg)' }} />
      </div>

      {/* ══════════════════════════════════════════════════ */}
      {/*  LIVE ACTIVITY TICKER                             */}
      {/* ══════════════════════════════════════════════════ */}
      <div className="relative z-30 bg-[#006972]/8 border-b border-[#006972]/15 overflow-hidden h-9 flex items-center">
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

      {/* ══════════════════════════════════════════════════ */}
      {/*  TOP APP BAR                                      */}
      {/* ══════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 bg-white/92 backdrop-blur-md border-b border-[#006972]/10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/profile')} className="relative group cursor-pointer border-none bg-transparent p-0">
              <img src="/avatar.svg" alt="Profile"
                className="w-11 h-11 rounded-full object-cover border-2 border-[#006972] shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300 animate-glow-ring" />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white bg-emerald-500">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping-slow" />
              </span>
            </button>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-label font-medium text-on-surface-variant">Welcome back,</span>
                <span className="text-[10px] font-label px-2 py-0.5 rounded-full bg-[#006972]/10 text-[#006972] font-bold uppercase tracking-wider">
                  Verified ✓
                </span>
              </div>

              {/* Show skeleton while loading backend name to prevent flashing mock names */}
              {loadingBackend && !userName ? (
                <Bone className="w-36 h-6 rounded-full mt-1" />
              ) : (
                <h1 className="font-headline text-[20px] sm:text-[24px] font-bold text-[#006972] tracking-tight leading-tight">
                  {userName || 'User'}
                </h1>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <nav className="hidden md:flex items-center gap-1 mr-2">
              {navTabs.slice(1, 4).map((item) => (
                <button key={item.path} onClick={() => navigate(item.path)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full font-label text-[13px] font-semibold text-deep-navy/60 hover:text-[#006972] hover:bg-[#006972]/8 transition-all duration-200 cursor-pointer border-none bg-transparent">
                  <Icon name={item.icon} size={17} />
                  {item.label}
                </button>
              ))}
            </nav>

            <button onClick={(e) => { ripple(e, 'ai'); navigate('/assistant'); }}
              className="relative overflow-hidden flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#006972]/10 hover:bg-[#006972]/18 text-[#006972] font-label text-[13px] font-bold border border-[#006972]/25 transition-all active:scale-95 cursor-pointer">
              {ripples.ai && <span key={ripples.ai.k} className="absolute rounded-full bg-[#006972]/20 w-28 h-28 -translate-x-1/2 -translate-y-1/2 animate-ping pointer-events-none" style={{ left: ripples.ai.x, top: ripples.ai.y }} />}
              <Icon name="auto_awesome" size={17} className="animate-float-y-fast" />
              <span className="hidden sm:inline">AI Helper</span>
            </button>

            <button onClick={() => navigate('/notifications')}
              className="relative p-2.5 rounded-full bg-white hover:bg-[#006972]/5 border border-[#006972]/20 text-[#006972] transition-all active:scale-95 cursor-pointer group" aria-label="Notifications">
              <Icon name="notifications" size={22} className="group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white animate-ping" />
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════ */}
      {/*  MAIN CONTENT                                     */}
      {/* ══════════════════════════════════════════════════ */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8 relative z-10">

        {/* ── TRUST SCORE + METRICS ── */}
        <section ref={heroRef} className={`grid grid-cols-1 lg:grid-cols-12 gap-5 transition-all duration-700 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Trust Score Card */}
          <div className="lg:col-span-8 bg-[#006972] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between shadow-xl shadow-[#006972]/25 group cursor-default animate-border-breathe border-2 border-transparent min-h-[220px]">
            <div className="absolute inset-0 opacity-15 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            <img src={logo} alt="" aria-hidden
              className="absolute right-10 top-1/2 -translate-y-1/2 w-24 opacity-10 select-none hidden sm:block animate-float-y-slow"
              style={{ filter: 'brightness(0) invert(1)' }} />

            <div className="hidden lg:block absolute top-0 -right-px h-full w-14 z-10">
              <svg viewBox="0 0 100 600" preserveAspectRatio="none" className="h-full w-full">
                <path d="M0,0 C60,100 20,250 60,350 C90,430 20,500 40,600 L100,600 L100,0 Z" fill="white" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-white/20 group-hover:bg-white/30 transition-colors animate-float-y-fast">
                    <Icon name="shield_with_heart" size={22} />
                  </span>
                  <h2 className="font-label text-[11px] uppercase tracking-widest font-bold text-white/85">Community Trust Score</h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-label font-bold border border-white/30 flex items-center gap-1">
                  <Icon name="verified" size={14} /> Top Tier Participant
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-4">
                {loadingBackend ? (
                  <Bone className="w-36 h-16 rounded-2xl bg-white/20" />
                ) : (
                  <span className="font-headline text-[60px] sm:text-[72px] font-extrabold text-white tracking-tight leading-none tabular-nums animate-score-glow">
                    {trustScore.toLocaleString()}
                  </span>
                )}
                <span className="text-[14px] font-body text-white/85 max-w-[220px] leading-snug">
                  Your payments are verified on-time. You qualify for high-tier pools!
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 relative z-10">
              <div className="flex justify-between text-[12px] font-label text-white/90 mb-2 font-medium">
                <span>{trustScore.toLocaleString()} / 900</span>
                <span className="font-bold">94% Reliability Rate</span>
              </div>
              <div className="w-full h-3 bg-black/25 rounded-full overflow-hidden p-0.5 border border-white/25">
                <div className="h-full rounded-full transition-all duration-[1700ms] ease-out relative overflow-hidden"
                  style={{ width: heroInView ? '94%' : '0%', background: 'linear-gradient(90deg, #fcd34d, #6ee7b7, #ffffff)' }}>
                  <div className="absolute inset-0 animate-shimmer" />
                </div>
              </div>
            </div>
          </div>

          {/* Side Metric Cards */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            {[
              {
                icon: 'account_balance_wallet',
                label: 'Total Contributed',
                value: `PKR ${totalAmt.toLocaleString()}`,
                sub: 'Confirmed payments',
                subIcon: 'trending_up',
                subColor: 'text-emerald-700',
                iconCls: 'bg-[#006972] text-white shadow-md shadow-[#006972]/25',
                delay: '0s',
              },
              {
                icon: 'event_available',
                label: 'Next Payout Turn',
                value: nextPayoutInfo ? `PKR ${nextPayoutAmt.toLocaleString()}` : 'None Scheduled',
                sub: nextPayoutInfo ? `Turn #${nextPayoutInfo.turnNumber} — ${new Date(nextPayoutInfo.dueDate).toLocaleDateString()}` : 'No upcoming payout',
                subIcon: 'schedule',
                subColor: 'text-amber-800',
                iconCls: 'bg-[#006972]/10 text-[#006972] border-2 border-[#006972]/20',
                delay: '0.5s',
              },
            ].map((card, i) => (
              <div key={i} className="flex-1 bg-white rounded-3xl p-5 border-2 border-[#006972]/15 flex items-center gap-4 shadow-sm hover:shadow-lg hover:border-[#006972]/50 hover:-translate-y-1.5 transition-all duration-300 cursor-default"
                style={{ animation: `float-y ${6 + i * 2}s ease-in-out infinite ${card.delay}` }}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${card.iconCls}`}>
                  <Icon name={card.icon} size={24} />
                </div>
                <div>
                  <p className="font-label text-[11px] font-bold text-[#006972] uppercase tracking-wider">{card.label}</p>
                  {loadingBackend ? (
                    <Bone className="w-28 h-6 rounded-full my-1" />
                  ) : (
                    <p className="font-headline text-[20px] sm:text-[22px] font-extrabold text-deep-navy tabular-nums">{card.value}</p>
                  )}
                  <p className={`font-label text-[12px] font-bold flex items-center gap-0.5 ${card.subColor}`}>
                    <Icon name={card.subIcon} size={14} /> {card.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── QUICK ACTIONS ── */}
        <section ref={actionsRef} className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 transition-all duration-700 delay-100 ${actionsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { label: 'Create Committee', icon: 'add_circle', primary: true, path: '/committee/create', id: 'act-create' },
            { label: 'Join Committee', icon: 'group_add', primary: false, path: '/join', id: 'act-join' },
            { label: 'Pay Dues', icon: 'payments', primary: false, path: '/payments/pay', id: 'act-pay' },
            { label: 'Support Ticket', icon: 'report_problem', primary: false, path: '/support/file-complaint', id: 'act-support' },
          ].map((action, idx) => (
            <button key={action.id}
              onClick={(e) => { ripple(e, action.id); setTimeout(() => navigate(action.path), 120); }}
              className={`relative overflow-hidden py-5 px-3 rounded-2xl font-label text-[14px] font-bold active:scale-95 transition-all duration-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 flex flex-col items-center gap-2.5 cursor-pointer group ${
                action.primary
                  ? 'bg-[#006972] text-white hover:bg-[#005a62] shadow-[#006972]/20'
                  : 'bg-white text-[#006972] border-2 border-[#006972] hover:bg-[#006972]/5'
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}>
              {ripples[action.id] && (
                <span key={ripples[action.id].k} className={`absolute rounded-full w-36 h-36 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-ping ${action.primary ? 'bg-white/20' : 'bg-[#006972]/10'}`}
                  style={{ left: ripples[action.id].x, top: ripples[action.id].y }} />
              )}
              <Icon name={action.icon} size={32} className="group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300" />
              {action.label}
            </button>
          ))}
        </section>

        {/* ── COMMITTEES ── */}
        <section ref={committeeRef} className={`space-y-4 transition-all duration-700 delay-150 ${committeeInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="font-headline text-[22px] sm:text-[26px] font-bold text-[#006972] tracking-tight">Your Committees</h2>
              <p className="font-body text-[13px] text-on-surface-variant">Active savings pools you belong to in PostgreSQL</p>
            </div>
            <div className="flex items-center gap-2">
              {[{ id: 'all', label: 'All' }, { id: 'organizer', label: 'Organizing' }, { id: 'member', label: 'Member' }].map((f) => (
                <button key={f.id} onClick={() => setActiveFilter(f.id)}
                  className={`px-4 py-1.5 rounded-full font-label text-[12px] font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${activeFilter === f.id ? 'bg-[#006972] text-white shadow-sm scale-105' : 'bg-white text-[#006972] border border-[#006972]/30 hover:bg-[#006972]/5 hover:scale-105'}`}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {loadingBackend ? (
              // Shimmer skeleton cards while loading
              [0, 1].map((i) => (
                <div key={i} className="bg-white rounded-3xl p-6 border-2 border-[#006972]/10 space-y-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Bone className="w-12 h-12 rounded-2xl shrink-0" />
                      <div className="flex flex-col gap-2">
                        <Bone className="w-36 h-4 rounded-full" />
                        <Bone className="w-28 h-3 rounded-full" />
                      </div>
                    </div>
                    <Bone className="w-20 h-6 rounded-full" />
                  </div>
                  <Bone className="w-full h-14 rounded-2xl" />
                  <Bone className="w-full h-2 rounded-full" />
                </div>
              ))
            ) : dbCommittees.length > 0 ? (
              // Real committees from database
              dbCommittees
                .filter((c) => {
                  if (activeFilter === 'organizer') return c.userRole === 'Organizer' || c.userRole === 'Co-Organizer';
                  if (activeFilter === 'member') return c.userRole === 'Member';
                  return true;
                })
                .map((c) => (
                  <CommitteeCard
                    key={c.id}
                    onClick={() => navigate(`/committee/${c.id}`)}
                    iconName={c.userRole === 'Organizer' ? 'groups' : 'savings'}
                    iconBg={c.userRole === 'Organizer' ? 'bg-[#006972]/10 text-[#006972]' : 'bg-amber-500/10 text-amber-800'}
                    title={c.name}
                    subtitle={`${c.intervalType === '15_days' ? 'Bi-weekly' : 'Monthly'} • PKR ${c.contributionAmount.toLocaleString()} / cycle`}
                    badge={c.userRole}
                    badgeStyle={c.userRole === 'Organizer' ? 'bg-[#006972]/10 text-[#006972] border-[#006972]/20' : 'bg-amber-500/10 text-amber-800 border-amber-500/20'}
                    progress={c.capacity > 0 ? Math.round((c.completedCycles / c.capacity) * 100) : 0}
                    metrics={[
                      { label: 'Cycles', value: `${c.completedCycles} of ${c.capacity}` },
                      { label: 'Members', value: `${c.memberCount}` },
                      { label: 'Pool', value: `PKR ${c.totalPool >= 1000 ? (c.totalPool / 1000).toFixed(0) + 'k' : c.totalPool}`, highlight: true },
                    ]}
                    footerLeft={<><Icon name="check_circle" size={14} /> Active Pool</>}
                    footerLeftColor="text-emerald-700"
                    footerRight="Manage"
                  />
                ))
            ) : (
              // Clean Empty State Card when user is not part of any committee yet
              <div className="col-span-1 md:col-span-2 bg-white rounded-3xl p-8 border-2 border-[#006972]/15 text-center flex flex-col items-center justify-center gap-3 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-[#006972]/10 text-[#006972] flex items-center justify-center mb-1">
                  <Icon name="group_add" size={36} />
                </div>
                <h3 className="font-headline text-[20px] font-bold text-deep-navy">No Active Committees Yet</h3>
                <p className="font-body text-[14px] text-on-surface-variant max-w-md">
                  You haven't joined or created any committee pools yet. Get started by organizing a new committee or joining one with an invite code!
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                  <button
                    onClick={() => navigate('/committee/create')}
                    className="px-6 py-2.5 rounded-full font-label text-[14px] font-bold text-white bg-[#006972] hover:bg-[#005a62] transition-colors shadow-sm cursor-pointer"
                  >
                    Create Committee
                  </button>
                  <button
                    onClick={() => navigate('/join')}
                    className="px-6 py-2.5 rounded-full font-label text-[14px] font-bold text-[#006972] border-2 border-[#006972] bg-white hover:bg-[#006972]/5 transition-colors cursor-pointer"
                  >
                    Join with Code
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── RECENT ACTIVITY ── */}
        <section ref={activityRef} className={`bg-white rounded-3xl p-6 border-2 border-[#006972]/15 shadow-sm transition-all duration-700 delay-200 ${activityInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline text-[18px] font-bold text-[#006972] flex items-center gap-2">
              <Icon name="history" size={22} />
              Recent Activity
            </h3>
            <button onClick={() => navigate('/notifications')} className="font-label text-[13px] font-bold text-[#006972] hover:underline bg-transparent border-none cursor-pointer">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {loadingBackend ? (
              [0, 1].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#fbfaee]">
                  <Bone className="w-10 h-10 rounded-xl shrink-0" />
                  <div className="flex-1 flex flex-col gap-2">
                    <Bone className="w-1/3 h-4 rounded-full" />
                    <Bone className="w-2/3 h-3 rounded-full" />
                  </div>
                </div>
              ))
            ) : dbNotifications.length > 0 ? (
              dbNotifications.map((item, idx) => (
                <div key={item.id || idx}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#fbfaee] border border-deep-navy/5 hover:bg-[#006972]/5 hover:border-[#006972]/25 hover:translate-x-1 transition-all duration-200 cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#006972]/10 text-[#006972] group-hover:scale-110 transition-transform duration-200">
                    <Icon name="notifications" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-headline text-[14px] font-bold text-deep-navy truncate">{item.type?.replace('_', ' ').toUpperCase() || 'Notification'}</p>
                    <p className="font-body text-[12px] text-on-surface-variant truncate">{item.content}</p>
                  </div>
                  <span className="font-label text-[11px] text-on-surface-variant shrink-0 ml-2">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-2xl bg-[#fbfaee] text-center text-on-surface-variant text-[13px] font-body">
                No recent activity notifications yet. Your committee updates will appear here!
              </div>
            )}
          </div>
        </section>

      </main>

      {/* ══════════════════════════════════════════════════ */}
      {/*  MOBILE BOTTOM NAV BAR                           */}
      {/* ══════════════════════════════════════════════════ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#006972]/20 shadow-[0_-6px_24px_rgba(0,105,114,0.12)] px-2 py-2 flex justify-around items-center">
        {navTabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button key={tab.path} onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 active:scale-90 cursor-pointer border-none bg-transparent">
              {isActive && <span className="absolute inset-0 bg-[#006972]/10 rounded-2xl" />}
              <Icon name={tab.icon} size={24} className={`relative z-10 transition-all duration-200 ${isActive ? 'text-[#006972] icon-filled scale-110' : 'text-deep-navy/50'}`} />
              <span className={`font-label text-[10px] mt-0.5 font-semibold relative z-10 ${isActive ? 'text-[#006972]' : 'text-deep-navy/50'}`}>{tab.label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}

/* ── Committee Card Component ── */
function CommitteeCard({ onClick, iconName, iconBg, title, subtitle, badge, badgeStyle, metrics, footerLeft, footerLeftColor, footerRight, progress }) {
  return (
    <div onClick={onClick}
      className="bg-white rounded-3xl p-6 border-2 border-[#006972]/20 hover:border-[#006972] transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-xl hover:-translate-y-1.5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-16 h-16 bg-[#006972]/4 rounded-bl-3xl pointer-events-none transition-all duration-500 group-hover:w-28 group-hover:h-28" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer rounded-3xl pointer-events-none" />

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-115 group-hover:rotate-3 transition-transform duration-300 ${iconBg}`}>
            <Icon name={iconName} size={26} />
          </div>
          <div>
            <h3 className="font-headline text-[17px] font-bold text-deep-navy group-hover:text-[#006972] transition-colors duration-200">{title}</h3>
            <p className="font-label text-[12px] text-on-surface-variant">{subtitle}</p>
          </div>
        </div>
        <span className={`font-label text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${badgeStyle}`}>{badge}</span>
      </div>

      <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-[#fbfaee] rounded-2xl mb-3 text-center border border-deep-navy/5">
        {metrics.map((m, i) => (
          <div key={i}>
            <p className="font-label text-[9px] uppercase text-on-surface-variant font-semibold mb-0.5">{m.label}</p>
            <p className={`font-headline text-[15px] font-bold ${m.color || (m.highlight ? 'text-[#006972]' : 'text-deep-navy')}`}>{m.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-3">
        <div className="w-full h-1.5 bg-deep-navy/6 rounded-full overflow-hidden">
          <div className="h-full bg-[#006972] rounded-full transition-all duration-1000 group-hover:opacity-80"
            style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex items-center justify-between text-[13px] font-label">
        <span className={`font-bold flex items-center gap-1 ${footerLeftColor}`}>{footerLeft}</span>
        {typeof footerRight === 'string' ? (
          <span className="text-[#006972] font-bold flex items-center gap-0.5 group-hover:underline">{footerRight} <Icon name="chevron_right" size={16} /></span>
        ) : footerRight}
      </div>
    </div>
  );
}
