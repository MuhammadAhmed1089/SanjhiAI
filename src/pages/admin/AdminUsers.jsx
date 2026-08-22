import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function AdminUsers() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="bg-surface w-full sticky top-0 z-50 border-b border-secondary/15 flex justify-between items-center px-margin-mobile h-16 md:hidden">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary cursor-pointer active:opacity-80 hover:bg-secondary-container/50 transition-colors p-2 rounded-full">menu</span>
<span className="font-display-lg-mobile text-display-lg-mobile font-bold text-secondary">Sanjhi Admin</span>
</div>
<div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant flex items-center justify-center">
<span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
</div>
</header>

<nav className="hidden md:flex flex-col bg-surface-container-low h-full w-72 rounded-r-xl shadow-sm fixed inset-y-0 left-0 z-[60] p-4 bg-surface-container border-r border-outline-variant/20">
<div className="mb-8 px-4 flex items-center gap-3">
<div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center border border-primary/20">
<span className="material-symbols-outlined text-primary">shield_person</span>
</div>
<div>
<h2 className="font-body-md text-body-md font-bold text-on-surface">Sanjhi Admin Panel</h2>
<p className="font-label-sm text-label-sm text-on-surface-variant opacity-70">Internal Staff Tier</p>
</div>
</div>
<ul className="flex flex-col gap-2">
<li>
<a className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-variant rounded-full px-4 py-3 transition-all duration-200 ease-in-out font-label-sm text-label-sm" href="#">
<span className="material-symbols-outlined">dashboard</span>
                    Overview
                </a>
</li>
<li>
<a className="flex items-center gap-4 bg-secondary-container text-on-secondary-container rounded-full px-4 py-3 font-bold transition-all duration-200 ease-in-out font-label-sm text-label-sm" href="#">
<span className="material-symbols-outlined">group</span>
                    Users
                </a>
</li>
<li>
<a className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-variant rounded-full px-4 py-3 transition-all duration-200 ease-in-out font-label-sm text-label-sm" href="#">
<span className="material-symbols-outlined">diversity_3</span>
                    Committees
                </a>
</li>
<li>
<a className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-variant rounded-full px-4 py-3 transition-all duration-200 ease-in-out font-label-sm text-label-sm" href="#">
<span className="material-symbols-outlined">report_problem</span>
                    Disputes
                </a>
</li>
</ul>
</nav>

<main className="flex-1 w-full max-w-[1280px] mx-auto p-margin-mobile md:p-margin-desktop space-y-6 md:space-y-8">

<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary">Users</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage and monitor platform members.</p>
</div>
<div className="relative w-full md:w-96 group">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-3 pl-12 pr-4 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow shadow-sm hover:shadow-md" placeholder="Search members, contact, or ID..." type="text"/>
<button className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary text-on-secondary rounded-full p-2 hover:bg-secondary/90 transition-colors flex items-center justify-center">
<span className="material-symbols-outlined text-sm">tune</span>
</button>
</div>
</div>

<div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
<button className="px-4 py-2 bg-primary text-on-primary rounded-full font-label-sm text-label-sm whitespace-nowrap flex items-center gap-2">
                All Users <span className="bg-on-primary text-primary px-2 rounded-full text-xs">1,240</span>
</button>
<button className="px-4 py-2 border border-outline-variant text-on-surface-variant rounded-full font-label-sm text-label-sm whitespace-nowrap hover:bg-surface-variant transition-colors">
                Active
            </button>
<button className="px-4 py-2 border border-outline-variant text-on-surface-variant rounded-full font-label-sm text-label-sm whitespace-nowrap hover:bg-surface-variant transition-colors">
                Pending Verification
            </button>
<button className="px-4 py-2 border border-outline-variant text-on-surface-variant rounded-full font-label-sm text-label-sm whitespace-nowrap hover:bg-surface-variant transition-colors">
                Suspended
            </button>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-secondary/15 shadow-sm overflow-hidden jali-border-top">

<div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-outline-variant/30 bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
<div className="col-span-4">Member</div>
<div className="col-span-3">Contact</div>
<div className="col-span-2 text-center">Trust Score</div>
<div className="col-span-1 text-center">Ct.</div>
<div className="col-span-2 text-right">Status</div>
</div>
<ul className="flex flex-col divide-y divide-outline-variant/20">

<li className="p-4 hover:bg-surface-container-low/50 transition-colors cursor-pointer group">
<div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

<div className="col-span-1 md:col-span-4 flex items-center gap-3">
<div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-lg shrink-0">
                                AS
                            </div>
<div>
<h3 className="font-headline-md text-headline-md text-on-surface !text-lg !font-bold">Aarav Sharma</h3>
<p className="font-label-sm text-label-sm text-on-surface-variant font-normal">ID: #SJ-8492</p>
</div>
</div>

<div className="col-span-1 md:col-span-3 flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-sm opacity-70">phone_iphone</span>
<span className="font-body-md text-body-md">+92 300 ****123</span>
</div>

<div className="col-span-1 md:col-span-3 flex items-center justify-between md:grid md:grid-cols-3 gap-2">
<div className="flex items-center gap-1 bg-surface-container px-3 py-1.5 rounded-lg md:col-span-2 md:justify-center">
<span className="material-symbols-outlined text-tertiary-container text-sm">verified_user</span>
<span className="font-label-sm text-label-sm text-on-surface">940</span>
</div>
<div className="flex items-center gap-1 text-on-surface-variant md:col-span-1 md:justify-center" title="Active Memberships">
<span className="material-symbols-outlined text-sm opacity-70">account_balance</span>
<span className="font-body-md text-body-md">5</span>
</div>
</div>

