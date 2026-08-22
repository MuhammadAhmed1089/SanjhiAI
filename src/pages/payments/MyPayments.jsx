import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function MyPayments() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="bg-background dark:bg-background w-full top-0 sticky z-40 flat no shadows flex justify-between items-center px-margin-mobile md:px-margin-desktop py-sm w-full">
<button className="text-primary dark:text-on-primary hover:bg-surface-container-low transition-colors active:scale-95 transition-transform duration-200 p-2 rounded-full flex items-center justify-center">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md-mobile md:text-headline-md text-primary dark:text-on-primary tracking-tight">My Payments</h1>
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">

</div>
</header>
<main className="flex-grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-lg pb-[100px] md:pb-lg flex flex-col gap-lg">

<section className="grid grid-cols-1 md:grid-cols-2 gap-md">
<div className="bg-primary-container text-on-primary rounded-xl p-lg ambient-shadow flex flex-col justify-between h-40 relative overflow-hidden">

<div className="absolute -right-10 -top-10 w-40 h-40 bg-secondary rounded-full opacity-20 blur-2xl"></div>
<h2 className="font-label-sm text-label-sm text-inverse-primary uppercase tracking-widest">Trust Score</h2>
<div className="flex items-end gap-sm mt-auto">
<span className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-bold leading-none">940</span>
<span className="text-inverse-primary mb-1 font-label-sm text-label-sm flex items-center"><span className="material-symbols-outlined text-[16px] mr-1">trending_up</span> Top 5%</span>
</div>
</div>
<div className="glass-card rounded-xl p-lg flex flex-col justify-between h-40">
<h2 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">On-time Rate</h2>
<div className="flex items-end gap-sm mt-auto">
<span className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-secondary leading-none">98%</span>
<span className="text-on-surface-variant mb-1 font-label-sm text-label-sm">Consistent</span>
</div>
</div>
</section>

<section className="w-full overflow-x-auto pb-sm scrollbar-hide">
<div className="flex gap-sm min-w-max">
<button className="bg-secondary text-on-secondary px-6 py-2 rounded-full font-label-sm text-label-sm transition-all shadow-sm">Diwali Fund</button>
<button className="bg-surface-container-low text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container transition-colors px-6 py-2 rounded-full font-label-sm text-label-sm">Home Renovation</button>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl border border-secondary/15 p-lg relative">
<div className="absolute top-0 left-0 w-full h-1 bg-secondary rounded-t-xl opacity-80"></div>
<div className="flex justify-between items-start mb-6">
<div>
<h3 className="font-headline-md text-headline-md-mobile text-on-surface mb-1">Diwali Savings Fund</h3>
<div className="inline-flex items-center gap-1 bg-tertiary-container/20 text-on-tertiary-container px-3 py-1 rounded-full font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]" data-weight="fill">check_circle</span>
                        Paid for Oct
                    </div>
</div>
<div className="text-right">
<p className="font-label-sm text-label-sm text-on-surface-variant">Contribution</p>
<p className="font-headline-md text-headline-md-mobile text-primary">Rs. 5,000</p>
</div>
</div>
<div className="grid grid-cols-2 gap-4 bg-surface-container-low rounded-lg p-md">
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Next Due</p>
<p className="font-body-lg text-body-lg text-on-surface font-medium">Nov 10, 2023</p>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Your Payout Turn</p>
<p className="font-body-lg text-body-lg text-secondary font-medium flex items-center gap-1">
                        Cycle 10 <span className="text-on-surface-variant text-sm font-normal">(August)</span>
</p>
</div>
</div>
<button className="w-full mt-6 bg-secondary text-on-secondary py-3 rounded-lg font-label-sm text-label-sm hover:bg-secondary/90 transition-colors active:scale-[0.98]">
                Make Next Payment
            </button>
</section>

<section>
<h3 className="font-headline-md text-[20px] text-on-surface mb-md">Payment History</h3>
<div className="flex flex-col gap-sm">

<div className="bg-surface-container-lowest border border-outline-variant/20 rounded-lg p-md flex items-center justify-between hover:bg-surface-container-low transition-colors cursor-pointer">
<div className="flex items-center gap-md">
<div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined">receipt_long</span>
</div>
<div>
<p className="font-body-md text-body-md text-on-surface font-medium">Cycle 1 (Oct)</p>
<p className="font-label-sm text-label-sm text-secondary flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-[14px]">check_circle</span> Paid on time
                            </p>
</div>
</div>
<div className="text-right">
<p className="font-body-md text-body-md text-on-surface font-medium">Rs. 5,000</p>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Oct 05</p>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant/20 rounded-lg p-md flex items-center justify-between hover:bg-surface-container-low transition-colors cursor-pointer">
<div className="flex items-center gap-md">
<div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined">receipt_long</span>
</div>
<div>
<p className="font-body-md text-body-md text-on-surface font-medium">Cycle 12 (Sept)</p>
<p className="font-label-sm text-label-sm text-secondary flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-[14px]">check_circle</span> Paid on time
                            </p>
</div>
</div>
<div className="text-right">
<p className="font-body-md text-body-md text-on-surface font-medium">Rs. 5,000</p>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Sep 08</p>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant/20 rounded-lg p-md flex items-center justify-between hover:bg-surface-container-low transition-colors cursor-pointer">
<div className="flex items-center gap-md">
<div className="w-12 h-12 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center shrink-0">
<span className="material-symbols-outlined">receipt_long</span>
</div>
<div>
<p className="font-body-md text-body-md text-on-surface font-medium">Cycle 11 (Aug)</p>
<p className="font-label-sm text-label-sm text-on-tertiary-fixed-variant flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-[14px]">warning</span> Paid late
                            </p>
</div>
</div>
<div className="text-right">
<p className="font-body-md text-body-md text-on-surface font-medium">Rs. 5,000</p>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Aug 15</p>
</div>
</div>
</div>
</section>
</main>
    </div>
  );
}
