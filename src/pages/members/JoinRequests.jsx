import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function JoinRequests() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="w-full top-0 sticky bg-surface dark:bg-surface-dim border-b border-outline-variant/15 z-40 transition-colors">
<div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 w-full max-w-[1280px] mx-auto">
<button className="text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low dark:hover:bg-surface-container-high transition-colors p-2 rounded-full active:scale-95 transition-transform duration-150 flex items-center justify-center">
<span className="material-symbols-outlined text-[24px]">arrow_back</span>
</button>
<h1 className="text-headline-md font-headline-md text-secondary dark:text-secondary-fixed-dim tracking-tight">Sanjha</h1>
<div className="w-10"></div> 
</div>
</header>

<main className="flex-grow pb-[80px] md:pb-8 pt-6 px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto w-full">
<div className="mb-8">
<h2 className="text-headline-md font-headline-md text-on-surface mb-2">Join Requests</h2>
<p className="text-body-md font-body-md text-on-surface-variant">Review pending requests to join the committee.</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<div className="bg-surface-container-lowest border border-outline-variant/15 rounded-lg p-6 jali-border-top hover:bg-surface-container transition-colors duration-200">
<div className="flex items-start justify-between mb-4">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant/20 flex-shrink-0">
<img alt="Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAllas1Fk0l9flugWf49eR9fi-6jJyYOKDbgC33DZ9TWrHsjVZerAZl80sf3gqQGF4VTD2_RWIf8OD62Fo9kSmQXMElybb8Yb7222bPLVXBJ86_ey0JPZcbF1JFvlS7TOHnu5AONWX5BBDmfer8u1Q8gkjstjDTRIg9S5dq0TiqtoMxDixQm8GYrIREoydX9ZZDwSNzK0gAwOiKvmNL-IJxEBNh03UaS5VklMSk-tXkuptpRQjy7P3d"/>
</div>
<div>
<h3 className="text-body-lg font-body-lg font-bold text-on-surface">Ayesha Malik</h3>
<div className="flex items-center gap-1 mt-1">
<span className="bg-tertiary-container text-on-tertiary-container text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">verified_user</span>
                                    940 • High Trust
                                </span>
</div>
</div>
</div>
</div>
<div className="flex gap-3 mt-6">
<button className="flex-1 bg-secondary text-on-secondary hover:bg-secondary/90 transition-colors font-label-sm text-label-sm py-2 px-lg rounded-full active:scale-95 flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[18px]">check</span>
                        Approve
                    </button>
<button className="flex-1 border border-error text-error hover:bg-error-container hover:text-on-error-container transition-colors font-label-sm text-label-sm py-2 px-4 rounded-full active:scale-95 flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[18px]">close</span>
                        Reject
                    </button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant/15 rounded-lg p-6 jali-border-top hover:bg-surface-container transition-colors duration-200">
<div className="flex items-start justify-between mb-4">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant/20 flex-shrink-0">
<img alt="Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuYm2AhjC95PToU0zfJRva6Kty6y5VuXL7W6Edki_uWg1ycLrqzz9LZ8ZK6CZAi8S9mA-pwl_Oj3bm5YPy43u_J6vyWdkI2pW_bBtHfmrAwr0Eqw9CFDf1dfPZH0Bx0kCzg0m2ffXJFUy3diJl19orkzmQvgDbnDEd2SrmBOYW7kebxRuvLqDh_9p5xDgaHt9I7alJsifyaHZkGUoqszrI-xExVOiLCF3IbRQohohp-dAI2-pv4Noe"/>
</div>
<div>
<h3 className="text-body-lg font-body-lg font-bold text-on-surface">Omar Farooq</h3>
<div className="flex items-center gap-1 mt-1">
<span className="bg-tertiary-container/80 text-on-tertiary-container text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">shield</span>
                                    880
                                </span>
