import { memo } from 'react';
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

function BottomNav() {
  const { openDrawer, isDrawerOpen } = useNavDrawer();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-2xl border-t border-[#006972]/15 shadow-[0_-8px_30px_rgba(0,105,114,0.14)] rounded-t-3xl px-3 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex justify-around items-center select-none"
      style={{
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/dashboard'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center transition-all duration-200 py-1.5 px-3 rounded-2xl no-scale-active relative ${
              isActive
                ? 'bg-[#006972] text-white shadow-md shadow-[#006972]/30 scale-105'
                : 'text-gray-600 hover:text-[#006972] active:scale-95'
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
                    className={`w-6 h-6 rounded-lg object-cover transition-transform ${
                      isActive ? 'ring-2 ring-white/80 scale-105' : ''
                    }`}
                  />
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
                </div>
              ) : (
                <Icon name={item.icon} size={22} className={isActive ? 'text-white' : 'text-[#006972]/80'} />
              )}
              <span
                className={`font-label text-[10.5px] font-bold tracking-tight mt-0.5 ${
                  isActive ? 'text-white' : 'text-gray-600'
                }`}
              >
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
        className={`flex flex-col items-center justify-center transition-all duration-200 py-1.5 px-3 rounded-2xl cursor-pointer no-scale-active border-none bg-transparent ${
          isDrawerOpen
            ? 'bg-[#006972] text-white shadow-md shadow-[#006972]/30 scale-105'
            : 'text-gray-600 hover:text-[#006972] active:scale-95'
        }`}
      >
        <Icon name="menu" size={22} className={isDrawerOpen ? 'text-white' : 'text-[#006972]/80'} />
        <span
          className={`font-label text-[10.5px] font-bold tracking-tight mt-0.5 ${
            isDrawerOpen ? 'text-white' : 'text-gray-600'
          }`}
        >
          Menu
        </span>
      </button>
    </nav>
  );
}

// Memoize: BottomNav never needs to re-render unless drawer state changes
export default memo(BottomNav);
