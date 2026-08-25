import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthAmbientBackground from '../../components/AuthAmbientBackground';
import Icon from '../../components/Icon';

export default function CreateCommittee() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state || {};

  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiMode, setIsAiMode] = useState(true);
  const [name, setName] = useState(initialData.name || '');
  const [contribution, setContribution] = useState(initialData.contribution || '5000');
  const [capacity, setCapacity] = useState(initialData.capacity || '10');
  const [isParsing, setIsParsing] = useState(false);
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

  function handleAiParse() {
    if (!aiPrompt.trim()) return;
    setIsParsing(true);
    setTimeout(() => {
      // Smart AI Parsing Mock
      const numMatch = aiPrompt.match(/(\d+)\s*(people|members|person)/i);
      const amountMatch = aiPrompt.match(/(?:Rs\.?|INR|\$)\s*([\d,]+)|([\d,]+)\s*(?:rupees|monthly|rs)/i);
      
      if (numMatch) setCapacity(numMatch[1]);
      if (amountMatch) {
        const val = (amountMatch[1] || amountMatch[2]).replace(/,/g, '');
        setContribution(val);
      }
      if (!name) setName('AI Generated Savings Pool');
      setIsParsing(false);
    }, 800);
  }

  const numMembers = parseInt(capacity, 10) || 0;
  const monthlyContrib = parseInt(contribution, 10) || 0;
  const totalPool = numMembers * monthlyContrib;

  function handleContinue(e) {
    triggerRipple(e, 'continue');
    navigate('/committee/schedule', {
      state: {
        ...initialData,
        name: name || 'Sanjhi Savings Pool',
        contribution: monthlyContrib,
        capacity: numMembers,
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
              onClick={() => navigate('/dashboard')}
              aria-label="Go to Dashboard"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#006972]/5 hover:bg-[#006972]/15 border border-[#006972]/15 text-[#006972] transition-colors cursor-pointer active:scale-95"
            >
              <Icon name="arrow_back" size={20} />
            </button>

            <div className="text-center">
              <h1 className="font-headline text-[20px] sm:text-[24px] font-bold text-deep-navy">
                Create a Committee
              </h1>
              <p className="font-body text-[12px] sm:text-[13px] text-on-surface-variant">
                Step 1 of 4: Basic Information
              </p>
            </div>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#006972]/10 text-[#006972] font-label text-[11px] font-bold border border-[#006972]/20">
              1 / 4
            </span>
          </header>

          {/* Progress Bar */}
          <div className="w-full bg-[#006972]/10 h-2 rounded-full mb-6 overflow-hidden">
            <div className="bg-[#006972] h-full w-1/4 rounded-full transition-all duration-500" />
          </div>

          {/* AI Setup Assistant Card */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-[#006972] font-headline text-[14px] font-bold">
                <Icon name="auto_awesome" size={18} className="text-amber-500 animate-pulse" />
                <span>AI Fast Setup</span>
              </div>
              <button
                type="button"
                onClick={() => setIsAiMode(!isAiMode)}
                className="font-label text-[12px] font-bold text-[#006972] hover:underline bg-transparent border-none cursor-pointer flex items-center gap-1"
              >
                <Icon name={isAiMode ? 'edit_note' : 'auto_awesome'} size={15} />
                {isAiMode ? 'Hide AI Helper' : 'Use AI Helper'}
              </button>
            </div>

            {isAiMode && (
              <div className="bg-gradient-to-br from-[#006972]/8 to-amber-500/5 border border-[#006972]/20 rounded-2xl p-4 shadow-sm relative overflow-hidden transition-all">
                <div className="relative">
                  <textarea
                    rows={3}
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Describe your committee in plain words, e.g. 10 friends, Rs. 5000 monthly, starting next month..."
                    className="w-full bg-white/80 border border-[#006972]/15 rounded-xl p-3 text-[14px] font-body text-deep-navy placeholder:text-on-surface-variant/60 focus:border-[#006972] focus:ring-2 focus:ring-[#006972]/10 outline-none resize-none shadow-inner"
                  />
                  <button
                    type="button"
                    title="Voice dictation mock"
                    className="absolute bottom-3 right-3 p-1.5 rounded-full text-[#006972] hover:bg-[#006972]/10 transition-colors"
                  >
                    <Icon name="mic" size={18} />
                  </button>
                </div>

                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={handleAiParse}
                    disabled={isParsing || !aiPrompt.trim()}
                    className="bg-[#006972] hover:bg-[#00575f] text-white font-label text-[13px] font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer border-none disabled:opacity-50"
                  >
                    {isParsing ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Parsing...
                      </>
                    ) : (
                      <>
                        <Icon name="auto_awesome" size={16} />
                        Auto Fill Details
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6 opacity-40">
            <div className="h-px bg-[#006972] flex-grow" />
            <span className="font-label text-[11px] font-bold text-deep-navy uppercase tracking-wider">Form Details</span>
            <div className="h-px bg-[#006972] flex-grow" />
          </div>

          {/* Form Fields */}
          <form onSubmit={(e) => { e.preventDefault(); handleContinue(e); }} className="space-y-4 text-left">
            
            {/* Committee Name */}
            <div className="space-y-1">
              <label htmlFor="committee-name" className="block font-label text-[13px] font-bold text-deep-navy">
                Committee Name
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#006972]/10 flex items-center justify-center text-[#006972] group-focus-within:bg-[#006972] group-focus-within:text-white transition-all">
                  <Icon name="label" size={18} />
                </div>
                <input
                  id="committee-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Diwali Savings Fund 2026"
                  className="w-full h-12 pl-13 pr-4 bg-white border border-[#006972]/20 rounded-2xl focus:border-[#006972] focus:ring-4 focus:ring-[#006972]/10 transition-all font-body text-[14px] text-deep-navy outline-none shadow-sm"
                />
              </div>
            </div>

            {/* Grid: Contribution & Member Capacity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Monthly Contribution */}
              <div className="space-y-1">
                <label htmlFor="contribution" className="block font-label text-[13px] font-bold text-deep-navy">
                  Monthly Contribution
                </label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-label text-[13px] font-bold text-[#006972]">
                    Rs.
                  </span>
                  <input
                    id="contribution"
                    type="number"
                    required
                    min={100}
                    value={contribution}
                    onChange={(e) => setContribution(e.target.value.replace(/\D/g, ''))}
                    placeholder="5000"
                    className="w-full h-12 pl-12 pr-4 bg-white border border-[#006972]/20 rounded-2xl focus:border-[#006972] focus:ring-4 focus:ring-[#006972]/10 transition-all font-body text-[14px] text-deep-navy outline-none shadow-sm font-semibold"
                  />
                </div>
              </div>

              {/* Number of Members */}
              <div className="space-y-1">
                <label htmlFor="capacity" className="block font-label text-[13px] font-bold text-deep-navy">
                  Member Capacity
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#006972]/10 flex items-center justify-center text-[#006972] group-focus-within:bg-[#006972] group-focus-within:text-white transition-all">
                    <Icon name="groups" size={18} />
                  </div>
                  <input
                    id="capacity"
                    type="number"
                    required
                    min={2}
                    max={50}
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value.replace(/\D/g, ''))}
                    placeholder="10"
                    className="w-full h-12 pl-13 pr-4 bg-white border border-[#006972]/20 rounded-2xl focus:border-[#006972] focus:ring-4 focus:ring-[#006972]/10 transition-all font-body text-[14px] text-deep-navy outline-none shadow-sm font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Total Pool Expected Live Summary Box */}
            <div className="mt-4 p-4 bg-[#006972]/8 rounded-2xl border border-[#006972]/15 flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#006972]/15 text-[#006972] flex items-center justify-center shrink-0">
                <Icon name="account_balance_wallet" size={20} />
              </div>
              <div>
                <h4 className="font-headline text-[13px] font-bold text-deep-navy">Total Pool Expected per Cycle</h4>
                <p className="font-body text-[12px] text-on-surface-variant leading-relaxed mt-0.5">
                  With <strong className="text-[#006972] font-bold">{numMembers || 0} members</strong> contributing{' '}
                  <strong className="text-[#006972] font-bold">Rs. {monthlyContrib.toLocaleString()}</strong> each, the total monthly payout pool is{' '}
                  <strong className="text-[#006972] font-bold">Rs. {totalPool.toLocaleString()}</strong>.
                </p>
              </div>
            </div>

            {/* Submit / Continue Button */}
            <div className="pt-4">
              <button
                type="submit"
                onClick={(e) => triggerRipple(e, 'continue')}
                className="relative overflow-hidden w-full bg-[#006972] hover:bg-[#00575f] text-white py-3.5 px-6 rounded-2xl font-label text-[15px] font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-[#006972]/25 hover:shadow-xl cursor-pointer border-none"
              >
                {ripples.continue && (
                  <span
                    className="absolute rounded-full bg-white/30 w-32 h-32 -translate-x-1/2 -translate-y-1/2 animate-ping pointer-events-none"
                    style={{ left: ripples.continue.x, top: ripples.continue.y }}
                  />
                )}
                Continue to Schedule
                <Icon name="arrow_forward" size={18} />
              </button>
            </div>
          </form>
        </main>
      </div>
    </AuthAmbientBackground>
  );
}
