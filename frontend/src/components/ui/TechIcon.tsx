import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = '', size = 20 }) => {
  const normalized = name.toLowerCase().trim();

  // Return custom authentic SVG for each technology
  if (normalized.includes('react')) {
    return (
      <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" className={className}>
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  if (normalized.includes('spring')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M21.5 13.5C20.5 18 16.5 21.5 12 21.5C6.75 21.5 2.5 17.25 2.5 12C2.5 6.75 6.75 2.5 12 2.5C13.5 2.5 17.5 3.5 19 6C20 7.5 18 10 16 10.5C13.5 11 11.5 9 10 10.5C8.5 12 9 14.5 11 15C13 15.5 15.5 14 17.5 14.5C19 15 19.5 16 19 17C18 19 15 19.5 13 19.5"
          stroke="#6DB33F"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2" fill="#6DB33F" />
      </svg>
    );
  }

  if (normalized.includes('python')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
        <path
          d="M11.9 2C8.7 2 8.9 3.4 8.9 3.4L8.9 4.8H12.1V5.3H6.2C4.5 5.3 3.5 6.4 3.5 8.1C3.5 10.3 4.8 10.9 6.2 10.9H7.3V9.3C7.3 7.6 8.7 7.6 8.7 7.6H12.1C13.8 7.6 14.9 6.5 14.9 4.8C14.9 3.1 13.7 2 11.9 2ZM10.5 3.1C10.9 3.1 11.2 3.4 11.2 3.8C11.2 4.2 10.9 4.5 10.5 4.5C10.1 4.5 9.8 4.2 9.8 3.8C9.8 3.4 10.1 3.1 10.5 3.1Z"
          fill="#387EB8"
        />
        <path
          d="M12.1 22C15.3 22 15.1 20.6 15.1 20.6L15.1 19.2H11.9V18.7H17.8C19.5 18.7 20.5 17.6 20.5 15.9C20.5 13.7 19.2 13.1 17.8 13.1H16.7V14.7C16.7 16.4 15.3 16.4 15.3 16.4H11.9C10.2 16.4 9.1 17.5 9.1 19.2C9.1 20.9 10.3 22 12.1 22ZM13.5 20.9C13.1 20.9 12.8 20.6 12.8 20.2C12.8 19.8 13.1 19.5 13.5 19.5C13.9 19.5 14.2 19.8 14.2 20.2C14.2 20.6 13.9 20.9 13.5 20.9Z"
          fill="#FFE052"
        />
      </svg>
    );
  }

  if (normalized.includes('java') && !normalized.includes('script')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M8.5 18.5C11 19 14.5 19 17 18.5M6.5 21C10 22 15 22 19 21M9 15C11.5 15.5 14.5 15.5 17 15"
          stroke="#EA2D2E"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M14 2C15.5 4 11 6 13 8C14.5 9.5 16 11 12 13M10 4C11 5.5 8 7 9.5 8.5C10.5 9.5 11.5 10.5 9 12"
          stroke="#5382A1"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (normalized.includes('javascript') || normalized.includes('typescript') || normalized.includes('js')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M12.5 13.5V15C12.5 17 14 18 16 18C18 18 19.5 16.8 19.5 14.5C19.5 11.5 16.5 11 16.5 9.5C16.5 8.8 17 8.3 17.8 8.3C18.6 8.3 19.1 8.8 19.2 9.8H21C20.8 7.8 19.5 6.8 17.8 6.8C15.8 6.8 14.5 8 14.5 9.8C14.5 12.8 17.5 13.2 17.5 14.8C17.5 15.5 17 16 16 16C15 16 14.5 15.3 14.5 13.5H12.5ZM5 8.5H7.5V18H9.5V8.5H12V6.8H5V8.5Z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (normalized.includes('node')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
        <path
          d="M12 2L3.5 7V17L12 22L20.5 17V7L12 2ZM12 4.3L18.5 8.1V15.9L12 19.7L5.5 15.9V8.1L12 4.3Z"
          fill="#5FA04E"
        />
        <path d="M12 7.5L8 10V14L12 16.5L16 14V10L12 7.5Z" fill="#5FA04E" />
      </svg>
    );
  }

  if (normalized.includes('docker')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M22 13C21.5 11.5 20 11 18.5 11C18.2 9.5 17 8.5 15.5 8.5V11H13V8.5H10.5V11H8V8.5H5.5V11H3C2 12.5 2 15 3.5 17C5.5 19.5 9.5 20.5 14 19.5C18.5 18.5 21 16 22 13Z"
          fill="#2496ED"
        />
        <rect x="5.5" y="6" width="2" height="2" fill="#2496ED" rx="0.5" />
        <rect x="8" y="6" width="2" height="2" fill="#2496ED" rx="0.5" />
        <rect x="10.5" y="6" width="2" height="2" fill="#2496ED" rx="0.5" />
        <circle cx="19" cy="13.5" r="0.8" fill="#FFFFFF" />
      </svg>
    );
  }

  if (normalized.includes('git')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M21.5 10.5L13.5 2.5C12.8 1.8 11.7 1.8 11 2.5L9 4.5L11.5 7C12.1 6.8 12.8 7 13.2 7.4C13.8 8 13.8 9 13.2 9.6L10.6 12.2C10.7 12.6 10.7 13.1 10.4 13.4C9.8 14 8.8 14 8.2 13.4C7.8 13 7.6 12.3 7.8 11.7L5.5 9.4L2.5 12.4C1.8 13.1 1.8 14.2 2.5 14.9L10.5 22.9C11.2 23.6 12.3 23.6 13 22.9L21.5 14.4C22.2 13.7 22.2 12.6 22.1 11.9C22.1 11.3 21.8 10.8 21.5 10.5Z"
          fill="#F05032"
        />
        <circle cx="9.3" cy="12.8" r="1.5" fill="#FFFFFF" />
        <circle cx="12.4" cy="8.5" r="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  if (normalized.includes('aws')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M17.5 17C12 20 6.5 19 3 16.5M19 14.5C19.5 15.5 18 17.5 16.5 18"
          stroke="#FF9900"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M6 11L7.8 6H9.2L11 11M6.5 9.5H10.5M12.5 6L14 11L15.5 7L17 11L18.5 6"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (normalized.includes('figma')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
        <rect x="5" y="2" width="7" height="7" rx="3.5" fill="#F24E1E" />
        <rect x="12" y="2" width="7" height="7" rx="3.5" fill="#FF7262" />
        <rect x="5" y="9" width="7" height="7" rx="3.5" fill="#A259FF" />
        <circle cx="15.5" cy="12.5" r="3.5" fill="#1ABCFE" />
        <path d="M5 16C5 17.9 6.6 19.5 8.5 19.5C10.4 19.5 12 17.9 12 16V16H5Z" fill="#0ACF83" />
      </svg>
    );
  }

  if (normalized.includes('postgre')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M12 3C7 3 4 6.5 4 11C4 16 7 20 12 21C17 20 20 16 20 11C20 6.5 17 3 12 3Z"
          stroke="#336791"
          strokeWidth="2"
        />
        <path
          d="M8.5 9.5C9.5 7.5 14.5 7.5 15.5 9.5C16.5 11.5 15 15 12 15C9 15 7.5 11.5 8.5 9.5Z"
          fill="#336791"
        />
        <circle cx="10" cy="11" r="1" fill="#FFFFFF" />
        <circle cx="14" cy="11" r="1" fill="#FFFFFF" />
      </svg>
    );
  }

  if (normalized.includes('mongo')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M12 2C11 5 6 9 6 14C6 17.5 8.5 21 12 22C15.5 21 18 17.5 18 14C18 9 13 5 12 2Z"
          fill="#47A248"
        />
        <path d="M12 2V22" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (normalized.includes('mysql')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M4 15C5.5 13 9 12.5 12 14C15 15.5 18 14 20 11M5 18C7 16 11 16 14 17C17 18 19 16.5 20 15"
          stroke="#00758F"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M12 5C10 7 7.5 7.5 5 7C7 9.5 10 10.5 13 9.5C16 8.5 19 9 20 11C20.5 8 18 5 12 5Z"
          fill="#F29111"
        />
      </svg>
    );
  }

  if (normalized.includes('sqlite')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M4 6C4 4 7.6 2.5 12 2.5C16.4 2.5 20 4 20 6V18C20 20 16.4 21.5 12 21.5C7.6 21.5 4 20 4 18V6Z"
          stroke="#003B57"
          strokeWidth="2"
        />
        <path d="M4 10C4 12 7.6 13.5 12 13.5C16.4 13.5 20 12 20 10" stroke="#003B57" strokeWidth="1.8" />
        <path d="M4 14C4 16 7.6 17.5 12 17.5C16.4 17.5 20 16 20 14" stroke="#003B57" strokeWidth="1.8" />
        <path d="M14 6L18 10L14 14" stroke="#00A2E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (normalized.includes('c++') || normalized.includes('cpp')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
        <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="#00599C" />
        <text x="12" y="16" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">C++</text>
      </svg>
    );
  }

  if (normalized.includes('fastapi')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" fill="#059691" />
        <path d="M13 4L6 14H12L11 20L18 10H12L13 4Z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (normalized.includes('sql')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#F29111" strokeWidth="2" fill="none" />
        <path d="M4 6V12C4 13.7 7.6 15 12 15C16.4 15 20 13.7 20 12V6" stroke="#F29111" strokeWidth="2" fill="none" />
        <path d="M4 12V18C4 19.7 7.6 21 12 21C16.4 21 20 19.7 20 18V12" stroke="#F29111" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  // Fallback dynamic badge
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-md bg-gradient-to-tr from-primary/30 to-secondary/30 flex items-center justify-center text-[10px] font-bold text-primary ${className}`}
    >
      {name.substring(0, 2).toUpperCase()}
    </div>
  );
};
