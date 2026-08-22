import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function JoinByCode() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="w-full top-0 sticky bg-background text-primary font-headline-md text-headline-md flat no shadows">
<div className="flex items-center px-margin-mobile h-16 w-full max-w-[1280px] mx-auto">
<button className="hover:bg-surface-container-low transition-colors active:scale-95 duration-150 p-2 rounded-full mr-4 flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-bold tracking-tight">Sanjhi</h1>
</div>
</header>

<main className="flex-grow flex flex-col items-center justify-center px-margin-mobile w-full max-w-md mx-auto pt-8 pb-xl">
<div className="w-full flex flex-col gap-lg">
<div className="text-center">
<h2 className="font-display-lg-mobile text-display-lg-mobile text-primary-container mb-2">Join a Committee</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Enter the code provided by your organizer.</p>
</div>
<div className="w-full bg-surface-container-lowest p-lg rounded-xl border border-secondary/10 relative overflow-hidden">

<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-container via-secondary to-tertiary"></div>
<form className="flex flex-col gap-md">
<div>
<label className="sr-only" htmlFor="inviteCode">Invite Code</label>
<input className="w-full bg-background border-2 border-surface-dim rounded-lg px-4 py-4 font-body-lg text-body-lg text-center uppercase tracking-widest text-primary-container focus:border-secondary focus:ring-0 transition-colors placeholder:text-outline-variant placeholder:font-normal placeholder:tracking-normal" maxlength="11" name="inviteCode" placeholder="e.g. SANJHI-782K" required type="text"/>
</div>

<div className="hidden bg-error-container text-on-error-container p-sm rounded-lg flex items-start gap-sm border border-error/20">
<span className="material-symbols-outlined text-error mt-0.5">error</span>
<p className="font-label-sm text-label-sm">Invite code is invalid or expired. Please request a fresh invite from the organizer.</p>
</div>
<div className="text-center mt-2">
<p className="font-body-md text-body-md text-on-surface-variant">or open an invite link shared with you</p>
</div>
</form>
</div>
</div>

<div className="flex-grow min-h-[40px]"></div>
<button className="w-full bg-secondary text-on-secondary font-label-sm text-label-sm py-4 px-lg rounded-full hover:bg-on-secondary-fixed-variant transition-colors active:scale-95 duration-200 shadow-[0_8px_24px_-8px_rgba(0,105,114,0.3)]" type="button">
            Continue
        </button>
</main>
    </div>
  );
}
