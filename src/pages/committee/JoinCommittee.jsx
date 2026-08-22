import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function JoinCommittee() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="w-full top-0 sticky z-50 bg-background flex items-center px-margin-mobile h-16 max-w-[1280px] mx-auto">
<button className="mr-4 text-primary active:scale-95 duration-150 rounded-full p-2 hover:bg-surface-container-low transition-colors flex items-center justify-center">
<span className="material-symbols-outlined font-headline-md text-headline-md">arrow_back</span>
</button>
<h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary flex-1 truncate">Sanjhi</h1>
</header>

<main className="flex-1 w-full max-w-[800px] mx-auto px-margin-mobile md:px-margin-desktop py-lg flex flex-col gap-xl">

<section className="flex flex-col gap-sm mt-md">
<div className="inline-flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed rounded-full px-3 py-1 self-start font-label-sm text-label-sm mb-2">
<span className="material-symbols-outlined text-[16px]">group</span>
<span>Committee Preview</span>
</div>
<h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary">Diwali Savings Fund</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant">Review the terms below before submitting your request to join.</p>
</section>

<section className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="bg-surface-container-lowest rounded-xl p-lg flat-outline flex items-start gap-4 jali-border-top relative overflow-hidden">
<div className="bg-secondary-container text-on-secondary-container rounded-full p-3 flex-shrink-0">
<span className="material-symbols-outlined">payments</span>
</div>
<div className="flex flex-col gap-1">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Contribution</span>
<span className="font-headline-md text-headline-md text-primary">Rs. 5,000 <span className="font-body-md text-body-md text-on-surface-variant">/ month</span></span>
</div>
</div>

<div className="flex flex-col gap-4">
<div className="bg-surface-container-lowest rounded-xl p-md flat-outline flex items-center gap-4">
<div className="bg-surface-container text-on-surface-variant rounded-full p-2 flex-shrink-0">
<span className="material-symbols-outlined">event_repeat</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Interval</span>
<span className="font-body-lg text-body-lg text-on-surface">Every 1 month</span>
</div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-md flat-outline flex items-center gap-4">
<div className="bg-surface-container text-on-surface-variant rounded-full p-2 flex-shrink-0">
<span className="material-symbols-outlined">hourglass_empty</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Duration</span>
<span className="font-body-lg text-body-lg text-on-surface">10 Months</span>
</div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-md flat-outline flex flex-col gap-3">
<div className="flex items-center gap-4">
<div className="bg-surface-container text-on-surface-variant rounded-full p-2 flex-shrink-0">
<span className="material-symbols-outlined">groups</span>
</div>
<div className="flex flex-col flex-1">
<div className="flex justify-between items-end">
<span className="font-label-sm text-label-sm text-on-surface-variant">Capacity</span>
<span className="font-label-sm text-label-sm text-primary">3 of 10 slots filled</span>
</div>
</div>
</div>

<div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden mt-1">
<div className="bg-secondary h-full rounded-full"></div>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-low rounded-xl p-md flat-outline flex items-center justify-between mt-sm">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full overflow-hidden border-2 border-surface-container-lowest relative bg-surface-variant">
<img alt="Organizer Avatar" className="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPRVZUhQD3AKXlK7Mlf59qb2aPiOgnExA5ghXyWt8-RjfeNM9qqLgazfZYgWqt5iYyz8fWPJY8yK_vl6gjeFIsXtvyGGM3l8nHXtviBHsVkPaUTT2Oea6UmhQHIW6ARzRvHtMLD5aZEnRBNzezPPBBou-vhpElA4D2RgAbPD9FudgHfimwn7IgXg0AypY5EMK9KJtYfhE0PWSwJ8jsaF9tkKCb_d4jFUhLgG56sL5MRs6oYD_bGW94"/>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider">Organizer</span>
<span className="font-body-lg text-body-lg text-on-surface font-semibold">Zaid Ahmed</span>
</div>
</div>
<button className="p-2 text-secondary hover:bg-secondary/10 rounded-full transition-colors active:scale-95">
<span className="material-symbols-outlined">info</span>
</button>
</section>

<section className="mt-xl mb-xl flex flex-col items-center gap-4 w-full">
<button className="w-full md:w-auto min-w-[280px] bg-secondary text-on-secondary rounded-full py-4 px-lg font-label-sm text-label-sm uppercase tracking-wider hover:bg-on-secondary-fixed-variant transition-colors ambient-shadow active:scale-95 duration-200 flex justify-center items-center gap-2">
<span>Request to Join</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
<p className="font-label-sm text-label-sm text-on-surface-variant text-center max-w-xs flex items-center gap-1 justify-center">
<span className="material-symbols-outlined text-[16px]">lock</span>
                Your request will need approval from the Organizer
            </p>
</section>
</main>
    </div>
  );
}
