import { useNavigate } from 'react-router-dom';
import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function CreateCommittee() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="bg-surface dark:bg-inverse-surface w-full top-0 sticky z-40 bg-surface-container-low dark:bg-surface-dim">
<div className="flex items-center px-margin-mobile md:px-margin-desktop h-16 w-full max-w-[1280px] mx-auto">
<button className="mr-4 text-on-surface-variant hover:bg-surface-variant/20 transition-colors p-2 rounded-full active:scale-95 transition-transform duration-150 flex items-center justify-center">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md-mobile md:text-headline-md font-bold text-secondary dark:text-secondary-fixed-dim">Create a Committee</h1>
</div>
</header>

<main className="flex-grow px-margin-mobile md:px-margin-desktop py-8 max-w-[800px] mx-auto w-full relative">

<section className="mb-lg">
<div className="flex items-center justify-between mb-sm">
<h2 className="font-label-sm text-label-sm text-secondary">Set up with AI</h2>
<button className="font-label-sm text-label-sm text-tertiary hover:text-tertiary-container transition-colors flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">edit_note</span> Switch to Manual
                </button>
</div>
<div className="bg-surface-container-lowest border border-secondary-container rounded-xl p-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] ai-pulse transition-all duration-300 relative jali-border-top">
<div className="relative">
<textarea className="w-full bg-transparent border-none focus:ring-0 resize-none font-body-md text-body-md text-on-surface placeholder:text-outline p-0 h-24" placeholder="e.g., 10 people, Rs. 5,000 monthly, starting next month..."></textarea>
<div className="absolute bottom-0 right-0 flex items-center gap-sm">
<button className="p-2 rounded-full text-secondary hover:bg-secondary-container/30 transition-colors active:scale-95">
<span className="material-symbols-outlined">mic</span>
</button>
</div>
</div>
<div className="mt-md flex justify-end">
<button className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-lg py-2 rounded-full hover:bg-secondary-fixed transition-colors active:scale-95 flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">auto_awesome</span> Parse
                    </button>
</div>
</div>
</section>

<div className="flex items-center gap-4 my-lg opacity-50">
<div className="h-px bg-outline-variant flex-grow"></div>
<span className="font-label-sm text-label-sm text-outline">OR</span>
<div className="h-px bg-outline-variant flex-grow"></div>
</div>

<section className="space-y-md">
<h2 className="font-label-sm text-label-sm text-on-surface-variant mb-md">Manual Setup</h2>

<div className="group">
<label className="block font-label-sm text-label-sm text-on-surface mb-xs" htmlFor="committee-name">Committee Name</label>
<div className="relative">
<input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="e.g. Diwali Savings Fund" type="text"/>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-md">

<div className="group">
<label className="block font-label-sm text-label-sm text-on-surface mb-xs" htmlFor="contribution-amount">Monthly Contribution</label>
<div className="relative flex items-center">
<span className="absolute left-4 font-body-md text-on-surface-variant">Rs.</span>
<input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-12 pr-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="5,000" type="number"/>
</div>
</div>

<div className="group">
<label className="block font-label-sm text-label-sm text-on-surface mb-xs" htmlFor="capacity">Number of Members</label>
<div className="relative flex items-center">
<span className="absolute left-4 text-on-surface-variant material-symbols-outlined">group</span>
<input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-12 pr-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="10" type="number"/>
</div>
</div>
</div>

<div className="mt-lg p-md bg-surface-container-low rounded-xl border border-secondary/10 flex items-start gap-md">
<div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-on-tertiary-container">info</span>
</div>
<div>
<h4 className="font-label-sm text-label-sm text-on-surface mb-1">Total Pool Expected</h4>
<p className="font-body-md text-body-md text-on-surface-variant text-sm">Based on 10 members at Rs. 5,000 each, the total monthly pool will be <strong className="text-on-surface">Rs. 50,000</strong>.</p>
</div>
</div>
</section>

<div className="mt-xl pb-margin-mobile md:pb-0 pt-md sticky md:static bottom-0 bg-background/95 backdrop-blur-sm md:bg-transparent border-t border-outline-variant/20 md:border-none z-10">
<button onClick={() => navigate('/committee/schedule')} className="w-full bg-secondary text-on-secondary font-label-sm text-label-sm py-4 rounded-xl hover:bg-secondary/90 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(0,105,114,0.15)]">
                Continue <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
</main>
    </div>
  );
}
