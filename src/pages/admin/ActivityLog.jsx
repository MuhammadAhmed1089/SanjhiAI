import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function ActivityLog() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="bg-surface dark:bg-surface-container-low text-primary dark:text-primary-fixed-dim w-full sticky top-0 z-50 border-b border-outline-variant/15 flex justify-between items-center px-lg h-20 w-full transition-colors duration-200">
<div className="flex items-center gap-sm">
<button className="md:hidden p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">Trust Admin</h1>
<span className="ml-4 font-body-lg text-body-lg text-on-surface-variant border-l border-outline-variant/30 pl-4 hidden sm:block">Activity Log</span>
</div>
<div className="flex items-center gap-sm cursor-pointer active:opacity-80 hover:bg-surface-container-high transition-colors p-2 rounded-full">
<div className="w-10 h-10 rounded-full overflow-hidden bg-surface-variant flex items-center justify-center">
<img className="w-full h-full object-cover" src="/avatar.svg"/>
</div>
<span className="font-label-sm text-label-sm hidden md:block">Admin Profile</span>
</div>
</header>

<nav className="bg-surface dark:bg-surface-container-lowest h-full w-80 fixed left-0 top-0 z-40 bg-surface-container-low dark:bg-surface-container-low flex flex-col py-lg space-y-sm hidden md:flex border-r border-outline-variant/15">
<div className="px-lg pb-md mb-md border-b border-outline-variant/15 flex items-center gap-md">
<div className="w-12 h-12 rounded-full overflow-hidden bg-surface-variant">
<img className="w-full h-full object-cover" src="/avatar.svg"/>
</div>
<div>
<div className="font-headline-md text-[18px] font-bold text-primary">Sanjhi Admin</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Root Access</div>
</div>
</div>
<div className="flex-1 flex flex-col gap-1 px-sm">
<a className="flex items-center gap-md text-on-surface-variant dark:text-on-surface-variant mx-2 my-1 px-md py-sm rounded-lg hover:bg-surface-variant/50 transition-all duration-200" href="#">
<span className="material-symbols-outlined">gavel</span>
<span className="font-label-sm text-label-sm">Complaints</span>
</a>
<a className="flex items-center gap-md text-on-surface-variant dark:text-on-surface-variant mx-2 my-1 px-md py-sm rounded-lg hover:bg-surface-variant/50 transition-all duration-200" href="#">
<span className="material-symbols-outlined">account_balance</span>
<span className="font-label-sm text-label-sm">Committee Ledgers</span>
</a>
<a className="flex items-center gap-md bg-secondary-container dark:bg-secondary-container text-on-secondary-container rounded-lg mx-2 my-1 px-md py-sm transition-all duration-200 font-bold" href="#">
<span className="material-symbols-outlined">history_edu</span>
<span className="font-label-sm text-label-sm">Activity Log</span>
</a>
<a className="flex items-center gap-md text-on-surface-variant dark:text-on-surface-variant mx-2 my-1 px-md py-sm rounded-lg hover:bg-surface-variant/50 transition-all duration-200 mt-auto" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-label-sm text-label-sm">Settings</span>
</a>
</div>
<div className="px-lg pt-md mt-auto border-t border-outline-variant/15 font-label-sm text-label-sm text-on-surface-variant/60">
            Trust Node #042
        </div>
</nav>

<main className="flex-1 flex flex-col p-margin-mobile md:p-margin-desktop max-w-7xl w-full mx-auto gap-xl">
<div className="flex flex-col gap-sm">
<h2 className="font-display-lg-mobile md:font-display-lg text-primary">Platform Activity Log</h2>
<p className="text-on-surface-variant font-body-md max-w-2xl">Monitor all administrative actions taken across the Sanjhi trust network. All actions are securely logged and time-stamped.</p>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-4 flex flex-col md:flex-row gap-4 items-center">
<div className="relative w-full md:w-64">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none font-body-md text-on-surface transition-all" placeholder="Search admin name..." type="text"/>
</div>
<div className="relative w-full md:w-auto flex-1 flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
<button className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant/30 bg-surface hover:bg-surface-container-low text-on-surface-variant font-label-sm transition-colors whitespace-nowrap">
<span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    Date Range
                </button>
<div className="h-8 w-px bg-outline-variant/30 mx-2 self-center hidden md:block"></div>
<button className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container font-label-sm transition-colors whitespace-nowrap">
                    All Actions
                </button>
<button className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant/30 bg-surface hover:bg-surface-container-low text-on-surface-variant font-label-sm transition-colors whitespace-nowrap">
                    Resolved
                </button>
<button className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant/30 bg-surface hover:bg-surface-container-low text-on-surface-variant font-label-sm transition-colors whitespace-nowrap">
                    Suspended
                </button>
<button className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant/30 bg-surface hover:bg-surface-container-low text-on-surface-variant font-label-sm transition-colors whitespace-nowrap">
                    Frozen
                </button>
</div>
</div>

<div className="flex flex-col gap-md relative">

