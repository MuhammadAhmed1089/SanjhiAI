import { useNavigate } from 'react-router-dom';
import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function ProfileSetup() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<header className="w-full top-0 sticky bg-background flex items-center px-container-margin-mobile md:px-container-margin-desktop h-16 max-w-[1280px] mx-auto z-40">
<div className="flex items-center text-teal-emerald hover:opacity-80 transition-opacity active:scale-95 duration-200 cursor-pointer">
<span className="material-symbols-outlined mr-2" data-weight="fill">arrow_back</span>
</div>
<div className="font-headline-md text-headline-md text-deep-navy ml-4">
            Sanjhi
        </div>
</header>

<main className="flex-grow flex flex-col items-center justify-center px-container-margin-mobile md:px-container-margin-desktop py-stack-lg max-w-[1280px] mx-auto w-full relative z-10">
<div className="w-full max-w-md flex flex-col items-center space-y-stack-lg">

<div className="text-center space-y-stack-sm w-full">
<h1 className="font-display-lg-mobile text-display-lg-mobile text-deep-navy md:font-display-lg md:text-display-lg">
                    Set up your profile
                </h1>
<p className="font-body-md text-body-md text-on-surface-variant">
                    Let the community get to know you.
                </p>
</div>

<div className="flex flex-col items-center space-y-stack-md pt-stack-md w-full relative group">
<div className="relative cursor-pointer">

<div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105">
<span className="material-symbols-outlined text-outline-variant text-6xl" data-weight="fill">person</span>

<input accept="image/*" className="hidden" type="file"/>
</div>

<div className="absolute bottom-0 right-0 md:bottom-2 md:right-2 w-10 h-10 bg-teal-emerald rounded-full flex items-center justify-center text-on-primary shadow-sm ring-4 ring-surface cursor-pointer hover:bg-secondary-container hover:text-on-secondary-container transition-colors duration-200">
<span className="material-symbols-outlined text-[20px]">photo_camera</span>
</div>
</div>
<label className="font-label-lg text-label-lg text-teal-emerald cursor-pointer hover:underline" htmlFor="avatarUpload">
                    Add photo
                </label>
</div>

<form className="w-full space-y-stack-lg pt-stack-sm flex flex-col">

<div className="w-full space-y-unit">
<label className="font-label-sm text-label-sm text-on-surface-variant ml-2" htmlFor="displayName">
                        Display Name <span className="text-error">*</span>
</label>
<div className="relative">
<input className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-body-lg text-body-lg rounded-xl px-4 py-3 md:py-4 focus:border-teal-emerald focus:ring-1 focus:ring-teal-emerald transition-colors duration-200 shadow-sm" placeholder="e.g., Anika S." required type="text"/>
</div>
</div>

<div className="h-8 md:h-12"></div>

<div className="w-full pt-stack-md mt-auto">
<button onClick={() => navigate('/dashboard')} className="w-full bg-teal-emerald text-white font-label-lg text-label-lg py-4 px-6 rounded-full transition-all duration-300 flex items-center justify-center active:scale-95" type="button">
                        Finish
                    </button>
</div>
</form>
</div>
</main>
    </div>
  );
}
