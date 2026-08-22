import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function ComplaintDetail() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="bg-surface border-b border-outline-variant/15 flex justify-between items-center px-lg h-20 w-full sticky top-0 z-50 flat no shadows">
<div className="flex items-center gap-md">
<button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer active:opacity-80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-surface">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">Complaint Detail</h1>
</div>
<div className="flex items-center gap-sm">
<div className="h-10 px-4 rounded-full bg-surface-container-high flex items-center justify-center gap-sm border border-outline-variant/20 hover:bg-surface-variant/50 cursor-pointer transition-colors">
<span className="font-label-sm text-label-sm text-on-surface-variant">Admin Profile</span>
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">account_circle</span>
</div>
</div>
</header>
<main className="w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-xl">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
<div className="lg:col-span-8 flex flex-col gap-lg">
<section className="bg-surface-container-lowest rounded-xl border border-secondary/15 overflow-hidden flex flex-col relative">
<div className="jali-border-top absolute top-0 left-0"></div>
<div className="p-lg pt-xl flex flex-col gap-md">
<div className="flex items-center justify-between">
<span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm gap-xs">
<span className="material-symbols-outlined text-[16px]">receipt_long</span>
                                Payment Dispute
                            </span>
<span className="font-label-sm text-label-sm text-on-surface-variant">ID: #CMP-8924</span>
</div>
<div className="pt-sm">
<p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
                                "User reports being charged twice for their September contribution. Bank statements attached confirm a duplicate transaction."
                            </p>
</div>
<div className="pt-md border-t border-outline-variant/20 mt-sm flex flex-col gap-sm">
<h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Evidence Attachments</h3>
<div className="flex gap-md overflow-x-auto pb-sm">
<button className="group relative w-32 h-24 rounded-lg overflow-hidden border border-outline-variant/30 hover:border-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary">
<img className="w-full h-full object-cover" src="/avatar.svg"/>
<div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
<span className="material-symbols-outlined text-surface">zoom_in</span>
</div>
</button>
</div>
</div>
</div>
</section>
<section className="bg-surface-container-lowest rounded-xl border border-secondary/15 p-lg flex flex-col gap-md">
<div className="flex items-center gap-sm mb-xs">
<span className="material-symbols-outlined text-secondary">account_balance</span>
<h2 className="font-headline-md text-headline-md text-on-surface text-[20px]">Committee Ledger <span className="text-on-surface-variant font-body-md">(Cycle 10)</span></h2>
</div>
<div className="border border-outline-variant/20 rounded-lg overflow-hidden">
<div className="grid grid-cols-3 gap-sm p-md bg-surface-container-low border-b border-outline-variant/20 font-label-sm text-label-sm text-on-surface-variant">
<div>Member</div>
<div>Contribution</div>
<div>Status</div>
</div>
<div className="flex flex-col">
<div className="grid grid-cols-3 gap-sm p-md items-center border-b border-outline-variant/10 last:border-0 hover:bg-surface-bright transition-colors">
<div className="flex items-center gap-sm font-body-md text-body-md text-on-surface">
<div className="w-8 h-8 rounded-full bg-secondary-container/50 text-on-secondary-container flex items-center justify-center font-label-sm">A</div>
                                    Aarav
                                </div>
<div className="font-body-md text-body-md text-on-surface">₹5,000</div>
<div><span className="inline-flex px-2 py-1 rounded bg-error-container/50 text-on-error-container font-label-sm text-[12px]">Disputed</span></div>
</div>
<div className="grid grid-cols-3 gap-sm p-md items-center border-b border-outline-variant/10 last:border-0 hover:bg-surface-bright transition-colors">
<div className="flex items-center gap-sm font-body-md text-body-md text-on-surface">
<div className="w-8 h-8 rounded-full bg-tertiary-container/30 text-on-tertiary-container flex items-center justify-center font-label-sm">Z</div>
                                    Zara
                                </div>
<div className="font-body-md text-body-md text-on-surface">₹5,000</div>
<div><span className="inline-flex px-2 py-1 rounded bg-surface-variant text-on-surface-variant font-label-sm text-[12px]">Cleared</span></div>
</div>
<div className="grid grid-cols-3 gap-sm p-md items-center border-b border-outline-variant/10 last:border-0 hover:bg-surface-bright transition-colors">
<div className="flex items-center gap-sm font-body-md text-body-md text-on-surface">
<div className="w-8 h-8 rounded-full bg-primary-container/20 text-on-primary-container flex items-center justify-center font-label-sm">M</div>
                                    Musa
                                </div>
