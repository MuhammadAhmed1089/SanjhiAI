import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function CommitteeSettings() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="bg-surface dark:bg-surface-dim text-primary dark:text-primary-fixed w-full top-0 sticky z-50">
<div className="flex justify-between items-center px-margin-mobile w-full h-16 border-b border-surface-container-low dark:border-surface-container-high transition-colors duration-200">
<button aria-label="Go back" className="flex items-center justify-center p-2 rounded-full hover:bg-surface-variant/10 text-on-surface-variant dark:text-outline transition-colors duration-200">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed">Committee Settings</h1>
<div className="w-10"></div> 
</div>
</header>
<main className="max-w-3xl mx-auto w-full px-margin-mobile py-lg md:px-margin-desktop md:py-xl flex flex-col gap-lg">

<section className="flex flex-col gap-sm">
<label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="committee-name">Committee Name</label>
<div className="relative">
<input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-sm focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-shadow font-body-lg text-body-lg text-on-surface" type="text" value="Diwali Savings Fund"/>
</div>
</section>

<section className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md flex flex-col gap-md">
<div className="flex justify-between items-center">
<h2 className="font-label-sm text-label-sm text-on-surface-variant">Linked Collection Account</h2>
<button className="font-label-sm text-label-sm text-secondary hover:underline">Change Account</button>
</div>
<div className="flex items-center gap-md">
<div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined">account_balance</span>
</div>
<div>
<p className="font-body-lg text-body-lg font-medium text-on-surface">JazzCash</p>
<p className="font-body-md text-body-md text-on-surface-variant">0300****123</p>
</div>
</div>
</section>

<section className="flex flex-col gap-md mt-sm">
<button className="w-full flex items-center justify-between bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md hover:bg-surface-container-low transition-colors group">
<div className="flex items-center gap-md">
<div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined">qr_code</span>
</div>
<span className="font-body-lg text-body-lg font-medium text-on-surface">Regenerate Invite Code / Link</span>
</div>
<span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">chevron_right</span>
</button>
<button className="w-full flex items-center justify-between bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md hover:bg-surface-container-low transition-colors group">
<div className="flex items-center gap-md">
<div className="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined">person_add</span>
</div>
<span className="font-body-lg text-body-lg font-medium text-on-surface">Promote Co-Organizer</span>
</div>
<span className="material-symbols-outlined text-outline group-hover:text-tertiary transition-colors">chevron_right</span>
</button>
</section>

<section className="mt-xl pt-lg border-t border-outline-variant/20 flex justify-center">
<button className="font-label-sm text-label-sm text-error hover:text-on-error hover:bg-error rounded-full px-lg py-sm transition-colors border border-transparent hover:border-error">
                Close Committee
            </button>
</section>
</main>
    </div>
  );
}
