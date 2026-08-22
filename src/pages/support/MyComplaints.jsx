import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function MyComplaints() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="w-full top-0 sticky bg-background text-primary border-b border-outline/10 flex justify-between items-center px-margin-mobile py-sm z-50">
<button aria-label="Go back" className="text-primary hover:bg-surface-container-low transition-colors active:scale-95 duration-150 p-2 rounded-full">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md text-primary truncate flex-1 text-center font-bold">My Complaints</h1>
<button aria-label="Notifications" className="text-primary hover:bg-surface-container-low transition-colors active:scale-95 duration-150 p-2 rounded-full">
<span className="material-symbols-outlined">notifications</span>
</button>
</header>

<main className="flex-1 px-margin-mobile md:px-margin-desktop py-lg pb-32 max-w-7xl mx-auto w-full">

<div className="flex gap-sm overflow-x-auto pb-sm mb-md no-scrollbar">
<button className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-4 py-2 rounded-full whitespace-nowrap active:scale-95 transition-transform">All</button>
<button className="bg-surface text-on-surface-variant border border-outline/20 font-label-sm text-label-sm px-4 py-2 rounded-full whitespace-nowrap hover:bg-surface-container-low active:scale-95 transition-all">Pending</button>
<button className="bg-surface text-on-surface-variant border border-outline/20 font-label-sm text-label-sm px-4 py-2 rounded-full whitespace-nowrap hover:bg-surface-container-low active:scale-95 transition-all">In Review</button>
<button className="bg-surface text-on-surface-variant border border-outline/20 font-label-sm text-label-sm px-4 py-2 rounded-full whitespace-nowrap hover:bg-surface-container-low active:scale-95 transition-all">Resolved</button>
</div>

<div className="flex flex-col gap-md">

<div className="bg-surface-container-lowest border border-outline/10 rounded-xl p-md flex flex-col gap-sm relative overflow-hidden group hover:border-secondary/30 transition-colors">
<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tertiary-container to-transparent opacity-50"></div>
<div className="flex justify-between items-start gap-sm">
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs block">Payment Dispute</span>
<h2 className="font-headline-md text-body-lg text-primary line-clamp-1">Duplicate charge on contribution</h2>
</div>
<div className="bg-tertiary-container/20 text-tertiary font-label-sm text-label-sm px-3 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">schedule</span>
                        Pending
                    </div>
</div>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                    I noticed a duplicate charge for my September contribution to the community fund. Both charges appear on my bank statement but only one shows in the ledger.
                </p>
<div className="flex justify-between items-center mt-sm pt-sm border-t border-outline/10">
<span className="font-label-sm text-label-sm text-outline">Oct 12, 2023</span>
<button className="text-secondary font-label-sm text-label-sm hover:underline flex items-center gap-1">View Details <span className="material-symbols-outlined text-[16px]">arrow_forward</span></button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline/10 rounded-xl p-md flex flex-col gap-sm relative overflow-hidden group hover:border-secondary/30 transition-colors">
<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-fixed-dim to-transparent opacity-50"></div>
<div className="flex justify-between items-start gap-sm">
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs block">Maintenance</span>
<h2 className="font-headline-md text-body-lg text-primary line-clamp-1">Broken light fixture in common area</h2>
</div>
<div className="bg-secondary-fixed/30 text-on-secondary-fixed font-label-sm text-label-sm px-3 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">visibility</span>
                        In Review
                    </div>
</div>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                    The main light fixture in the north corridor has been flickering and is now completely out, making it unsafe during evening hours.
                </p>
<div className="flex justify-between items-center mt-sm pt-sm border-t border-outline/10">
<span className="font-label-sm text-label-sm text-outline">Oct 05, 2023</span>
<button className="text-secondary font-label-sm text-label-sm hover:underline flex items-center gap-1">View Details <span className="material-symbols-outlined text-[16px]">arrow_forward</span></button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline/10 rounded-xl p-md flex flex-col gap-sm relative overflow-hidden group hover:border-secondary/30 transition-colors">
<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-transparent opacity-30"></div>
<div className="flex justify-between items-start gap-sm">
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs block">Event Feedback</span>
<h2 className="font-headline-md text-body-lg text-primary line-clamp-1">Noise complaint regarding Diwali celebration</h2>
</div>
<div className="bg-[#e2f1e6] text-[#2e7d32] font-label-sm text-label-sm px-3 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">check_circle</span>
                        Resolved
                    </div>
</div>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                    The music level during the late hours of the recent community event was excessively loud and disturbed residents in block B.
                </p>
<div className="flex justify-between items-center mt-sm pt-sm border-t border-outline/10">
<span className="font-label-sm text-label-sm text-outline">Sep 28, 2023</span>
<button className="text-secondary font-label-sm text-label-sm hover:underline flex items-center gap-1">View Details <span className="material-symbols-outlined text-[16px]">arrow_forward</span></button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline/10 rounded-xl p-md flex flex-col gap-sm relative overflow-hidden group hover:border-secondary/30 transition-colors opacity-75">
<div className="flex justify-between items-start gap-sm">
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs block">General Inquiry</span>
<h2 className="font-headline-md text-body-lg text-primary line-clamp-1">Request to change meeting schedule</h2>
</div>
<div className="bg-surface-variant text-on-surface-variant font-label-sm text-label-sm px-3 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">cancel</span>
                        Dismissed
                    </div>
</div>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                    I would like to propose moving the monthly committee meetings from Sunday mornings to Saturday evenings.
                </p>
<div className="flex justify-between items-center mt-sm pt-sm border-t border-outline/10">
<span className="font-label-sm text-label-sm text-outline">Sep 15, 2023</span>
<button className="text-secondary font-label-sm text-label-sm hover:underline flex items-center gap-1">View Details <span className="material-symbols-outlined text-[16px]">arrow_forward</span></button>
</div>
</div>
</div>

<button aria-label="Create new complaint" className="fixed bottom-24 right-margin-mobile md:right-margin-desktop bg-secondary text-on-secondary rounded-full p-4 shadow-lg hover:shadow-xl hover:bg-on-secondary-container active:scale-95 transition-all z-40 flex items-center justify-center gap-2">
<span className="material-symbols-outlined">add</span>
<span className="font-label-sm text-label-sm pr-2 hidden md:inline">New Complaint</span>
</button>
</main>


<nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-surface border-t border-outline/10 flex justify-around items-center h-16 px-2 shadow-sm">
<button aria-label="Dashboard" className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high active:scale-90 transition-transform p-2 rounded-lg w-16">
<span className="material-symbols-outlined">grid_view</span>
<span className="font-label-sm text-[10px] mt-1">Dashboard</span>
</button>
<button aria-label="Pools" className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high active:scale-90 transition-transform p-2 rounded-lg w-16">
<span className="material-symbols-outlined">group_work</span>
<span className="font-label-sm text-[10px] mt-1">Pools</span>
</button>
<button aria-label="Connect" className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high active:scale-90 transition-transform p-2 rounded-lg w-16">
<span className="material-symbols-outlined">diversity_3</span>
<span className="font-label-sm text-[10px] mt-1">Connect</span>
</button>

<button aria-label="Profile" className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 transition-transform w-16">
<span className="material-symbols-outlined" data-weight="fill">person</span>
<span className="font-label-sm text-[10px] mt-1">Profile</span>
</button>
</nav>
    </div>
  );
}
