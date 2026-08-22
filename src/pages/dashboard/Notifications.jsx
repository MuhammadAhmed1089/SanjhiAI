import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function Notifications() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="w-full top-0 sticky z-50 bg-surface dark:bg-inverse-surface border-b border-outline-variant/15 flex items-center justify-between px-margin-mobile w-full h-16">
<button aria-label="Go back" className="text-primary dark:text-primary-fixed-dim hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors active:scale-95 transition-transform p-2 rounded-full">
<span aria-hidden="true" className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim tracking-tight">
            Notifications
        </h1>
<div className="w-10 h-10"></div> 
</header>

<main className="max-w-[800px] mx-auto px-margin-mobile md:px-margin-desktop py-lg">
<div className="flex flex-col gap-4">

<div className="bg-surface-container-lowest border border-outline-variant/15 rounded-xl p-4 flex gap-4 items-start relative hover:bg-surface-container-low transition-colors cursor-pointer group">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="bg-secondary-container text-on-secondary-container p-3 rounded-full flex-shrink-0">
<span className="material-symbols-outlined">person_add</span>
</div>
<div className="flex-grow">
<div className="flex justify-between items-baseline mb-1">
<h3 className="font-headline-md text-[18px] leading-6 font-semibold text-primary">New Join Request</h3>
<span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap ml-2">2m ago</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">Ayesha Malik has requested to join 'Diwali Savings Fund'.</p>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant/15 rounded-xl p-4 flex gap-4 items-start relative hover:bg-surface-container-low transition-colors cursor-pointer group">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="bg-tertiary-fixed text-on-tertiary-fixed p-3 rounded-full flex-shrink-0">
<span className="material-symbols-outlined">check_circle</span>
</div>
<div className="flex-grow">
<div className="flex justify-between items-baseline mb-1">
<h3 className="font-headline-md text-[18px] leading-6 font-semibold text-primary">Payment Confirmed</h3>
<span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap ml-2">1h ago</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">Your payment for Cycle 10 has been verified by the organizer.</p>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant/15 rounded-xl p-4 flex gap-4 items-start relative hover:bg-surface-container-low transition-colors cursor-pointer group">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="bg-surface-variant text-on-surface p-3 rounded-full flex-shrink-0">
<span className="material-symbols-outlined">payments</span>
</div>
<div className="flex-grow">
<div className="flex justify-between items-baseline mb-1">
<h3 className="font-headline-md text-[18px] leading-6 font-semibold text-primary">Payout Released</h3>
<span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap ml-2">5h ago</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">The payout for October 2023 has been sent to Rahul Sharma.</p>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant/15 rounded-xl p-4 flex gap-4 items-start relative hover:bg-surface-container-low transition-colors cursor-pointer group">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-error rounded-l-xl opacity-100"></div>
<div className="bg-error-container text-on-error-container p-3 rounded-full flex-shrink-0">
<span className="material-symbols-outlined">priority_high</span>
</div>
<div className="flex-grow">
<div className="flex justify-between items-baseline mb-1">
<h3 className="font-headline-md text-[18px] leading-6 font-semibold text-primary">Payment Overdue</h3>
<span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap ml-2">1d ago</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">Your contribution for 'Home Renovation' was due 2 days ago.</p>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant/15 rounded-xl p-4 flex gap-4 items-start relative hover:bg-surface-container-low transition-colors cursor-pointer group opacity-75">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="bg-surface-container-high text-on-surface-variant p-3 rounded-full flex-shrink-0">
<span className="material-symbols-outlined">task_alt</span>
</div>
<div className="flex-grow">
<div className="flex justify-between items-baseline mb-1">
<h3 className="font-headline-md text-[18px] leading-6 font-semibold text-primary">Request Approved</h3>
<span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap ml-2">2d ago</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">You have been added to the 'Sanjhi Growth Circle'.</p>
</div>
</div>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container-lowest dark:bg-surface-container-lowest border-t border-outline-variant/10 shadow-[0_-4px_20px_rgba(15,28,44,0.05)] md:hidden">
<div className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] bg-surface-container-lowest">

<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-surface-container-high transition-all active:scale-90 duration-200 rounded-lg" href="#">
<span className="material-symbols-outlined mb-1 text-[24px]">dashboard</span>
<span className="font-label-sm text-label-sm">Dashboard</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-surface-container-high transition-all active:scale-90 duration-200 rounded-lg" href="#">
<span className="material-symbols-outlined mb-1 text-[24px]">account_balance_wallet</span>
<span className="font-label-sm text-label-sm">Pools</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-surface-container-high transition-all active:scale-90 duration-200 rounded-lg" href="#">
<span className="material-symbols-outlined mb-1 text-[24px]">diversity_3</span>
<span className="font-label-sm text-label-sm">Connect</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-surface-container-high transition-all active:scale-90 duration-200 rounded-lg" href="#">
<span className="material-symbols-outlined mb-1 text-[24px]">person</span>
<span className="font-label-sm text-label-sm">Profile</span>
</a>
</div>
</nav>

<nav className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-surface-container-lowest border-r border-outline-variant/15 z-40 pt-20 px-4">
<div className="flex flex-col gap-2">
<a className="flex items-center gap-3 p-3 rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-colors" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-sm text-[16px]">Dashboard</span>
</a>
<a className="flex items-center gap-3 p-3 rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-colors" href="#">
<span className="material-symbols-outlined">account_balance_wallet</span>
<span className="font-label-sm text-[16px]">Pools</span>
</a>
<a className="flex items-center gap-3 p-3 rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-colors" href="#">
<span className="material-symbols-outlined">diversity_3</span>
<span className="font-label-sm text-[16px]">Connect</span>
</a>
<a className="flex items-center gap-3 p-3 rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-colors" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-sm text-[16px]">Profile</span>
</a>
<a className="flex items-center gap-3 p-3 rounded-xl bg-secondary-container text-on-secondary-container mt-4" href="#">
<span className="material-symbols-outlined">notifications</span>
<span className="font-label-sm text-[16px]">Notifications</span>
</a>
</div>
</nav>
    </div>
  );
}
