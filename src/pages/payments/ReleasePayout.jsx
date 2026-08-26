import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAmbientBackground from '../../components/AuthAmbientBackground';
import Icon from '../../components/Icon';

export default function ReleasePayout() {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  return (
    <AuthAmbientBackground showTicker={false}>
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col min-h-[calc(100vh-36px)] gap-5">

        {/* Header */}
        <header className="w-full flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 hover:bg-white/80 text-[#006972] transition-colors cursor-pointer active:scale-95 backdrop-blur-md border border-[#006972]/15 shadow-sm"
          >
            <Icon name="arrow_back" size={20} />
          </button>
          <h1 className="font-headline text-[22px] sm:text-[24px] font-bold text-deep-navy tracking-tight">
            Release Payout
          </h1>
          <div className="w-10" />
        </header>

        {/* Ready Banner */}
        <section className="bg-[#006972] rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden shadow-lg shadow-[#006972]/25">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border-2 border-white/30 flex items-center justify-center mb-4 relative z-10 shadow-md">
            <Icon name="celebration" size={32} className="text-white" />
          </div>
          <h2 className="font-headline text-[22px] font-bold text-white mb-2 relative z-10">Ready for Release</h2>
          <p className="font-body text-[14px] text-white/85 max-w-xs leading-relaxed relative z-10">
            All members have paid their contributions for this cycle. You can now safely release the payout to <strong className="text-white">Rahul Sharma</strong>.
          </p>
        </section>

        {/* Recipient Details */}
        <section className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#006972]/15 shadow-md p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#006972] rounded-t-2xl" />
          <h3 className="font-label text-[11px] text-on-surface-variant uppercase tracking-wider mb-4">Recipient Details</h3>
          <div className="flex items-center gap-4 mb-4">
            <img src="/avatar.svg" alt="Rahul Sharma" className="w-16 h-16 rounded-full object-cover border-2 border-[#006972]/20 shadow-sm" />
            <div>
              <h4 className="font-headline text-[18px] font-bold text-deep-navy">Rahul Sharma</h4>
              <p className="font-label text-[12px] text-[#006972] flex items-center gap-1 mt-1">
                <Icon name="verified_user" size={14} /> Verified Pool Member
              </p>
            </div>
          </div>
          <div className="bg-[#f5f4e8] rounded-xl p-4 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#006972]/10 flex items-center justify-center text-[#006972]">
              <Icon name="account_balance" size={22} />
            </div>
            <div>
              <p className="font-label text-[11px] text-on-surface-variant mb-0.5">Linked Account</p>
              <p className="font-body text-[14px] text-deep-navy font-semibold tracking-wide">JazzCash — 0300****123</p>
            </div>
          </div>
        </section>

        {/* Payout Amount */}
        <section className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#006972]/15 shadow-sm p-5 flex justify-between items-end">
          <div>
            <p className="font-label text-[11px] text-on-surface-variant uppercase tracking-wider mb-2">Payout Amount</p>
            <p className="font-headline text-[38px] sm:text-[44px] font-bold text-[#006972] leading-none">Rs. 1,20,000</p>
          </div>
          <div className="text-right pb-1">
            <p className="font-label text-[11px] text-on-surface-variant mb-1">Cycle</p>
            <p className="font-body text-[15px] text-deep-navy font-semibold">October 2026</p>
          </div>
        </section>

        {/* Action */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <button
            onClick={() => setConfirmed(true)}
            disabled={confirmed}
            className="w-full bg-[#006972] hover:bg-[#00575f] disabled:opacity-70 text-white font-label text-[15px] py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#006972]/25 hover:shadow-xl transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <Icon name={confirmed ? 'check_circle' : 'send_money'} size={22} />
            {confirmed ? 'Payout Marked as Sent!' : 'Mark Payout as Sent'}
          </button>
          <p className="font-label text-[12px] text-on-surface-variant flex items-center gap-1.5 opacity-80">
            <Icon name="lock" size={14} /> This action is high-stakes, secure, and irreversible.
          </p>
        </div>

      </div>
    </AuthAmbientBackground>
  );
}
