import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAmbientBackground from '../../components/AuthAmbientBackground';
import Icon from '../../components/Icon';
import logo from '../../assets/screen.png';

export default function Notifications() {
  const navigate = useNavigate();
  const [ripples, setRipples] = useState({});
  
  // Dummy notification data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'request',
      icon: 'person_add',
      title: 'New Join Request',
      time: '2m ago',
      desc: "Ayesha Malik has requested to join 'Diwali Savings Fund'.",
      color: 'text-[#006972]',
      bg: 'bg-[#006972]/10',
      unread: true,
    },
    {
      id: 2,
      type: 'payment',
      icon: 'check_circle',
      title: 'Payment Confirmed',
      time: '1h ago',
      desc: 'Your payment for Cycle 10 has been verified by the organizer.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-600/10',
      unread: true,
    },
    {
      id: 3,
      type: 'payout',
      icon: 'payments',
      title: 'Payout Released',
      time: '5h ago',
      desc: 'The payout for October 2026 has been sent to Rahul Sharma.',
      color: 'text-amber-600',
      bg: 'bg-amber-600/10',
      unread: false,
    },
    {
      id: 4,
      type: 'alert',
      icon: 'priority_high',
      title: 'Payment Overdue',
      time: '1d ago',
      desc: "Your contribution for 'Home Renovation' was due 2 days ago.",
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      unread: false,
    },
  ]);

  function triggerRipple(e, key) {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipples((prev) => ({
      ...prev,
      [key]: { x: e.clientX - rect.left, y: e.clientY - rect.top, k: Date.now() },
    }));
    setTimeout(() => {
      setRipples((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }, 600);
  }

  function markAsRead(id) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  }

  return (
    <AuthAmbientBackground showTicker={false}>
      <div className="w-full max-w-3xl mx-auto flex flex-col min-h-[calc(100vh-36px)] pt-2 sm:pt-4">
        
        {/* Clean Header Panel with Prominent Logo Side-by-Side */}
        <header className="w-full relative px-4 pb-4 sm:pb-6 flex items-center justify-between">
          
          <button
            onClick={() => navigate('/dashboard')}
            aria-label="Go back"
            className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-white/60 hover:bg-white/80 text-[#006972] transition-colors cursor-pointer active:scale-95 backdrop-blur-md border border-[#006972]/15 shadow-sm"
          >
            <Icon name="arrow_back" size={20} />
          </button>

          {/* Centered side-by-side logo and title */}
          <div className="flex-1 flex items-center justify-center gap-3">
            <img
              alt="Sanjhi Logo"
              src={logo}
              className="h-16 sm:h-20 object-contain drop-shadow-md"
            />
            <h1 className="font-headline text-[22px] sm:text-[26px] font-bold text-deep-navy tracking-tight">
              Notifications
            </h1>
          </div>

          {/* Spacer to balance the back button */}
          <div className="w-10 flex-shrink-0" />
        </header>

        {/* Notifications List */}
        <main className="flex-1 w-full space-y-4 z-10 px-3 sm:px-6 pb-8">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={(e) => {
                triggerRipple(e, notif.id);
                markAsRead(notif.id);
              }}
              className={`relative overflow-hidden w-full bg-white/90 backdrop-blur-md rounded-2xl border ${
                notif.unread ? 'border-[#006972]/30 shadow-md' : 'border-[#006972]/10 shadow-sm opacity-80'
              } p-4 sm:p-5 flex gap-4 items-start cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg group`}
            >
              {/* Ripple Effect */}
              {ripples[notif.id] && (
                <span
                  className="absolute rounded-full bg-[#006972]/10 w-32 h-32 -translate-x-1/2 -translate-y-1/2 animate-ping pointer-events-none"
                  style={{ left: ripples[notif.id].x, top: ripples[notif.id].y }}
                />
              )}

              {/* Unread Indicator */}
              {notif.unread && (
                <div className="absolute top-0 right-0 w-2 h-2 mt-4 mr-4 rounded-full bg-[#006972] animate-pulse" />
              )}

              {/* Icon Container */}
              <div className={`${notif.bg} ${notif.color} w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                <Icon name={notif.icon} size={24} />
              </div>

              {/* Content */}
              <div className="flex-grow pt-0.5">
                <div className="flex justify-between items-baseline mb-1 pr-6">
                  <h3 className="font-headline text-[16px] sm:text-[18px] font-bold text-deep-navy leading-tight">
                    {notif.title}
                  </h3>
                  <span className="font-label text-[11px] text-on-surface-variant whitespace-nowrap ml-2">
                    {notif.time}
                  </span>
                </div>
                <p className="font-body text-[13px] sm:text-[14px] text-on-surface-variant/90 leading-snug">
                  {notif.desc}
                </p>
              </div>
            </div>
          ))}
          
          {notifications.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#006972]/10">
                <Icon name="notifications_off" size={28} className="text-[#006972]/50" />
              </div>
              <p className="font-body text-[15px] text-on-surface-variant">No new notifications</p>
            </div>
          )}
        </main>

      </div>
    </AuthAmbientBackground>
  );
}