<div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-3 mt-2 md:mt-0">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-container/20 text-on-tertiary-container font-label-sm text-label-sm text-xs border border-tertiary-container/30">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                                Active
                            </span>
<button className="p-2 text-on-surface-variant hover:text-secondary rounded-full hover:bg-surface-variant transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 hidden md:flex">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
</div>
</li>

<li className="p-4 hover:bg-surface-container-low/50 transition-colors cursor-pointer group">
<div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
<div className="col-span-1 md:col-span-4 flex items-center gap-3">
<div className="w-12 h-12 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-lg shrink-0">
                                ZK
                            </div>
<div>
<h3 className="font-headline-md text-headline-md text-on-surface !text-lg !font-bold">Zara Khan</h3>
<p className="font-label-sm text-label-sm text-on-surface-variant font-normal">ID: #SJ-3104</p>
</div>
</div>
<div className="col-span-1 md:col-span-3 flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-sm opacity-70">phone_iphone</span>
<span className="font-body-md text-body-md">+92 321 ****889</span>
</div>
<div className="col-span-1 md:col-span-3 flex items-center justify-between md:grid md:grid-cols-3 gap-2">
<div className="flex items-center gap-1 bg-surface-container px-3 py-1.5 rounded-lg md:col-span-2 md:justify-center">
<span className="material-symbols-outlined text-tertiary-container text-sm">verified_user</span>
<span className="font-label-sm text-label-sm text-on-surface">885</span>
</div>
<div className="flex items-center gap-1 text-on-surface-variant md:col-span-1 md:justify-center">
<span className="material-symbols-outlined text-sm opacity-70">account_balance</span>
<span className="font-body-md text-body-md">2</span>
</div>
</div>
<div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-3 mt-2 md:mt-0">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-container/20 text-on-tertiary-container font-label-sm text-label-sm text-xs border border-tertiary-container/30">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                                Active
                            </span>
<button className="p-2 text-on-surface-variant hover:text-secondary rounded-full hover:bg-surface-variant transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 hidden md:flex">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
</div>
</li>

<li className="p-4 hover:bg-surface-container-low/50 transition-colors cursor-pointer group bg-error-container/10">
<div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
<div className="col-span-1 md:col-span-4 flex items-center gap-3">
<div className="w-12 h-12 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold text-lg shrink-0">
                                MF
                            </div>
<div>
<h3 className="font-headline-md text-headline-md text-on-surface !text-lg !font-bold">Musa Farooq</h3>
<p className="font-label-sm text-label-sm text-on-surface-variant font-normal">ID: #SJ-9012</p>
</div>
</div>
<div className="col-span-1 md:col-span-3 flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-sm opacity-70">phone_iphone</span>
<span className="font-body-md text-body-md">+92 333 ****445</span>
</div>
<div className="col-span-1 md:col-span-3 flex items-center justify-between md:grid md:grid-cols-3 gap-2">
<div className="flex items-center gap-1 bg-error-container/30 border border-error/20 px-3 py-1.5 rounded-lg md:col-span-2 md:justify-center text-error">
<span className="material-symbols-outlined text-sm">warning</span>
<span className="font-label-sm text-label-sm">420</span>
</div>
<div className="flex items-center gap-1 text-on-surface-variant md:col-span-1 md:justify-center">
<span className="material-symbols-outlined text-sm opacity-70">account_balance</span>
<span className="font-body-md text-body-md">1</span>
</div>
</div>
<div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-3 mt-2 md:mt-0">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm text-xs border border-error/20">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                                Flagged
                            </span>
<button className="p-2 text-on-surface-variant hover:text-secondary rounded-full hover:bg-surface-variant transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 hidden md:flex">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
</div>
</li>
</ul>

<div className="p-4 border-t border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest">
<span className="font-label-sm text-label-sm text-on-surface-variant">Showing 1-3 of 1,240</span>
<div className="flex gap-2">
<button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-variant disabled:opacity-50" disabled="">
<span className="material-symbols-outlined text-sm">chevron_left</span>
</button>
<button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-variant">
<span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface border-t border-secondary/10 bg-surface/95 backdrop-blur-md shadow-lg rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:bg-secondary-container/20 active:scale-95 transition-transform p-2 rounded-xl min-w-[64px]" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-sm text-label-sm text-[10px] mt-1">Overview</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary font-bold hover:bg-secondary-container/20 active:scale-95 transition-transform p-2 rounded-xl min-w-[64px]" href="#">
<div className="bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full mb-1">
<span className="material-symbols-outlined">group</span>
</div>
<span className="font-label-sm text-label-sm text-[10px]">Users</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:bg-secondary-container/20 active:scale-95 transition-transform p-2 rounded-xl min-w-[64px]" href="#">
<span className="material-symbols-outlined">diversity_3</span>
<span className="font-label-sm text-label-sm text-[10px] mt-1">Committees</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:bg-secondary-container/20 active:scale-95 transition-transform p-2 rounded-xl min-w-[64px]" href="#">
<span className="material-symbols-outlined">report_problem</span>
<span className="font-label-sm text-label-sm text-[10px] mt-1">Disputes</span>
</a>
</nav>
    </div>
  );
}
