import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function InviteMembers() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<div className="fixed inset-0 pointer-events-none pattern-overlay z-[-1]"></div>

<header className="w-full top-0 sticky bg-surface dark:bg-surface-dim border-b border-outline-variant/15 z-40 transition-colors">
<div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 w-full max-w-[1280px] mx-auto">
<div className="flex items-center gap-4">
<button aria-label="Go back" className="p-2 -ml-2 rounded-full hover:bg-surface-container-low dark:hover:bg-surface-container-high transition-colors active:scale-95 duration-150 text-secondary dark:text-secondary-fixed-dim">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="text-headline-md font-headline-md text-secondary dark:text-secondary-fixed-dim">Invite Members</h1>
</div>
<div></div> 
</div>
</header>

<main className="flex-1 w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-lg flex flex-col gap-lg">

<section className="bg-surface-container-lowest border border-outline-variant/15 rounded-xl p-lg flex flex-col gap-lg shadow-[0_4px_24px_rgba(15,28,44,0.02)]">

<div className="flex flex-col items-center justify-center py-sm">
<span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Invite Code</span>
<div className="flex items-center gap-3">
<span className="text-display-lg-mobile md:text-display-lg font-display-lg-mobile md:font-display-lg text-primary-container tracking-tight">SANJHI-782K</span>
<button aria-label="Copy code" className="p-2 rounded-full bg-surface-container hover:bg-surface-variant transition-colors text-secondary">
<span className="material-symbols-outlined">content_copy</span>
</button>
</div>
<button className="mt-4 text-label-sm font-label-sm text-secondary underline hover:text-on-secondary-container transition-colors">Regenerate Invite</button>
</div>

<div className="h-px w-full bg-outline-variant/20"></div>

<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
<div>
<span className="text-label-sm font-label-sm text-on-surface-variant block mb-1">Invite Link</span>
<span className="text-body-md font-body-md text-on-surface break-all">sanjhi.app/join/782k</span>
</div>
<div className="flex gap-2 w-full md:w-auto">
<button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-lg py-3 rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container transition-colors active:scale-95 duration-150 shadow-[0_4px_12px_rgba(0,105,114,0.15)]">
<span className="material-symbols-outlined">share</span>
<span className="text-label-sm font-label-sm">Share</span>
</button>
</div>
</div>
</section>

<div className="flex items-center gap-4 py-sm opacity-60">
<div className="h-px flex-1 bg-outline-variant"></div>
<span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">or add directly</span>
<div className="h-px flex-1 bg-outline-variant"></div>
</div>

<section className="flex flex-col gap-4">

<div className="relative w-full">
<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
<span className="material-symbols-outlined text-outline">search</span>
</div>
<input className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-outline-variant/30 border rounded-xl text-body-md font-body-md text-on-surface placeholder-on-surface-variant/60 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none shadow-sm" placeholder="Add by User ID" type="text"/>
</div>

<div className="bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/15 rounded-xl p-4 flex items-center justify-between shadow-sm">
<div className="flex items-center gap-4">
<img alt="Avatar" className="w-12 h-12 rounded-full object-cover border border-outline-variant/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOYsoMZl9uDg3PqLa9PViVjVKB81a-GRVCSy_sa2prNAVFPy-fUfvJ1S09lw-EouKvtDzPb1ohV77vytGhU4p26FZfTdH1BRgPF6W8NfY06IINrQIZX7V5UnTt1NXzg0TSK4x4-21boLqTLJfXf-ddooeo_Lv9EsOUkgBAWjNgDLvFJHxuo6rrPkMAzvcbxZ8tlipKTxava-Z9c2hLoJ09FebnbV9gOG1lGK7C8PGMstD7MvKvurlR"/>
<div className="flex flex-col">
<span className="text-body-md font-body-md text-on-surface font-semibold">Zaid Ahmed</span>
<span className="text-label-sm font-label-sm text-on-surface-variant">@zaid_99</span>
</div>
</div>
<button className="px-4 py-2 rounded-lg bg-surface-container hover:bg-secondary hover:text-on-secondary transition-colors text-secondary text-label-sm font-label-sm active:scale-95">
                    Add
                </button>
</div>
</section>

<div className="flex-1"></div>

<div className="w-full bg-surface-container rounded-xl p-4 border border-outline-variant/10 flex items-center gap-4 mt-auto mb-4 md:mb-8">
<span className="material-symbols-outlined text-tertiary">group</span>
<div className="flex-1 flex flex-col gap-2">
<div className="flex justify-between items-center w-full">
<span className="text-label-sm font-label-sm text-on-surface">Pool Capacity</span>
<span className="text-label-sm font-label-sm text-secondary font-bold">3 of 10</span>
</div>

<div className="w-full h-2 bg-outline-variant/20 rounded-full overflow-hidden">
<div className="h-full bg-tertiary rounded-full w-[30%]"></div>
</div>
</div>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-3 px-4 pb-safe bg-surface-container dark:bg-surface-container-lowest border-t border-outline-variant/10 z-50 shadow-sm md:hidden block">

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-5 py-1 hover:bg-surface-variant/50 dark:hover:bg-surface-container-high active:scale-90 transition-all duration-200 ease-in-out rounded-lg" href="#">
<span className="material-symbols-outlined">home</span>
<span className="text-label-sm font-label-sm mt-1">Home</span>
</a>

<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-on-secondary-fixed-variant text-on-secondary-container dark:text-secondary-fixed rounded-full px-5 py-1 hover:bg-surface-variant/50 dark:hover:bg-surface-container-high active:scale-90 transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">account_balance_wallet</span>
<span className="text-label-sm font-label-sm mt-1">Pools</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-5 py-1 hover:bg-surface-variant/50 dark:hover:bg-surface-container-high active:scale-90 transition-all duration-200 ease-in-out rounded-lg" href="#">
<span className="material-symbols-outlined">groups</span>
<span className="text-label-sm font-label-sm mt-1">Connect</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-5 py-1 hover:bg-surface-variant/50 dark:hover:bg-surface-container-high active:scale-90 transition-all duration-200 ease-in-out rounded-lg" href="#">
<span className="material-symbols-outlined">person</span>
<span className="text-label-sm font-label-sm mt-1">Profile</span>
</a>
</nav>
    </div>
  );
}
