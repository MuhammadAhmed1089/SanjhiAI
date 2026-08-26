import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import logo from '../../assets/screen.png';

/* ── Suggested Prompt Cards ── */
const SUGGESTED_PROMPTS = [
  {
    icon: 'groups',
    title: 'Create a Committee',
    prompt: 'How do I create a new committee savings pool on Sanjhi?',
    color: 'bg-[#006972]/10 text-[#006972] border-[#006972]/20',
  },
  {
    icon: 'shield_with_heart',
    title: 'Check Trust Score',
    prompt: 'How is my Community Trust Score calculated and how can I increase it?',
    color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
  },
  {
    icon: 'payments',
    title: 'Payment Methods',
    prompt: 'What payment methods like JazzCash or Bank transfer are supported for monthly dues?',
    color: 'bg-amber-500/10 text-amber-800 border-amber-500/20',
  },
  {
    icon: 'event_available',
    title: 'Payout Turn Schedule',
    prompt: 'When will I receive my committee payout turn and how are turns assigned?',
    color: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
  },
];

/* ── Predefined Frontend Knowledge Base Responses ── */
const KNOWLEDGE_BASE = [
  {
    keywords: ['create', 'committee', 'pool', 'start', 'organize'],
    response: `To create a committee pool on Sanjhi:

1. Click **Create Committee** on your Dashboard.
2. Enter a pool name (e.g. *Monthly Family Savings*).
3. Set the monthly/bi-weekly contribution amount (e.g. PKR 5,000).
4. Define the capacity (number of members) and interval.
5. Share your unique **Invite Code** with trusted friends or family!`,
  },
  {
    keywords: ['trust', 'score', 'increase', 'calculate', 'reliability'],
    response: `Your **Community Trust Score** starts at **850 points**!

Here is how you can boost your rating:
• **On-time Payments (+15 pts per cycle)**: Submit your dues before the deadline.
• **Completed Pools (+50 pts)**: Successfully finish full committee cycles without delays.
• **Identity Verification (+30 pts)**: Verify your phone number and email address in Profile settings.`,
  },
  {
    keywords: ['payment', 'jazzcash', 'easypaisa', 'bank', 'due', 'pay'],
    response: `Sanjhi supports multiple payment methods across Pakistan:
• **JazzCash Mobile Wallet**
• **EasyPaisa Mobile Wallet**
• **Direct Bank Transfer (IBAN)**

All payment receipts are verified on our PostgreSQL ledger for 100% transparency!`,
  },
  {
    keywords: ['payout', 'turn', 'schedule', 'receive', 'money'],
    response: `Payout turns are assigned fairly when a committee starts:
• **Fixed Order**: Members get assigned turn #1, #2, #3 based on initial setup.
• **Automatic Reminders**: Sanjhi AI alerts you 3 days before your turn payout is due to be released to your linked account!`,
  },
  {
    keywords: ['complaint', 'dispute', 'fraud', 'issue', 'help', 'support'],
    response: `If you have an issue or payment dispute:
• Visit the **Support** section from the bottom navigation bar.
• Click **File a Complaint** to submit details directly to our admin team.
• Our AI triage system prioritizes urgent financial queries within 2 hours!`,
  },
];

