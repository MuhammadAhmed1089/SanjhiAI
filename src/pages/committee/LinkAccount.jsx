import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function LinkAccount() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="w-full top-0 border-b border-secondary/15 dark:border-outline-variant/15 flex items-center px-margin-mobile h-16 w-full bg-background dark:bg-surface-container-low text-primary dark:text-on-surface sticky z-50">
<button aria-label="Go back" className="mr-4 hover:bg-surface-variant/50 transition-colors rounded-full p-2 active:scale-95 duration-200">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline-md-mobile text-headline-md-mobile font-bold tracking-tight truncate flex-1">Link a Collection Account</h1>

</header>

<main className="w-full max-w-[600px] px-margin-mobile py-lg flex flex-col gap-lg">

<section className="bg-surface-container-low rounded-xl p-md border border-outline-variant/30 flex items-start gap-md">
<span className="material-symbols-outlined text-secondary shrink-0">info</span>
<div>
<p className="font-body-md text-body-md text-on-surface-variant">Members will send their contributions here. Sanjhi never holds your money.</p>
</div>
</section>

<form className="flex flex-col gap-xl">

<fieldset>
<legend className="font-label-sm text-label-sm text-on-surface-variant mb-md block">Select Provider</legend>
<div className="grid grid-cols-3 gap-sm">

<label className="relative cursor-pointer">
<input defaultChecked className="sr-only account-type-radio" name="account_type" type="radio" value="jazzcash"/>
<div className="h-full border border-outline-variant rounded-lg p-sm flex flex-col items-center justify-center gap-xs transition-colors hover:bg-surface-variant/30 bg-surface">
<div className="icon-container text-outline transition-colors">
<span className="material-symbols-outlined text-2xl">payments</span>
</div>
<span className="font-label-sm text-label-sm text-center">JazzCash</span>
</div>
</label>

<label className="relative cursor-pointer">
<input className="sr-only account-type-radio" name="account_type" type="radio" value="easypaisa"/>
<div className="h-full border border-outline-variant rounded-lg p-sm flex flex-col items-center justify-center gap-xs transition-colors hover:bg-surface-variant/30 bg-surface">
<div className="icon-container text-outline transition-colors">
<span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
</div>
<span className="font-label-sm text-label-sm text-center">Easypaisa</span>
</div>
</label>

<label className="relative cursor-pointer">
<input className="sr-only account-type-radio" name="account_type" type="radio" value="bank"/>
<div className="h-full border border-outline-variant rounded-lg p-sm flex flex-col items-center justify-center gap-xs transition-colors hover:bg-surface-variant/30 bg-surface">
<div className="icon-container text-outline transition-colors">
<span className="material-symbols-outlined text-2xl">account_balance</span>
</div>
<span className="font-label-sm text-label-sm text-center">Bank Transfer</span>
</div>
</label>
</div>
</fieldset>

<div className="flex flex-col gap-md">

<div>
<label className="font-label-sm text-label-sm text-on-surface-variant mb-xs block" htmlFor="account_title">Account Title</label>
<input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow" name="account_title" placeholder="e.g. Ali Khan" required type="text"/>
</div>

<div>
<label className="font-label-sm text-label-sm text-on-surface-variant mb-xs block" htmlFor="account_number">Account / Wallet Number</label>
<input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow" name="account_number" pattern="[0-9]*" placeholder="03XXXXXXXXX" required type="tel"/>
</div>
</div>

<div className="pt-md mt-auto">
<button className="w-full bg-secondary text-on-secondary py-[12px] px-lg rounded-full font-label-sm text-label-sm hover:opacity-90 active:scale-95 transition-all shadow-sm" type="submit">
                    Continue
                </button>
</div>
</form>
</main>
    </div>
  );
}