</div>
</div>
</div>
</div>
<div className="flex gap-3 mt-6">
<button className="flex-1 bg-secondary text-on-secondary hover:bg-secondary/90 transition-colors font-label-sm text-label-sm py-2 px-lg rounded-full active:scale-95 flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[18px]">check</span>
                        Approve
                    </button>
<button className="flex-1 border border-error text-error hover:bg-error-container hover:text-on-error-container transition-colors font-label-sm text-label-sm py-2 px-4 rounded-full active:scale-95 flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[18px]">close</span>
                        Reject
                    </button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant/15 rounded-lg p-6 jali-border-top hover:bg-surface-container transition-colors duration-200">
<div className="flex items-start justify-between mb-4">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant/20 flex-shrink-0">
<img alt="Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzZ7pg8eYqTrVL7_YhvGRbvd8LgI7q1BZY_WLEfVyOdz_m2bbba4pB2eTJdUpNoK7DP_ijAiuvKD108KYEZLUW96qW0aEDFPdY9dkL_uNZe5vwdR2YWi9ykcbdyhMp46Bx3aqAIssybpyBudQRddihC6r8WnnC6qzxB3Wo_h6HCvanO4vt1bIC040oz9WtLpuKQ0lKcM6Hkqk1nOyn6eBwrFD4vtFf-Bgnakmx5k1mpB5nMxKwlmTZ"/>
</div>
<div>
<h3 className="text-body-lg font-body-lg font-bold text-on-surface">Sara Khan</h3>
<div className="flex items-center gap-1 mt-1">
<span className="bg-tertiary-container/90 text-on-tertiary-container text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">shield</span>
                                    915
                                </span>
</div>
</div>
</div>
</div>
<div className="flex gap-3 mt-6">
<button className="flex-1 bg-secondary text-on-secondary hover:bg-secondary/90 transition-colors font-label-sm text-label-sm py-2 px-lg rounded-full active:scale-95 flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[18px]">check</span>
                        Approve
                    </button>
<button className="flex-1 border border-error text-error hover:bg-error-container hover:text-on-error-container transition-colors font-label-sm text-label-sm py-2 px-4 rounded-full active:scale-95 flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[18px]">close</span>
                        Reject
                    </button>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface-container dark:bg-surface-container-lowest border-t border-outline-variant/10 shadow-sm">
<div className="fixed bottom-0 left-0 w-full flex justify-around items-center py-3 px-4 pb-safe bg-surface-container dark:bg-surface-container-lowest">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-5 py-1 hover:bg-surface-variant/50 dark:hover:bg-surface-container-high active:scale-90 transition-all duration-200 ease-in-out rounded-full group" href="#">
<span className="material-symbols-outlined mb-1 group-hover:text-secondary transition-colors">home</span>
<span className="text-label-sm font-label-sm group-hover:text-secondary transition-colors">Home</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-on-secondary-fixed-variant text-on-secondary-container dark:text-secondary-fixed rounded-full px-5 py-1 hover:bg-surface-variant/50 dark:hover:bg-surface-container-high active:scale-90 transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined mb-1">account_balance_wallet</span>
<span className="text-label-sm font-label-sm">Pools</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-5 py-1 hover:bg-surface-variant/50 dark:hover:bg-surface-container-high active:scale-90 transition-all duration-200 ease-in-out rounded-full group" href="#">
<span className="material-symbols-outlined mb-1 group-hover:text-secondary transition-colors">groups</span>
<span className="text-label-sm font-label-sm group-hover:text-secondary transition-colors">Connect</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-5 py-1 hover:bg-surface-variant/50 dark:hover:bg-surface-container-high active:scale-90 transition-all duration-200 ease-in-out rounded-full group" href="#">
<span className="material-symbols-outlined mb-1 group-hover:text-secondary transition-colors">person</span>
<span className="text-label-sm font-label-sm group-hover:text-secondary transition-colors">Profile</span>
</a>
</div>
</nav>
    </div>
  );
}
