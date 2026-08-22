import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function CommitteeDetail() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="w-full top-0 sticky bg-surface dark:bg-surface-dim bg-surface-container-low dark:bg-surface-container-high flat no shadows flex justify-between items-center px-margin-mobile w-full py-md z-40 border-b border-secondary/10">
<div className="flex items-center gap-sm">
<button className="p-xs text-primary dark:text-primary-fixed hover:bg-surface-variant/10 transition-colors duration-200 rounded-full">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed font-bold tracking-tight">Diwali Savings Fund</h1>
<span className="bg-tertiary-container text-on-tertiary-container text-xs px-2 py-1 rounded-full font-label-sm font-semibold ml-2">Organizer</span>
</div>
<button className="p-xs text-primary dark:text-primary-fixed hover:bg-surface-variant/10 transition-colors duration-200 rounded-full">
<span className="material-symbols-outlined">settings</span>
</button>
</header>
<main className="flex-grow flex flex-col w-full max-w-7xl mx-auto md:px-margin-desktop md:flex-row md:gap-lg md:py-lg">

<aside className="hidden md:flex h-full w-72 rounded-r-xl bg-surface-container-low dark:bg-surface-container-lowest shadow-lg dark:shadow-none flex flex-col py-lg sticky top-24 border border-secondary/10">
<div className="px-md mb-lg flex items-center gap-md">
<img className="w-12 h-12 rounded-full object-cover border-2 border-secondary" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxUIT51VFvpyKMRw2sm_YjK7t31nOkg46QnVbIIjDht28tvnRhRSdSMl13bSRj_jn6tzmg0yMrJaOh-0uYn4OEAwQsSJB3ymjAwV2Z7Nc7t6OUBhU4yULAluBc4o-qyEKuvqe0IJsjnqVKw1Zc0K2KFVecrYATDgjHhqwDbCsA_ohaN3b3CGNND-zBsAwEDaY1nHuZmjwbVLjVkTi8I-clFzKOHDwuJrukHz2_aYDYPOfyGC3JR5wu"/>
<div>
<h2 className="font-headline-md text-headline-md text-secondary text-lg">Community Member</h2>
<p className="font-body-md text-body-md text-primary dark:text-primary-fixed-dim text-sm text-outline">Gold Tier Contributor</p>
</div>
</div>
<nav className="flex flex-col gap-sm">
<a className="bg-tertiary-container text-on-tertiary-container font-bold rounded-full mx-2 flex items-center gap-md px-md py-sm transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">receipt_long</span>
                    Ledger
                </a>
<a className="text-on-surface-variant hover:bg-surface-variant/20 rounded-full mx-2 flex items-center gap-md px-md py-sm hover:bg-surface-container-high transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">group</span>
                    Members
                </a>
<a className="text-on-surface-variant hover:bg-surface-variant/20 rounded-full mx-2 flex items-center gap-md px-md py-sm hover:bg-surface-container-high transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">trending_up</span>
                    Progress
                </a>
<a className="text-on-surface-variant hover:bg-surface-variant/20 rounded-full mx-2 flex items-center gap-md px-md py-sm hover:bg-surface-container-high transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">payments</span>
                    My Payments
                </a>
</nav>
</aside>
<div className="flex-grow flex flex-col pb-24 md:pb-0 px-margin-mobile md:px-0">

<div className="flex md:hidden border-b border-outline-variant/30 mb-md pt-sm">
<button className="flex-1 py-sm font-label-sm text-primary border-b-2 border-primary">Ledger</button>
<button className="flex-1 py-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors">Members</button>
</div>

<div className="w-full flex-grow space-y-lg pt-md md:pt-0">

<section className="bg-surface-container-lowest border border-secondary/10 rounded-xl p-md">
<div className="flex justify-between items-center overflow-x-auto gap-sm pb-xs scrollbar-hide">
<button className="whitespace-nowrap px-lg py-sm rounded-full text-on-surface-variant font-label-sm border border-outline-variant hover:bg-surface-variant/20 transition-colors">Cycle 1 (Oct)</button>
<button className="whitespace-nowrap px-lg py-sm rounded-full bg-primary-container text-on-primary-container font-label-sm font-bold shadow-sm ring-1 ring-primary-container/20">Cycle 2 (Nov) - Active</button>
<button className="whitespace-nowrap px-lg py-sm rounded-full text-on-surface-variant font-label-sm border border-outline-variant hover:bg-surface-variant/20 transition-colors">Cycle 3 (Dec)</button>
</div>
</section>

<section className="space-y-md">

