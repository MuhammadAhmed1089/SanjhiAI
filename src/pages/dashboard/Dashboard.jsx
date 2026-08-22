import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<div className="fixed inset-0 pointer-events-none opacity-5 z-[-1]"></div>

<header className="w-full sticky top-0 bg-surface shadow-sm opacity-95 z-40 flex justify-between items-center px-6 py-4">
<div className="flex items-center gap-4">
<img alt="Profile" className="w-10 h-10 rounded-full object-cover border border-outline-variant/60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ0tqG5gvADCuJfIojLk30R5oY3hHyGErNfIDU8Zmy_90t7KXTIL8u-igI96MNHmpx-aEwyw4VegsKZBrxLOkKWQiKPlZZNYYyBD8QRijonWzXLn8yDKy-8tds-Tb6yv3Q5nPr_B-2rNTQ298MnGy9Al3PcvbCXg0SAMcGWPZLLRsGcSGMvb9GNzoEMHfK4sIYIAMhdNOLwfeXZeKx8clUB5k5iR9AzQaBVMNdYor6rzFkjXJuHHro" />
<h1 className="font-headline text-[24px] leading-[32px] font-bold text-on-surface">Hi, Anika</h1>
</div>
<button aria-label="Notifications" className="relative text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 duration-150">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-1 right-2 w-2.5 h-2.5 bg-primary rounded-full border-2 border-surface"></span>
</button>
</header>
<main className="max-w-screen-md mx-auto px-6 py-8 space-y-10">

<section>
<div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 border border-white/40 relative overflow-hidden shadow-[0_8px_32px_rgba(15,28,44,0.08)]">

<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none"></div>
<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
<div>
<h2 className="font-label text-[14px] leading-[20px] font-semibold uppercase tracking-wider text-on-surface-variant mb-2">Trust Score</h2>
<div className="flex items-baseline gap-4">
<span className="font-headline text-[48px] leading-[56px] font-bold text-primary">850</span>
<span className="font-label text-[14px] leading-[20px] font-semibold text-secondary-container bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20 flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] icon-filled text-secondary">verified</span>
<span className="text-secondary">Excellent Standing</span>
</span>
</div>
</div>
<div className="text-right hidden md:block">
<span className="material-symbols-outlined text-[48px] text-primary/20">shield</span>
</div>
</div>
</div>
</section>

<section>
<div className="flex items-end justify-between mb-6">
<h2 className="font-headline text-[24px] leading-[32px] font-semibold text-on-surface">Your Committees</h2>
<a className="font-label text-[14px] leading-[20px] font-semibold text-primary hover:underline underline-offset-4" href="#">View All</a>
</div>
<div className="bg-surface rounded-2xl p-6 border-2 border-white/50 shadow-[8px_8px_16px_rgba(0,0,0,0.05),-8px_-8px_16px_rgba(255,255,255,0.8)] hover:shadow-lg transition-all cursor-pointer group mb-4">
<div className="flex items-start justify-between mb-4">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined">payments</span>
</div>
<div>
<h3 className="font-headline text-[18px] leading-[28px] font-medium text-on-surface group-hover:text-primary transition-colors">Gulberg Gold Pool</h3>
<p className="font-label text-[14px] leading-[20px] text-on-surface-variant">Monthly Contribution</p>
</div>
</div>
<span className="font-label text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary/10 px-2.5 py-1 rounded-md border border-secondary/20">
                            Organizer
                        </span>
</div>
<div className="flex items-center justify-between border-t border-outline-variant/60 pt-4 mt-2">
<div className="flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-[18px]">progress_activity</span>
<span className="font-body text-[14px] leading-[20px]">7 of 10 paid</span>
</div>
<span className="font-label text-[14px] leading-[20px] font-semibold text-primary group-hover:underline underline-offset-4">Manage</span>
</div>
</div>

<div className="bg-surface rounded-xl p-6 border border-outline-variant/60 shadow-[0_2px_16px_rgba(15,28,44,0.04)] hover:shadow-md transition-shadow cursor-pointer group">
<div className="flex items-start justify-between mb-4">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">event</span>
</div>
<div>
<h3 className="font-headline text-[18px] leading-[28px] font-medium text-on-surface group-hover:text-primary transition-colors">Family Savings</h3>
<p className="font-label text-[14px] leading-[20px] text-on-surface-variant">Bi-weekly Pool</p>
</div>
</div>
<span className="font-label text-xs font-semibold uppercase tracking-wider text-tertiary bg-tertiary/10 px-2.5 py-1 rounded-md border border-tertiary/20">
                            Member
                        </span>
</div>
<div className="flex items-center justify-between border-t border-outline-variant/60 pt-4 mt-2">
<div className="flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-[18px]">calendar_today</span>
<span className="font-body text-[14px] leading-[20px]">Next due: Oct 15</span>
</div>
<span className="font-label text-[14px] leading-[20px] font-semibold text-primary group-hover:underline underline-offset-4">Pay Now</span>
</div>
</div>
</section>

<section>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<button className="bg-primary/90 backdrop-blur-sm text-on-primary rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-primary transition-all shadow-[0_8px_32px_rgba(15,28,44,0.3)] active:scale-95 duration-150 border border-white/20">
<span className="material-symbols-outlined text-[32px]">add_circle</span>
<span className="font-headline text-[18px] leading-[28px] font-medium">Create Committee</span>
</button>
<button className="bg-surface text-primary rounded-2xl p-6 flex flex-col items-center justify-center gap-3 border-2 border-primary/20 hover:bg-primary/5 transition-all shadow-[6px_6px_12px_rgba(0,0,0,0.05),-6px_-6px_12px_rgba(255,255,255,0.8)] active:scale-95 duration-150">
<span className="material-symbols-outlined text-[32px]">group_add</span>
<span className="font-headline text-[18px] leading-[28px] font-medium">Join Committee</span>
</button>
</div>
</section>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md border-t border-white/40 shadow-[0_-8px_32px_rgba(15,28,44,0.3)] rounded-t-xl px-4 pb-6 pt-3 flex justify-around items-center">

<a className="flex flex-col items-center justify-center bg-primary text-on-primary rounded-full px-5 py-1.5 transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined icon-filled text-on-primary">dashboard</span>
<span className="font-label text-[12px] tracking-wide uppercase mt-1 hidden">Dashboard</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:text-primary transition-opacity active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">groups</span>
<span className="font-label text-[12px] tracking-wide uppercase mt-1">Committees</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:text-primary transition-opacity active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">contact_support</span>
<span className="font-label text-[12px] tracking-wide uppercase mt-1">Support</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:text-primary transition-opacity active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-[12px] tracking-wide uppercase mt-1">Profile</span>
</a>
</nav>
    </div>
  );
}
