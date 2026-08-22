import { useNavigate } from 'react-router-dom';
import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function ReviewConfirm() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<div className="absolute inset-0 jali-pattern pointer-events-none"></div>
<div className="h-full flex flex-col relative z-10 max-w-lg mx-auto bg-surface/90 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.05)] border-x border-outline-variant/10">
<header className="flex items-center justify-between w-full px-margin-mobile h-16 bg-surface shrink-0">
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md text-primary-container font-bold flex-1 text-center pr-10">Review your committee</h1>
</header>
<main className="flex-1 overflow-y-auto px-margin-mobile py-lg pb-32">
<p className="font-body-md text-body-md text-on-surface-variant mb-lg text-center">
                Please review the details below before creating your Sanjhi committee.
            </p>
<div className="glass-card rounded-xl p-0 overflow-hidden mb-lg shadow-sm">
<div className="h-2 bg-secondary w-full"></div>
<div className="p-md sm:p-lg space-y-md">
<div className="flex items-center justify-between pb-sm border-b border-outline-variant/10">
<div>
<span className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Committee Name</span>
<span className="block font-body-md text-body-md font-semibold text-primary-container">Diwali Savings Fund</span>
</div>
<button aria-label="Edit Committee Name" className="text-secondary hover:bg-secondary-container/50 p-2 rounded-full transition-colors">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
</div>
<div className="flex items-center justify-between pb-sm border-b border-outline-variant/10">
<div>
<span className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Amount per Member</span>
<span className="block font-body-md text-body-md font-semibold text-primary-container">Rs. 5,000</span>
</div>
<button aria-label="Edit Amount" className="text-secondary hover:bg-secondary-container/50 p-2 rounded-full transition-colors">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
</div>
<div className="flex items-center justify-between pb-sm border-b border-outline-variant/10">
<div>
<span className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Capacity</span>
<span className="block font-body-md text-body-md font-semibold text-primary-container">10 Members</span>
</div>
<button aria-label="Edit Capacity" className="text-secondary hover:bg-secondary-container/50 p-2 rounded-full transition-colors">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
</div>
<div className="flex items-center justify-between pb-sm border-b border-outline-variant/10">
<div>
<span className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Interval</span>
<span className="block font-body-md text-body-md font-semibold text-primary-container">Every 1 Month</span>
</div>
<button aria-label="Edit Interval" className="text-secondary hover:bg-secondary-container/50 p-2 rounded-full transition-colors">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
</div>
<div className="flex items-center justify-between pb-sm border-b border-outline-variant/10">
<div>
<span className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Duration</span>
<span className="block font-body-md text-body-md font-semibold text-primary-container">10 Months</span>
</div>
<button aria-label="Edit Duration" className="text-secondary hover:bg-secondary-container/50 p-2 rounded-full transition-colors">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
</div>
<div className="flex items-center justify-between pb-sm border-b border-outline-variant/10">
<div>
<span className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Payout Order</span>
<span className="block font-body-md text-body-md font-semibold text-primary-container">Fixed Order</span>
</div>
<button aria-label="Edit Payout Order" className="text-secondary hover:bg-secondary-container/50 p-2 rounded-full transition-colors">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
</div>
<div className="flex items-center justify-between">
<div>
<span className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Linked Account</span>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">account_balance</span>
<span className="block font-body-md text-body-md font-semibold text-primary-container">JazzCash - 0300****123</span>
</div>
</div>
<button aria-label="Edit Linked Account" className="text-secondary hover:bg-secondary-container/50 p-2 rounded-full transition-colors">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
</div>
</div>
</div>
<div className="bg-surface-container-low rounded-lg p-md border border-outline-variant/20 flex gap-sm items-start">
<span className="material-symbols-outlined text-tertiary mt-1">info</span>
<p className="font-label-sm text-label-sm text-on-surface-variant">
                    By confirming, you agree to the Sanjhi <a className="text-secondary underline underline-offset-2" href="#">Terms of Service</a> and commit to the full duration of this pool.
                </p>
</div>
</main>
<div className="fixed bottom-0 left-0 w-full max-w-lg mx-auto bg-surface/95 backdrop-blur-md border-t border-outline-variant/10 p-margin-mobile z-50">
<button onClick={() => navigate('/committee/created')} className="w-full bg-secondary hover:bg-primary-container text-on-primary rounded-full py-4 px-lg font-label-sm text-label-sm text-center transition-colors shadow-sm flex items-center justify-center gap-2">
<span>Confirm & Create</span>
<span className="material-symbols-outlined">check_circle</span>
</button>
</div>
</div>
    </div>
  );
}
