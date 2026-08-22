import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';

export default function AppLayout({
  children,
  title = '',
  showBack = false,
  rightAction,
  showBottomNav = true,
  headerVariant = 'default',
}) {
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0 relative">
      {headerVariant === 'dashboard' ? (
        <DashboardHeader />
      ) : (
        <TopAppBar title={title} showBack={showBack} rightAction={rightAction} />
      )}
      <main className="max-w-screen-md mx-auto px-4 md:px-6 py-6">
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}

function DashboardHeader() {
  return (
    <header className="w-full sticky top-0 bg-surface/95 backdrop-blur-md shadow-sm z-40 flex justify-between items-center px-4 md:px-6 py-4">
      <div className="flex items-center gap-3">
        <img
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border border-outline-variant/60"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ0tqG5gvADCuJfIojLk30R5oY3hHyGErNfIDU8Zmy_90t7KXTIL8u-igI96MNHmpx-aEwyw4VegsKZBrxLOkKWQiKPlZZNYYyBD8QRijonWzXLn8yDKy-8tds-Tb6yv3Q5nPr_B-2rNTQ298MnGy9Al3PcvbCXg0SAMcGWPZLLRsGcSGMvb9GNzoEMHfK4sIYIAMhdNOLwfeXZeKx8clUB5k5iR9AzQaBVMNdYor6rzFkjXJuHHro"
        />
        <h1 className="font-headline text-[20px] md:text-[24px] leading-[32px] font-bold text-on-surface">
          Hi, Anika
        </h1>
      </div>
      <button
        aria-label="Notifications"
        className="relative text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 duration-150"
      >
        <span className="material-symbols-outlined">notifications</span>
        <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-teal-emerald rounded-full border-2 border-surface" />
      </button>
    </header>
  );
}
