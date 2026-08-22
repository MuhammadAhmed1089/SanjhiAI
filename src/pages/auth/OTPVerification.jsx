import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(59);
  const [error, setError] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index, value) => {
    const val = value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    setError(false);
    if (val && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    navigate('/profile-setup');
  };

  return (
    <div className="min-h-screen bg-surface-warm jali-dots flex flex-col items-center overflow-x-hidden">
      <main className="w-full max-w-[480px] min-h-screen flex flex-col bg-surface-warm shadow-sm lg:shadow-xl lg:my-8 lg:rounded-[32px] overflow-hidden border border-deep-navy/10 mx-auto">
        <TopAppBar showBack />
        <div className="flex-1 px-4 pt-8 pb-8 flex flex-col w-full">
          <div className="mb-8 w-full flex flex-col items-center text-center">
            <h1 className="font-headline text-[32px] leading-[40px] font-bold text-deep-navy mb-2 tracking-tight">
              Verify your number
            </h1>
            <p className="font-body text-[16px] text-on-surface-variant px-4">
              Code sent to <span className="font-semibold text-deep-navy">+92 3XX XXX XX45</span>
            </p>
          </div>
          <div className="w-full flex flex-col items-center mb-8">
            <div className="flex justify-center items-center gap-1 mb-2 w-full max-w-sm px-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  autoFocus={i === 0}
                  className={`otp-input w-12 h-14 bg-surface-container-lowest border rounded-xl text-center font-headline text-[36px] leading-[44px] text-deep-navy focus:outline-none transition-all shadow-sm ${
                    error ? 'border-error bg-error-container/20 focus:border-error' : 'border-outline-variant/30 focus:border-teal-emerald focus:ring-1 focus:ring-teal-emerald'
                  }`}
                />
              ))}
            </div>
            {error && (
              <div className="flex items-center justify-center text-error gap-1">
                <Icon name="error" size={14} />
                <span className="font-label text-[12px]">Invalid code. Please try again.</span>
              </div>
            )}
          </div>
          <div className="flex-1" />
          <div className="w-full flex flex-col items-center mt-auto">
            {timeLeft > 0 ? (
              <div className="flex items-center gap-1 mb-4 font-label text-[14px]">
                <span className="text-on-surface-variant">Resend code in</span>
                <span className="text-deep-navy font-bold w-12 text-left">
                  00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </span>
              </div>
            ) : (
              <button onClick={() => setTimeLeft(59)} className="mb-4 font-label text-[14px] text-teal-emerald hover:opacity-80 transition-colors">
                Resend OTP
              </button>
            )}
            <Button fullWidth onClick={handleVerify} className="h-14">
              Verify
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
