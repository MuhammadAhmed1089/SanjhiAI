import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function AdminOverview() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<nav className="hidden md:flex h-full w-72 rounded-r-xl bg-surface-container-low dark:bg-surface-container-lowest text-secondary dark:text-secondary-fixed-dim font-body-md shadow-sm fixed inset-y-0 left-0 z-[60] flex-col p-4 border-r border-surface-container dark:border-surface-container-high transition-all duration-200 ease-in-out">
<div className="flex items-center gap-4 mb-8 pl-4 pt-4">
<div className="h-10 w-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold">SA</div>
<div>
<h2 className="font-label-sm text-label-sm text-primary">Sanjhi Admin Panel</h2>
<p className="text-xs text-on-surface-variant">Internal Staff Tier</p>
</div>
</div>
<ul className="flex flex-col gap-2">
<li>
<a className="flex items-center gap-4 bg-secondary-container text-on-secondary-container rounded-full px-4 py-3 font-bold hover:bg-surface-variant dark:hover:bg-on-surface/10 transition-colors" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span>Overview</span>
</a>
</li>
<li>
<a className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-variant rounded-full px-4 py-3 hover:bg-surface-variant dark:hover:bg-on-surface/10 transition-colors" href="#">
<span className="material-symbols-outlined">group</span>
<span>Users</span>
</a>
</li>
<li>
<a className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-variant rounded-full px-4 py-3 hover:bg-surface-variant dark:hover:bg-on-surface/10 transition-colors" href="#">
<span className="material-symbols-outlined">diversity_3</span>
<span>Committees</span>
</a>
</li>
<li>
<a className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-variant rounded-full px-4 py-3 hover:bg-surface-variant dark:hover:bg-on-surface/10 transition-colors" href="#">
<span className="material-symbols-outlined">report_problem</span>
<span>Disputes</span>
</a>
</li>
</ul>
</nav>

<main className="flex-1 flex flex-col h-full md:ml-72 overflow-y-auto pb-24 md:pb-0 relative scroll-smooth">

<div className="absolute inset-0 jali-pattern pointer-events-none z-[-1]"></div>

<header className="w-full sticky top-0 z-50 bg-surface dark:bg-surface-dim text-primary dark:text-primary-fixed font-headline-md text-headline-md border-b border-secondary/15 flex justify-between items-center px-margin-mobile h-16 w-full md:hidden">
<button className="text-on-surface-variant dark:text-on-surface-variant hover:bg-secondary-container/50 transition-colors cursor-pointer active:opacity-80 p-2 rounded-full flex items-center justify-center">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-display-lg-mobile text-display-lg-mobile font-bold text-secondary dark:text-secondary-fixed">Sanjhi Admin</h1>
<div className="h-8 w-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center cursor-pointer active:opacity-80">
<span className="material-symbols-outlined text-sm">person</span>
</div>
</header>
<div className="p-margin-mobile md:p-margin-desktop max-w-[1280px] mx-auto w-full">
<header className="mb-8 md:mb-12 pt-4 md:pt-0">
<h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">Admin Console</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">High-level overview of platform operations.</p>
</header>

<section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-gutter mb-12">
<div className="bg-surface-container-lowest rounded-xl p-6 border border-secondary/15 flex flex-col justify-between jali-border">
<div className="flex items-center gap-3 mb-4 text-secondary">
<span className="material-symbols-outlined bg-secondary-container p-2 rounded-full">group</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Total Users</span>
</div>
<div className="font-display-lg-mobile text-display-lg-mobile text-primary">12.4k</div>
<div className="text-xs text-tertiary mt-2 flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">trending_up</span> +5.2% this week
                    </div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-6 border border-secondary/15 flex flex-col justify-between jali-border">
<div className="flex items-center gap-3 mb-4 text-secondary">
<span className="material-symbols-outlined bg-secondary-container p-2 rounded-full">diversity_3</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Total Committees</span>
</div>
<div className="font-display-lg-mobile text-display-lg-mobile text-primary">840</div>
<div className="text-xs text-tertiary mt-2 flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">trending_up</span> +12 new
                    </div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-6 border border-error-container/50 bg-error-container/10 flex flex-col justify-between">
