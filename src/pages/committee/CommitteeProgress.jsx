import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function CommitteeProgress() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="w-full top-0 sticky bg-surface dark:bg-surface-dim bg-surface-container-low dark:bg-surface-container-high z-40 transition-colors duration-200">
<div className="flex justify-between items-center px-margin-mobile w-full h-16">
<button className="text-primary dark:text-primary-fixed hover:bg-surface-variant/10 p-2 rounded-full flex items-center justify-center transition-colors duration-200">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed truncate px-4">Sanjha Finance</h1>
<button className="text-primary dark:text-primary-fixed hover:bg-surface-variant/10 p-2 rounded-full flex items-center justify-center transition-colors duration-200">
<span className="material-symbols-outlined">settings</span>
</button>
</div>
</header>
<main className="flex-grow flex flex-col items-center w-full max-w-7xl mx-auto px-margin-mobile pb-32 pt-6 gap-lg">

<div className="w-full max-w-2xl text-center space-y-sm">
<div className="inline-flex items-center justify-center gap-2 mb-2 bg-tertiary-container text-on-tertiary-container px-4 py-1 rounded-full font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[18px]">verified_user</span>
                Member
            </div>
<h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary tracking-tight">Diwali Savings Fund</h2>
</div>

<nav className="w-full max-w-2xl flex border-b border-outline-variant/30 overflow-x-auto hide-scrollbar">
<button className="flex-1 py-4 px-4 font-label-sm text-label-sm text-secondary border-b-2 border-secondary whitespace-nowrap transition-colors duration-200">
                Progress
            </button>
<button className="flex-1 py-4 px-4 font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface whitespace-nowrap transition-colors duration-200">
                Members
            </button>
<button className="flex-1 py-4 px-4 font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface whitespace-nowrap transition-colors duration-200">
                My Payments
            </button>
</nav>

<div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-md">

<div className="md:col-span-2 bg-surface-container-lowest border border-secondary/15 rounded-xl p-lg flex flex-col items-center justify-center jali-border-top relative overflow-hidden">

<div className="absolute -right-16 -top-16 w-48 h-48 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none"></div>
<div className="absolute -left-16 -bottom-16 w-48 h-48 bg-tertiary-container/10 rounded-full blur-3xl pointer-events-none"></div>
<h3 className="font-headline-md text-headline-md text-primary mb-xl z-10">Collection Progress</h3>
<div className="relative w-64 h-64 flex items-center justify-center mb-md z-10">

<svg className="w-full h-full transform -rotate-90" viewbox="0 0 100 100">

<circle className="text-surface-variant" cx="50" cy="50" fill="none" r="45" stroke="currentColor" stroke-width="8"></circle>

<circle className="text-secondary" cx="50" cy="50" fill="none" r="45" stroke="currentColor" stroke-dasharray="282.74" stroke-dashoffset="84.82" stroke-linecap="round" stroke-width="8"></circle>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center text-center">
<span className="font-display-lg-mobile text-display-lg-mobile text-primary">7<span className="text-on-surface-variant text-body-lg font-body-lg">/10</span></span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">Members Paid</span>
</div>
</div>
</div>

<div className="md:col-span-2 bg-surface-container-high rounded-xl p-md flex items-start gap-4 border border-outline-variant/30">
<span className="material-symbols-outlined text-outline mt-1">info</span>
<div>
<p className="font-body-md text-body-md text-on-surface-variant">
                        This cycle is still collecting – payout may be delayed.
                    </p>
</div>
</div>

<div className="md:col-span-2 bg-primary-container text-on-primary-container rounded-xl p-lg flex flex-col sm:flex-row items-center justify-between gap-md relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent pointer-events-none"></div>
<div className="z-10 flex flex-col items-start gap-1 w-full sm:w-auto">
<span className="font-label-sm text-label-sm text-secondary-container uppercase tracking-wider">Current Cycle Due</span>
<span className="font-display-lg-mobile text-display-lg-mobile text-on-primary">Rs. 5,000</span>
<span className="font-body-md text-body-md text-primary-fixed-dim flex items-center gap-2 mt-2">
<span className="material-symbols-outlined text-[16px]">calendar_month</span>
                        Due Date: Oct 15
                    </span>
</div>
<button className="z-10 w-full sm:w-auto bg-secondary text-on-secondary px-8 py-4 rounded-full font-label-sm text-label-sm hover:opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_8px_24px_-8px_rgba(0,105,114,0.4)]">
                    Pay Now
                    <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center py-sm px-margin-mobile pb-safe bg-surface dark:bg-surface-dim md:hidden">
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-5 py-1 hover:opacity-80 active:scale-95 transition-transform duration-150">
<span className="material-symbols-outlined mb-1">home</span>
<span className="font-label-sm text-label-sm">Home</span>
</button>
<button className="flex flex-col items-center justify-center bg-secondary-container dark:bg-on-secondary-fixed-variant text-on-secondary-container dark:text-secondary-fixed rounded-full px-5 py-1 hover:opacity-80 active:scale-95 transition-transform duration-150">
<span className="material-symbols-outlined mb-1" data-weight="fill">account_balance_wallet</span>
<span className="font-label-sm text-label-sm">Pools</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-5 py-1 hover:opacity-80 active:scale-95 transition-transform duration-150">
<span className="material-symbols-outlined mb-1">groups</span>
<span className="font-label-sm text-label-sm">Connect</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-5 py-1 hover:opacity-80 active:scale-95 transition-transform duration-150">
<span className="material-symbols-outlined mb-1">person</span>
<span className="font-label-sm text-label-sm">Profile</span>
</button>
</nav>
    </div>
  );
}
