import React from 'react';

interface LogoProps {
    className?: string;
    showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10", showText = true }) => {
    return (
        <div className="flex items-center gap-2">
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
            >
                <defs>
                    <linearGradient id="softonicusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563eb" /> {/* blue-600 */}
                        <stop offset="100%" stopColor="#9333ea" /> {/* purple-600 */}
                    </linearGradient>
                </defs>

                {/* Shield Base */}
                <path
                    d="M50 95C50 95 85 85 90 50V20L50 5L10 20V50C15 85 50 95 50 95Z"
                    stroke="url(#softonicusGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Power Button Line */}
                <path
                    d="M50 5V35"
                    stroke="url(#softonicusGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                />

                {/* Stylized S */}
                <path
                    d="M70 35C70 35 70 30 50 30C30 30 30 50 50 50C70 50 70 70 50 70C30 70 30 65 30 65"
                    stroke="url(#softonicusGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            {showText && (
                <span className="text-xl font-black uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Softonicus
                </span>
            )}
        </div>
    );
};

export default Logo;
