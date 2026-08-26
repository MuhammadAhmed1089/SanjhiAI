import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAmbientBackground from '../../components/AuthAmbientBackground';
import Icon from '../../components/Icon';

const HISTORY = [
  { cycle: 'Cycle 1 (Oct)', status: 'on-time', amount: 'Rs. 5,000', date: 'Oct 05' },
  { cycle: 'Cycle 12 (Sept)', status: 'on-time', amount: 'Rs. 5,000', date: 'Sep 08' },
  { cycle: 'Cycle 11 (Aug)', status: 'late', amount: 'Rs. 5,000', date: 'Aug 15' },
];

export default function MyPayments() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Diwali Fund');

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
            My Payments
          </h1>
          <div className="w-10" />
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-[#006972] rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full blur-xl" />
            <p className="font-label text-[11px] text-white/70 uppercase tracking-wider mb-3">Trust Score</p>
            <p className="font-headline text-[38px] font-bold text-white leading-none">940</p>
            <p className="font-label text-[11px] text-white/80 mt-1 flex items-center gap-1">
              <Icon name="trending_up" size={14} /> Top 5%
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-[#006972]/15 shadow-sm">
            <p className="font-label text-[11px] text-on-surface-variant uppercase tracking-wider mb-3">On-time Rate</p>
            <p className="font-headline text-[38px] font-bold text-emerald-600 leading-none">98%</p>
            <p className="font-label text-[11px] text-on-surface-variant mt-1">Consistent</p>
          </div>
        </section>

        {/* Committee Filter Pills */}
        <section className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {['Diwali Fund', 'Home Renovation'].map((name) => (
            <button
              key={name}
              onClick={() => setActiveFilter(name)}
              className={`flex-shrink-0 px-5 py-2 rounded-full font-label text-[13px] font-semibold transition-all ${
                activeFilter === name
                  ? 'bg-[#006972] text-white shadow-md shadow-[#006972]/25'
                  : 'bg-white/70 text-on-surface-variant border border-[#006972]/15 hover:border-[#006972]/40'
              }`}
            >
              {name}
            </button>
          ))}
        </section>

        {/* Active Committee Card */}
        <section className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#006972]/20 shadow-md p-5 sm:p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#006972] rounded-t-2xl" />
          <div className="flex justify-between items-start mb-5">
            <div>
              <h3 className="font-headline text-[18px] font-bold text-deep-navy mb-2">Diwali Savings Fund</h3>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-label text-[12px] font-semibold">
                <Icon name="check_circle" size={14} /> Paid for Oct
              </span>
            </div>
            <div className="text-right">
              <p className="font-label text-[11px] text-on-surface-variant">Contribution</p>
              <p className="font-headline text-[18px] font-bold text-[#006972]">Rs. 5,000</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 bg-[#f5f4e8] rounded-xl p-4 mb-5">
            <div>
              <p className="font-label text-[11px] text-on-surface-variant mb-1">Next Due</p>
              <p className="font-body text-[14px] text-deep-navy font-semibold">Nov 10, 2026</p>
            </div>
            <div>
              <p className="font-label text-[11px] text-on-surface-variant mb-1">Your Payout Turn</p>
              <p className="font-body text-[14px] text-[#006972] font-semibold">Cycle 10 <span className="text-on-surface-variant font-normal">(August)</span></p>
            </div>
          </div>
          <button
            onClick={() => navigate('/pay-now')}
            className="w-full bg-[#006972] hover:bg-[#00575f] text-white font-label text-[14px] py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            Make Next Payment
            <Icon name="arrow_forward" size={18} />
          </button>
        </section>

        {/* Payment History */}
        <section>
          <h3 className="font-headline text-[18px] font-bold text-deep-navy mb-3">Payment History</h3>
          <div className="flex flex-col gap-3">
            {HISTORY.map((item, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#006972]/10 shadow-sm p-4 flex items-center justify-between hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center ${item.status === 'on-time' ? 'bg-[#006972]/10 text-[#006972]' : 'bg-amber-100 text-amber-600'}`}>
                    <Icon name="receipt_long" size={22} />
                  </div>
                  <div>
                    <p className="font-headline text-[15px] font-bold text-deep-navy">{item.cycle}</p>
                    <p className={`font-label text-[12px] flex items-center gap-1 mt-0.5 ${item.status === 'on-time' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      <Icon name={item.status === 'on-time' ? 'check_circle' : 'warning'} size={13} />
                      {item.status === 'on-time' ? 'Paid on time' : 'Paid late'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-headline text-[15px] font-bold text-deep-navy">{item.amount}</p>
                  <p className="font-label text-[11px] text-on-surface-variant mt-0.5">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </AuthAmbientBackground>
  );
}
