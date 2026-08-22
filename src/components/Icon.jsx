export default function Icon({ name, filled = false, size = 24, className = '' }) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? 'icon-filled' : ''} ${className}`}
      style={{ fontSize: `${size}px` }}
    >
      {name}
    </span>
  );
}
