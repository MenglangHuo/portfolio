import React from 'react';

interface LotusIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

export default function LotusIcon({ className = 'w-5 h-5', ...props }: LotusIconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
            {...props}
        >
            {/* Center crown petal with soft glow fill */}
            <path
                d="M12 2.5C10.5 5.5 10 8.5 12 11.5C14 8.5 13.5 5.5 12 2.5Z"
                fill="currentColor"
                fillOpacity="0.25"
            />
            {/* Inner left petal */}
            <path
                d="M12 11.5C9.5 9.8 7.2 10.2 6 12C7.2 14.5 9.8 15.2 12 13.5"
                fill="currentColor"
                fillOpacity="0.14"
            />
            {/* Inner right petal */}
            <path
                d="M12 11.5C14.5 9.8 16.8 10.2 18 12C16.8 14.5 14.2 15.2 12 13.5"
                fill="currentColor"
                fillOpacity="0.14"
            />
            {/* Upper left petal */}
            <path d="M12 11.5C9.8 8 7 7.2 4.8 8.8C5.5 12.2 9 14 12 13" />
            {/* Upper right petal */}
            <path d="M12 11.5C14.2 8 17 7.2 19.2 8.8C18.5 12.2 15 14 12 13" />
            {/* Outer lower left petal */}
            <path d="M8 15C5.5 14.5 3.5 15.5 3 17C5.5 18.5 8.5 18 10 16" />
            {/* Outer lower right petal */}
            <path d="M16 15C18.5 14.5 20.5 15.5 21 17C18.5 18.5 15.5 18 14 16" />
            {/* Central core seedpod accent */}
            <circle cx="12" cy="11.2" r="1.1" fill="currentColor" />
            {/* Calm base water / pad ripple */}
            <path d="M5 20.5C9 21.5 15 21.5 19 20.5" strokeWidth="1.3" opacity="0.65" />
        </svg>
    );
}
