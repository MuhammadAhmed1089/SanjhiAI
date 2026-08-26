import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import logo from '../../assets/screen.png';

export default function CommitteeSettings() {
  const navigate = useNavigate();

  // Settings State
  const [committeeName, setCommitteeName] = useState('Diwali Savings Fund 2026');
  const [contribution, setContribution] = useState('5000');
  const [capacity, setCapacity] = useState('10');
  const [interval, setIntervalVal] = useState('1 month');
  const [saving, setSaving] = useState(false);

  // Account State
  const [hasAccount, setHasAccount] = useState(true);
  const [accountType, setAccountType] = useState('jazzcash');
  const [accountTitle, setAccountTitle] = useState('Ali Khan');
  const [accountNumber, setAccountNumber] = useState('03001234567');
  const [showAccountModal, setShowAccountModal] = useState(false);

  // Invite Code State
  const [inviteCode, setInviteCode] = useState('SANJHI-8492K');

  // Co-Organizer Modal State
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState('');
  const [membersList, setMembersList] = useState([
    { id: '1', name: 'Usman Tariq', phone: '0312****890' },
    { id: '2', name: 'Sara Ahmed', phone: '0333****112' },
    { id: '3', name: 'Zaid Malik', phone: '0301****456' },
  ]);

  // Danger Zone Modal State
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  }

  function handleSaveGeneralSettings(e) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast('Committee settings updated successfully! ✓');
    }, 800);
  }

  function handleRegenerateInviteCode() {
    const num = Math.floor(1000 + Math.random() * 9000);
    const char = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const newCode = `SANJHI-${num}${char}`;
    setInviteCode(newCode);
    showToast(`New invite code generated: ${newCode}`);
  }

  function handlePromoteCoOrganizer(e) {
    e.preventDefault();
    if (!selectedMember) return;
    const memberObj = membersList.find((m) => m.id === selectedMember);
    setShowPromoteModal(false);
    showToast(`${memberObj?.name || 'Member'} promoted to Co-Organizer!`);
  }

  return (
    <div className="min-h-screen bg-white text-deep-navy font-body antialiased relative overflow-x-hidden pb-24 md:pb-12">

      {/* ── AMBIENT BACKGROUND LAYER ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.3]"
          style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #006972 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#006972]/5 blur-3xl top-[-100px] left-[-100px] animate-float-y-slow" />
        <div className="absolute w-[360px] h-[360px] rounded-full bg-amber-400/5 blur-3xl bottom-[15%] right-[-60px]"
          style={{ animation: 'float-y 8s ease-in-out infinite 2s' }} />
        <img src={logo} alt="" aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] opacity-[0.035] select-none pointer-events-none"
          style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(85%) saturate(1450%) hue-rotate(152deg)' }} />
      </div>

      {/* ── HEADER BAR ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#006972]/10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate('/committee/1')}
              className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-[#006972]/8 hover:bg-[#006972]/15 border border-[#006972]/12 text-[#006972] transition-colors cursor-pointer active:scale-95"
            >
              <Icon name="arrow_back" size={20} />
            </button>
            <div className="min-w-0">
              <p className="text-[11px] font-label font-medium text-on-surface-variant truncate">Management Console</p>
              <h1 className="font-headline text-[18px] sm:text-[22px] font-bold text-[#006972] leading-tight truncate">
                Committee Settings
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-label text-[11px] font-bold border border-emerald-200 uppercase tracking-wider flex items-center gap-1">
              <Icon name="verified" size={13} /> Active
            </span>
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

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6 relative z-10">

        {/* ════════════════════════════════════════════
            CARD 1: GENERAL COMMITTEE PARAMETERS
        ════════════════════════════════════════════ */}
        <section className="bg-white rounded-3xl border-2 border-[#006972]/12 shadow-sm overflow-hidden p-5 sm:p-7 space-y-5">
          <div className="flex items-center justify-between border-b border-[#006972]/10 pb-4">
            <h2 className="font-headline text-[18px] font-bold text-[#006972] flex items-center gap-2">
              <Icon name="tune" size={22} />
              General Parameters
            </h2>
            <span className="text-[12px] font-label text-on-surface-variant font-medium">
              Organizer Controls
            </span>
          </div>

          <form onSubmit={handleSaveGeneralSettings} className="space-y-4">
            {/* Committee Name */}
            <div className="space-y-1.5 text-left">
              <label className="block font-label text-[13px] font-bold text-deep-navy">Committee Name</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#006972]">
                  <Icon name="label" size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={committeeName}
                  onChange={(e) => setCommitteeName(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-slate-50 border-2 border-[#006972]/15 rounded-2xl focus:border-[#006972] focus:ring-4 focus:ring-[#006972]/8 font-body text-[14px] text-deep-navy outline-none transition-all"
                />
              </div>
            </div>

            {/* Grid: Contribution & Capacity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="space-y-1.5">
                <label className="block font-label text-[13px] font-bold text-deep-navy">Monthly Contribution (PKR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#006972] font-bold font-label text-[13px]">Rs.</span>
                  <input
                    type="number"
                    required
                    min="500"
                    value={contribution}
                    onChange={(e) => setContribution(e.target.value.replace(/\D/g, ''))}
                    className="w-full h-12 pl-12 pr-4 bg-slate-50 border-2 border-[#006972]/15 rounded-2xl focus:border-[#006972] focus:ring-4 focus:ring-[#006972]/8 font-body text-[14px] text-deep-navy outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-label text-[13px] font-bold text-deep-navy">Member Capacity (Slots)</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#006972]">
                    <Icon name="groups" size={18} />
                  </div>
                  <input
                    type="number"
                    required
                    min="2"
                    max="50"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value.replace(/\D/g, ''))}
                    className="w-full h-12 pl-11 pr-4 bg-slate-50 border-2 border-[#006972]/15 rounded-2xl focus:border-[#006972] focus:ring-4 focus:ring-[#006972]/8 font-body text-[14px] text-deep-navy outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Collection Interval Selection */}
            <div className="space-y-1.5 text-left">
              <label className="block font-label text-[13px] font-bold text-deep-navy">Collection Interval</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                {[
                  { id: '7 days', label: '7 Days' },
                  { id: '10 days', label: '10 Days' },
                  { id: '15 days', label: '15 Days' },
                  { id: '1 month', label: '1 Month' },
                  { id: '2 months', label: '2 Months' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setIntervalVal(opt.id)}
                    className={`py-2 px-1 rounded-xl text-[12px] font-label font-bold transition-all cursor-pointer border-none ${
                      interval === opt.id ? 'bg-[#006972] text-white shadow-sm' : 'bg-transparent text-deep-navy/70 hover:bg-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-2xl font-label text-[13px] font-bold bg-[#006972] hover:bg-[#00575f] text-white transition-all shadow-md active:scale-95 cursor-pointer border-none flex items-center gap-2"
              >
                {saving && <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />}
                Save Changes
              </button>
            </div>
          </form>
        </section>

        {/* ════════════════════════════════════════════
            CARD 2: LINKED COLLECTION ACCOUNT
        ════════════════════════════════════════════ */}
        <section className="bg-white rounded-3xl border-2 border-[#006972]/12 shadow-sm overflow-hidden p-5 sm:p-7 space-y-4">
          <div className="flex items-center justify-between border-b border-[#006972]/10 pb-3">
            <h2 className="font-headline text-[18px] font-bold text-[#006972] flex items-center gap-2">
              <Icon name="account_balance_wallet" size={22} />
              Linked Collection Account
            </h2>
            <button
              onClick={() => setShowAccountModal(true)}
              className="font-label text-[13px] font-bold text-[#006972] hover:underline bg-transparent border-none cursor-pointer flex items-center gap-1"
            >
              <Icon name="edit" size={15} />
              {hasAccount ? 'Change Account' : 'Connect Account'}
            </button>
          </div>

          {hasAccount ? (
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#fbfaee] border border-deep-navy/5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#006972]/10 text-[#006972] flex items-center justify-center shrink-0">
                  <Icon name={accountType === 'bank' ? 'account_balance' : 'payments'} size={24} />
                </div>
                <div>
                  <p className="font-headline text-[15px] font-bold text-deep-navy capitalize">{accountType} Account</p>
                  <p className="font-body text-[12px] text-on-surface-variant">Title: <strong>{accountTitle}</strong> • No: <strong>{accountNumber}</strong></p>
                </div>
              </div>
              <span className="text-[11px] font-label font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Icon name="check_circle" size={13} /> Active
              </span>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left flex items-center justify-between">
              <div>
                <p className="font-headline text-[14px] font-bold text-amber-900">No Collection Account Linked</p>
                <p className="font-body text-[12px] text-amber-800/80">Connect your JazzCash or Bank details so members know where to send dues.</p>
              </div>
              <button
                onClick={() => setShowAccountModal(true)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-label text-[12px] font-bold transition-all shadow-sm border-none cursor-pointer shrink-0 ml-3"
              >
                Connect Now
              </button>
            </div>
          )}
        </section>

        {/* ════════════════════════════════════════════
            CARD 3: ACCESS CONTROL & MEMBER MANAGEMENT
        ════════════════════════════════════════════ */}
        <section className="bg-white rounded-3xl border-2 border-[#006972]/12 shadow-sm overflow-hidden p-5 sm:p-7 space-y-4">
          <h2 className="font-headline text-[18px] font-bold text-[#006972] flex items-center gap-2 border-b border-[#006972]/10 pb-3">
            <Icon name="admin_panel_settings" size={22} />
            Access Control & Roles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Invite Code Tile */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="font-label text-[11px] font-bold uppercase text-on-surface-variant tracking-wider">Committee Invite Code</span>
                <span className="font-mono text-[13px] font-bold text-[#006972] bg-[#006972]/10 px-2.5 py-0.5 rounded-lg">{inviteCode}</span>
              </div>
              <p className="font-body text-[12px] text-on-surface-variant">Share this code with trusted members to join your pool.</p>
              <button
                onClick={handleRegenerateInviteCode}
                className="w-full py-2.5 rounded-xl bg-white border border-[#006972]/20 hover:bg-[#006972]/5 text-[#006972] font-label text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Icon name="refresh" size={16} /> Regenerate Code
              </button>
            </div>

            {/* Promote Co-Organizer Tile */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-left">
              <span className="font-label text-[11px] font-bold uppercase text-on-surface-variant tracking-wider">Co-Organizer Role</span>
              <p className="font-body text-[12px] text-on-surface-variant">Grant co-organizer permissions to manage payments and members.</p>
              <button
                onClick={() => setShowPromoteModal(true)}
                className="w-full py-2.5 rounded-xl bg-[#006972] hover:bg-[#00575f] text-white font-label text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border-none shadow-sm"
              >
                <Icon name="person_add" size={16} /> Promote Co-Organizer
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            CARD 4: DANGER ZONE
        ════════════════════════════════════════════ */}
        <section className="bg-rose-50/60 rounded-3xl border-2 border-rose-200 p-5 sm:p-7 space-y-4 text-left">
          <h2 className="font-headline text-[18px] font-bold text-rose-700 flex items-center gap-2 border-b border-rose-200 pb-3">
            <Icon name="warning" size={22} className="text-rose-600" />
            Danger Zone
          </h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-headline text-[15px] font-bold text-rose-900">Close Committee Pool</p>
              <p className="font-body text-[12px] text-rose-700/80">Permanently close this committee. All active member slots will be revoked.</p>
            </div>
            <button
              onClick={() => setShowCloseModal(true)}
              className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-label text-[13px] font-bold transition-all shadow-md active:scale-95 cursor-pointer border-none shrink-0"
            >
              Close Committee
            </button>
          </div>
        </section>

      </main>

      {/* ════════════════════════════════════════════
          MODAL 1: LINK / EDIT ACCOUNT MODAL
      ════════════════════════════════════════════ */}
      {showAccountModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xl border border-[#006972]/15">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-[18px] font-bold text-deep-navy">Update Collection Account</h3>
              <button onClick={() => setShowAccountModal(false)} className="p-2 rounded-full hover:bg-slate-100 text-on-surface-variant cursor-pointer border-none bg-transparent">
                <Icon name="close" size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setHasAccount(true);
                setShowAccountModal(false);
                showToast('Collection account updated!');
              }}
              className="space-y-4 text-left"
            >
              <div className="space-y-1">
                <label className="block font-label text-[12px] font-bold text-deep-navy">Account Provider</label>
                <select
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  className="w-full h-11 px-3 bg-slate-50 border-2 border-[#006972]/15 rounded-xl font-body text-[14px] text-deep-navy outline-none cursor-pointer"
                >
                  <option value="jazzcash">JazzCash Mobile Wallet</option>
                  <option value="easypaisa">EasyPaisa Mobile Wallet</option>
                  <option value="bank">Bank Account (IBAN)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-label text-[12px] font-bold text-deep-navy">Account Title</label>
                <input
                  type="text"
                  required
                  value={accountTitle}
                  onChange={(e) => setAccountTitle(e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border-2 border-[#006972]/15 rounded-xl font-body text-[14px] text-deep-navy outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-label text-[12px] font-bold text-deep-navy">Account Number / IBAN</label>
                <input
                  type="text"
                  required
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border-2 border-[#006972]/15 rounded-xl font-body text-[14px] text-deep-navy outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAccountModal(false)}
                  className="flex-1 py-3 rounded-2xl font-label text-[13px] font-bold bg-slate-100 hover:bg-slate-200 text-deep-navy border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl font-label text-[13px] font-bold bg-[#006972] hover:bg-[#00575f] text-white border-none cursor-pointer shadow-md"
                >
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════
          MODAL 2: PROMOTE CO-ORGANIZER MODAL
      ════════════════════════════════════════════ */}
      {showPromoteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 space-y-4 shadow-2xl border border-[#006972]/15 text-left">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-[18px] font-bold text-deep-navy">Promote Co-Organizer</h3>
              <button onClick={() => setShowPromoteModal(false)} className="p-2 rounded-full hover:bg-slate-100 text-on-surface-variant cursor-pointer border-none bg-transparent">
                <Icon name="close" size={20} />
              </button>
            </div>

            <p className="font-body text-[13px] text-on-surface-variant">
              Select an approved committee member to promote them to Co-Organizer.
            </p>

            <form onSubmit={handlePromoteCoOrganizer} className="space-y-4">
              <div className="space-y-1">
                <label className="block font-label text-[12px] font-bold text-deep-navy">Select Member</label>
                <select
                  required
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="w-full h-12 px-3 bg-slate-50 border-2 border-[#006972]/15 rounded-xl font-body text-[14px] text-deep-navy outline-none cursor-pointer"
                >
                  <option value="">-- Choose Member --</option>
                  {membersList.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPromoteModal(false)}
                  className="flex-1 py-3 rounded-2xl font-label text-[13px] font-bold bg-slate-100 hover:bg-slate-200 text-deep-navy border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedMember}
                  className="flex-1 py-3 rounded-2xl font-label text-[13px] font-bold bg-[#006972] hover:bg-[#00575f] text-white border-none cursor-pointer shadow-md disabled:opacity-50"
                >
                  Promote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════
          MODAL 3: CLOSE COMMITTEE CONFIRMATION
      ════════════════════════════════════════════ */}
      {showCloseModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xs w-full p-6 text-center space-y-4 shadow-2xl border border-rose-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <Icon name="warning" size={24} />
            </div>
            <div>
              <h3 className="font-headline text-[18px] font-bold text-deep-navy">Close Committee?</h3>
              <p className="font-body text-[13px] text-on-surface-variant mt-1">This action is permanent and cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCloseModal(false)}
                className="flex-1 py-3 rounded-2xl font-label text-[13px] font-bold bg-slate-100 hover:bg-slate-200 text-deep-navy cursor-pointer border-none"
              >Cancel</button>
              <button
                onClick={() => {
                  setShowCloseModal(false);
                  navigate('/dashboard');
                }}
                className="flex-1 py-3 rounded-2xl font-label text-[13px] font-bold bg-rose-600 hover:bg-rose-700 text-white cursor-pointer border-none shadow-md"
              >Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
