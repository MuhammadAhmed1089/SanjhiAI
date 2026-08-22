import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function JoinRequestSent() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<div className="jali-pattern"></div>

<main className="relative z-10 w-full max-w-md bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-xl flex flex-col items-center text-center">

<div className="mb-lg rounded-full bg-secondary-container text-on-secondary-container p-6 animate-pulse">
<span className="material-symbols-outlined text-[64px]">
                hourglass_top
            </span>
</div>

<h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-sm">
            Request Sent
        </h1>

<p className="font-body-md text-body-md text-on-surface-variant mb-xl max-w-xs">
            You’ll be notified once the Organizer approves your request.
        </p>

<button className="w-full bg-secondary text-on-secondary font-label-sm text-label-sm py-3 px-lg rounded-full hover:bg-secondary/90 transition-colors active:scale-95 duration-150">
            Back to Dashboard
        </button>
</main>
    </div>
  );
}
