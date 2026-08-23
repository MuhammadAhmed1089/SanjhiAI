import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/Icon';
import logo from '../../assets/screen.png';
import { COUNTRIES, DEFAULT_COUNTRY, validatePhone } from '../../data/countries';

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

  const strength = getStrength(password);

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 jali-pattern pointer-events-none z-0"></div>
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-secondary-container/20 to-transparent pointer-events-none z-0"></div>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-16 relative z-10">
        <div className="w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/10 overflow-hidden flex flex-col relative">
          
          {/* Top App Bar */}
          <header className="w-full top-0 sticky bg-surface-container-lowest flex items-center px-4 py-4 z-20">
            <button
              onClick={() => navigate('/signup')}
              aria-label="Go back"
              className="text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full p-2 active:scale-95 duration-150 cursor-pointer"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          </header>

          <div className="px-4 md:px-6 pb-8 flex flex-col items-center">
            {/* Logo & Brand Header */}
            <div className="mb-6 flex flex-col items-center">
              <img
                alt="Sanjhi Handshake Logo"
                src={logo}
                className="w-32 h-32 md:w-36 md:h-36 mb-4 object-contain logo-green drop-shadow-md"
              />
              <h1 className="font-headline text-[24px] font-semibold text-on-surface text-center mb-1">
                Create Account
              </h1>
              <p className="font-body text-[16px] text-on-surface-variant text-center">
                {isPhone ? 'Sign up with your phone number to join the community.' : 'Sign up with your email address to join the community.'}
              </p>
            </div>

            {/* Form Area */}
            <form onSubmit={handleSubmit} className="w-full space-y-3.5">
              
              {/* Full Name */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="bg-[#006972] text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">person</span>
                  </div>
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="block w-full pl-14 pr-4 py-3 bg-surface border border-outline-variant/30 rounded-lg text-on-surface focus:ring-2 focus:ring-[#006972] focus:border-[#006972] transition-shadow outline-none"
                  id="fullName"
                />
              </div>

              {/* Age & Gender Grid */}
              <div className="grid grid-cols-2 gap-2">
                {/* Age */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <div className="bg-[#765a05] text-white rounded-full w-8 h-8 flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm">cake</span>
                    </div>
                  </div>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="Age"
                    className="block w-full pl-12 pr-4 py-3 bg-surface border border-outline-variant/30 rounded-lg text-on-surface focus:ring-2 focus:ring-[#006972] focus:border-[#006972] transition-shadow outline-none"
                    id="age"
                  />
                </div>

                {/* Gender */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <div className="bg-[#525f71] text-white rounded-full w-8 h-8 flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm">wc</span>
                    </div>
                  </div>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="block w-full pl-12 pr-8 py-3 bg-surface border border-outline-variant/30 rounded-lg text-on-surface-variant focus:ring-2 focus:ring-[#006972] focus:border-[#006972] transition-shadow appearance-none outline-none cursor-pointer"
                    id="gender"
                  >
                    <option value="" disabled>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Phone or Email */}
              {isPhone ? (
                <div className="relative" ref={pickerRef}>
                  <div className="flex gap-2">
                    {/* Country Code Dropdown */}
                    <div className="relative w-1/3">
                      <button
                        type="button"
                        onClick={() => setShowCountryPicker(!showCountryPicker)}
                        className="w-full h-[50px] pl-3 pr-8 bg-surface border border-outline-variant/30 rounded-lg text-on-surface flex items-center gap-1.5 focus:ring-2 focus:ring-[#006972] outline-none transition-shadow"
                      >
                        <span className="text-xl">{country.flag ? <img src={country.flag} alt="" className="w-5 h-4 object-cover rounded-sm inline" /> : '🇵🇰'}</span>
                        <span className="text-sm font-semibold">{country.dial}</span>
                      </button>
                      <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-on-surface-variant text-sm">expand_more</span>
                      </div>

                      {/* Country picker popup */}
                      {showCountryPicker && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-outline-variant/30 rounded-xl shadow-xl z-50 overflow-hidden">
                          <div className="p-2 border-b border-outline-variant/20">
                            <input
                              type="text"
                              placeholder="Search country..."
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              className="w-full bg-surface border border-outline-variant/20 rounded-md px-3 py-1.5 text-sm outline-none"
                              autoFocus
                            />
                          </div>
                          <div className="max-h-48 overflow-y-auto">
                            {filteredCountries.map((c) => (
                              <button
                                key={c.code + c.dial}
                                type="button"
                                onClick={() => { setCountry(c); setPhone(''); setShowCountryPicker(false); setCountrySearch(''); }}
                                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#006972]/10 text-left text-sm"
                              >
                                <img src={c.flag} alt="" className="w-5 h-3.5 object-cover rounded-sm" />
                                <span className="flex-1 truncate">{c.name}</span>
                                <span className="text-xs text-on-surface-variant font-medium">{c.dial}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Number Input */}
                    <div className="relative w-2/3">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <div className="bg-[#006972] text-white rounded-full w-8 h-8 flex items-center justify-center">
                          <span className="material-symbols-outlined text-sm">smartphone</span>
                        </div>
                      </div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="300 1234567"
                        maxLength={country.maxLength}
                        className="block w-full pl-12 pr-4 py-3 bg-surface border border-outline-variant/30 rounded-lg text-on-surface focus:ring-2 focus:ring-[#006972] focus:border-[#006972] transition-shadow outline-none"
                        id="phone"
                      />
                    </div>
                  </div>
                  {phone && phoneResult.message && (
                    <p className={`text-[12px] font-medium mt-1 ml-1 ${phoneResult.valid ? 'text-[#006972]' : 'text-amber-600'}`}>
                      {phoneResult.valid ? '✓ ' : ''}{phoneResult.message}
                    </p>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <div className="bg-[#3a5a72] text-white rounded-full w-8 h-8 flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm">mail</span>
                    </div>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="block w-full pl-14 pr-4 py-3 bg-surface border border-outline-variant/30 rounded-lg text-on-surface focus:ring-2 focus:ring-[#006972] focus:border-[#006972] transition-shadow outline-none"
                    id="email"
                  />
                </div>
              )}

              {/* Password */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="bg-[#4a5670] text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">lock</span>
                  </div>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="block w-full pl-14 pr-12 py-3 bg-surface border border-outline-variant/30 rounded-lg text-on-surface focus:ring-2 focus:ring-[#006972] focus:border-[#006972] transition-shadow outline-none"
                  id="password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-on-surface outline-none"
                >
                  <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>

              {/* Password Strength Indicator */}
              <div className="flex gap-1 mt-2 mb-2 px-1">
                {[1, 2, 3, 4].map((level) => {
                  const active = strength >= level;
                  const colors = ['bg-red-400', 'bg-orange-400', 'bg-amber-400', 'bg-[#006972]'];
                  return (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${active ? colors[strength - 1] : 'bg-surface-variant'}`}
                    />
                  );
                })}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="bg-[#3a7060] text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">lock_reset</span>
                  </div>
                </div>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Confirm Password"
                  className="block w-full pl-14 pr-12 py-3 bg-surface border border-outline-variant/30 rounded-lg text-on-surface focus:ring-2 focus:ring-[#006972] focus:border-[#006972] transition-shadow outline-none"
                  id="confirmPassword"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-on-surface outline-none"
                >
                  <span className="material-symbols-outlined">{showConfirm ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>

              {confirmPass && !passwordsMatch && (
                <p className="text-[12px] text-red-500 ml-1">Passwords don't match</p>
              )}
              {confirmPass && passwordsMatch && (
                <p className="text-[12px] text-[#006972] ml-1">✓ Passwords match</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!name || !age || !gender || (isPhone ? !phoneResult.valid : !emailValid) || !passwordStrong || !passwordsMatch}
                className="w-full bg-[#82d3de] text-[#001f23] hover:bg-[#006972] hover:text-white font-semibold py-4 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-sm mt-6 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Create Account
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 flex flex-col items-center gap-2">
              <p className="font-body text-[16px] text-on-surface-variant">
                Already have an account?{' '}
                <button onClick={() => navigate('/login')} className="text-[#006972] font-bold hover:underline bg-transparent border-none cursor-pointer">
                  Log in
                </button>
              </p>
              <button
                onClick={() => navigate(isPhone ? '/signup/email' : '/signup/phone')}
                className="font-semibold text-sm text-on-surface-variant hover:text-on-surface flex items-center gap-1 transition-colors bg-transparent border-none cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">swap_horiz</span>
                {isPhone ? 'Use email instead' : 'Use phone instead'}
              </button>
            </div>
          </div>

          {/* Trust Tip Card */}
          <div className="bg-surface-container-low border-t border-outline-variant/10 p-4 flex items-start gap-4">
            <div className="bg-[#ffdf96] text-[#251a00] rounded-full p-2 flex-shrink-0 mt-1">
              <span className="material-symbols-outlined">verified_user</span>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-on-surface mb-1">Building Community Trust</h4>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Sanjhi relies on authentic profiles to maintain a safe, shared environment for everyone to exchange resources securely.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function getStrength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
