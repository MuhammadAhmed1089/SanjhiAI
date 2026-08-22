import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function AdminDisputes() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<nav className="hidden md:flex h-full w-72 rounded-r-xl bg-surface-container-low dark:bg-surface-container-lowest shadow-sm fixed inset-y-0 left-0 z-[60] flex flex-col p-4">
<div className="mb-8">
<h1 className="font-display-lg text-display-lg text-primary">Sanjhi Admin Panel</h1>
<p className="font-body-md text-body-md text-on-surface-variant">Internal Staff Tier</p>
</div>
<ul className="space-y-2 flex-grow">
<li>
<a className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-variant rounded-full px-4 py-3 transition-all duration-200 ease-in-out cursor-pointer active:opacity-80" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-sm text-label-sm">Overview</span>
</a>
</li>
<li>
<a className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-variant rounded-full px-4 py-3 transition-all duration-200 ease-in-out cursor-pointer active:opacity-80" href="#">
<span className="material-symbols-outlined">group</span>
<span className="font-label-sm text-label-sm">Users</span>
</a>
</li>
<li>
<a className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-variant rounded-full px-4 py-3 transition-all duration-200 ease-in-out cursor-pointer active:opacity-80" href="#">
<span className="material-symbols-outlined">diversity_3</span>
<span className="font-label-sm text-label-sm">Committees</span>
</a>
</li>
<li>
<a className="flex items-center gap-4 bg-secondary-container text-on-secondary-container rounded-full px-4 py-3 font-bold transition-all duration-200 ease-in-out cursor-pointer active:opacity-80" href="#">
<span className="material-symbols-outlined">report_problem</span>
<span className="font-label-sm text-label-sm">Disputes</span>
</a>
</li>
</ul>
<div className="mt-auto flex items-center gap-4 p-4">
<img alt="Staff Member" className="w-10 h-10 rounded-full object-cover border border-secondary/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoGXb2I5RDgXrBHfeFg_ShfaQUMKuQShjGbnD0UJv8dFWgZOOOLjSbs_qKKYMAJwOk5Dh7qDNvN0abJIrUdy8pA8Zy_4N0FhaW_tqPslV1eibYkVEr4AxW9QN2KxxnmdwMBm_O2JzW8w52pmMcvPT7YCLRGS5FgRnnTsho5apuWj6nFORGHPKGdUT1GaBqOOL8MYernq0L_eBJp3XiKpdGyUpqNyxh8X62gDUXIkkgHoA_7M9GQHeY"/>
<div>
<p className="font-label-sm text-label-sm text-on-surface">Admin Profile</p>
<p className="text-xs text-on-surface-variant">Active</p>
</div>
</div>
</nav>

<main className="flex-1 flex flex-col h-full md:pl-72 relative">

<header className="w-full sticky top-0 z-50 border-b border-secondary/15 flat no shadows bg-surface dark:bg-surface-dim flex justify-between items-center px-margin-mobile h-16 w-full">
<div className="flex items-center gap-4">
<button className="md:hidden text-primary dark:text-primary-fixed hover:bg-secondary-container/50 transition-colors cursor-pointer active:opacity-80 p-2 rounded-full">
<span className="material-symbols-outlined">menu</span>
</button>
<span className="md:hidden font-display-lg-mobile text-display-lg-mobile font-bold text-secondary dark:text-secondary-fixed">Sanjhi</span>
</div>
<h1 className="hidden md:block font-headline-md text-headline-md text-primary dark:text-primary-fixed">Complaints</h1>
<div className="flex items-center gap-4">
<img alt="Admin Profile" className="md:hidden w-8 h-8 rounded-full object-cover border border-secondary/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUw-6c39GIsIJDPxSFgeWUh1xfCQKL0v9GA8UovXincbsYFw3vA2DDINlHOp6O-I3bsxOi6m01wVT59D6xVM20Oi3bBlKXhJMIEs3gRZvoNIgRUxgiDIOTsXecmhc9bnSV6pgQmUbjLBEcW-Pq-Qx5FpgyaSTZqm_Xpvf4cbcz-ekA0FVlQzkasmwAG7F_PRzTdmRlTQiTE67h-_gh71uGSzS3soKEN2TGs7UW1kpjh-qm5DQcypQm"/>
</div>
</header>
<div className="flex-1 overflow-y-auto bg-surface-bright jali-pattern-subtle">
<div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-lg pb-24 md:pb-lg">

<div className="md:hidden mb-lg">
<h1 className="font-display-lg-mobile text-display-lg-mobile text-on-surface">Disputes Queue</h1>
<p className="text-on-surface-variant font-body-md mt-2">Manage and resolve community issues.</p>
</div>

<div className="hidden md:block mb-lg">
<p className="text-on-surface-variant font-body-lg">Manage and resolve community issues efficiently.</p>
</div>

<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-xl">