<div className="flex items-center gap-3 mb-4 text-error">
<span className="material-symbols-outlined bg-error-container p-2 rounded-full">pending_actions</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Pending Complaints</span>
</div>
<div className="font-display-lg-mobile text-display-lg-mobile text-error">24</div>
<div className="text-xs text-on-surface-variant mt-2 flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">schedule</span> 8 require immediate action
                    </div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-6 border border-error/20 bg-error/5 flex flex-col justify-between">
<div className="flex items-center gap-3 mb-4 text-error">
<span className="material-symbols-outlined bg-error-container p-2 rounded-full">gavel</span>
<span className="font-label-sm text-label-sm text-on-surface-variant text-error">Frozen Committees</span>
</div>
<div className="font-display-lg-mobile text-display-lg-mobile text-error">3</div>
<div className="text-xs text-on-surface-variant mt-2 flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">warning</span> Under investigation
                    </div>
</div>
</section>

<section>
<h2 className="font-headline-md text-headline-md text-primary mb-6">Quick Navigation</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-gutter">
<button className="bg-surface-container-lowest rounded-xl p-6 border border-secondary/15 hover:bg-secondary-container/10 transition-colors text-left flex flex-col gap-4 group">
<div className="h-12 w-12 rounded-full bg-secondary-container text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-2xl">manage_accounts</span>
</div>
<div>
<h3 className="font-label-sm text-label-sm text-primary mb-1">User Management</h3>
<p className="font-body-md text-body-md text-sm text-on-surface-variant">Verify identities, manage roles, and handle account issues.</p>
</div>
</button>
<button className="bg-surface-container-lowest rounded-xl p-6 border border-secondary/15 hover:bg-secondary-container/10 transition-colors text-left flex flex-col gap-4 group">
<div className="h-12 w-12 rounded-full bg-secondary-container text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-2xl">account_balance</span>
</div>
<div>
<h3 className="font-label-sm text-label-sm text-primary mb-1">Committee Oversight</h3>
<p className="font-body-md text-body-md text-sm text-on-surface-variant">Monitor pools, track contributions, and audit committee health.</p>
</div>
</button>
<button className="bg-surface-container-lowest rounded-xl p-6 border border-secondary/15 hover:bg-secondary-container/10 transition-colors text-left flex flex-col gap-4 group">
<div className="h-12 w-12 rounded-full bg-error-container text-error flex items-center justify-center group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-2xl">report</span>
</div>
<div>
<h3 className="font-label-sm text-label-sm text-primary mb-1">Complaint Queue</h3>
<p className="font-body-md text-body-md text-sm text-on-surface-variant">Resolve disputes, review flags, and manage platform safety.</p>
</div>
</button>
</div>
</section>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 md:hidden bg-surface dark:bg-surface-dim text-secondary dark:text-secondary-fixed font-label-sm text-label-sm rounded-t-xl border-t border-secondary/10 bg-surface/95 backdrop-blur-md shadow-lg pb-safe">
<a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed font-bold hover:bg-secondary-container/20 active:scale-95 transition-transform p-2 rounded-lg" href="#">
<span className="material-symbols-outlined mb-1">dashboard</span>
<span>Overview</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:bg-secondary-container/20 active:scale-95 transition-transform p-2 rounded-lg" href="#">
<span className="material-symbols-outlined mb-1">group</span>
<span>Users</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:bg-secondary-container/20 active:scale-95 transition-transform p-2 rounded-lg" href="#">
<span className="material-symbols-outlined mb-1">diversity_3</span>
<span>Committees</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:bg-secondary-container/20 active:scale-95 transition-transform p-2 rounded-lg" href="#">
<span className="material-symbols-outlined mb-1">report_problem</span>
<span>Disputes</span>
</a>
</nav>
    </div>
  );
}
