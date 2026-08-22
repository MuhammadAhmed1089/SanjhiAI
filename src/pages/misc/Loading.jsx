import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased">
<aside className="hidden md:flex flex-col h-screen w-80 fixed left-0 top-0 z-[60] bg-surface dark:bg-surface-dim border-r border-outline/10 p-md gap-sm shadow-lg">
<div className="flex items-center gap-md mb-xl p-md">
<div className="w-12 h-12 rounded-full bg-surface-container-high skeleton-pulse"></div>
<div className="flex flex-col gap-xs">
<div className="w-32 h-6 bg-surface-container-high rounded skeleton-pulse"></div>
<div className="w-24 h-4 bg-surface-container-high rounded skeleton-pulse"></div>
</div>
</div>
<nav className="flex flex-col gap-sm">
<div className="flex items-center gap-md p-md rounded bg-secondary-container text-on-secondary-container font-bold">
<span className="material-symbols-outlined">grid_view</span>
<span className="font-label-sm text-label-sm">Dashboard</span>
</div>
<div className="flex items-center gap-md p-md rounded text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 ease-in-out">
<span className="material-symbols-outlined">group_work</span>
<span className="font-label-sm text-label-sm">Pools</span>
</div>
<div className="flex items-center gap-md p-md rounded text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 ease-in-out">
<span className="material-symbols-outlined">diversity_3</span>
<span className="font-label-sm text-label-sm">Connect</span>
</div>
<div className="flex items-center gap-md p-md rounded text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 ease-in-out">
<span className="material-symbols-outlined">person</span>
<span className="font-label-sm text-label-sm">Profile</span>
</div>
</nav>
</aside>

<div className="flex-1 md:ml-80 flex flex-col pb-24 md:pb-0">

<header className="w-full top-0 sticky bg-background dark:bg-background border-b border-outline/10 flex justify-between items-center px-margin-mobile py-sm z-50">
<div className="flex items-center gap-sm md:hidden">
<button className="text-primary dark:text-on-primary-fixed p-2 rounded hover:bg-surface-container-low transition-colors active:scale-95 duration-150">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-display-lg-mobile text-display-lg-mobile text-secondary dark:text-secondary-fixed font-bold">Sanjhi</h1>
</div>
<div className="hidden md:block">
<h1 className="font-headline-md text-headline-md text-primary dark:text-on-primary-fixed">Dashboard</h1>
</div>
<button className="text-primary dark:text-on-primary-fixed p-2 rounded hover:bg-surface-container-low transition-colors active:scale-95 duration-150">
<span className="material-symbols-outlined">notifications</span>
</button>
</header>

<main className="p-margin-mobile md:p-margin-desktop flex-1 flex flex-col gap-lg">

<div className="w-48 h-10 bg-surface-container-high rounded-lg skeleton-pulse mb-md"></div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">

<div className="col-span-1 md:col-span-8 bg-surface-container-low border border-outline/10 rounded-xl p-lg flex flex-col justify-between min-h-[240px]">
<div className="flex justify-between items-start">
<div className="w-32 h-6 bg-surface-container-high rounded skeleton-pulse"></div>
<div className="w-12 h-12 bg-surface-container-high rounded-full skeleton-pulse"></div>
</div>
<div className="flex flex-col gap-sm mt-auto">
<div className="w-24 h-12 bg-surface-container-high rounded-lg skeleton-pulse"></div>
<div className="w-full h-2 bg-surface-container-high rounded-full skeleton-pulse mt-md"></div>
<div className="w-3/4 h-4 bg-surface-container-high rounded skeleton-pulse"></div>
</div>
</div>