<div className="absolute left-6 top-4 bottom-4 w-px bg-outline-variant/30 hidden md:block"></div>

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg flex flex-col md:flex-row gap-lg items-start md:items-center group hover:bg-surface-container-low/50 transition-colors relative">

<div className="w-12 h-12 rounded-full bg-tertiary-container/20 text-tertiary flex items-center justify-center shrink-0 md:z-10 md:ring-8 md:ring-background">
<span className="material-symbols-outlined" data-weight="fill">gavel</span>
</div>
<div className="flex-1 flex flex-col gap-1 w-full">
<div className="flex justify-between items-start gap-4">
<h3 className="font-headline-md text-[20px] text-primary">Resolved Complaint #8924A</h3>
<span className="font-label-sm text-on-surface-variant shrink-0 whitespace-nowrap">2 hours ago</span>
</div>
<div className="flex flex-col md:flex-row gap-y-2 gap-x-6 mt-2">
<div className="flex items-center gap-2 text-on-surface-variant font-body-md">
<span className="material-symbols-outlined text-[18px]">target</span>
<span className="font-semibold text-on-surface">Target:</span> Karachi Growth Circle
                        </div>
<div className="flex items-center gap-2 text-on-surface-variant font-body-md">
<span className="material-symbols-outlined text-[18px]">person</span>
<span className="font-semibold text-on-surface">By:</span> Admin: Sarah Ahmed
                        </div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-error/20 p-lg flex flex-col md:flex-row gap-lg items-start md:items-center group hover:bg-surface-container-low/50 transition-colors relative">

<div className="w-12 h-12 rounded-full bg-error-container text-error flex items-center justify-center shrink-0 md:z-10 md:ring-8 md:ring-background">
<span className="material-symbols-outlined" data-weight="fill">block</span>
</div>
<div className="flex-1 flex flex-col gap-1 w-full">
<div className="flex justify-between items-start gap-4">
<h3 className="font-headline-md text-[20px] text-primary">Suspended User</h3>
<span className="font-label-sm text-on-surface-variant shrink-0 whitespace-nowrap">Oct 10, 2023</span>
</div>
<div className="flex flex-col md:flex-row gap-y-2 gap-x-6 mt-2">
<div className="flex items-center gap-2 text-on-surface-variant font-body-md">
<span className="material-symbols-outlined text-[18px]">target</span>
<span className="font-semibold text-on-surface">Target:</span> Musa Farooq
                        </div>
<div className="flex items-center gap-2 text-on-surface-variant font-body-md">
<span className="material-symbols-outlined text-[18px]">person</span>
<span className="font-semibold text-on-surface">By:</span> Admin: Zain Malik
                        </div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg flex flex-col md:flex-row gap-lg items-start md:items-center group hover:bg-surface-container-low/50 transition-colors relative">

<div className="w-12 h-12 rounded-full bg-secondary-container/30 text-secondary flex items-center justify-center shrink-0 md:z-10 md:ring-8 md:ring-background">
<span className="material-symbols-outlined" data-weight="fill">ac_unit</span>
</div>
<div className="flex-1 flex flex-col gap-1 w-full">
<div className="flex justify-between items-start gap-4">
<h3 className="font-headline-md text-[20px] text-primary">Froze Ledger #442</h3>
<span className="font-label-sm text-on-surface-variant shrink-0 whitespace-nowrap">Oct 09, 2023</span>
</div>
<div className="flex flex-col md:flex-row gap-y-2 gap-x-6 mt-2">
<div className="flex items-center gap-2 text-on-surface-variant font-body-md">
<span className="material-symbols-outlined text-[18px]">target</span>
<span className="font-semibold text-on-surface">Target:</span> Lahore Community Fund
                        </div>
<div className="flex items-center gap-2 text-on-surface-variant font-body-md">
<span className="material-symbols-outlined text-[18px]">person</span>
<span className="font-semibold text-on-surface">By:</span> Admin: Sarah Ahmed
                        </div>
</div>
</div>
</div>
</div>
</main>

<nav className="bg-surface dark:bg-surface-container-lowest text-secondary dark:text-secondary-fixed-dim fixed bottom-0 w-full z-50 md:hidden border-t border-outline-variant/15 shadow-lg flex justify-around items-center h-16 px-4">
<a className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform hover:bg-surface-variant/30 rounded-lg p-2" href="#">
<span className="material-symbols-outlined">inbox</span>
<span className="font-label-sm text-label-sm-mobile mt-1">Inbox</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform hover:bg-surface-variant/30 rounded-lg p-2" href="#">
<span className="material-symbols-outlined">account_balance</span>
<span className="font-label-sm text-label-sm-mobile mt-1">Ledgers</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-95 transition-transform" href="#">
<span className="material-symbols-outlined" data-weight="fill">list_alt</span>
<span className="font-label-sm text-label-sm-mobile mt-1 font-bold">Logs</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform hover:bg-surface-variant/30 rounded-lg p-2" href="#">
<span className="material-symbols-outlined">admin_panel_settings</span>
<span className="font-label-sm text-label-sm-mobile mt-1">Panel</span>
</a>
</nav>
    </div>
  );
}
