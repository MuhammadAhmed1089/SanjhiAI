import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden jali-pattern bg-surface-warm px-4">
      <div className="relative z-10 max-w-screen-md w-full flex flex-col items-center text-center gap-8">
        <img
          alt="Sanjhi Logo"
          className="w-48 md:w-64 object-contain mb-4"
          src="/logo.svg"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-headline text-[32px] md:text-[48px] leading-[40px] md:leading-[56px] font-bold text-deep-navy tracking-tight">
            Welcome to Sanjhi
          </h1>
          <h2 className="font-headline text-[24px] leading-[32px] text-teal-emerald" dir="rtl">
            سانجھی میں خوش آمدید
          </h2>
          <p className="font-body text-[18px] leading-[28px] text-on-surface-variant max-w-md mx-auto mt-4">
            Building trust through collective sharing.
          </p>
        </div>
        <div className="flex flex-col w-full max-w-sm gap-4 mt-8">
          <Button fullWidth onClick={() => navigate('/signup')}>
            Get Started
          </Button>
          <Button variant="secondary" fullWidth onClick={() => navigate('/otp')}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
