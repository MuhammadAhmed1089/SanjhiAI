import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function AdminCommittees() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<aside className="hidden md:flex flex-col fixed inset-y-0 left-0 z-[60] p-4 bg-surface-container-low dark:bg-surface-container-lowest text-secondary dark:text-secondary-fixed-dim font-body-md text-body-md h-full w-72 rounded-r-xl shadow-sm bg-surface-container dark:bg-surface-container-high transition-all duration-200 ease-in-out border-r border-secondary/15">
<div className="mb-8 px-4 flex items-center gap-4 mt-4">
<div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold">
                 S
             </div>
<div>
<h2 className="font-bold text-primary">Sanjhi Admin Panel</h2>
<p className="text-sm text-on-surface-variant">Internal Staff Tier</p>
</div>
</div>
<nav className="flex flex-col gap-2">
<a className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-variant rounded-full px-4 py-3 transition-colors" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-sm text-label-sm">Overview</span>
</a>
<a className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-variant rounded-full px-4 py-3 transition-colors" href="#">
<span className="material-symbols-outlined">group</span>
<span className="font-label-sm text-label-sm">Users</span>
</a>
<a className="flex items-center gap-4 bg-secondary-container text-on-secondary-container rounded-full px-4 py-3 font-bold transition-colors" href="#">
<span className="material-symbols-outlined" data-weight="fill">diversity_3</span>
<span className="font-label-sm text-label-sm">Committees</span>
</a>
<a className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-variant rounded-full px-4 py-3 transition-colors" href="#">
<span className="material-symbols-outlined">report_problem</span>
<span className="font-label-sm text-label-sm">Disputes</span>
</a>
</nav>
</aside>

<div className="flex-1 flex flex-col md:ml-72 w-full max-w-[1280px] mx-auto pb-20 md:pb-0">

<header className="bg-surface dark:bg-surface-dim text-primary dark:text-primary-fixed w-full sticky top-0 z-50 flat no shadows flex justify-between items-center px-margin-mobile h-16 border-b border-secondary/15 md:px-margin-desktop">
<div className="flex items-center gap-4">
<button className="md:hidden p-2 rounded-full hover:bg-secondary-container/50 transition-colors text-on-surface-variant dark:text-on-surface-variant cursor-pointer active:opacity-80">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline-md text-headline-md font-bold tracking-tight">Sanjhi Admin</h1>
</div>
<div className="flex items-center gap-4">
<button className="p-2 rounded-full hover:bg-secondary-container/50 transition-colors text-on-surface-variant dark:text-on-surface-variant cursor-pointer active:opacity-80">
<span className="material-symbols-outlined">search</span>
</button>
<button className="p-2 rounded-full hover:bg-secondary-container/50 transition-colors text-on-surface-variant dark:text-on-surface-variant cursor-pointer active:opacity-80">
<span className="material-symbols-outlined">notifications</span>
</button>
<div className="h-8 w-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-sm cursor-pointer ml-2">
                    A
                </div>
</div>
</header>

<main className="flex-1 p-margin-mobile md:p-margin-desktop space-y-6">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
<div>
<h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary font-bold">Committees</h2>
<p className="text-on-surface-variant mt-1">Oversight and management of community circles.</p>
</div>
<button className="bg-secondary text-on-secondary hover:bg-secondary/90 transition-colors rounded-full px-6 py-3 font-label-sm text-label-sm flex items-center justify-center gap-2 self-start md:self-auto shadow-sm">
<span className="material-symbols-outlined">add</span>
                    New Committee
                </button>
</div>

<div className="flex flex-col sm:flex-row gap-3">
<div className="relative flex-1">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full bg-surface-container-lowest border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-lg pl-10 pr-4 py-2.5 text-on-surface transition-colors placeholder:text-on-surface-variant/70" placeholder="Search committees, organizers..." type="text"/>
</div>
<div className="flex gap-2">
<button className="flex items-center gap-2 px-4 py-2.5 border border-outline-variant/50 rounded-lg bg-surface-container-lowest hover:bg-surface-variant/50 transition-colors text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined">filter_list</span>
                        Filters
                    </button>
<button className="flex items-center gap-2 px-4 py-2.5 border border-outline-variant/50 rounded-lg bg-surface-container-lowest hover:bg-surface-variant/50 transition-colors text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined">sort</span>
                        Sort
                    </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

<div className="bg-surface-container-lowest rounded-xl border border-secondary/15 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow cursor-pointer jali-border-top">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="h-12 w-12 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
<span className="material-symbols-outlined">location_city</span>
</div>
<div>
<h3 className="font-label-sm text-label-sm text-primary text-base">Karachi Growth Circle</h3>
<p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[14px]">person</span>
                                    Zain Malik
                                </p>