export default function Assistant() {
  const navigate = useNavigate();

  // Chat message state
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: "Hello! I'm **Sanjhi AI**, your personal savings & committee assistant. How can I help you manage your pools or payments today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  /* ── Voice Input (Speech-to-Text) ── */
  function toggleVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in your browser. Please type your message.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('');
        setInputText(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  }

  /* ── Text-to-Speech (AI Voice Reader) ── */
  function handleSpeak(messageId, text) {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser.');
      return;
    }

    if (speakingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown formatting for speech
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(messageId);
    window.speechSynthesis.speak(utterance);
  }

  /* ── Send Message Handler ── */
  function handleSendMessage(textToSend) {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking and generating answer
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let matchedResponse = null;

      for (const item of KNOWLEDGE_BASE) {
        if (item.keywords.some((kw) => lowerQuery.includes(kw))) {
          matchedResponse = item.response;
          break;
        }
      }

      if (!matchedResponse) {
        matchedResponse = `I understand you are asking about "${query}".\n\nSanjhi AI is designed to help you manage your committee pools, track contributions, calculate trust scores, and escalate complaints. You can also explore our predefined topics above or contact support if you need further help!`;
      }

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: matchedResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1100);
  }

  function handleClearChat() {
    setMessages([
      {
        id: 'welcome-1',
        sender: 'ai',
        text: "Chat cleared! How can **Sanjhi AI** assist you now?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }

  return (
    <div className="min-h-screen bg-white text-deep-navy font-body antialiased flex flex-col relative overflow-x-hidden">

      {/* ══════════════════════════════════════════════════ */}
      {/*  AMBIENT BACKGROUND LAYER                         */}
      {/* ══════════════════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.35]"
          style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #006972 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#006972]/6 blur-3xl top-[-100px] left-[-100px] animate-float-y-slow" />
        <div className="absolute w-[360px] h-[360px] rounded-full bg-amber-400/6 blur-3xl bottom-[15%] right-[-60px]"
          style={{ animation: 'float-y 8s ease-in-out infinite 2s' }} />

        <img src={logo} alt="" aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] opacity-[0.035] select-none pointer-events-none"
          style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(85%) saturate(1450%) hue-rotate(152deg)' }} />
      </div>

      {/* ══════════════════════════════════════════════════ */}
      {/*  TOP APP BAR HEADER                               */}
      {/* ══════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#006972]/12 shadow-sm shrink-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate('/dashboard')}
              aria-label="Back to dashboard"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#006972]/8 hover:bg-[#006972]/15 border border-[#006972]/15 text-[#006972] transition-colors cursor-pointer active:scale-95 shrink-0"
            >
              <Icon name="arrow_back" size={20} />
            </button>

            {/* AI Avatar & Title */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#006972] to-[#00a8b5] text-white flex items-center justify-center shadow-md shadow-[#006972]/20 border border-white">
                  <Icon name="auto_awesome" size={22} className="animate-float-y-fast" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping-slow" />
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="font-headline text-[17px] sm:text-[20px] font-bold text-deep-navy truncate">
                    Sanjhi AI
                  </h1>
                  <span className="px-2 py-0.5 rounded-full bg-[#006972]/10 text-[#006972] font-label text-[10px] font-bold uppercase tracking-wider hidden sm:inline">
                    Smart Assistant
                  </span>
                </div>
                <p className="font-body text-[12px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Online • Voice Enabled
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleClearChat}
              className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-deep-navy/70 transition-all active:scale-95 cursor-pointer border-none"
              title="Clear Chat History"
            >
              <Icon name="delete_sweep" size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════ */}
      {/*  CHAT MESSAGES CONTAINER                          */}
      {/* ══════════════════════════════════════════════════ */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6 relative z-10 pb-36">

        {/* SUGGESTED PROMPTS HERO CARDS (Shown on initial state) */}
        {messages.length <= 1 && (
          <section className="space-y-4 my-2 animate-fade-in">
            <div className="text-center space-y-1">
              <div className="w-14 h-14 rounded-2xl bg-[#006972]/10 text-[#006972] flex items-center justify-center mx-auto mb-2 border border-[#006972]/20">
                <Icon name="psychology" size={32} />
              </div>
              <h2 className="font-headline text-[22px] font-bold text-deep-navy">How can Sanjhi AI help you today?</h2>
              <p className="font-body text-[13px] text-on-surface-variant max-w-md mx-auto">
                Ask anything using voice or text about your savings pools, payments, or trust score.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {SUGGESTED_PROMPTS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.prompt)}
                  className={`p-4 rounded-2xl text-left border transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer flex items-start gap-3 bg-white/90 backdrop-blur-md ${item.color}`}
                >
                  <div className="p-2 rounded-xl bg-white shadow-sm shrink-0">
                    <Icon name={item.icon} size={20} />
                  </div>
                  <div>
                    <h3 className="font-headline text-[14px] font-bold text-deep-navy mb-0.5">{item.title}</h3>
                    <p className="font-body text-[12px] text-on-surface-variant line-clamp-2">{item.prompt}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* MESSAGE BUBBLES */}
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';
          const isSpeaking = speakingMessageId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-3 ${isAI ? 'justify-start' : 'justify-end'} animate-scale-up`}
            >
              {/* AI Avatar Icon */}
              {isAI && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#006972] to-[#00a8b5] text-white flex items-center justify-center shrink-0 shadow-sm border border-white mb-1">
                  <Icon name="auto_awesome" size={16} />
                </div>
              )}

              {/* Message Bubble */}
              <div className={`relative max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 shadow-sm space-y-2 ${
                isAI
                  ? 'bg-white border-2 border-[#006972]/15 text-deep-navy rounded-bl-sm'
                  : 'bg-[#006972] text-white rounded-br-sm shadow-[#006972]/20'
              }`}>

                {/* Message Header & Action Toolbar for AI */}
                {isAI && (
                  <div className="flex items-center justify-between pb-2 border-b border-[#006972]/10 text-[11px] font-label text-[#006972] font-bold">
                    <span className="flex items-center gap-1">
                      <Icon name="auto_awesome" size={14} /> Sanjhi AI
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSpeak(msg.id, msg.text)}
                      className={`p-1.5 rounded-lg flex items-center gap-1 text-[11px] transition-colors cursor-pointer border-none ${
                        isSpeaking ? 'bg-amber-500 text-white animate-pulse' : 'bg-[#006972]/10 hover:bg-[#006972]/20 text-[#006972]'
                      }`}
                      title={isSpeaking ? 'Stop Voice' : 'Listen with Voice'}
                    >
                      <Icon name={isSpeaking ? 'volume_off' : 'volume_up'} size={14} />
                      <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                    </button>
                  </div>
                )}

                {/* Message Body Content */}
                <div className="font-body text-[14px] leading-relaxed whitespace-pre-line">
                  {msg.text}
                </div>

                {/* Timestamp */}
                <div className={`text-[10px] font-label text-right font-medium ${isAI ? 'text-on-surface-variant/70' : 'text-white/70'}`}>
                  {msg.time}
                </div>
              </div>

            </div>
          );
        })}

        {/* TYPING INDICATOR */}
        {isTyping && (
          <div className="flex items-end gap-3 justify-start animate-fade-in">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#006972] to-[#00a8b5] text-white flex items-center justify-center shrink-0 shadow-sm border border-white">
              <Icon name="auto_awesome" size={16} />
            </div>
            <div className="bg-white border-2 border-[#006972]/15 text-[#006972] rounded-3xl rounded-bl-sm px-5 py-3 shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#006972] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#006972] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#006972] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* ══════════════════════════════════════════════════ */}
      {/*  BOTTOM CHAT INPUT & VOICE CONTROL BAR            */}
      {/* ══════════════════════════════════════════════════ */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#006972]/15 p-3 sm:p-4 shadow-[0_-6px_24px_rgba(0,105,114,0.12)]">
        <div className="max-w-4xl mx-auto space-y-2">

          {/* Voice Recording Active Toast Banner */}
          {isListening && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-2 rounded-2xl text-[12px] font-label font-bold flex items-center justify-between animate-bounce-short shadow-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                <span>Listening... Speak into your microphone now</span>
              </div>
              <button
                onClick={toggleVoiceRecognition}
                className="text-rose-700 underline font-bold bg-transparent border-none cursor-pointer"
              >
                Stop
              </button>
            </div>
          )}

          {/* Main Input Controls */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 bg-slate-50 border-2 border-[#006972]/20 focus-within:border-[#006972] focus-within:ring-4 focus-within:ring-[#006972]/10 rounded-3xl p-1.5 transition-all shadow-sm"
          >
            {/* Voice Dictation Button */}
            <button
              type="button"
              onClick={toggleVoiceRecognition}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer border-none shrink-0 ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse shadow-md'
                  : 'bg-[#006972]/10 text-[#006972] hover:bg-[#006972]/20'
              }`}
              title={isListening ? 'Stop Recording' : 'Voice Input (Speech-to-Text)'}
            >
              <Icon name={isListening ? 'mic_off' : 'mic'} size={22} />
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isListening ? 'Listening to voice...' : 'Ask Sanjhi AI anything...'}
              className="flex-1 bg-transparent px-3 py-2 font-body text-[14px] text-deep-navy outline-none placeholder:text-on-surface-variant/50"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-11 h-11 rounded-2xl bg-[#006972] hover:bg-[#00575f] text-white flex items-center justify-center transition-all cursor-pointer border-none shrink-0 shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Send Message"
            >
              <Icon name="send" size={20} />
            </button>
          </form>

          {/* Subtext info */}
          <p className="text-[11px] font-label text-center text-on-surface-variant/60">
            Sanjhi AI provides automated guidance for committees, trust scores, & payouts.
          </p>
        </div>
      </footer>

    </div>
  );
}
