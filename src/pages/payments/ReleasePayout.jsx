import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function ReleasePayout() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="flex items-center px-margin-mobile md:px-margin-desktop py-sm w-full sticky top-0 bg-background/90 backdrop-blur-md z-50 border-b border-outline-variant/30">
<button className="p-2 mr-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface flex items-center justify-center active:scale-95">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md-mobile md:text-headline-md text-primary tracking-tight">Release Payout</h1>
</header>
<main className="flex-1 px-margin-mobile md:px-margin-desktop py-lg w-full max-w-2xl mx-auto flex flex-col gap-lg pb-xl">
<div className="relative overflow-hidden bg-secondary text-on-secondary rounded-xl p-lg shadow-sm border border-secondary-fixed/20 flex flex-col items-center text-center">
<div className="absolute inset-0 opacity-10 pointer-events-none">
<svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
<defs>
<pattern height="40" patternunits="userSpaceOnUse" width="40">
<path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="currentColor" stroke-width="1"></path>
<circle cx="20" cy="20" fill="currentColor" r="3"></circle>
</pattern>
</defs>
<rect fill="url(#jali)" height="100%" width="100%"></rect>
</svg>
</div>
<div className="relative z-10 flex flex-col items-center gap-sm">
<div className="w-16 h-16 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center mb-2 shadow-[0_0_24px_rgba(159,240,251,0.4)]">
<span className="material-symbols-outlined icon-fill text-[32px]">celebration</span>
</div>
<h2 className="font-headline-md text-headline-md-mobile md:text-headline-md">Ready for Release</h2>
<p className="font-body-md text-body-md max-w-md text-on-secondary/90">
                    All members have paid their contributions for this cycle. You can now safely release the pool payout to <strong>Rahul Sharma</strong>.
                </p>
</div>
</div>
<section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg flex flex-col gap-md relative overflow-hidden">
<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tertiary-container to-secondary"></div>
<h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Recipient Details</h3>
<div className="flex items-center gap-md">
<div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-surface-container-low border border-outline-variant flex-shrink-0">
<img className="w-full h-full object-cover" src="/avatar.svg"/>
</div>
<div className="flex-1">
<h4 className="font-headline-md text-headline-md-mobile md:text-headline-md text-on-surface">Rahul Sharma</h4>
<p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs mt-1">
<span className="material-symbols-outlined text-[18px] text-tertiary">verified_user</span> Verified Pool Member
                    </p>
</div>
</div>
<hr className="border-outline-variant/40 my-2"/>
<div className="flex justify-between items-center bg-surface-container-low p-md rounded-lg border border-outline-variant/30">
<div className="flex items-center gap-md">
<div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center border border-outline-variant/50 shadow-sm">
<span className="material-symbols-outlined text-secondary icon-fill">account_balance</span>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant">Linked Account</p>
<p className="font-body-lg text-body-lg text-on-surface font-medium tracking-wide">JazzCash - 0300****123</p>
</div>
</div>
</div>
</section>
<section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg flex justify-between items-end">
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Payout Amount</p>
<p className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight">₹ 1,20,000</p>
</div>
<div className="text-right">
<p className="font-body-md text-body-md text-on-surface-variant">Cycle</p>
<p className="font-body-lg text-body-lg text-on-surface font-medium">October 2023</p>
</div>
</section>
<div className="mt-lg flex flex-col items-center gap-md pt-md">
<button className="w-full md:w-auto bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary font-label-sm text-label-sm py-4 px-8 rounded-full transition-all duration-200 flex justify-center items-center gap-sm active:scale-95 shadow-[0_8px_32px_-8px_rgba(0,105,114,0.5)]">
<span className="material-symbols-outlined icon-fill">send_money</span>
<span className="text-base tracking-wide">Mark Payout as Sent</span>
</button>
<p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-xs mt-2 opacity-80">
<span className="material-symbols-outlined text-[16px]">lock</span>
                This action is high-stakes, secure, and irreversible.
            </p>
</div>
</main>
    </div>
  );
}
