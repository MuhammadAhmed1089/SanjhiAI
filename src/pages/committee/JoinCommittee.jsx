import { useNavigate } from 'react-router-dom';
import AuthAmbientBackground from '../../components/AuthAmbientBackground';
import logo from '../../assets/screen.png';
import Icon from '../../components/Icon';

export default function JoinCommittee() {
  const navigate = useNavigate();
  return (
    <AuthAmbientBackground showTicker={true}>
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col items-center justify-center min-h-[calc(100vh-36px)]">
        
        {/* Main Glass Card matching login/signup design */}
        <main className="w-full bg-white/90 backdrop-blur-2xl border border-[#006972]/20 shadow-[0_24px_70px_-15px_rgba(0,105,114,0.22),0_0_0_1px_rgba(0,105,114,0.1)] rounded-2xl sm:rounded-3xl p-6 sm:p-10 animate-fade-up relative z-10">
          
          {/* Header Navigation */}
          <header className="w-full flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#006972]/5 hover:bg-[#006972]/15 border border-[#006972]/15 text-[#006972] transition-colors cursor-pointer active:scale-95"
            >
              <Icon name="arrow_back" size={20} />
            </button>
            <div className="w-10" />
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
              Committee Preview
            </h1>
            <p className="font-body text-[13px] sm:text-[14px] text-on-surface-variant">
              Review the terms below before submitting your request to join.
            </p>
          </div>

          <section className="flex flex-col gap-2 mb-8">
            <h2 className="font-headline text-[26px] font-bold text-[#006972]">Diwali Savings Fund</h2>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#f5f4e8] rounded-2xl p-5 flex items-start gap-4 border border-[#c4c6cc]/30">
              <div className="bg-[#9eecf6] text-[#0c6d76] rounded-full p-3 flex-shrink-0">
                <Icon name="payments" size={24} />
              </div>
              <div>
                <span className="font-label text-[12px] text-on-surface-variant uppercase tracking-wider">Contribution</span>
                <p className="font-headline text-[20px] text-deep-navy font-bold">Rs. 5,000 <span className="font-body text-[14px] text-on-surface-variant">/ month</span></p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-[#f5f4e8] rounded-2xl p-4 flex items-center gap-4 border border-[#c4c6cc]/30">
                <Icon name="event_repeat" size={20} className="text-on-surface-variant" />
                <div>
                  <span className="font-label text-[12px] text-on-surface-variant">Interval</span>
                  <p className="font-body text-[14px] text-deep-navy font-semibold">Every 1 month</p>
                </div>
              </div>
              <div className="bg-[#f5f4e8] rounded-2xl p-4 flex items-center gap-4 border border-[#c4c6cc]/30">
                <Icon name="hourglass_empty" size={20} className="text-on-surface-variant" />
                <div>
                  <span className="font-label text-[12px] text-on-surface-variant">Duration</span>
                  <p className="font-body text-[14px] text-deep-navy font-semibold">10 Months</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#f5f4e8] rounded-2xl p-5 flex items-center justify-between mb-8 border border-[#c4c6cc]/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white bg-surface-variant">
                <img alt="Organizer" className="object-cover w-full h-full" src="/avatar.svg"/>
              </div>
              <div>
                <span className="font-label text-[11px] text-deep-navy uppercase tracking-wider">Organizer</span>
                <p className="font-body text-[16px] text-deep-navy font-bold">Zaid Ahmed</p>
              </div>
            </div>
          </section>

          <button onClick={() => navigate('/join-request-sent')} className="w-full bg-[#006972] hover:bg-[#00575f] text-white font-label text-[14px] py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer">
            Request to Join
            <Icon name="arrow_forward" size={20} />
          </button>
          <p className="font-label text-[12px] text-on-surface-variant text-center mt-4 flex items-center gap-1 justify-center">
            <Icon name="lock" size={16} />
            Your request will need approval from the Organizer
          </p>
        </main>
      </div>
    </AuthAmbientBackground>
  );
}
