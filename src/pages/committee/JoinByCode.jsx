import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAmbientBackground from '../../components/AuthAmbientBackground';
import logo from '../../assets/screen.png';
import Icon from '../../components/Icon';

const MOCK_PARTICIPANTS = [
  { id: 'zaid_99', name: 'Zaid Ahmed', phone: '+92 300 1234567', avatar: '/avatar.svg' },
  { id: 'fatima_k', name: 'Fatima Khan', phone: '+92 321 9876543', avatar: '/avatar.svg' },
  { id: 'bilal_a', name: 'Bilal Ahmed', phone: '+92 333 5554433', avatar: '/avatar.svg' },
  { id: 'sara_ali', name: 'Sara Ali', phone: '+92 345 1122334', avatar: '/avatar.svg' },
  { id: 'omar_f', name: 'Omar Farooq', phone: '+92 302 7788990', avatar: '/avatar.svg' },
];

export default function JoinByCode() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('code'); // 'code' or 'participantId'
  const [code, setCode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [ripples, setRipples] = useState({});

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

  function handleContinue(e) {
    e.preventDefault();
    triggerRipple(e, 'continue');
    setTimeout(() => {
      navigate('/join/DEMO');
    }, 200);
  }

  function handleAddParticipant(participant) {
    alert(`Participant ${participant.name} (${participant.id}) successfully added to the committee!`);
    navigate('/dashboard');
  }

  const filteredParticipants = searchTerm.trim()
    ? MOCK_PARTICIPANTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.phone.includes(searchTerm)
      )
    : MOCK_PARTICIPANTS;

  return (
    <AuthAmbientBackground showTicker={true}>
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col items-center justify-center min-h-[calc(100vh-36px)]">
        
        {/* Main Glass Card with login/signup style styling */}
        <main className="max-w-md w-full bg-white/90 backdrop-blur-2xl border border-[#006972]/20 shadow-[0_24px_70px_-15px_rgba(0,105,114,0.22),0_0_0_1px_rgba(0,105,114,0.1)] rounded-2xl sm:rounded-3xl p-6 sm:p-10 animate-fade-up relative z-10">
          
          {/* Header Navigation */}
          <header className="w-full flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#006972]/5 hover:bg-[#006972]/15 border border-[#006972]/15 text-[#006972] transition-colors cursor-pointer active:scale-95"
            >
              <Icon name="arrow_back" size={20} />
            </button>
          </header>

          {/* Logo & Heading matching Login/Signup (without Nastaliq) */}
          <div className="text-center mb-6 w-full flex flex-col items-center">
            <div className="relative mb-2 cursor-pointer" onClick={() => navigate('/')}>
              <img
                alt="Sanjhi Logo"
                src={logo}
                className="w-20 h-20 sm:w-26 sm:h-26 object-contain drop-shadow-sm"
              />
            </div>
            <h1 className="text-[24px] sm:text-[30px] leading-tight font-bold text-deep-navy mb-1 font-headline">
              Join a Committee
            </h1>
            <p className="font-body text-[13px] sm:text-[14px] text-on-surface-variant">
              Enter invite code or add participant by ID as organizer.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-[#f5f4e8] p-1 rounded-xl mb-6 border border-[#c4c6cc]/30">
            <button
              type="button"
              onClick={() => { setMode('code'); setSearchTerm(''); }}
              className={`flex-1 py-2.5 rounded-lg text-label-sm font-label-sm transition-all cursor-pointer ${
                mode === 'code'
                  ? 'bg-[#006972] text-white shadow-sm font-bold'
                  : 'text-deep-navy hover:text-[#006972]'
              }`}
            >
              Via Invite Code
            </button>
            <button
              type="button"
              onClick={() => { setMode('participantId'); setSearchTerm(''); }}
              className={`flex-1 py-2.5 rounded-lg text-label-sm font-label-sm transition-all cursor-pointer ${
                mode === 'participantId'
                  ? 'bg-[#006972] text-white shadow-sm font-bold'
                  : 'text-deep-navy hover:text-[#006972]'
              }`}
            >
              Add by Participant ID
            </button>
          </div>

          {/* Form Content: Via Code */}
          {mode === 'code' ? (
            <form onSubmit={handleContinue} className="space-y-6">
              <div>
                <label htmlFor="inviteCode" className="block font-label text-[14px] text-deep-navy mb-2 text-center">
                  Invite Code / Link
                </label>
                <input
                  id="inviteCode"
                  type="text"
                  required
                  maxLength="15"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. SANJHI-782K"
                  className="block w-full px-4 py-4 border border-[#c4c6cc] rounded-xl bg-[#f5f4e8] focus:ring-[#006972] focus:border-[#006972] transition-colors text-deep-navy outline-none font-body text-[18px] text-center uppercase tracking-widest placeholder:text-on-surface-variant/50 placeholder:font-normal placeholder:tracking-normal"
                />
              </div>

              <div className="text-center">
                <p className="font-label text-[12px] text-on-surface-variant">
                  or open an invite link shared with you
                </p>
              </div>

              <button
                type="submit"
                className="relative overflow-hidden w-full bg-[#006972] hover:bg-[#00575f] text-white font-label text-[14px] py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
              >
                {ripples.continue && (
                  <span
                    className="absolute rounded-full bg-white/30 w-32 h-32 -translate-x-1/2 -translate-y-1/2 animate-ping pointer-events-none"
                    style={{ left: ripples.continue.x, top: ripples.continue.y }}
                  />
                )}
                Continue
                <Icon name="arrow_forward" size={20} />
              </button>
            </form>
          ) : (
            /* Form Content: Add by Participant ID with live search list */
            <div className="space-y-4">
              <div>
                <label htmlFor="participantSearch" className="block font-label text-[14px] text-deep-navy mb-2 text-center">
                  Search Participant by ID, Name or Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant">
                    <Icon name="search" size={20} />
                  </div>
                  <input
                    id="participantSearch"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Type name, ID or phone..."
                    className="block w-full pl-12 pr-4 py-3.5 border border-[#c4c6cc] rounded-xl bg-[#f5f4e8] focus:ring-[#006972] focus:border-[#006972] transition-colors text-deep-navy outline-none font-body text-[14px] placeholder:text-on-surface-variant/50"
                  />
                </div>
              </div>

              {/* Live Search Results List */}
              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {filteredParticipants.length > 0 ? (
                  filteredParticipants.map((participant) => (
                    <div
                      key={participant.id}
                      className="bg-[#f5f4e8]/80 hover:bg-[#f5f4e8] border border-[#006972]/15 rounded-xl p-3 flex items-center justify-between transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          alt="Avatar"
                          className="w-10 h-10 rounded-full object-cover border border-[#006972]/30 bg-white"
                          src={participant.avatar}
                        />
                        <div className="flex flex-col">
                          <span className="font-body text-[14px] text-deep-navy font-bold leading-tight">
                            {participant.name}
                          </span>
                          <span className="font-label text-[11px] text-on-surface-variant">
                            ID: @{participant.id} • {participant.phone}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddParticipant(participant)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#006972] hover:bg-[#00575f] text-white transition-colors font-label text-[12px] font-semibold active:scale-95 shadow-sm cursor-pointer shrink-0"
                      >
                        Add
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-on-surface-variant text-[13px] font-body bg-[#f5f4e8]/40 rounded-xl border border-dashed border-[#c4c6cc]">
                    No matching participants found.
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>
    </AuthAmbientBackground>
  );
}
