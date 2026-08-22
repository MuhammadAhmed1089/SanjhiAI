import { useNavigate } from 'react-router-dom';
import Icon from './Icon';

export default function TopAppBar({
  title = '',
  showBack = false,
  onBack,
  rightAction,
  transparent = false,
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  return (
    <header
      className={`w-full sticky top-0 z-40 flex items-center justify-between px-4 md:px-16 h-16 ${
        transparent
          ? 'bg-transparent'
          : 'bg-surface shadow-sm/50 backdrop-blur-md'
      }`}
    >
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-variant/50 transition-colors active:scale-95"
            aria-label="Go back"
          >
            <Icon name="arrow_back" />
          </button>
        )}
        {title && (
          <h1 className="font-headline text-[20px] md:text-[24px] leading-tight font-bold text-deep-navy">
            {title}
          </h1>
        )}
      </div>
      {rightAction && <div>{rightAction}</div>}
      {!rightAction && showBack && <div className="w-10" />}
    </header>
  );
}
