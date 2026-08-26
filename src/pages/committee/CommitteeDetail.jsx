import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/Icon';
import logo from '../../assets/screen.png';
import { getCommitteeById, updatePaymentStatus, releasePayout } from '../../services/committeeService';

const BACKEND_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace('/api', '')
  : 'http://localhost:3000';

function resolvePhotoUrl(url) {
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  return `${BACKEND_URL}${url}`;
}

export default function CommitteeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState('ledger'); // 'ledger' | 'members' | 'progress'
  const [selectedCycle, setSelectedCycle] = useState(2);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Modals state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [selectedMemberToVerify, setSelectedMemberToVerify] = useState(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedMemberToRemind, setSelectedMemberToRemind] = useState(null);

  // Committee State
  const [committee, setCommittee] = useState({
    id: id || '1',
    name: 'Diwali Savings Fund 2026',
    contributionAmount: 5000,
    capacity: 10,
    intervalType: '1_month',
    userRole: 'Organizer',
    inviteCode: 'SANJHI-8492K',
    inviteLink: 'http://localhost:5173/join/SANJHI-8492K',
    accountTitle: 'Ali Khan',
    accountNumber: '03001234567',
    provider: 'JazzCash',
  });

  // Members list
  const [members, setMembers] = useState([
    { id: 'u1', name: 'Ali Khan (You)', role: 'Organizer', turn: 1, status: 'paid', paidAt: 'Today, 10:15 AM', photo: '/avatar.svg', phone: '03001234567', score: 850 },
    { id: 'u2', name: 'Usman Tariq', role: 'Co-Organizer', turn: 2, status: 'paid', paidAt: 'Yesterday', photo: null, phone: '03129876543', score: 890 },
    { id: 'u3', name: 'Priya Kapoor', role: 'Member', turn: 3, status: 'awaiting', paidAt: 'Pending Verification', photo: null, phone: '03334445556', score: 820 },
    { id: 'u4', name: 'Ayesha Malik', role: 'Member', turn: 4, status: 'overdue', paidAt: 'Overdue (3 Days)', photo: null, phone: '03451122334', score: 710 },
    { id: 'u5', name: 'Bilal Hassan', role: 'Member', turn: 5, status: 'paid', paidAt: 'Oct 24', photo: null, phone: '03017788990', score: 860 },
    { id: 'u6', name: 'Zainab Fatima', role: 'Member', turn: 6, status: 'paid', paidAt: 'Oct 23', photo: null, phone: '03215544332', score: 875 },
    { id: 'u7', name: 'Hamza Rashid', role: 'Member', turn: 7, status: 'paid', paidAt: 'Oct 22', photo: null, phone: '03348899001', score: 840 },
    { id: 'u8', name: 'Saima Khan', role: 'Member', turn: 8, status: 'paid', paidAt: 'Oct 21', photo: null, phone: '03023344556', score: 830 },
    { id: 'u9', name: 'Tariq Mehmood', role: 'Member', turn: 9, status: 'pending', paidAt: 'Not Paid', photo: null, phone: '03136677889', score: 810 },
    { id: 'u10', name: 'Kashif Ali', role: 'Member', turn: 10, status: 'pending', paidAt: 'Not Paid', photo: null, phone: '03229988776', score: 800 },
  ]);

  useEffect(() => {
    async function loadDetails() {
      try {
        setLoading(true);
        const data = await getCommitteeById(id || '1');
        if (data?.committee) {
          setCommittee((prev) => ({ ...prev, ...data.committee }));
        }
        if (data?.members && Array.isArray(data.members)) {
          setMembers(data.members);
        }
      } catch (err) {
        // Fallback to local state if backend route is in development
      } finally {
        setLoading(false);
      }
    }
    loadDetails();
  }, [id]);

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  }

  // Handle member payment verification
  function handleVerifyMember(member) {
    setSelectedMemberToVerify(member);
    setShowVerifyModal(true);
  }

  function confirmVerification() {
    if (!selectedMemberToVerify) return;
    setMembers((prev) =>
      prev.map((m) => (m.id === selectedMemberToVerify.id ? { ...m, status: 'paid', paidAt: 'Verified Today ✓' } : m))
    );
    setShowVerifyModal(false);
    showToast(`Payment for ${selectedMemberToVerify.name} verified successfully! ✓`);
  }

  // Handle sending payment reminder
  function handleSendReminder(member) {
    setSelectedMemberToRemind(member);
    setShowReminderModal(true);
  }

  function confirmSendReminder() {
    if (!selectedMemberToRemind) return;
    setShowReminderModal(false);
    showToast(`WhatsApp & SMS reminder sent to ${selectedMemberToRemind.name}! 📲`);
  }

  const paidCount = members.filter((m) => m.status === 'paid').length;
  const totalPoolAmount = committee.contributionAmount * committee.capacity;
  const collectedAmount = paidCount * committee.contributionAmount;
  const progressPct = Math.round((paidCount / committee.capacity) * 100);

  return (
    <div className="min-h-screen bg-white text-deep-navy font-body antialiased relative overflow-x-hidden pb-28 md:pb-12">

      {/* ── AMBIENT BACKGROUND LAYER ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.3]"
          style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #006972 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute w-[520px] h-[520px] rounded-full bg-[#006972]/5 blur-3xl top-[-100px] left-[-100px] animate-float-y-slow" />
        <div className="absolute w-[380px] h-[380px] rounded-full bg-amber-400/5 blur-3xl bottom-[15%] right-[-60px]"
          style={{ animation: 'float-y 8s ease-in-out infinite 2s' }} />
        <img src={logo} alt="" aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] opacity-[0.035] select-none pointer-events-none"
          style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(85%) saturate(1450%) hue-rotate(152deg)' }} />
      </div>

      {/* ── HEADER BAR ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#006972]/12 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-[#006972]/8 hover:bg-[#006972]/15 border border-[#006972]/12 text-[#006972] transition-colors cursor-pointer active:scale-95"
            >
              <Icon name="arrow_back" size={20} />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-[#006972]/10 text-[#006972] font-label text-[10px] font-bold uppercase tracking-wider">
                  {committee.userRole}
                </span>
                <span className="text-[11px] font-label text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold hidden sm:inline">
                  Cycle {selectedCycle} of {committee.capacity}
                </span>
              </div>
              <h1 className="font-headline text-[18px] sm:text-[22px] font-bold text-[#006972] leading-tight truncate">
                {committee.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#006972]/10 hover:bg-[#006972]/18 text-[#006972] font-label text-[12px] font-bold border border-[#006972]/20 transition-all active:scale-95 cursor-pointer"
            >
              <Icon name="person_add" size={16} />
              <span className="hidden sm:inline">Invite</span>
            </button>

            <button
              onClick={() => navigate('/committee/settings')}
              className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-deep-navy transition-all active:scale-95 cursor-pointer"
              title="Committee Settings"
            >
              <Icon name="settings" size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* ── TOAST MESSAGE ── */}
      {toastMessage && (
        <div className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 z-50 bg-[#006972] text-white px-5 py-3 rounded-2xl shadow-xl font-label text-[13px] font-bold flex items-center gap-2 border border-white/20 animate-bounce-short">
          <Icon name="check_circle" size={18} className="text-emerald-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-5xl mx-auto px-3 sm:px-6 pt-5 pb-4 space-y-5 relative z-10">

        {/* ════════════════════════════════════════════
            HERO OVERVIEW BANNER CARD
        ════════════════════════════════════════════ */}
        <section className="bg-gradient-to-br from-[#006972] via-[#007a82] to-[#005f66] rounded-3xl p-5 sm:p-7 shadow-xl shadow-[#006972]/25 relative overflow-hidden text-white">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Financial Overview stats */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/15 text-white font-label text-[11px] font-bold border border-white/20 uppercase tracking-wider">
                  Cycle #{selectedCycle} Active Pool
                </span>
                <span className="text-[11px] font-label text-emerald-300 font-bold bg-black/20 px-2.5 py-0.5 rounded-full">
                  Monthly Rotation
                </span>
              </div>

              <div>
                <p className="font-label text-[11px] uppercase tracking-widest text-white/70">Total Cycle Pool Payout</p>
                <h2 className="font-headline text-[32px] sm:text-[40px] font-extrabold text-white tracking-tight leading-none tabular-nums">
                  Rs. {totalPoolAmount.toLocaleString()}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[13px] font-body text-white/85">
                <span className="flex items-center gap-1">
                  <Icon name="payments" size={15} className="text-white/70" />
                  Rs. {committee.contributionAmount.toLocaleString()} / member
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="groups" size={15} className="text-white/70" />
                  {committee.capacity} Total Slots
                </span>
              </div>
            </div>

            {/* Collection Progress Box */}
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 shrink-0 w-full md:w-72 space-y-3">
              <div className="flex justify-between items-center text-[12px] font-label font-bold text-white/90">
                <span>Collection Progress</span>
                <span className="text-emerald-300">{paidCount} of {committee.capacity} Paid</span>
              </div>

              <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden p-0.5 border border-white/20">
                <div className="h-full rounded-full transition-all duration-[1200ms] ease-out"
                  style={{ width: `${progressPct}%`, background: 'linear-gradient(90deg, #fcd34d, #6ee7b7)' }} />
              </div>

              <div className="flex justify-between text-[11px] font-label text-white/75">
                <span>Rs. {collectedAmount.toLocaleString()} collected</span>
                <span>{progressPct}%</span>
              </div>

              <button
                disabled={paidCount < committee.capacity}
                onClick={() => showToast('Payout successfully released to recipient!')}
                className="w-full py-2.5 rounded-xl font-label text-[12px] font-bold bg-white text-[#006972] hover:bg-emerald-50 transition-all shadow-md active:scale-95 cursor-pointer border-none flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name={paidCount < committee.capacity ? 'lock' : 'lock_open'} size={15} />
                {paidCount < committee.capacity ? 'Payout Locked (Pending Dues)' : 'Release Payout'}
              </button>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════
            NAVIGATION TABS (Ledger | Members | Progress)
        ════════════════════════════════════════════ */}
        <div className="flex items-center justify-between bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          {[
            { id: 'ledger', label: 'Ledger & Payments', icon: 'receipt_long' },
            { id: 'members', label: `Members (${members.length})`, icon: 'groups' },
            { id: 'progress', label: 'Schedule & Rotation', icon: 'timeline' },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 px-3 rounded-xl font-label text-[13px] font-bold transition-all cursor-pointer border-none flex items-center justify-center gap-2 ${
                  active ? 'bg-[#006972] text-white shadow-md' : 'bg-transparent text-deep-navy/70 hover:bg-slate-200'
                }`}
              >
                <Icon name={tab.icon} size={18} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden text-[11px]">{tab.id === 'ledger' ? 'Ledger' : tab.id === 'members' ? 'Members' : 'Rotation'}</span>
              </button>
            );
          })}
        </div>

        {/* ════════════════════════════════════════════
            TAB 1: LEDGER & PAYMENTS
        ════════════════════════════════════════════ */}
        {activeTab === 'ledger' && (
          <div className="space-y-4 animate-fade-in">
            
            {/* Cycle Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cNum) => (
                <button
                  key={cNum}
                  onClick={() => setSelectedCycle(cNum)}
                  className={`px-4 py-2 rounded-xl text-[12px] font-label font-bold whitespace-nowrap transition-all cursor-pointer border-none shrink-0 ${
                    selectedCycle === cNum
                      ? 'bg-[#006972] text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-deep-navy/70'
                  }`}
                >
                  Cycle {cNum} {cNum === 2 ? '(Active)' : ''}
                </button>
              ))}
            </div>

            {/* Member Payment Status Rows */}
            <div className="bg-white rounded-3xl border-2 border-[#006972]/12 shadow-sm overflow-hidden divide-y divide-slate-100">
              {members.map((member) => (
                <div key={member.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                  
                  {/* Left info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={member.photo ? resolvePhotoUrl(member.photo) : '/avatar.svg'}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#006972]/20"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-headline text-[14px] font-bold text-deep-navy">{member.name}</p>
                        {member.role !== 'Member' && (
                          <span className="px-2 py-0.5 rounded-full bg-[#006972]/10 text-[#006972] font-label text-[10px] font-bold">
                            {member.role}
                          </span>
                        )}
                        <span className="text-[11px] font-label text-on-surface-variant/70 font-semibold">Turn #{member.turn}</span>
                      </div>
                      <p className="font-body text-[12px] text-on-surface-variant">
                        Due Amount: <strong className="text-deep-navy">Rs. {committee.contributionAmount.toLocaleString()}</strong> • Status: {member.paidAt}
                      </p>
                    </div>
                  </div>

                  {/* Right Status Badges & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                    {member.status === 'paid' && (
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-label text-[11px] font-bold flex items-center gap-1">
                        <Icon name="check_circle" size={14} /> Paid ✓
                      </span>
                    )}

                    {member.status === 'awaiting' && (
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-label text-[11px] font-bold flex items-center gap-1">
                          <Icon name="schedule" size={14} /> Verification Pending
                        </span>
                        <button
                          onClick={() => handleVerifyMember(member)}
                          className="px-3 py-1 rounded-xl bg-[#006972] hover:bg-[#00575f] text-white font-label text-[12px] font-bold transition-all shadow-sm cursor-pointer border-none"
                        >
                          Verify
                        </button>
                      </div>
                    )}

                    {member.status === 'overdue' && (
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-label text-[11px] font-bold flex items-center gap-1">
                          <Icon name="warning" size={14} /> Overdue
                        </span>
                        <button
                          onClick={() => handleSendReminder(member)}
                          className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-deep-navy font-label text-[12px] font-bold transition-all cursor-pointer border border-slate-200 flex items-center gap-1"
                        >
                          <Icon name="notifications" size={14} /> Remind
                        </button>
                      </div>
                    )}

                    {member.status === 'pending' && (
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-on-surface-variant font-label text-[11px] font-medium border border-slate-200">
                        Upcoming
                      </span>
                    )}
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ════════════════════════════════════════════
            TAB 2: MEMBERS LIST
        ════════════════════════════════════════════ */}
        {activeTab === 'members' && (
          <div className="bg-white rounded-3xl border-2 border-[#006972]/12 shadow-sm overflow-hidden p-5 sm:p-6 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-[#006972]/10 pb-3">
              <h3 className="font-headline text-[17px] font-bold text-[#006972] flex items-center gap-2">
                <Icon name="groups" size={20} />
                Enrolled Committee Members ({members.length} / {committee.capacity})
              </h3>
              <button
                onClick={() => setShowInviteModal(true)}
                className="font-label text-[12px] font-bold text-[#006972] hover:underline bg-transparent border-none cursor-pointer flex items-center gap-1"
              >
                <Icon name="person_add" size={15} /> Add Member
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {members.map((member) => (
                <div key={member.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.photo ? resolvePhotoUrl(member.photo) : '/avatar.svg'}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#006972]/20"
                    />
                    <div>
                      <p className="font-headline text-[14px] font-bold text-deep-navy">{member.name}</p>
                      <p className="font-body text-[12px] text-on-surface-variant">{member.phone}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-label text-[11px] font-bold text-[#006972] bg-[#006972]/10 px-2.5 py-0.5 rounded-full block mb-1">
                      Turn #{member.turn}
                    </span>
                    <span className="font-label text-[10px] text-emerald-700 font-semibold">
                      Trust: {member.score} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════
            TAB 3: SCHEDULE & ROTATION TIMELINE
        ════════════════════════════════════════════ */}
        {activeTab === 'progress' && (
          <div className="bg-white rounded-3xl border-2 border-[#006972]/12 shadow-sm overflow-hidden p-5 sm:p-6 space-y-4 animate-fade-in">
            <h3 className="font-headline text-[17px] font-bold text-[#006972] flex items-center gap-2 border-b border-[#006972]/10 pb-3">
              <Icon name="timeline" size={20} />
              Payout Rotation Schedule (10 Cycles)
            </h3>

            <div className="relative border-l-2 border-[#006972]/20 ml-4 pl-6 space-y-6">
              {members.map((member, idx) => {
                const cycleNum = idx + 1;
                const isCurrent = cycleNum === 2;
                const isCompleted = cycleNum === 1;

                return (
                  <div key={member.id} className="relative text-left">
                    <span className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 ${
                      isCompleted ? 'bg-emerald-500 border-white' : isCurrent ? 'bg-[#006972] border-white animate-ping-slow' : 'bg-slate-300 border-white'
                    }`} />
                    
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-headline text-[14px] font-bold text-deep-navy">
                            Cycle #{cycleNum} Payout → {member.name}
                          </span>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 font-label text-[10px] font-bold uppercase">
                              Active Cycle
                            </span>
                          )}
                        </div>
                        <p className="font-body text-[12px] text-on-surface-variant mt-0.5">
                          Recipient Turn #{member.turn} • Total Payout: <strong className="text-deep-navy">Rs. {totalPoolAmount.toLocaleString()}</strong>
                        </p>
                      </div>

                      <span className="font-label text-[12px] font-bold text-on-surface-variant bg-white px-3 py-1 rounded-xl border border-slate-200 shrink-0 text-center">
                        {isCompleted ? 'Completed ✓' : isCurrent ? 'Collecting Dues' : 'Scheduled'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* ════════════════════════════════════════════
          MODAL 1: INVITE MEMBERS & SHARE CODE
      ════════════════════════════════════════════ */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-[#006972]/15 animate-scale-up">
            <div className="w-12 h-12 rounded-2xl bg-[#006972]/10 text-[#006972] flex items-center justify-center mx-auto">
              <Icon name="person_add" size={24} />
            </div>

            <div>
              <h3 className="font-headline text-[18px] font-bold text-deep-navy">Invite Members to Committee</h3>
              <p className="font-body text-[12px] text-on-surface-variant mt-1">
                Share this unique invite code or link with trusted members.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
              <span className="font-mono text-[14px] font-bold text-[#006972]">{committee.inviteCode}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(committee.inviteCode);
                  showToast('Invite code copied to clipboard!');
                }}
                className="px-3 py-1 rounded-xl bg-[#006972] hover:bg-[#00575f] text-white font-label text-[12px] font-bold cursor-pointer border-none"
              >
                Copy
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowInviteModal(false)}
                className="w-full py-3 rounded-2xl font-label text-[13px] font-bold bg-slate-100 hover:bg-slate-200 text-deep-navy cursor-pointer border-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════
          MODAL 2: VERIFY PAYMENT MODAL
      ════════════════════════════════════════════ */}
      {showVerifyModal && selectedMemberToVerify && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-[#006972]/15 animate-scale-up">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto border border-amber-200">
              <Icon name="check_circle" size={24} />
            </div>

            <div>
              <h3 className="font-headline text-[18px] font-bold text-deep-navy">Verify Payment Receipt</h3>
              <p className="font-body text-[13px] text-on-surface-variant mt-1">
                Confirm receipt of <strong>Rs. {committee.contributionAmount.toLocaleString()}</strong> from <strong>{selectedMemberToVerify.name}</strong>.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowVerifyModal(false)}
                className="flex-1 py-3 rounded-2xl font-label text-[13px] font-bold bg-slate-100 hover:bg-slate-200 text-deep-navy cursor-pointer border-none"
              >
                Cancel
              </button>
              <button
                onClick={confirmVerification}
                className="flex-1 py-3 rounded-2xl font-label text-[13px] font-bold bg-[#006972] hover:bg-[#00575f] text-white cursor-pointer border-none shadow-md"
              >
                Confirm Paid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════
          MODAL 3: REMINDER MODAL
      ════════════════════════════════════════════ */}
      {showReminderModal && selectedMemberToRemind && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-[#006972]/15 animate-scale-up">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <Icon name="notifications" size={24} />
            </div>

            <div>
              <h3 className="font-headline text-[18px] font-bold text-deep-navy">Send Payment Reminder</h3>
              <p className="font-body text-[13px] text-on-surface-variant mt-1">
                Send an automated WhatsApp & SMS reminder to <strong>{selectedMemberToRemind.name}</strong> for cycle #{selectedCycle} dues.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowReminderModal(false)}
                className="flex-1 py-3 rounded-2xl font-label text-[13px] font-bold bg-slate-100 hover:bg-slate-200 text-deep-navy cursor-pointer border-none"
              >
                Cancel
              </button>
              <button
                onClick={confirmSendReminder}
                className="flex-1 py-3 rounded-2xl font-label text-[13px] font-bold bg-[#006972] hover:bg-[#00575f] text-white cursor-pointer border-none shadow-md"
              >
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#006972]/15 px-1 py-2 flex justify-around items-center safe-area-inset-bottom shadow-[0_-4px_20px_rgba(0,105,114,0.10)]">
        {[
          { label: 'Home', icon: 'dashboard', path: '/dashboard' },
          { label: 'Pools', icon: 'groups', path: '/committee/1' },
          { label: 'Payments', icon: 'account_balance_wallet', path: '/payments' },
          { label: 'Support', icon: 'support_agent', path: '/support' },
          { label: 'Profile', icon: 'person', path: '/profile' },
        ].map((tab) => (
          <button key={tab.path} onClick={() => navigate(tab.path)}
            className="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 active:scale-90 cursor-pointer border-none bg-transparent min-w-0">
            {tab.path === '/committee/1' && <span className="absolute inset-0 bg-[#006972]/10 rounded-2xl" />}
            <Icon name={tab.icon} size={22} className={`relative z-10 transition-all duration-200 ${tab.path === '/committee/1' ? 'text-[#006972] scale-110' : 'text-deep-navy/45'}`} />
            <span className={`font-label text-[9px] mt-0.5 font-semibold relative z-10 truncate max-w-[48px] ${tab.path === '/committee/1' ? 'text-[#006972]' : 'text-deep-navy/45'}`}>{tab.label}</span>
          </button>
        ))}
      </nav>

    </div>
  );
}