<div className="flex overflow-x-auto w-full md:w-auto gap-2 pb-2 md:pb-0 scrollbar-hide border-b border-outline-variant/30">
<button className="px-4 py-2 border-b-2 border-secondary text-secondary font-label-sm text-label-sm whitespace-nowrap">Pending (12)</button>
<button className="px-4 py-2 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-colors font-label-sm text-label-sm whitespace-nowrap">In Review (5)</button>
<button className="px-4 py-2 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-colors font-label-sm text-label-sm whitespace-nowrap">Resolved (48)</button>
<button className="px-4 py-2 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-colors font-label-sm text-label-sm whitespace-nowrap">Dismissed (3)</button>
</div>

<div className="flex items-center gap-3 w-full md:w-auto">
<div className="relative flex-grow md:flex-grow-0">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
<input className="w-full pl-9 pr-4 py-2 bg-surface border border-outline-variant/50 rounded-full font-body-md text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-shadow" placeholder="Search ref or keyword..." type="text"/>
</div>
<button className="p-2 border border-outline-variant/50 rounded-full hover:bg-surface-variant/50 text-on-surface-variant transition-colors flex items-center justify-center">
<span className="material-symbols-outlined text-md">tune</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 gap-4">

<div className="bg-surface border border-error/20 rounded-xl p-4 md:p-6 hover:shadow-sm transition-shadow cursor-pointer relative overflow-hidden group">
<div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
<div className="flex flex-col md:flex-row gap-4 md:items-start justify-between">
<div className="flex-1 space-y-3">
<div className="flex flex-wrap items-center gap-2">
<span className="px-2 py-1 bg-error-container text-on-error-container rounded-full font-label-sm text-[12px] flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">warning</span> Urgent
                                    </span>
<span className="font-label-sm text-xs text-on-surface-variant border border-outline-variant/50 rounded-full px-2 py-1">Payment Dispute</span>
<span className="font-label-sm text-xs text-on-surface-variant border border-outline-variant/50 rounded-full px-2 py-1">REF-8924A</span>
<span className="font-body-md text-xs text-on-surface-variant ml-auto md:ml-0">Oct 14, 09:30 AM</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface text-lg">Potential double-charge dispute on monthly committee fee</h3>
<div className="flex items-start gap-2 bg-surface-container-low p-3 rounded-lg border border-secondary/5">
<span className="material-symbols-outlined text-secondary text-sm mt-0.5">smart_toy</span>
<p className="font-body-md text-sm text-on-surface-variant"><strong>AI Summary:</strong> User reports being charged twice for October contribution. Bank statements attached confirm duplicate transaction. Suggest immediate review of payment gateway logs.</p>
</div>
</div>
<div className="flex items-center gap-3 md:flex-col md:items-end justify-between mt-2 md:mt-0 pt-3 md:pt-0 border-t border-outline-variant/20 md:border-t-0">
<div className="flex -space-x-2">
<img alt="User" className="w-8 h-8 rounded-full border-2 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtrGaMjvLIcWqRsr4MtRfhSKWK3E2qRO0e3k48zI00vCbvLm1heoHi-zOFhYmgIsmBegQvdnGq3SuQszbZ04X7HaXlG_7uVqdPXR_2Hp3IyF977k_w0-uSPkEMi08sJcRnI9Ao-ucxtJHNw5nDaPbYN-aaUuFjvPX2D6v49-q7qEsp0YSBhpE9H6vizTXZz44kM8L844rTKUTXXcshc9qRFwHPeLEGGMlrk_z7FO5sFQDj8ZvBMo5Z"/>
<div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-variant flex items-center justify-center text-xs text-on-surface-variant font-bold">+1</div>
</div>
<button className="px-4 py-2 bg-secondary text-on-secondary rounded-full font-label-sm text-sm hover:bg-on-secondary-fixed-variant transition-colors whitespace-nowrap">Review Case</button>
</div>
</div>
</div>

<div className="bg-surface border border-outline-variant/20 rounded-xl p-4 md:p-6 hover:shadow-sm transition-shadow cursor-pointer relative overflow-hidden group">
<div className="absolute top-0 left-0 w-1 h-full bg-tertiary-container"></div>
<div className="flex flex-col md:flex-row gap-4 md:items-start justify-between">
<div className="flex-1 space-y-3">
<div className="flex flex-wrap items-center gap-2">
<span className="px-2 py-1 bg-tertiary-container text-on-tertiary-container rounded-full font-label-sm text-[12px] flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">priority_high</span> High
                                    </span>
