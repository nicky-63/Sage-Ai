
import React from 'react';

const iconProps = {
    className: "w-5 h-5",
    strokeWidth: 2,
    stroke: "currentColor",
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
};

export const SendIcon = () => (
    <svg {...iconProps} className="w-5 h-5" viewBox="0 0 24 24">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

export const UserIcon = () => (
     <svg {...iconProps} stroke="currentColor" className="w-5 h-5 text-brand-text" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

export const SparklesIcon = () => (
    <svg {...iconProps} stroke="currentColor" className="w-5 h-5 text-brand-dark" viewBox="0 0 24 24">
        <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"></path>
    </svg>
);
