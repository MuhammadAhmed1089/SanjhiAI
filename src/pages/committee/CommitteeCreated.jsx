import { useNavigate } from 'react-router-dom';
import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function CommitteeCreated() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="bg-surface dark:bg-surface-dim docked full-width top-0 flex justify-between items-center w-full px-margin-mobile h-16 sticky z-10">
<button className="text-deep-navy dark:text-primary-fixed-dim p-2 flex items-center justify-center hover:bg-surface-container dark:hover:bg-surface-container-high transition-colors rounded-full active:scale-95 duration-150">
<span className="material-symbols-outlined">close</span>
</button>
<div className="font-display-lg-mobile text-display-lg-mobile text-secondary text-center absolute left-1/2 transform -translate-x-1/2">
            Sanjhi
        </div>
<div className="w-10"></div> 
</header>

<main className="flex-1 w-full max-w-md mx-auto flex flex-col px-margin-mobile py-lg">

<div className="flex flex-col items-center justify-center mt-xl mb-lg">
<div className="relative w-32 h-32 flex items-center justify-center bg-secondary-fixed rounded-full glow-effect">
<span className="material-symbols-outlined text-secondary">check_circle</span>
</div>
<h1 className="font-headline-md text-headline-md text-primary mt-lg text-center">Committee Created!</h1>
<p className="font-body-md text-on-surface-variant text-center mt-sm">"Diwali Fund 2024" is now active.</p>
</div>

<div className="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant/15 flex flex-col items-center mt-md">
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-sm">Invite Code</p>
<div className="font-display-lg-mobile text-display-lg-mobile text-secondary tracking-widest text-center">
                SANJHI-782K
            </div>
<button className="mt-md bg-secondary text-on-secondary font-label-sm text-label-sm px-6 py-2 rounded-full flex items-center gap-2 hover:bg-secondary/90 transition-colors">
<span className="material-symbols-outlined text-[18px]">content_copy</span>
                Copy Code
            </button>
</div>

<div className="mt-xl text-center">
<p className="font-label-sm text-label-sm text-on-surface-variant mb-md">Share via Link</p>
<div className="flex justify-center gap-md">
<button className="bg-surface-container hover:bg-surface-container-high transition-colors text-primary font-label-sm text-label-sm px-4 py-2 rounded-full border border-outline-variant/20 flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">link</span>
                    Copy Link
                </button>
<button className="bg-surface-container hover:bg-surface-container-high transition-colors text-primary p-2 rounded-full border border-outline-variant/20 flex items-center justify-center h-10 w-10">
<span className="material-symbols-outlined text-[20px]">share</span>
</button>
</div>
</div>
</main>

<div className="w-full max-w-md mx-auto px-margin-mobile py-lg bg-background sticky bottom-0 border-t border-outline-variant/10 pb-safe">
<button onClick={() => navigate('/dashboard')} className="w-full bg-secondary text-on-secondary font-label-sm text-label-sm py-4 rounded-full hover:bg-secondary/90 transition-colors shadow-sm active:scale-[0.98] duration-150">
            Go to Committee
        </button>
</div>
    </div>
  );
}
