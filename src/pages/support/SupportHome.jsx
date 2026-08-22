import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function SupportHome() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="w-full top-0 sticky z-50 border-b border-secondary/10 bg-surface dark:bg-surface-dim">
<div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 w-full max-w-[1280px] mx-auto">
<button className="text-primary dark:text-primary-fixed hover:bg-surface-container-high transition-colors active:scale-95 duration-150 p-2 rounded-full -ml-2">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed tracking-tight">Sanjhi</h1>
<div className="relative w-8 h-8 rounded-full overflow-hidden hover:bg-surface-container-high transition-colors active:scale-95 duration-150 cursor-pointer">
<img alt="User profile photo" className="object-cover w-full h-full" src="/avatar.svg"/>
</div>
</div>
</header>

<main className="flex-grow pb-[88px] md:pb-lg pt-md">
<div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop space-y-lg">
<div className="mb-lg">
<h2 className="font-display-lg-mobile md:font-display-lg text-primary">Support</h2>
<p className="font-body-lg text-on-surface-variant mt-sm">How can we help you today?</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-md md:gap-lg">

<div className="md:col-span-7 bg-surface-container-lowest border border-secondary/10 rounded-xl p-lg relative overflow-hidden group cursor-pointer hover:bg-surface transition-colors">
<div className="absolute inset-0 jali-pattern pointer-events-none"></div>
<div className="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
<div className="flex justify-between items-start mb-md">
<div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
<span className="material-symbols-outlined">chat_bubble</span>
</div>
<span className="material-symbols-outlined text-secondary/30 group-hover:text-secondary transition-colors">arrow_forward</span>
</div>
<div>
<h3 className="font-headline-md text-primary mb-xs">Chat with Assistant</h3>
<p className="font-body-md text-on-surface-variant">Get instant help with common queries or connect with a human agent.</p>
</div>
</div>
</div>

<div className="md:col-span-5 bg-surface-container-lowest border border-secondary/10 rounded-xl p-lg relative overflow-hidden group cursor-pointer hover:bg-surface transition-colors flex flex-col justify-between min-h-[160px]">
<div className="flex justify-between items-start mb-md">
<div className="w-12 h-12 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center">
<span className="material-symbols-outlined">report_problem</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant/30 group-hover:text-on-surface-variant transition-colors">arrow_forward</span>
</div>
<div>
<h3 className="font-headline-md text-primary mb-xs">File a Complaint</h3>
<p className="font-body-md text-on-surface-variant">Report an issue or dispute within a pool.</p>
</div>
</div>
</div>

<div className="bg-surface-container border border-secondary/10 rounded-xl p-md flex items-center justify-between cursor-pointer hover:bg-surface-container-highest transition-colors mt-lg">
<div className="flex items-center gap-md">
<div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant border border-secondary/10">
<span className="material-symbols-outlined">history</span>
</div>
<div>
<h4 className="font-label-sm text-primary">My Complaints</h4>
<p className="font-body-md text-on-surface-variant text-sm">View status of existing reports</p>
</div>
</div>
<span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
</div>

<div className="mt-xl">
<h3 className="font-headline-md text-primary mb-md">Frequently Asked Questions</h3>
<div className="space-y-md">
<div className="bg-surface-container-lowest border border-secondary/10 rounded-lg p-md cursor-pointer hover:bg-surface transition-colors flex justify-between items-center group">
<span className="font-body-md text-on-surface group-hover:text-secondary transition-colors">How does the Trust Score work?</span>
<span className="material-symbols-outlined text-on-surface-variant">arrow_outward</span>
</div>
<div className="bg-surface-container-lowest border border-secondary/10 rounded-lg p-md cursor-pointer hover:bg-surface transition-colors flex justify-between items-center group">
<span className="font-body-md text-on-surface group-hover:text-secondary transition-colors">Setting up my first committee</span>
<span className="material-symbols-outlined text-on-surface-variant">arrow_outward</span>
</div>
<div className="bg-surface-container-lowest border border-secondary/10 rounded-lg p-md cursor-pointer hover:bg-surface transition-colors flex justify-between items-center group">
<span className="font-body-md text-on-surface group-hover:text-secondary transition-colors">What happens if a member defaults?</span>
<span className="material-symbols-outlined text-on-surface-variant">arrow_outward</span>
</div>
<div className="bg-surface-container-lowest border border-secondary/10 rounded-lg p-md cursor-pointer hover:bg-surface transition-colors flex justify-between items-center group">
<span className="font-body-md text-on-surface group-hover:text-secondary transition-colors">How to change my linked bank account?</span>
<span className="material-symbols-outlined text-on-surface-variant">arrow_outward</span>
</div>
</div>
</div>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-4 pb-safe bg-surface dark:bg-surface-container-lowest z-50 md:hidden bg-surface">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-sm text-label-sm mt-1">Dashboard</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">account_balance_wallet</span>
<span className="font-label-sm text-label-sm mt-1">Pools</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">groups</span>
<span className="font-label-sm text-label-sm mt-1">Connect</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1 hover:text-secondary active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined" data-weight="fill">person</span>
<span className="font-label-sm text-label-sm mt-1">Profile</span>
</a>
</nav>
    </div>
  );
}
