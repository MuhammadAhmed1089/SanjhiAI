import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function Assistant() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="bg-surface dark:bg-surface-dim border-b border-secondary/10 w-full top-0 sticky z-50">
<div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 w-full max-w-[1280px] mx-auto">
<button className="p-2 hover:bg-surface-container-high transition-colors rounded-full active:scale-95 duration-150 flex items-center justify-center text-primary dark:text-primary-fixed">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed font-bold tracking-tight">Sanjhi Assistant</h1>
<button className="p-2 hover:bg-surface-container-high transition-colors rounded-full active:scale-95 duration-150 flex items-center justify-center text-primary dark:text-primary-fixed">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
</header>

<main className="flex-grow overflow-y-auto px-margin-mobile md:px-margin-desktop py-lg pb-[100px] flex flex-col gap-lg w-full max-w-[1280px] mx-auto">

<div className="flex flex-col items-center justify-center mt-xl mb-lg">
<div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-md border border-secondary/10">
<span className="material-symbols-outlined text-secondary text-[32px]">smart_toy</span>
</div>
<h2 className="font-headline-md text-headline-md text-center mb-sm">How can I help you today?</h2>
<p className="font-body-md text-body-md text-on-surface-variant text-center mb-lg">Ask me anything about managing your community.</p>
<div className="flex flex-wrap gap-sm justify-center max-w-[500px]">
<button className="px-md py-sm rounded-full border border-secondary/20 bg-surface-container hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-on-surface flex items-center gap-xs">
<span className="material-symbols-outlined text-[18px]">group_add</span>
                    How do I create a committee?
                </button>
<button className="px-md py-sm rounded-full border border-secondary/20 bg-surface-container hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-on-surface flex items-center gap-xs">
<span className="material-symbols-outlined text-[18px]">payments</span>
                    How do I change payment mode?
                </button>
</div>
</div>

<div className="flex flex-col gap-md">

<div className="flex justify-end">
<div className="bg-secondary text-on-secondary rounded-2xl rounded-tr-sm px-md py-sm max-w-[85%] md:max-w-[70%] font-body-md text-body-md">
                    Hi, I need help with an issue that isn't listed in the usual FAQs.
                </div>
</div>

<div className="flex justify-start items-end gap-sm">
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex-shrink-0 flex items-center justify-center mb-1 border border-secondary/10">
<span className="material-symbols-outlined text-secondary text-[16px]">smart_toy</span>
</div>
<div className="bg-surface-container text-on-surface rounded-2xl rounded-tl-sm px-md py-sm max-w-[85%] md:max-w-[70%] font-body-md text-body-md border border-secondary/10 jali-border-top">
<p className="mb-sm">I can certainly help you look into that. If your issue is outside the standard scope, you might need to escalate it directly to the management team.</p>
<p className="mb-md">Would you like to file a formal complaint so they can assist you further?</p>
<button className="bg-tertiary-container text-on-tertiary-container hover:bg-tertiary-fixed transition-colors px-lg py-sm rounded-full font-label-sm text-label-sm flex items-center justify-center gap-xs w-full sm:w-auto">
<span className="material-symbols-outlined text-[18px]">report_problem</span>
                        File a Complaint
                    </button>
</div>
</div>
</div>
</main>

<div className="fixed bottom-0 w-full bg-surface border-t border-secondary/10 z-40 pb-safe">
<div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-sm flex items-center gap-sm">
<button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors flex-shrink-0">
<span className="material-symbols-outlined">add_circle</span>
</button>
<div className="flex-grow relative">
<input className="w-full bg-surface-container-lowest border border-secondary/20 rounded-full py-sm pl-md pr-12 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all" placeholder="Type your message..." type="text"/>
</div>
<button className="bg-secondary text-on-secondary p-2 rounded-full hover:bg-on-secondary-fixed-variant transition-colors flex-shrink-0 shadow-sm active:scale-95">
<span className="material-symbols-outlined">send</span>
</button>
</div>
</div>
    </div>
  );
}