</div>
</div>
<span className="bg-tertiary-container/30 text-tertiary font-label-sm text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider">Active</span>
</div>
<div className="pt-4 border-t border-outline-variant/20 flex justify-between items-end mt-auto">
<div>
<p className="text-xs text-on-surface-variant mb-1">Members</p>
<div className="flex items-center gap-2">
<div className="flex -space-x-2">
<div className="h-6 w-6 rounded-full bg-surface-variant border-2 border-surface-container-lowest"></div>
<div className="h-6 w-6 rounded-full bg-secondary-container border-2 border-surface-container-lowest"></div>
<div className="h-6 w-6 rounded-full bg-primary-fixed border-2 border-surface-container-lowest"></div>
</div>
<span className="font-label-sm text-label-sm text-on-surface">12/15</span>
</div>
</div>
<button className="text-secondary hover:bg-secondary/10 p-2 rounded-full transition-colors">
<span className="material-symbols-outlined">more_horiz</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-secondary/15 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow cursor-pointer">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="h-12 w-12 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined">eco</span>
</div>
<div>
<h3 className="font-label-sm text-label-sm text-primary text-base">Lahore Green Tech</h3>
<p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[14px]">person</span>
                                    Fatima Ali
                                </p>
</div>
</div>
<span className="bg-tertiary-container/30 text-tertiary font-label-sm text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider">Active</span>
</div>
<div className="pt-4 border-t border-outline-variant/20 flex justify-between items-end mt-auto">
<div>
<p className="text-xs text-on-surface-variant mb-1">Members</p>
<div className="flex items-center gap-2">
<div className="flex -space-x-2">
<div className="h-6 w-6 rounded-full bg-surface-variant border-2 border-surface-container-lowest"></div>
<div className="h-6 w-6 rounded-full bg-secondary-container border-2 border-surface-container-lowest"></div>
</div>
<span className="font-label-sm text-label-sm text-on-surface">8/10</span>
</div>
</div>
<button className="text-secondary hover:bg-secondary/10 p-2 rounded-full transition-colors">
<span className="material-symbols-outlined">more_horiz</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-secondary/15 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow cursor-pointer opacity-75">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="h-12 w-12 rounded-lg bg-surface-variant flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">book</span>
</div>
<div>
<h3 className="font-label-sm text-label-sm text-primary text-base">Islamabad Writers</h3>
<p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[14px]">person</span>
                                    Omar Khan
                                </p>
</div>
</div>
<span className="bg-surface-variant text-on-surface-variant font-label-sm text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider">Draft</span>
</div>
<div className="pt-4 border-t border-outline-variant/20 flex justify-between items-end mt-auto">
<div>
<p className="text-xs text-on-surface-variant mb-1">Members</p>
<div className="flex items-center gap-2">
<div className="flex -space-x-2">
<div className="h-6 w-6 rounded-full bg-surface-variant border-2 border-surface-container-lowest flex items-center justify-center text-[8px] text-on-surface-variant">+</div>
</div>
<span className="font-label-sm text-label-sm text-on-surface">1/5</span>
</div>
</div>
<button className="text-secondary hover:bg-secondary/10 p-2 rounded-full transition-colors">
<span className="material-symbols-outlined">more_horiz</span>
</button>
</div>
</div>
</div>
</main>
</div>

<nav className="bg-surface dark:bg-surface-dim text-secondary dark:text-secondary-fixed font-label-sm text-label-sm fixed bottom-0 w-full rounded-t-xl border-t border-secondary/10 bg-surface/95 backdrop-blur-md shadow-lg fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 md:hidden">
<a className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:bg-secondary-container/20 active:scale-95 transition-transform p-2 rounded-lg w-16" href="#">
<span className="material-symbols-outlined mb-1">dashboard</span>
<span className="text-[10px]">Overview</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:bg-secondary-container/20 active:scale-95 transition-transform p-2 rounded-lg w-16" href="#">
<span className="material-symbols-outlined mb-1">group</span>
<span className="text-[10px]">Users</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed font-bold hover:bg-secondary-container/20 active:scale-95 transition-transform p-2 rounded-lg w-16" href="#">
<span className="material-symbols-outlined mb-1" data-weight="fill">diversity_3</span>
<span className="text-[10px]">Committees</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:bg-secondary-container/20 active:scale-95 transition-transform p-2 rounded-lg w-16" href="#">
<span className="material-symbols-outlined mb-1">report_problem</span>
<span className="text-[10px]">Disputes</span>
</a>
</nav>
    </div>
  );
}