<div className="bg-surface-container-lowest border border-secondary/10 rounded-xl p-md flex flex-col sm:flex-row sm:items-center justify-between gap-md relative overflow-hidden">
<div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
<div className="flex items-center gap-md pl-sm">
<img className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG46mp2_pJCvCKAcpPp_DSTby7EL9aMq132NodMW68QLQGXKFNiYxvbODlPi318KNA9OlP8gdIuIq3QBd1if2w4vhAjmgML-LTWEk3A5smvB2dlM1sUqp4nt4XP4j1G4F_QvbBSwQhmmFjBB3TjLKwz13J9ngAMiRfaUw4HDGEI-e1ZUsGF9qGOK0wsJk1GHEAQgFQcOY73iwhf7su40c0dh8hvi-mtP-uuGowPGzpc2ocHREmGiyW"/>
<div>
<p className="font-body-lg text-primary font-semibold">Rahul Sharma</p>
<p className="font-body-md text-outline text-sm">₹5,000</p>
</div>
</div>
<div className="flex items-center justify-between sm:justify-end gap-md w-full sm:w-auto">
<span className="flex items-center gap-xs text-secondary font-label-sm bg-secondary/10 px-sm py-xs rounded-full">
<span className="material-symbols-outlined text-[16px]">check_circle</span> Paid
                            </span>
</div>
</div>

<div className="bg-surface-container-lowest border border-secondary/10 rounded-xl p-md flex flex-col sm:flex-row sm:items-center justify-between gap-md relative overflow-hidden">
<div className="absolute top-0 left-0 w-1 h-full bg-tertiary"></div>
<div className="flex items-center gap-md pl-sm">
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold">
                                 PK
                             </div>
<div>
<p className="font-body-lg text-primary font-semibold">Priya Kapoor</p>
<p className="font-body-md text-outline text-sm">₹5,000</p>
</div>
</div>
<div className="flex items-center justify-between sm:justify-end gap-md w-full sm:w-auto">
<span className="flex items-center gap-xs text-tertiary font-label-sm bg-tertiary/10 px-sm py-xs rounded-full">
<span className="material-symbols-outlined text-[16px]">schedule</span> Awaiting Confirmation
                            </span>
<button className="text-secondary font-label-sm hover:underline">Verify</button>
</div>
</div>

<div className="bg-surface-container-lowest border border-error/20 rounded-xl p-md flex flex-col sm:flex-row sm:items-start sm:items-center justify-between gap-md relative overflow-hidden bg-error/5">
<div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
<div className="flex items-start sm:items-center gap-md pl-sm">
<img className="w-10 h-10 rounded-full object-cover mt-1 sm:mt-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw2Q3BgLYpsqC64MALVtKPPdavoFhRV7VhAKrK4_21fcA7d6x2eD59wfcjIb22LyjBcXhpsT_RW1lfP1ok6FOlXzvcgrMGTbssMvfL0Bk4WUQ58H-_pURinmCBod8VunUf-zFjGFsxavyaZsJfGRsykXxtRccqTBGLhohxJ72VZQxhRvdY1pTpeZPlYPKtyhuYTK8pVPCRggnP199nDgfjC-W5Y_vhjpwjfDOgMetABXTfZvhCuLF8"/>
<div>
<div className="flex items-center gap-sm">
<p className="font-body-lg text-primary font-semibold">Ayesha Malik</p>
<span className="bg-error-container text-on-error-container text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">At Risk</span>
</div>
<p className="font-body-md text-outline text-sm">₹5,000 • 3 Days Late</p>
</div>
</div>
<div className="flex flex-col sm:flex-row items-end sm:items-center gap-sm w-full sm:w-auto mt-sm sm:mt-0">
<button className="w-full sm:w-auto px-lg py-sm bg-surface-container text-primary font-label-sm rounded-full border border-outline-variant hover:bg-surface-variant transition-colors flex items-center justify-center gap-xs">
<span className="material-symbols-outlined text-[16px]">notifications</span> Send Reminder
                             </button>
<button className="w-full sm:w-auto px-lg py-sm bg-secondary text-on-secondary font-label-sm rounded-full hover:bg-secondary/90 transition-colors">
                                 Mark as Paid
                             </button>
</div>
</div>
</section>

<section className="mt-xl p-lg bg-surface-container-low rounded-xl border border-secondary/10 flex flex-col md:flex-row items-center justify-between gap-md jali-pattern">
<div className="text-center md:text-left">
<p className="font-headline-md text-primary font-bold">8 of 10 paid</p>
<p className="font-body-md text-outline text-sm">₹40,000 collected out of ₹50,000 total</p>
</div>
<button className="w-full md:w-auto px-xl py-md bg-surface-tint text-on-primary-fixed-variant opacity-50 cursor-not-allowed font-label-sm font-bold rounded-full flex items-center justify-center gap-sm" disabled="">
<span className="material-symbols-outlined">lock</span> Release Payout
                    </button>
</section>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center py-sm px-margin-mobile pb-safe border-t border-secondary/10 bg-surface dark:bg-surface-dim flat no shadows">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-5 py-1 hover:opacity-80 active:scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-sm text-[10px]">Home</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-on-secondary-fixed-variant text-on-secondary-container dark:text-secondary-fixed rounded-full px-5 py-1 hover:opacity-80 active:scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined" data-weight="fill">account_balance_wallet</span>
<span className="font-label-sm text-[10px]">Pools</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-5 py-1 hover:opacity-80 active:scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined">groups</span>
<span className="font-label-sm text-[10px]">Connect</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-5 py-1 hover:opacity-80 active:scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-sm text-[10px]">Profile</span>
</a>
</nav>
    </div>
  );
}
