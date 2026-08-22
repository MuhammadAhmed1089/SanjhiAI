import { useNavigate } from 'react-router-dom';
import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function FileComplaint() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="w-full top-0 sticky bg-background dark:bg-background border-b border-outline/10 flex justify-between items-center px-margin-mobile py-sm z-50">
<button className="text-primary dark:text-on-primary-fixed hover:bg-surface-container-low transition-colors active:scale-95 duration-150 p-2 rounded-full flex items-center justify-center">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md text-primary dark:text-on-primary-fixed">File a Complaint</h1>
<div className="w-10"></div> 
</header>

<main className="flex-grow w-full max-w-[600px] mx-auto px-margin-mobile py-lg flex flex-col gap-lg pb-32">

<section className="flex flex-col gap-sm">
<label className="font-label-sm text-label-sm text-on-surface-variant">Complaint Category</label>
<div className="grid grid-cols-2 gap-sm">
<button className="bg-surface-container-lowest border border-outline/15 rounded-lg p-3 text-center hover:bg-surface-container-low transition-colors active:scale-95 duration-150 focus:border-secondary focus:ring-1 focus:ring-secondary">Payment Dispute</button>
<button className="bg-surface-container-lowest border border-outline/15 rounded-lg p-3 text-center hover:bg-surface-container-low transition-colors active:scale-95 duration-150 focus:border-secondary focus:ring-1 focus:ring-secondary">Harassment</button>
<button className="bg-surface-container-lowest border border-outline/15 rounded-lg p-3 text-center hover:bg-surface-container-low transition-colors active:scale-95 duration-150 focus:border-secondary focus:ring-1 focus:ring-secondary">Suspected Fraud</button>
<button className="bg-surface-container-lowest border border-outline/15 rounded-lg p-3 text-center hover:bg-surface-container-low transition-colors active:scale-95 duration-150 focus:border-secondary focus:ring-1 focus:ring-secondary">Other</button>
</div>
</section>

<section className="flex flex-col gap-sm">
<label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="related-entity">Related Committee / User</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
<input className="w-full bg-surface-container-lowest border border-outline/15 rounded-lg pl-10 pr-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none font-body-md text-body-md placeholder:text-outline-variant" placeholder="Search by name or ID..." type="text"/>
</div>
</section>

<section className="flex flex-col gap-sm">
<label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="description">Description</label>
<textarea className="w-full bg-surface-container-lowest border border-outline/15 rounded-lg p-4 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none font-body-md text-body-md placeholder:text-outline-variant resize-none" placeholder="Provide details about your complaint..." rows="5"></textarea>
</section>

<section className="flex flex-col gap-sm">
<label className="font-label-sm text-label-sm text-on-surface-variant">Evidence (Optional)</label>
<button className="w-full border-2 border-dashed border-outline/30 rounded-lg py-8 flex flex-col items-center justify-center gap-2 hover:bg-surface-container-low transition-colors active:scale-[0.98] duration-150 bg-surface-container-lowest text-secondary">
<span className="material-symbols-outlined text-2xl">upload_file</span>
<span className="font-label-sm text-label-sm">Attach Screenshot / File</span>
</button>
</section>

<section className="mt-md">
<button onClick={() => navigate('/support/complaints')} className="w-full bg-secondary text-on-secondary py-3 px-6 rounded-lg font-label-sm text-label-sm hover:bg-secondary/90 transition-colors active:scale-[0.98] duration-150 shadow-sm flex items-center justify-center gap-2">
                Submit Complaint
                <span className="material-symbols-outlined text-sm">send</span>
</button>
</section>
</main>
    </div>
  );
}
