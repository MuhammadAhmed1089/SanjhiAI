import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function Profile() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="w-full top-0 sticky bg-surface dark:bg-inverse-surface border-b border-secondary/10 hidden md:flex items-center justify-between px-margin-desktop h-20 z-40 bg-surface-container-low dark:bg-surface-container-highest flat no shadows">
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-surface-container-high dark:hover:bg-surface-dim transition-colors rounded-full active:scale-95 duration-100 text-on-surface-variant dark:text-on-surface-variant">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim">Sanjhi</h1>
</div>
<div className="flex items-center gap-8">

<nav className="flex gap-4 font-label-sm text-label-sm">
<a className="text-on-surface-variant hover:bg-surface-container-high transition-colors px-4 py-2 rounded-lg flex items-center gap-2" href="#">
<span className="material-symbols-outlined">dashboard</span> Home
                </a>
<a className="text-on-surface-variant hover:bg-surface-container-high transition-colors px-4 py-2 rounded-lg flex items-center gap-2" href="#">
<span className="material-symbols-outlined">groups</span> Committees
                </a>
<a className="text-on-surface-variant hover:bg-surface-container-high transition-colors px-4 py-2 rounded-lg flex items-center gap-2" href="#">
<span className="material-symbols-outlined">account_balance_wallet</span> Ledger
                </a>
<a className="text-on-surface-variant hover:bg-surface-container-high transition-colors px-4 py-2 rounded-lg flex items-center gap-2" href="#">
<span className="material-symbols-outlined">diversity_3</span> Network
                </a>
<a className="text-on-surface-variant hover:bg-surface-container-high transition-colors px-4 py-2 rounded-lg flex items-center gap-2" href="#">
<span className="material-symbols-outlined">chat_bubble</span> Support
                </a>
</nav>
<img alt="User profile avatar" className="w-10 h-10 rounded-full object-cover border border-secondary/20" src="/avatar.svg"/>
</div>
</header>

<header className="w-full top-0 sticky bg-surface flex items-center justify-between px-margin-mobile h-16 z-40 md:hidden bg-surface-container-low border-b border-secondary/10">
<button className="p-2 -ml-2 rounded-full hover:bg-surface-container-high active:scale-95 transition-all text-on-surface-variant">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-display-lg-mobile text-display-lg-mobile text-secondary font-bold">Sanjhi</h1>
<img alt="User profile avatar" className="w-8 h-8 rounded-full object-cover border border-secondary/20" src="/avatar.svg"/>
</header>
<main className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl pb-32">

<section className="flex flex-col items-center mb-12">
<div className="relative mb-4">
<img alt="Aarav Sharma" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-surface shadow-sm" src="/avatar.svg"/>
<button className="absolute bottom-0 right-0 bg-surface-container-high p-2 rounded-full border border-secondary/10 shadow-sm hover:bg-surface-variant transition-colors group">
<span className="material-symbols-outlined text-secondary text-sm group-hover:scale-110 transition-transform">edit</span>
</button>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface font-bold">Aarav Sharma</h2>
<p className="text-on-surface-variant font-label-sm text-label-sm mt-1">Community Member</p>
</section>

<div className="grid grid-cols-1 md:grid-cols-2 gap-md md:gap-gutter">

<div className="bg-surface-container-lowest border border-secondary/10 rounded-xl p-lg relative overflow-hidden flex flex-col justify-between h-full group">
<div className="absolute inset-0 jali-pattern pointer-events-none"></div>
<div className="flex justify-between items-start z-10">
<h3 className="font-label-sm text-label-sm text-on-surface-variant">Trust Score</h3>
<span className="material-symbols-outlined text-secondary opacity-50">verified_user</span>
</div>
<div className="z-10 mt-4 mb-2">
<span className="font-display-lg text-display-lg text-secondary font-bold group-hover:text-primary transition-colors">940</span>
</div>
<a className="text-secondary font-label-sm text-label-sm hover:underline z-10 flex items-center gap-1 mt-4" href="#">
                    How is this calculated? <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>

