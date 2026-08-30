import { NavLink } from 'react-router-dom';
import Icon from './Icon';
import { useNavDrawer } from '../context/NavDrawerContext';
import aiLogo from '../assets/sanjhi-ai-logo.png';

const navItems = [
  { to: '/dashboard', icon: 'dashboard', label: 'Home' },
  { to: '/committees/public', icon: 'explore', label: 'Explore' },
  { to: '/pools', icon: 'account_balance_wallet', label: 'My Pools' },
  { to: '/assistant', icon: 'smart_toy', label: 'AI Bot', isAi: true },
];

export default function BottomNav() {
  const { openDrawer, isDrawerOpen } = useNavDrawer();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-xl border-t border-[#006972]/15 shadow-[0_-8px_30px_rgba(0,105,114,0.12)] px-2 pb-5 pt-2 flex justify-around items-center select-none">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center transition-all active:scale-90 duration-200 py-1 px-3 rounded-2xl ${
              isActive
                ? 'bg-[#006972] text-white shadow-md shadow-[#006972]/25'
                : 'text-gray-500 hover:text-[#006972]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {item.isAi ? (
                <div className="relative">
                  <img
                    src={aiLogo}
                    alt="AI"
                    className={`w-6 h-6 rounded-lg object-cover ${
                      isActive ? 'ring-2 ring-white/60' : ''
                    }`}
                  />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                </div>
              ) : (
                <Icon name={item.icon} size={22} />
              )}
              <span className={`font-label text-[10px] font-bold tracking-tight mt-0.5 ${
                isActive ? 'text-white' : 'text-gray-600'
              }`}>
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}

      {/* Menu / Drawer Toggle Button */}
      <button
        onClick={openDrawer}
        aria-label="Open More Menu"
        className={`flex flex-col items-center justify-center transition-all active:scale-90 duration-200 py-1 px-3 rounded-2xl cursor-pointer ${
          isDrawerOpen
            ? 'bg-[#006972] text-white shadow-md shadow-[#006972]/25'
            : 'text-gray-500 hover:text-[#006972]'
        }`}
      >
        <Icon name="menu" size={22} />
        <span className={`font-label text-[10px] font-bold tracking-tight mt-0.5 ${
          isDrawerOpen ? 'text-white' : 'text-gray-600'
        }`}>
          Menu
        </span>
      </button>
    </nav>
  );
}
