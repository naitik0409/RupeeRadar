import './Logo.css';

const Logo = ({ size = 'default' }) => {
  const sizes = {
    small: { width: 24, height: 24, fontSize: '16px' },
    default: { width: 32, height: 32, fontSize: '20px' },
    large: { width: 40, height: 40, fontSize: '24px' },
  };

  const currentSize = sizes[size] || sizes.default;

  return (
    <div className="logo-container" style={{ fontSize: currentSize.fontSize }}>
      <svg
        width={currentSize.width}
        height={currentSize.height}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="logo-svg"
      >
        <rect width="32" height="32" rx="6" fill="#00d4ff"/>
        <path
          d="M8 22L12 14L16 18L20 10L24 22"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="14" r="1.5" fill="white"/>
        <circle cx="16" cy="18" r="1.5" fill="white"/>
        <circle cx="20" cy="10" r="1.5" fill="white"/>
      </svg>
      <span className="logo-text">StockTracker</span>
    </div>
  );
};

export default Logo;

