import { NavLink } from 'react-router-dom';
import Icon from './Icon';

const navItems = [
  { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/committees', icon: 'groups', label: 'Committees' },
  { to: '/support', icon: 'contact_support', label: 'Support' },
  { to: '/profile', icon: 'person', label: 'Profile' },
];

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-t border-outline-variant/30 shadow-[0_-4px_20px_rgba(15,28,44,0.08)] rounded-t-xl px-4 pb-6 pt-3 flex justify-around items-center">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center transition-all active:scale-90 duration-200 ${
              isActive
                ? 'bg-deep-navy text-on-primary rounded-full px-5 py-1.5'
                : 'text-on-surface-variant opacity-70 hover:text-deep-navy px-3 py-1.5'
            }`
          }
        >
          <Icon name={item.icon} size={24} />
          <span className="font-label text-[11px] tracking-wide uppercase mt-1">
            {item.label}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}
