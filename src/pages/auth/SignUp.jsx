import { useNavigate } from 'react-router-dom';
import TopAppBar from '../../components/TopAppBar';
import Icon from '../../components/Icon';

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col jali-pattern bg-surface relative">
      <TopAppBar showBack />
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-16 py-8 z-10 relative">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8 text-center md:text-left">
            <h1 className="font-headline text-[32px] md:text-[48px] leading-[40px] md:leading-[56px] font-bold text-deep-navy mb-2">
              Create your account
            </h1>
            <p className="font-body text-[16px] leading-[24px] text-on-surface-variant">
              We'll send you a one-time password to verify your identity.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate('/signup/phone')}
              className="relative w-full group text-left bg-surface-container-lowest border border-teal-emerald rounded-xl p-6 shadow-[0_4px_24px_rgba(0,105,114,0.08)] hover:shadow-[0_8px_32px_rgba(0,105,114,0.12)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute -top-3 right-6 bg-mustard-gold text-deep-navy px-3 py-1 rounded-full font-label text-[12px] font-medium flex items-center gap-1 shadow-sm">
                <Icon name="star" filled size={14} />
                Recommended
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                  <Icon name="smartphone" className="text-on-secondary-container" />
                </div>
                <div className="flex-1">
                  <h3 className="font-headline text-[20px] leading-tight text-deep-navy mb-1">
                    Continue with Phone
                  </h3>
                  <p className="font-body text-[14px] text-on-surface-variant">
                    Quickest way to verify
                  </p>
                </div>
                <div className="shrink-0 text-teal-emerald opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 duration-300">
                  <Icon name="arrow_forward" />
                </div>
              </div>
            </button>
            <button
              onClick={() => navigate('/signup/email')}
              className="w-full group text-left bg-transparent border border-deep-navy/10 rounded-xl p-6 hover:bg-surface-container-lowest hover:border-deep-navy/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-deep-navy/10 flex items-center justify-center shrink-0 bg-surface-container-low group-hover:bg-surface-container-lowest transition-colors">
                  <Icon name="mail" className="text-deep-navy" />
                </div>
                <div className="flex-1">
                  <h3 className="font-headline text-[20px] leading-tight text-deep-navy mb-1">
                    Continue with Email
                  </h3>
                  <p className="font-body text-[14px] text-on-surface-variant">
                    Use your email address
                  </p>
                </div>
                <div className="shrink-0 text-deep-navy/40 group-hover:text-deep-navy transition-colors">
                  <Icon name="arrow_forward" />
                </div>
              </div>
            </button>
          </div>
          <div className="mt-8 text-center pt-8 border-t border-deep-navy/10">
            <p className="font-body text-[16px] text-on-surface-variant">
              Already have an account?{' '}
              <button onClick={() => navigate('/otp')} className="font-label text-[14px] font-semibold text-teal-emerald hover:text-secondary underline underline-offset-4 decoration-2 decoration-teal-emerald/30 transition-all">
                Log in
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
