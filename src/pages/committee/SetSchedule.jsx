import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthAmbientBackground from '../../components/AuthAmbientBackground';
import Icon from '../../components/Icon';

export default function SetSchedule() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {
    name: 'Sanjhi Savings Pool',
    contribution: 5000,
    capacity: 10,
  };

  const [interval, setIntervalVal] = useState('1 month');
  const [payoutOrder, setPayoutOrder] = useState('fixed');
  const [ripples, setRipples] = useState({});

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

  const numMembers = formData.capacity || 10;
  const durationLabel = `${numMembers} Cycles (${interval === '15 days' ? Math.ceil(numMembers / 2) + ' Months' : numMembers + ' Months'})`;

  function handleContinue(e) {
    triggerRipple(e, 'continue');
    navigate('/committee/link-account', {
      state: {
        ...formData,
        interval,
        payoutOrder,
        duration: durationLabel,
      },
    });
  }

  return (
    <AuthAmbientBackground showTicker={true}>
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col items-center justify-center min-h-[calc(100vh-36px)]">
        
        {/* Main Glass Card matching User Dashboard */}
        <main className="w-full bg-white/85 backdrop-blur-2xl border border-[#006972]/20 shadow-[0_24px_70px_-15px_rgba(0,105,114,0.22),0_0_0_1px_rgba(0,105,114,0.1)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 animate-fade-up relative z-10">
          
          {/* Header Navigation & Step Indicator */}
          <header className="w-full flex items-center justify-between mb-6 border-b border-[#006972]/10 pb-4">
            <button
              onClick={() => navigate('/committee/create', { state: formData })}
              aria-label="Go back to Step 1"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#006972]/5 hover:bg-[#006972]/15 border border-[#006972]/15 text-[#006972] transition-colors cursor-pointer active:scale-95"
            >
              <Icon name="arrow_back" size={20} />
            </button>

            <div className="text-center">
              <h1 className="font-headline text-[20px] sm:text-[24px] font-bold text-deep-navy">
                Set Schedule & Rules
              </h1>
              <p className="font-body text-[12px] sm:text-[13px] text-on-surface-variant">
                Step 2 of 4: Interval & Payout Order
              </p>
            </div>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#006972]/10 text-[#006972] font-label text-[11px] font-bold border border-[#006972]/20">
              2 / 4
            </span>
          </header>

          {/* Progress Bar */}
          <div className="w-full bg-[#006972]/10 h-2 rounded-full mb-6 overflow-hidden">
            <div className="bg-[#006972] h-full w-2/4 rounded-full transition-all duration-500" />
          </div>

          <div className="space-y-6 text-left">
            
            {/* Collection Interval Section */}
            <section className="space-y-2">
              <div className="flex items-center gap-2 text-deep-navy font-headline text-[15px] font-bold">
                <Icon name="calendar_month" size={20} className="text-[#006972]" />
                <span>Collection Interval</span>
              </div>
              <p className="font-body text-[13px] text-on-surface-variant">
                How often should members contribute to the pool?
              </p>
              
              <div className="grid grid-cols-3 gap-2 bg-[#006972]/5 p-1.5 rounded-2xl border border-[#006972]/15">
                {[
                  { id: '15 days', label: '15 Days' },
                  { id: '1 month', label: 'Every 1 Month' },
                  { id: '2 months', label: 'Every 2 Months' },
                ].map((opt) => {
                  const active = interval === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setIntervalVal(opt.id)}
                      className={`py-3 px-2 rounded-xl font-label text-[13px] font-bold transition-all cursor-pointer border-none ${
                        active
                          ? 'bg-[#006972] text-white shadow-md'
                          : 'bg-transparent text-deep-navy/70 hover:bg-[#006972]/10'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Calculated Total Duration Banner */}
            <section className="p-4 bg-gradient-to-r from-[#006972]/10 to-amber-500/10 rounded-2xl border border-[#006972]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-[12px] font-bold uppercase tracking-wider">
                  <Icon name="schedule" size={16} className="text-[#006972]" />
                  Total Committee Duration
                </div>
                <h3 className="font-headline text-[22px] sm:text-[26px] font-bold text-deep-navy mt-0.5">
                  {durationLabel}
                </h3>
              </div>
              <span className="text-[12px] font-body text-on-surface-variant bg-white px-3 py-1.5 rounded-xl border border-[#006972]/15 text-center">
                {numMembers} members at {interval} interval
              </span>
            </section>

            {/* Payout Order Options */}
            <section className="space-y-2">
              <div className="flex items-center gap-2 text-deep-navy font-headline text-[15px] font-bold">
                <Icon name="account_tree" size={20} className="text-[#006972]" />
                <span>Payout Distribution Method</span>
              </div>
              <p className="font-body text-[13px] text-on-surface-variant">
                Select how payout rotation is assigned to members.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                
                {/* Fixed Order (Recommended) */}
                <div
                  onClick={() => setPayoutOrder('fixed')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    payoutOrder === 'fixed'
                      ? 'border-[#006972] bg-[#006972]/5 shadow-md'
                      : 'border-[#006972]/15 bg-white hover:border-[#006972]/40'
                  }`}
                >
                  {payoutOrder === 'fixed' && (
                    <span className="absolute top-3 right-3 text-[#006972]">
                      <Icon name="check_circle" size={18} />
                    </span>
                  )}
                  <div>
                    <Icon name="list_alt" size={26} className="text-[#006972] mb-2" />
                    <h4 className="font-headline text-[14px] font-bold text-deep-navy">Fixed Order</h4>
                    <p className="font-body text-[11px] text-on-surface-variant mt-1 leading-tight">
                      Sequence is agreed upon in advance by all members.
                    </p>
                  </div>
                </div>

                {/* Lottery (Phase 2) */}
                <div className="p-4 rounded-2xl border border-[#006972]/10 bg-slate-50 opacity-60 relative cursor-not-allowed">
                  <span className="absolute top-2 right-2 bg-amber-500/20 text-amber-800 font-label text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Coming Soon
                  </span>
                  <Icon name="casino" size={26} className="text-on-surface-variant mb-2" />
                  <h4 className="font-headline text-[14px] font-bold text-deep-navy">Lottery Draw</h4>
                  <p className="font-body text-[11px] text-on-surface-variant mt-1 leading-tight">
                    Payout recipient is drawn randomly each cycle.
                  </p>
                </div>

                {/* Bidding (Phase 2) */}
                <div className="p-4 rounded-2xl border border-[#006972]/10 bg-slate-50 opacity-60 relative cursor-not-allowed">
                  <span className="absolute top-2 right-2 bg-amber-500/20 text-amber-800 font-label text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Coming Soon
                  </span>
                  <Icon name="gavel" size={26} className="text-on-surface-variant mb-2" />
                  <h4 className="font-headline text-[14px] font-bold text-deep-navy">Bidding Auction</h4>
                  <p className="font-body text-[11px] text-on-surface-variant mt-1 leading-tight">
                    Members bid based on urgent financial need.
                  </p>
                </div>

              </div>
            </section>

            {/* Action Buttons */}
            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => navigate('/committee/create', { state: formData })}
                className="w-1/3 py-3.5 px-4 rounded-2xl font-label text-[14px] font-bold text-[#006972] border border-[#006972]/30 hover:bg-[#006972]/5 transition-all cursor-pointer bg-white"
              >
                Back
              </button>
              
              <button
                type="button"
                onClick={handleContinue}
                className="relative overflow-hidden w-2/3 bg-[#006972] hover:bg-[#00575f] text-white py-3.5 px-6 rounded-2xl font-label text-[15px] font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-[#006972]/25 hover:shadow-xl cursor-pointer border-none"
              >
                {ripples.continue && (
                  <span
                    className="absolute rounded-full bg-white/30 w-32 h-32 -translate-x-1/2 -translate-y-1/2 animate-ping pointer-events-none"
                    style={{ left: ripples.continue.x, top: ripples.continue.y }}
                  />
                )}
                Continue to Account
                <Icon name="arrow_forward" size={18} />
              </button>
            </div>

          </div>
        </main>
      </div>
    </AuthAmbientBackground>
  );
}