<span className="font-label-sm text-xs text-on-surface-variant border border-outline-variant/50 rounded-full px-2 py-1">Community Guidelines</span>
<span className="font-label-sm text-xs text-on-surface-variant border border-outline-variant/50 rounded-full px-2 py-1">REF-7731B</span>
<span className="font-body-md text-xs text-on-surface-variant ml-auto md:ml-0">Oct 13, 14:15 PM</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface text-lg">Inappropriate language in Shared Story comments</h3>
<div className="flex items-start gap-2 bg-surface-container-low p-3 rounded-lg border border-secondary/5">
<span className="material-symbols-outlined text-secondary text-sm mt-0.5">smart_toy</span>
<p className="font-body-md text-sm text-on-surface-variant"><strong>AI Summary:</strong> Multiple users flagged a comment thread on the 'Diwali Prep' story for violating respect guidelines. Auto-moderation flagged potential abusive keywords.</p>
</div>
</div>
<div className="flex items-center gap-3 md:flex-col md:items-end justify-between mt-2 md:mt-0 pt-3 md:pt-0 border-t border-outline-variant/20 md:border-t-0">
<div className="flex -space-x-2">
<img alt="User" className="w-8 h-8 rounded-full border-2 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlEAF3f65sFXiD6V4Kt-ayA3YiDi3t4fAZehe2W8bMVduru_iNFAcwzZ4EXSflC4UY-IQRSCCPp8ySfuiFd8EuQKK4oXMfvxccRYa-bwlmUkDDYxBdoDS9h-VErHKiOfGIzuLe9VsyJ-ni4i1gGOD2biB_44t6p4P7bCLL_DK1kp4_jKJb5erA_qclilSPKTlJf-vju2vvQ8dNm9W4Kf2xFasVyMcHfJxle0ruLbgphDa2EGYdPna-"/>
</div>
<button className="px-4 py-2 border border-secondary text-secondary rounded-full font-label-sm text-sm hover:bg-secondary-container/20 transition-colors whitespace-nowrap">Review Case</button>
</div>
</div>
</div>

<div className="bg-surface border border-outline-variant/20 rounded-xl p-4 md:p-6 hover:shadow-sm transition-shadow cursor-pointer relative overflow-hidden group opacity-80 hover:opacity-100">
<div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
<div className="flex flex-col md:flex-row gap-4 md:items-start justify-between">
<div className="flex-1 space-y-3">
<div className="flex flex-wrap items-center gap-2">
<span className="px-2 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-[12px] flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">info</span> Normal
                                    </span>
<span className="font-label-sm text-xs text-on-surface-variant border border-outline-variant/50 rounded-full px-2 py-1">Technical Issue</span>
<span className="font-label-sm text-xs text-on-surface-variant border border-outline-variant/50 rounded-full px-2 py-1">REF-6190C</span>
<span className="font-body-md text-xs text-on-surface-variant ml-auto md:ml-0">Oct 12, 11:00 AM</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface text-lg">Unable to upload images to Committee Gallery</h3>
<p className="font-body-md text-sm text-on-surface-variant line-clamp-2">"Every time I try to add photos from our weekend meetup to the shared gallery, the app crashes. I'm using the latest iOS version on an iPhone 13."</p>
</div>
<div className="flex items-center gap-3 md:flex-col md:items-end justify-between mt-2 md:mt-0 pt-3 md:pt-0 border-t border-outline-variant/20 md:border-t-0">
<div className="flex -space-x-2">
<img alt="User" className="w-8 h-8 rounded-full border-2 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFrKd56JYFKHeN-uzFqpesxrKl6bwbmu8SY0nYixf2rYFC8j9LEHIryglonJCiExeudT2a23a8dGu9dJ5y3tgPC4VNes7L7lRU3_wt4H1sVVdDgV7eIzYx3oMuhacXDKYlauUQhlsXo3aXhbWnohIpUHV3jf5ONFmiaA44n-o_iX-y8ivndr6uiA57M-Yu4mll3CMopeeQlnTmwIQk0ByGXEqBWwp97EvIWKxdJC18ukWyNntBnvMD"/>
</div>
<button className="px-4 py-2 text-secondary font-label-sm text-sm hover:bg-secondary-container/20 rounded-full transition-colors whitespace-nowrap">View Details</button>
</div>
</div>
</div>
</div>
</div>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 md:hidden fixed bottom-0 w-full rounded-t-xl border-t border-secondary/10 bg-surface/95 backdrop-blur-md shadow-lg">
<a className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:bg-secondary-container/20 active:scale-95 transition-transform p-2 rounded-lg" href="#">
<span className="material-symbols-outlined mb-1">dashboard</span>
<span className="font-label-sm text-label-sm text-[10px]">Overview</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:bg-secondary-container/20 active:scale-95 transition-transform p-2 rounded-lg" href="#">
<span className="material-symbols-outlined mb-1">group</span>
<span className="font-label-sm text-label-sm text-[10px]">Users</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:bg-secondary-container/20 active:scale-95 transition-transform p-2 rounded-lg" href="#">
<span className="material-symbols-outlined mb-1">diversity_3</span>
<span className="font-label-sm text-label-sm text-[10px]">Committees</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed font-bold hover:bg-secondary-container/20 active:scale-95 transition-transform p-2 rounded-lg" href="#">
<span className="material-symbols-outlined mb-1">report_problem</span>
<span className="font-label-sm text-label-sm text-[10px]">Disputes</span>
</a>
</nav>
    </div>
  );
}
