import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/Icon';
import { COUNTRIES, DEFAULT_COUNTRY, validatePhone } from '../../data/countries';

/* ── Icon color themes ── */
const ICON_THEMES = {
  name:     'bg-[#4a6670]',
  age:      'bg-[#8a7350]',
  gender:   'bg-[#7a6070]',
  phone:    'bg-[#006972]',
  email:    'bg-[#3a5a72]',
  password: 'bg-[#4a5670]',
  confirm:  'bg-[#3a7060]',
};

export default function SignUpForm() {
  const navigate = useNavigate();
  const { method } = useParams();
  const isPhone = method !== 'email';

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [phone, setPhone] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const pickerRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) setShowCountryPicker(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const phoneResult = isPhone ? validatePhone(phone, country) : { valid: false, message: '' };
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordsMatch = password && confirmPass && password === confirmPass;
  const passwordStrong = password.length >= 8;

  const filteredCountries = COUNTRIES.filter(
    (c) => c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
           c.dial.includes(countrySearch) ||
           c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  function handlePhoneChange(e) {
    setPhone(e.target.value.replace(/\D/g, '').slice(0, country.maxLength));
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate('/otp');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative py-6 px-4">
      {/* Animated background blobs — OUTSIDE overflow zone */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Glass card */}
      <div className="glass-card w-full max-w-lg relative z-10 p-6 md:p-8 animate-fade-up">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 md:top-5 md:left-5 w-9 h-9 rounded-full flex items-center justify-center text-deep-navy/50 hover:text-deep-navy hover:bg-white/50 transition-all"
        >
          <Icon name="arrow_back_ios" size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="font-headline text-[30px] md:text-[40px] leading-tight font-bold text-deep-navy mb-1">
            Create Account
          </h1>
          <p className="font-body text-[14px] text-on-surface-variant">
            {isPhone ? 'Sign up with your phone number' : 'Sign up with your email address'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">

          {/* ── Full Name ── */}
          <FloatingField icon="person" theme={ICON_THEMES.name} label="Full Name" active={name.length > 0}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=""
              className="field-input"
            />
          </FloatingField>

          {/* ── Age + Gender ── */}
          <div className="flex gap-2.5">
            <FloatingField icon="cake" theme={ICON_THEMES.age} label="Age" wrapperClass="w-24 shrink-0" active={age.length > 0}>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value.replace(/\D/g, '').slice(0, 3))}
                placeholder=""
                className="field-input"
              />
            </FloatingField>

            <FloatingField icon="wc" theme={ICON_THEMES.gender} label="Gender" wrapperClass="flex-1" active={gender.length > 0}>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="field-input field-select"
              >
                <option value="" disabled hidden> </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </FloatingField>
          </div>

          {/* ── Phone / Email ── */}
          {isPhone ? (
            <div className="relative" ref={pickerRef}>
              <div className="flex gap-2">
                {/* Country code picker button */}
                <button
                  type="button"
                  onClick={() => setShowCountryPicker(!showCountryPicker)}
                  className="shrink-0 bg-white/60 backdrop-blur-sm border border-white/70 rounded-xl px-2.5 py-0 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-teal-emerald/40 transition-all shadow-sm hover:bg-white/80 h-[52px]"
                >
                  <img src={country.flag} alt={country.code} className="w-6 h-4 rounded-sm object-cover" />
                  <span className="font-body text-[14px] font-semibold text-deep-navy">{country.dial}</span>
                  <Icon name="expand_more" className="text-on-surface-variant" size={18} />
                </button>

                {/* Phone input */}
                <FloatingField icon="smartphone" theme={ICON_THEMES.phone} label="Phone Number" wrapperClass="flex-1" active={phone.length > 0}>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder=""
                    maxLength={country.maxLength}
                    className="field-input"
                  />
                </FloatingField>
              </div>

              {phone && phoneResult.message && (
                <p className={`text-[11px] font-label mt-1 ml-12 ${phoneResult.valid ? 'text-teal-emerald' : 'text-amber-600'}`}>
                  {phoneResult.valid ? '✓ ' : ''}{phoneResult.message}
                </p>
              )}

              {/* Country picker dropdown */}
              {showCountryPicker && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/97 backdrop-blur-xl border border-white/60 rounded-2xl shadow-2xl z-50 overflow-hidden animate-slide-down">
                  <div className="p-3 border-b border-deep-navy/5">
                    <div className="relative">
                      <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                      <input
                        type="text"
                        placeholder="Search country..."
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        className="w-full bg-deep-navy/5 border-none rounded-lg pl-10 pr-4 py-2.5 text-[14px] font-body text-deep-navy placeholder:text-deep-navy/30 focus:outline-none focus:ring-1 focus:ring-teal-emerald/40"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="max-h-56 overflow-y-auto py-1">
                    {filteredCountries.map((c) => (
                      <button
                        key={c.code + c.dial}
                        type="button"
                        onClick={() => { setCountry(c); setPhone(''); setShowCountryPicker(false); setCountrySearch(''); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-teal-emerald/5 transition-colors text-left ${
                          country.code === c.code && country.dial === c.dial ? 'bg-teal-emerald/10' : ''
                        }`}
                      >
                        <img src={c.flag} alt={c.code} className="w-7 h-5 rounded-sm object-cover shrink-0 shadow-sm" />
                        <span className="flex-1 font-body text-[14px] text-deep-navy">{c.name}</span>
                        <span className="font-label text-[13px] text-on-surface-variant font-medium">{c.dial}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <FloatingField icon="mail" theme={ICON_THEMES.email} label="Email Address" active={email.length > 0}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                className="field-input"
              />
            </FloatingField>
          )}

          {/* ── Password ── */}
          <FloatingField icon="lock" theme={ICON_THEMES.password} label="Password" active={password.length > 0} trailing={
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-on-surface-variant hover:text-deep-navy transition-colors p-1">
              <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={20} />
            </button>
          }>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              className="field-input pr-11"
            />
          </FloatingField>

          {/* Password strength bar */}
          {password && (
            <div className="flex gap-1.5 -mt-1.5 px-12">
              {[1, 2, 3, 4].map((level) => {
                const s = getStrength(password);
                const active = s >= level;
                const colors = ['bg-red-400', 'bg-orange-400', 'bg-amber-400', 'bg-teal-emerald'];
                return <div key={level} className={`h-1 flex-1 rounded-full transition-all duration-500 ${active ? colors[s - 1] : 'bg-deep-navy/10'}`} />;
              })}
            </div>
          )}

          {/* ── Confirm Password ── */}
          <FloatingField icon="lock_reset" theme={ICON_THEMES.confirm} label="Confirm Password" active={confirmPass.length > 0} trailing={
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-on-surface-variant hover:text-deep-navy transition-colors p-1">
              <Icon name={showConfirm ? 'visibility_off' : 'visibility'} size={20} />
            </button>
          }>
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder=""
              className="field-input pr-11"
            />
          </FloatingField>

          {confirmPass && !passwordsMatch && <p className="text-[11px] font-label text-red-500 -mt-1 ml-12">Passwords don't match</p>}
          {confirmPass && passwordsMatch && <p className="text-[11px] font-label text-teal-emerald -mt-1 ml-12">✓ Passwords match</p>}

          {/* ── Submit ── */}
          <button
            type="submit"
            className="mt-3 w-full font-label text-[14px] font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-r from-teal-emerald to-teal-emerald/80 text-white shadow-lg shadow-teal-emerald/20 hover:shadow-xl hover:shadow-teal-emerald/30 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!name || !age || !gender || (isPhone ? !phoneResult.valid : !emailValid) || !passwordStrong || !passwordsMatch}
          >
            Create Account
            <Icon name="arrow_forward" size={18} />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-5 text-center">
          <p className="font-body text-[13px] text-on-surface-variant">
            Already have an account?{' '}
            <button onClick={() => navigate('/otp')} className="font-label text-[13px] font-semibold text-teal-emerald hover:text-secondary underline underline-offset-4 decoration-teal-emerald/30 transition-all">
              Log in
            </button>
          </p>
        </div>
        <div className="mt-2 text-center">
          <button
            onClick={() => navigate(isPhone ? '/signup/email' : '/signup/phone')}
            className="font-body text-[13px] text-on-surface-variant hover:text-teal-emerald transition-colors flex items-center gap-1 mx-auto"
          >
            <Icon name="swap_horiz" size={16} />
            {isPhone ? 'Use email instead' : 'Use phone instead'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── */
/* FloatingField — label animates up on focus or when filled   */
/* ──────────────────────────────────────────────────────────── */
function FloatingField({ icon, theme, label, children, wrapperClass = '', trailing, active = false }) {
  const [focused, setFocused] = useState(false);
  const isLifted = focused || active;

  return (
    <div
      className={`relative ${wrapperClass}`}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {/* Icon badge */}
      {icon && (
        <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl ${theme} flex items-center justify-center shadow-md z-10`}>
          <Icon name={icon} className="text-white" size={20} />
        </div>
      )}

      {/* Floating label */}
      <label
        className={`absolute left-12 pointer-events-none transition-all duration-200 ease-out font-label
          ${isLifted
            ? 'top-1 text-[10px] font-semibold tracking-wide'
            : 'top-1/2 -translate-y-1/2 text-[14px]'
          }
          ${focused ? 'text-teal-emerald' : 'text-on-surface-variant'}
        `}
      >
        {label}
      </label>

      {/* Children (input/select) */}
      <div className="relative">
        {children}
        {trailing && (
          <div className="absolute right-1 top-1/2 -translate-y-1/2 z-10">{trailing}</div>
        )}
      </div>
    </div>
  );
}

/* ── Password strength ── */
function getStrength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
