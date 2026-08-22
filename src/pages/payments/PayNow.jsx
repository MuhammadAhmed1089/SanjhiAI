import { useNavigate } from 'react-router-dom';
import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function PayNow() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="w-full sticky top-0 bg-background dark:bg-background border-b border-secondary/10 z-50">
<div className="flex items-center px-margin-mobile md:px-margin-desktop h-16 w-full max-w-7xl mx-auto">
<button aria-label="Go back" className="active:scale-95 transition-transform hover:bg-surface-container-low dark:hover:bg-surface-container-low transition-colors p-2 rounded-full -ml-2 text-primary dark:text-primary flex items-center justify-center">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="ml-2 font-headline-md text-headline-md-mobile md:text-headline-md text-primary dark:text-primary">Pay for this cycle</h1>
</div>
</header>
<main className="w-full max-w-xl mx-auto px-margin-mobile py-xl pb-32 md:px-0">

<section className="text-center mb-xl animate-fade-in-up">
<p className="font-label-sm text-label-sm text-on-surface-variant mb-2">Total Amount Due</p>
<h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary-container">Rs. 5,000</h2>
<div className="inline-flex items-center gap-1.5 bg-tertiary-container/20 border border-tertiary-container/30 text-on-tertiary-container px-4 py-1.5 rounded-full mt-4">
<span className="material-symbols-outlined text-[18px]">event</span>
<span className="font-label-sm text-label-sm">Due by 10th Oct</span>
</div>
</section>

<section className="bg-surface-container-lowest border border-outline-variant/40 rounded-lg p-lg mb-lg relative overflow-hidden shadow-[0_2px_12px_-4px_rgba(15,28,44,0.05)]">

<div className="absolute top-0 left-0 w-full h-[3px] bg-secondary opacity-90"></div>
<h3 className="font-label-sm text-label-sm text-outline mb-5 uppercase tracking-widest text-xs">Transfer Details</h3>
<div className="flex justify-between items-center mb-5 pb-5 border-b border-outline-variant/30 group">
<div>
<p className="font-body-md text-body-md text-on-surface-variant mb-0.5 text-sm">Account Name</p>
<p className="font-headline-md text-headline-md-mobile md:text-headline-md text-on-surface">Zaid Ahmed</p>
</div>
<button className="p-2.5 rounded-full bg-surface-container-lowest border border-outline-variant/50 hover:bg-surface-container-low text-secondary transition-all active:scale-95" title="Copy Name">
<span className="material-symbols-outlined text-[20px]">content_copy</span>
</button>
</div>
<div className="flex justify-between items-center group">
<div className="flex gap-4 items-center">
<div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary border border-secondary/10">
<span className="material-symbols-outlined">account_balance_wallet</span>
</div>
<div>
<p className="font-body-md text-body-md text-on-surface-variant mb-0.5 text-sm">JazzCash Number</p>
<p className="font-headline-md text-headline-md-mobile md:text-headline-md text-on-surface">0300****123</p>
</div>
</div>
<button className="p-2.5 rounded-full bg-surface-container-lowest border border-outline-variant/50 hover:bg-surface-container-low text-secondary transition-all active:scale-95" title="Copy Number">
<span className="material-symbols-outlined text-[20px]">content_copy</span>
</button>
</div>
</section>

<p className="font-body-md text-body-md text-on-surface-variant text-center mb-xl px-4 opacity-90">
            Send this amount using your own banking or wallet app, then submit your details below to confirm the transaction.
        </p>

<form className="space-y-6">
<div className="flex flex-col gap-2">
<label className="font-label-sm text-label-sm text-on-surface pl-1" htmlFor="senderAccount">Sender Account / Wallet Number</label>
<div className="relative">
<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
<span className="material-symbols-outlined text-[20px]">person</span>
</div>
<input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-12 pr-4 py-3.5 font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-shadow placeholder:text-outline/70" placeholder="e.g. 0345*******" type="text"/>
</div>
</div>
<div className="pt-2">
<button className="w-full flex flex-col items-center justify-center gap-3 border-2 border-outline-variant/50 border-dashed rounded-lg py-8 bg-surface-container-lowest/50 hover:bg-surface-container-low hover:border-secondary/40 transition-all group" type="button">
<div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
<span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors text-[24px]">upload_file</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-secondary transition-colors">Attach payment screenshot (optional)</span>
</button>
</div>

<div className="hidden flex justify-center pt-2">
<div className="inline-flex items-center gap-2 bg-surface-container-high text-on-surface px-4 py-2 rounded-full border border-outline-variant/30 shadow-sm">
<span className="material-symbols-outlined text-[18px] text-secondary animate-[spin_3s_linear_infinite]">hourglass_empty</span>
<span className="font-label-sm text-label-sm">Awaiting Confirmation</span>
</div>
</div>
<div className="pt-4">
<button onClick={() => navigate('/committee/1')} className="w-full bg-secondary text-on-secondary py-4 px-6 rounded-lg font-label-sm text-label-sm flex justify-center items-center gap-2 hover:bg-secondary/90 hover:shadow-md active:scale-[0.98] transition-all" type="button">
<span>Submit Payment</span>
<span className="material-symbols-outlined text-[20px]">check_circle</span>
</button>
</div>
</form>
</main>
    </div>
  );
}