<div className="col-span-1 md:col-span-4 flex flex-col gap-gutter">
<div className="bg-surface-container-low border border-outline/10 rounded-xl p-lg flex-1 min-h-[110px] flex items-center justify-between">
<div className="flex flex-col gap-xs">
<div className="w-20 h-4 bg-surface-container-high rounded skeleton-pulse"></div>
<div className="w-16 h-8 bg-surface-container-high rounded skeleton-pulse"></div>
</div>
<div className="w-10 h-10 bg-surface-container-high rounded-full skeleton-pulse"></div>
</div>
<div className="bg-surface-container-low border border-outline/10 rounded-xl p-lg flex-1 min-h-[110px] flex items-center justify-between">
<div className="flex flex-col gap-xs">
<div className="w-24 h-4 bg-surface-container-high rounded skeleton-pulse"></div>
<div className="w-12 h-8 bg-surface-container-high rounded skeleton-pulse"></div>
</div>
<div className="w-10 h-10 bg-surface-container-high rounded-full skeleton-pulse"></div>
</div>
</div>

<div className="col-span-1 md:col-span-12 mt-lg">
<div className="flex justify-between items-center mb-md">
<div className="w-40 h-6 bg-surface-container-high rounded skeleton-pulse"></div>
<div className="w-20 h-4 bg-surface-container-high rounded skeleton-pulse"></div>
</div>
<div className="flex flex-col gap-md">

<div className="bg-surface-container-lowest border border-outline/10 rounded-lg p-md flex items-center gap-md">
<div className="w-12 h-12 bg-surface-container-high rounded-lg skeleton-pulse shrink-0"></div>
<div className="flex-1 flex flex-col gap-sm">
<div className="w-1/3 h-5 bg-surface-container-high rounded skeleton-pulse"></div>
<div className="w-1/2 h-4 bg-surface-container-high rounded skeleton-pulse"></div>
</div>
<div className="w-16 h-6 bg-surface-container-high rounded-full skeleton-pulse shrink-0"></div>
</div>

<div className="bg-surface-container-lowest border border-outline/10 rounded-lg p-md flex items-center gap-md">
<div className="w-12 h-12 bg-surface-container-high rounded-lg skeleton-pulse shrink-0"></div>
<div className="flex-1 flex flex-col gap-sm">
<div className="w-2/5 h-5 bg-surface-container-high rounded skeleton-pulse"></div>
<div className="w-1/3 h-4 bg-surface-container-high rounded skeleton-pulse"></div>
</div>
<div className="w-16 h-6 bg-surface-container-high rounded-full skeleton-pulse shrink-0"></div>
</div>

<div className="bg-surface-container-lowest border border-outline/10 rounded-lg p-md flex items-center gap-md">
<div className="w-12 h-12 bg-surface-container-high rounded-lg skeleton-pulse shrink-0"></div>
<div className="flex-1 flex flex-col gap-sm">
<div className="w-1/4 h-5 bg-surface-container-high rounded skeleton-pulse"></div>
<div className="w-2/5 h-4 bg-surface-container-high rounded skeleton-pulse"></div>
</div>
<div className="w-16 h-6 bg-surface-container-high rounded-full skeleton-pulse shrink-0"></div>
</div>
</div>
</div>
</div>
</main>
</div>

<nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-surface dark:bg-surface-dim border-t border-outline/10 shadow-sm flex justify-around items-center h-16 px-2">
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined" data-weight="fill">grid_view</span>
<span className="font-label-sm text-label-sm mt-1 hidden">Dashboard</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high active:scale-90 transition-transform px-4 py-1 rounded-full" href="#">
<span className="material-symbols-outlined">group_work</span>
<span className="font-label-sm text-label-sm mt-1 hidden">Pools</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high active:scale-90 transition-transform px-4 py-1 rounded-full" href="#">
<span className="material-symbols-outlined">diversity_3</span>
<span className="font-label-sm text-label-sm mt-1 hidden">Connect</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high active:scale-90 transition-transform px-4 py-1 rounded-full" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-sm text-label-sm mt-1 hidden">Profile</span>
</a>
</nav>
    </div>
  );
}
