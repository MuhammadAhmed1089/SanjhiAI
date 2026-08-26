import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAmbientBackground from '../../components/AuthAmbientBackground';
import Icon from '../../components/Icon';

export default function PayNow() {
  const navigate = useNavigate();
  const [senderAccount, setSenderAccount] = useState('');
  const [copied, setCopied] = useState('');

  function handleCopy(text, key) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(''), 1800);
  }

  return (
    <AuthAmbientBackground showTicker={false}>
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col min-h-[calc(100vh-36px)]">

        {/* Header */}
        <header className="w-full flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 hover:bg-white/80 text-[#006972] transition-colors cursor-pointer active:scale-95 backdrop-blur-md border border-[#006972]/15 shadow-sm"
          >
            <Icon name="arrow_back" size={20} />
          </button>
          <h1 className="font-headline text-[22px] sm:text-[24px] font-bold text-deep-navy tracking-tight">
            Pay for this Cycle
          </h1>
          <div className="w-10" />
        </header>

        {/* Amount Due */}
        <section className="text-center mb-6 animate-fade-up">
          <p className="font-label text-[12px] text-on-surface-variant mb-1 uppercase tracking-wider">Total Amount Due</p>
          <h2 className="font-headline text-[42px] sm:text-[52px] font-bold text-[#006972] leading-none">Rs. 5,000</h2>
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-1.5 rounded-full mt-4">
            <Icon name="event" size={16} />
            <span className="font-label text-[12px] font-semibold">Due by 10th Oct</span>
          </div>
        </section>

        {/* Transfer Details Card */}
        <section className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#006972]/15 shadow-md p-5 sm:p-6 mb-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#006972] rounded-t-2xl" />
          <h3 className="font-label text-[11px] text-on-surface-variant uppercase tracking-widest mb-5">Transfer Details</h3>

          {/* Account Name */}
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#006972]/10">
            <div>
              <p className="font-label text-[12px] text-on-surface-variant mb-0.5">Account Name</p>
              <p className="font-headline text-[18px] font-bold text-deep-navy">Zaid Ahmed</p>
            </div>
            <button
              onClick={() => handleCopy('Zaid Ahmed', 'name')}
              className="w-9 h-9 rounded-full bg-[#006972]/8 hover:bg-[#006972]/15 text-[#006972] flex items-center justify-center transition-all active:scale-90"
              title="Copy Name"
            >
              <Icon name={copied === 'name' ? 'check' : 'content_copy'} size={18} />
            </button>
          </div>

          {/* JazzCash Number */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="w-11 h-11 rounded-full bg-[#006972]/10 flex items-center justify-center text-[#006972]">
                <Icon name="account_balance_wallet" size={22} />
              </div>
              <div>
                <p className="font-label text-[12px] text-on-surface-variant mb-0.5">JazzCash Number</p>
                <p className="font-headline text-[18px] font-bold text-deep-navy">0300****123</p>
              </div>
            </div>
            <button
              onClick={() => handleCopy('0300123456', 'number')}
              className="w-9 h-9 rounded-full bg-[#006972]/8 hover:bg-[#006972]/15 text-[#006972] flex items-center justify-center transition-all active:scale-90"
              title="Copy Number"
            >
              <Icon name={copied === 'number' ? 'check' : 'content_copy'} size={18} />
            </button>
          </div>
        </section>

        <p className="font-body text-[13px] text-on-surface-variant text-center mb-5 px-2 leading-relaxed">
          Send this amount using your own banking or wallet app, then submit your transaction details below to confirm.
        </p>

        {/* Form */}
        <form
          onSubmit={(e) => { e.preventDefault(); navigate('/committee/1'); }}
          className="space-y-4 flex-1 flex flex-col"
        >
          {/* Sender Account */}
          <div>
            <label htmlFor="senderAccount" className="block font-label text-[13px] text-deep-navy mb-2">
              Sender Account / Wallet Number
            </label>
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="person" size={20} className="text-[#006972]" />
              </div>
              <input
                id="senderAccount"
                type="text"
                value={senderAccount}
                onChange={(e) => setSenderAccount(e.target.value)}
                placeholder="e.g. 0345*******"
                className="block w-full pl-11 pr-4 py-3 border border-[#c4c6cc] rounded-xl bg-[#f5f4e8] focus:border-[#006972] outline-none transition-colors text-deep-navy font-body text-[15px] placeholder:text-on-surface-variant/50"
              />
            </div>
          </div>

          {/* Screenshot Upload */}
          <div>
            <button
              type="button"
              className="w-full flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[#006972]/25 rounded-2xl py-8 bg-white/50 hover:bg-[#006972]/5 hover:border-[#006972]/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-[#006972]/10 flex items-center justify-center group-hover:bg-[#006972]/20 transition-colors">
                <Icon name="upload_file" size={24} className="text-[#006972]" />
              </div>
              <span className="font-label text-[13px] text-on-surface-variant group-hover:text-[#006972] transition-colors">
                Attach payment screenshot <span className="font-normal opacity-70">(optional)</span>
              </span>
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#006972] hover:bg-[#00575f] text-white font-label text-[15px] py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#006972]/25 hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Submit Payment
              <Icon name="check_circle" size={20} />
            </button>
          </div>
        </form>

      </div>
    </AuthAmbientBackground>
  );
}
