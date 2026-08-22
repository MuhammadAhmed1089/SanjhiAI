import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import logo from '../../assets/screen.png';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden jali-pattern bg-surface-warm px-4">
      <div className="relative z-10 max-w-screen-md w-full flex flex-col items-center text-center gap-3">
        <img
          alt="Sanjhi Logo"
          className="w-32 md:w-40 object-contain mb-2"
          src={logo}
        />
        <div className="flex flex-col gap-1">
          <h1 className="font-headline text-[28px] md:text-[40px] leading-[36px] md:leading-[48px] font-bold text-deep-navy tracking-tight">
            Welcome to Sanjhi
          </h1>
          <h2 className="font-headline text-[20px] leading-[28px] text-teal-emerald" dir="rtl">
            سانجھی میں خوش آمدید
          </h2>
          <p className="font-body text-[16px] leading-[24px] text-on-surface-variant max-w-md mx-auto mt-2">
            Building trust through collective sharing.
          </p>
        </div>
        <div className="flex flex-col w-full max-w-sm gap-3 mt-4">
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
