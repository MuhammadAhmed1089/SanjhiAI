import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import { verifyOTP, resendOTP, setupProfile } from '../../services/authService';

export default function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();

  const { target = '+923000000000', purpose = 'signup', fullName, age, sex, password, devCode } = location.state || {};

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(59);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendStatus, setResendStatus] = useState('');
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
    setErrorMessage('');
    if (val && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    try {
      setErrorMessage('');
      const res = await resendOTP({ target, purpose });
      setTimeLeft(59);
      setResendStatus(res?.devCode ? `Code resent (Dev: ${res.devCode})` : 'New verification code sent!');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to resend code');
    }
  };

  const handleVerify = async () => {
    const codeStr = otp.join('');
    if (codeStr.length < 6) {
      setErrorMessage('Please enter the full 6-digit verification code.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      // 1. Verify OTP with backend via authService (creates user in database)
      const result = await verifyOTP({ target, code: codeStr, purpose, password });

      // 2. Update user profile details in DB
      if (fullName || password) {
        await setupProfile({
          full_name: fullName,
          ...(age && { age: parseInt(age, 10) }),
          ...(sex && { sex }),
          ...(password && { password }),
        });
      }

      // 3. Navigate to dashboard or profile setup
      if (result.isNew && !fullName) {
        navigate('/profile-setup');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Invalid or expired OTP code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-warm jali-dots flex flex-col items-center overflow-x-hidden">
      <main className="w-full max-w-[480px] min-h-screen flex flex-col bg-surface-warm shadow-sm lg:shadow-xl lg:my-8 lg:rounded-[32px] overflow-hidden border border-deep-navy/10 mx-auto">
        <TopAppBar showBack />
        <div className="flex-1 px-4 pt-8 pb-8 flex flex-col w-full">
          <div className="mb-8 w-full flex flex-col items-center text-center">
            <h1 className="font-headline text-[32px] leading-[40px] font-bold text-deep-navy mb-2 tracking-tight">
              Verify your code
            </h1>
            <p className="font-body text-[16px] text-on-surface-variant px-4">
              Code sent to <span className="font-semibold text-deep-navy">{target}</span>
            </p>
            {devCode && (
              <div className="mt-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-700 text-[12px] font-mono">
                Local Dev Code: <strong>{devCode}</strong>
              </div>
            )}
            {resendStatus && (
              <div className="mt-2 text-teal-emerald text-[13px] font-body">
                {resendStatus}
              </div>
            )}
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
                    errorMessage ? 'border-red-500 bg-red-500/10 focus:border-red-500' : 'border-outline-variant/30 focus:border-teal-emerald focus:ring-1 focus:ring-teal-emerald'
                  }`}
                />
              ))}
            </div>
            {errorMessage && (
              <div className="flex items-center justify-center text-red-600 gap-1 mt-2">
                <Icon name="error" size={16} />
                <span className="font-label text-[13px]">{errorMessage}</span>
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
              <button onClick={handleResend} className="mb-4 font-label text-[14px] text-teal-emerald hover:opacity-80 transition-colors font-semibold">
                Resend OTP
              </button>
            )}
            <Button fullWidth onClick={handleVerify} disabled={loading || otp.join('').length < 6} className="h-14">
              {loading ? 'Verifying...' : 'Verify'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