<div className="font-body-md text-body-md text-on-surface">₹5,000</div>
<div><span className="inline-flex px-2 py-1 rounded bg-surface-variant text-on-surface-variant font-label-sm text-[12px]">Cleared</span></div>
</div>
</div>
</div>
</section>
<section className="bg-surface-container-lowest rounded-xl border border-secondary/15 p-lg flex flex-col gap-md">
<h2 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Internal Admin Notes</h2>
<textarea className="w-full min-h-[120px] p-md rounded-lg bg-surface border border-outline-variant/40 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow resize-y" placeholder="Add internal notes regarding resolution steps..."></textarea>
</section>
<section className="flex flex-wrap items-center gap-md pt-sm">
<button className="bg-secondary text-on-secondary font-label-sm text-label-sm h-[48px] px-[24px] rounded-full hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-sm shadow-sm hover:shadow-md">
<span className="material-symbols-outlined text-[20px]">check_circle</span>
                        Resolve
                    </button>
<button className="border border-outline text-on-surface bg-transparent font-label-sm text-label-sm h-[48px] px-[24px] rounded-full hover:bg-surface-variant/30 active:scale-95 transition-all flex items-center justify-center">
                        Dismiss
                    </button>
<button className="border border-outline text-on-surface bg-transparent font-label-sm text-label-sm h-[48px] px-[24px] rounded-full hover:bg-surface-variant/30 active:scale-95 transition-all flex items-center justify-center gap-sm ml-auto">
<span className="material-symbols-outlined text-[20px]">escalator_warning</span>
                        Escalate
                    </button>
</section>
</div>
<div className="lg:col-span-4 flex flex-col gap-lg">
<section className="bg-secondary-container/10 border border-secondary/30 rounded-xl p-lg flex flex-col gap-md relative overflow-hidden">
<div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
<span className="material-symbols-outlined text-[80px] text-secondary">smart_toy</span>
</div>
<div className="flex items-center gap-xs text-secondary relative z-10">
<span className="material-symbols-outlined text-[20px]">auto_awesome</span>
<h3 className="font-label-sm text-label-sm font-bold uppercase tracking-wider">AI Insight</h3>
</div>
<p className="font-body-md text-body-md text-on-surface relative z-10">
                        AI-generated: User reports a double charge on 2023-09-12. Verification with the payment gateway suggests a processing lag.
                    </p>
<div className="flex items-center justify-between bg-surface-container-lowest/50 rounded-lg p-sm border border-secondary/15 relative z-10 mt-xs">
<div className="flex items-center gap-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant">Priority:</span>
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-[12px] font-bold">Urgent</span>
</div>
<button className="font-label-sm text-label-sm text-secondary hover:underline cursor-pointer">Change</button>
</div>
<div className="bg-surface-container-lowest/50 rounded-lg p-sm border border-secondary/15 relative z-10 flex flex-col gap-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant">Re-category suggestion:</span>
<div className="font-body-md text-body-md text-on-surface font-semibold">"Payment Error"</div>
<div className="flex items-center gap-sm mt-xs">
<button className="flex-1 border border-secondary text-secondary font-label-sm text-[12px] h-[32px] rounded-md hover:bg-secondary/10 transition-colors">Accept</button>
<button className="flex-1 border border-outline-variant text-on-surface-variant font-label-sm text-[12px] h-[32px] rounded-md hover:bg-surface-variant/30 transition-colors">Dismiss</button>
</div>
</div>
</section>
<section className="bg-surface-container-lowest rounded-xl border border-secondary/15 p-lg flex flex-col gap-md">
<h2 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-sm">Status History</h2>
<div className="relative border-l-2 border-outline-variant/30 ml-3 flex flex-col gap-lg pb-sm">
<div className="relative pl-lg">
<div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-secondary border-4 border-surface-container-lowest"></div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface">Under Investigation</span>
<span className="font-body-md text-[13px] text-on-surface-variant mt-0.5">Current</span>
</div>
</div>
<div className="relative pl-lg opacity-70">
<div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-surface-variant border-4 border-surface-container-lowest"></div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Triage Assigned</span>
<span className="font-body-md text-[13px] text-on-surface-variant mt-0.5">Oct 12, 10:30 AM</span>
</div>
</div>
<div className="relative pl-lg opacity-70">
<div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-surface-variant border-4 border-surface-container-lowest"></div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Submitted</span>
<span className="font-body-md text-[13px] text-on-surface-variant mt-0.5">Oct 12, 10:00 AM</span>
</div>
</div>
</div>
</section>
</div>
</div>
</main>
    </div>
  );
}