<div className="bg-surface-container-lowest border border-secondary/10 rounded-xl p-lg flex flex-col gap-4">
<h3 className="font-label-sm text-label-sm text-on-surface-variant mb-2">Account</h3>
<div className="flex justify-between items-center border-b border-surface-variant pb-3">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-on-surface-variant">phone_iphone</span>
<div className="flex flex-col">
<span className="text-on-surface">+92 300 ****123</span>
<span className="text-[12px] text-secondary font-medium">Verified</span>
</div>
</div>
<button className="text-secondary font-label-sm text-label-sm hover:bg-surface-container-low px-2 py-1 rounded transition-colors">Change</button>
</div>
<div className="flex justify-between items-center pt-1">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-on-surface-variant">mail</span>
<div className="flex flex-col">
<span className="text-on-surface text-opacity-70">aarav.s***@email.com</span>
<span className="text-[12px] text-on-surface-variant">Unverified</span>
</div>
</div>
<button className="text-secondary font-label-sm text-label-sm hover:bg-surface-container-low px-2 py-1 rounded transition-colors">Verify</button>
</div>
</div>

<div className="bg-surface-container-lowest border border-secondary/10 rounded-xl p-lg flex flex-col gap-4 md:col-span-2">
<div className="flex justify-between items-center mb-2">
<h3 className="font-label-sm text-label-sm text-on-surface-variant">Linked Accounts</h3>
<button className="text-secondary hover:bg-surface-container-low p-1 rounded-full transition-colors"><span className="material-symbols-outlined">add</span></button>
</div>
<div className="bg-surface-container-low rounded-lg p-4 flex items-center justify-between border border-surface-variant">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center border border-secondary/10 shadow-sm">
<span className="material-symbols-outlined text-secondary">account_balance</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface">JazzCash</span>
<span className="text-sm text-on-surface-variant">0300****123</span>
</div>
</div>
<span className="bg-tertiary-container text-on-tertiary-container font-label-sm text-[12px] px-2 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">check_circle</span> Managed
                    </span>
</div>
</div>

<div className="bg-surface-container-lowest border border-secondary/10 rounded-xl p-lg flex flex-col gap-5">
<h3 className="font-label-sm text-label-sm text-on-surface-variant">Notification Preferences</h3>
<label className="flex items-center justify-between cursor-pointer group">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">notifications</span>
<span className="text-on-surface">Push Notifications</span>
</div>
<div className="relative">
<input defaultChecked className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
</div>
</label>
<label className="flex items-center justify-between cursor-pointer group">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">sms</span>
<span className="text-on-surface">SMS Alerts</span>
</div>
<div className="relative">
<input defaultChecked className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
</div>
</label>
<label className="flex items-center justify-between cursor-pointer group">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">forum</span>
<span className="text-on-surface">WhatsApp Messages</span>
</div>
<div className="relative">
<input className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
</div>
</label>
</div>

<div className="bg-surface-container-lowest border border-secondary/10 rounded-xl p-lg flex flex-col gap-4">
<h3 className="font-label-sm text-label-sm text-on-surface-variant">App Settings</h3>
<div className="flex justify-between items-center opacity-60 cursor-not-allowed">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined">language</span>
<span className="text-on-surface">English / اردو</span>
</div>
<span className="text-xs bg-surface-variant px-2 py-1 rounded text-on-surface-variant">Coming soon</span>
</div>
<div className="mt-auto pt-6 border-t border-surface-variant">
<button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-error/30 text-error hover:bg-error-container/20 transition-colors font-label-sm text-label-sm">
<span className="material-symbols-outlined">logout</span> Log Out
                    </button>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface dark:bg-surface-container-lowest border-t border-secondary/10 bg-surface/90 backdrop-blur-md">
<div className="flex justify-around items-center px-4 py-2 pb-safe">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-secondary transition-all" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-sm text-[10px] mt-1">Home</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-secondary transition-all" href="#">
<span className="material-symbols-outlined">groups</span>
<span className="font-label-sm text-[10px] mt-1">Committees</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-secondary transition-all" href="#">
<span className="material-symbols-outlined">account_balance_wallet</span>
<span className="font-label-sm text-[10px] mt-1">Ledger</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-secondary transition-all" href="#">
<span className="material-symbols-outlined">diversity_3</span>
<span className="font-label-sm text-[10px] mt-1">Network</span>
</a>

<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-on-secondary-fixed-variant text-on-secondary-container dark:text-secondary-fixed-dim rounded-full px-4 py-1 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">chat_bubble</span>
<span className="font-label-sm text-[10px] mt-1">Support</span>
</a>
</div>
</nav>
    </div>
  );
}
