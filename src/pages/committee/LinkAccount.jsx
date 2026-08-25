import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthAmbientBackground from '../../components/AuthAmbientBackground';
import Icon from '../../components/Icon';

export default function LinkAccount() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {
    name: 'Sanjhi Savings Pool',
    contribution: 5000,
    capacity: 10,
    interval: '1 month',
    payoutOrder: 'fixed',
    duration: '10 Months',
  };

  const [provider, setProvider] = useState(formData.provider || 'jazzcash');
  const [accountTitle, setAccountTitle] = useState(formData.accountTitle || '');
  const [accountNumber, setAccountNumber] = useState(formData.accountNumber || '');
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

  function handleContinue(e) {
    triggerRipple(e, 'continue');
    navigate('/committee/review', {
      state: {
        ...formData,
        provider,
        accountTitle: accountTitle || 'Account Owner',
        accountNumber: accountNumber || '03001234567',
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
              onClick={() => navigate('/committee/schedule', { state: formData })}
              aria-label="Go back to Step 2"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#006972]/5 hover:bg-[#006972]/15 border border-[#006972]/15 text-[#006972] transition-colors cursor-pointer active:scale-95"
            >
              <Icon name="arrow_back" size={20} />
            </button>

            <div className="text-center">
              <h1 className="font-headline text-[20px] sm:text-[24px] font-bold text-deep-navy">
                Link Collection Account
              </h1>
              <p className="font-body text-[12px] sm:text-[13px] text-on-surface-variant">
                Step 3 of 4: Payment Details
              </p>
            </div>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#006972]/10 text-[#006972] font-label text-[11px] font-bold border border-[#006972]/20">
              3 / 4
            </span>
          </header>

          {/* Progress Bar */}
          <div className="w-full bg-[#006972]/10 h-2 rounded-full mb-6 overflow-hidden">
            <div className="bg-[#006972] h-full w-3/4 rounded-full transition-all duration-500" />
          </div>

          {/* Info Banner */}
          <section className="bg-[#006972]/8 border border-[#006972]/15 rounded-2xl p-4 flex items-start gap-3 mb-6">
            <div className="w-9 h-9 rounded-full bg-[#006972]/15 text-[#006972] flex items-center justify-center shrink-0">
              <Icon name="shield" size={20} />
            </div>
            <div className="text-left">
              <h4 className="font-headline text-[13px] font-bold text-deep-navy">Direct P2P Contributions</h4>
              <p className="font-body text-[12px] text-on-surface-variant leading-tight mt-0.5">
                Members will send monthly contributions directly to this linked account. Sanjhi does not hold your funds.
              </p>
            </div>
          </section>

          <form onSubmit={(e) => { e.preventDefault(); handleContinue(e); }} className="space-y-6 text-left">
            
            {/* Provider Selection */}
            <div className="space-y-2">
              <label className="block font-label text-[13px] font-bold text-deep-navy">
                Select Account Provider
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'jazzcash', name: 'JazzCash', icon: 'payments' },
                  { id: 'easypaisa', name: 'Easypaisa', icon: 'account_balance_wallet' },
                  { id: 'bank', name: 'Bank Account', icon: 'account_balance' },
                ].map((item) => {
                  const active = provider === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setProvider(item.id)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 text-center ${
                        active
                          ? 'border-[#006972] bg-[#006972]/10 text-[#006972] shadow-sm'
                          : 'border-[#006972]/15 bg-white text-deep-navy/70 hover:border-[#006972]/40'
                      }`}
                    >
                      <Icon name={item.icon} size={24} />
                      <span className="font-headline text-[12px] sm:text-[13px] font-bold">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Account Title */}
            <div className="space-y-1">
              <label htmlFor="accountTitle" className="block font-label text-[13px] font-bold text-deep-navy">
                Account Holder Title
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#006972]/10 flex items-center justify-center text-[#006972] group-focus-within:bg-[#006972] group-focus-within:text-white transition-all">
                  <Icon name="person" size={18} />
                </div>
                <input
                  id="accountTitle"
                  type="text"
                  required
                  value={accountTitle}
                  onChange={(e) => setAccountTitle(e.target.value)}
                  placeholder="e.g. Ali Khan"
                  className="w-full h-12 pl-13 pr-4 bg-white border border-[#006972]/20 rounded-2xl focus:border-[#006972] focus:ring-4 focus:ring-[#006972]/10 transition-all font-body text-[14px] text-deep-navy outline-none shadow-sm"
                />
              </div>
            </div>

            {/* Account / IBAN / Phone Number */}
            <div className="space-y-1">
              <label htmlFor="accountNumber" className="block font-label text-[13px] font-bold text-deep-navy">
                Account / Wallet Number
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#006972]/10 flex items-center justify-center text-[#006972] group-focus-within:bg-[#006972] group-focus-within:text-white transition-all">
                  <Icon name="pin" size={18} />
                </div>
                <input
                  id="accountNumber"
                  type="text"
                  required
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="e.g. 03001234567 or IBAN..."
                  className="w-full h-12 pl-13 pr-4 bg-white border border-[#006972]/20 rounded-2xl focus:border-[#006972] focus:ring-4 focus:ring-[#006972]/10 transition-all font-body text-[14px] text-deep-navy outline-none shadow-sm"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => navigate('/committee/schedule', { state: formData })}
                className="w-1/3 py-3.5 px-4 rounded-2xl font-label text-[14px] font-bold text-[#006972] border border-[#006972]/30 hover:bg-[#006972]/5 transition-all cursor-pointer bg-white"
              >
                Back
              </button>
              
              <button
                type="submit"
                onClick={(e) => triggerRipple(e, 'continue')}
                className="relative overflow-hidden w-2/3 bg-[#006972] hover:bg-[#00575f] text-white py-3.5 px-6 rounded-2xl font-label text-[15px] font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-[#006972]/25 hover:shadow-xl cursor-pointer border-none"
              >
                {ripples.continue && (
                  <span
                    className="absolute rounded-full bg-white/30 w-32 h-32 -translate-x-1/2 -translate-y-1/2 animate-ping pointer-events-none"
                    style={{ left: ripples.continue.x, top: ripples.continue.y }}
                  />
                )}
                Review & Confirm
                <Icon name="arrow_forward" size={18} />
              </button>
            </div>
          </form>
        </main>
      </div>
    </AuthAmbientBackground>
  );
}
