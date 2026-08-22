import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function SetSchedule() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="bg-background text-primary font-headline-md text-headline-md w-full top-0 bg-background flex items-center px-margin-mobile w-full h-16 sticky z-40">
<button className="mr-sm text-primary hover:bg-surface-container-low transition-colors rounded-full p-2 active:scale-95 transition-transform duration-200 flex items-center justify-center">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md text-primary ml-sm truncate tracking-tight">Set the Schedule</h1>
</header>

<main className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-md">

<div className="flex items-center space-x-sm mb-lg">
<div className="h-2 flex-1 rounded-full bg-secondary"></div>
<div className="h-2 flex-1 rounded-full bg-secondary"></div>
<div className="h-2 flex-1 rounded-full bg-surface-container-high"></div>
<span className="font-label-sm text-label-sm text-on-surface-variant ml-sm">Step 2 of 3</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">

<div className="md:col-span-8 space-y-xl">

<section className="space-y-md">
<div className="flex items-center space-x-sm">
<span className="material-symbols-outlined text-secondary">calendar_month</span>
<h2 className="font-headline-md text-headline-md text-on-background">Collection Interval</h2>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">How often should members contribute to the pool?</p>
<div className="flex bg-surface-container-low p-xs rounded-lg border border-secondary/10">
<button className="flex-1 py-sm px-md rounded-md font-label-sm text-label-sm segmented-control-inactive hover:bg-surface-variant transition-colors">Every 15 days</button>
<button className="flex-1 py-sm px-md rounded-md font-label-sm text-label-sm segmented-control-active shadow-sm transition-colors">Every 1 month</button>
<button className="flex-1 py-sm px-md rounded-md font-label-sm text-label-sm segmented-control-inactive hover:bg-surface-variant transition-colors">Every 2 months</button>
</div>
</section>

<section>
<div className="bg-surface rounded-xl border border-secondary/10 p-lg relative overflow-hidden jali-border">
<div className="flex flex-col md:flex-row md:items-center justify-between">
<div>
<div className="flex items-center space-x-sm mb-xs">
<span className="material-symbols-outlined text-secondary">schedule</span>
<h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Duration</h3>
</div>
<div className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background">
                                    10 Months
                                </div>
</div>
<div className="mt-md md:mt-0 md:text-right">
<p className="font-body-md text-body-md text-on-surface-variant bg-surface-container-low px-md py-sm rounded-lg inline-block">
                                    Based on 10 members at 1 month intervals.
                                </p>
</div>
</div>
</div>
</section>

<section className="space-y-md">
<div className="flex items-center space-x-sm">
<span className="material-symbols-outlined text-secondary">account_tree</span>
<h2 className="font-headline-md text-headline-md text-on-background">Payout Order</h2>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">Determine how the pool is distributed to members each cycle.</p>
<div className="grid grid-cols-1 md:grid-cols-3 gap-md">

<div className="bg-surface rounded-lg border-2 border-secondary p-md relative cursor-pointer active:scale-95 transition-transform">
<div className="absolute top-md right-md">
<span className="material-symbols-outlined text-secondary">check_circle</span>
</div>
<span className="material-symbols-outlined text-secondary mb-sm text-3xl">list_alt</span>
<h3 className="font-label-sm text-label-sm text-on-background mb-xs">Fixed Order</h3>
<p className="font-body-md text-body-md text-on-surface-variant text-sm">Sequence is predetermined and agreed upon by all members.</p>
</div>

<div className="bg-surface-container-low rounded-lg border border-secondary/10 p-md relative opacity-60 cursor-not-allowed">
<span className="absolute top-0 right-0 bg-surface-variant text-on-surface-variant font-label-sm text-[10px] px-2 py-1 rounded-bl-lg rounded-tr-lg tracking-wider">PHASE 2</span>
<span className="material-symbols-outlined text-outline mb-sm text-3xl">casino</span>
<h3 className="font-label-sm text-label-sm text-on-surface-variant mb-xs">Lottery</h3>
<p className="font-body-md text-body-md text-outline text-sm">Winner is chosen randomly each cycle.</p>
</div>

<div className="bg-surface-container-low rounded-lg border border-secondary/10 p-md relative opacity-60 cursor-not-allowed">
<span className="absolute top-0 right-0 bg-surface-variant text-on-surface-variant font-label-sm text-[10px] px-2 py-1 rounded-bl-lg rounded-tr-lg tracking-wider">PHASE 2</span>
<span className="material-symbols-outlined text-outline mb-sm text-3xl">gavel</span>
<h3 className="font-label-sm text-label-sm text-on-surface-variant mb-xs">Bidding</h3>
<p className="font-body-md text-body-md text-outline text-sm">Members bid for the payout based on need.</p>
</div>
</div>
</section>
</div>

<div className="hidden md:block md:col-span-4 pl-lg border-l border-secondary/10">
<div className="sticky top-24">
<h3 className="font-headline-md text-headline-md text-on-background mb-md">Why set a schedule?</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-md">
                        A clear schedule ensures every member knows exactly when their contribution is due and when they can expect their payout. The fixed order method is the most traditional and reliable approach for new committees.
                    </p>
<div className="bg-secondary-fixed/30 p-md rounded-lg flex items-start space-x-sm">
<span className="material-symbols-outlined text-on-secondary-container mt-1">info</span>
<p className="font-label-sm text-label-sm text-on-secondary-container">
                            You can invite members in the next step. The duration is calculated based on the number of invites you plan to send.
                        </p>
</div>
</div>
</div>
</div>

<div className="fixed bottom-0 left-0 w-full bg-surface p-md md:p-lg border-t border-secondary/10 flex justify-end z-30">
<button className="bg-secondary text-on-secondary hover:bg-on-secondary-fixed-variant transition-colors font-label-sm text-label-sm py-sm px-[24px] rounded-full active:scale-95 duration-200 flex items-center shadow-[0_4px_14px_0_rgba(0,105,114,0.15)]">
                Continue
                <span className="material-symbols-outlined ml-sm">arrow_forward</span>
</button>
</div>
</main>
    </div>
  );
}
