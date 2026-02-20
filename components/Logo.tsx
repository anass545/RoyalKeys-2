import React from 'react';

interface LogoProps {
    className?: string;
    showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10", showText = true }) => {
    return (
        <div className="flex items-center gap-3">
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
            >
                <defs>
                    <linearGradient id="softonicusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4ade80" /> {/* green-400 */}
                        <stop offset="50%" stopColor="#22d3ee" /> {/* cyan-400 */}
                        <stop offset="100%" stopColor="#3b82f6" /> {/* blue-500 */}
                    </linearGradient>
                </defs>

                {/* Shield Outline - Cut at top for pixels */}
                <path
                    d="M50 92C50 92 10 75 10 35V20L50 5L90 20V35"
                    stroke="url(#softonicusGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Keyhole Shape */}
                <path
                    d="M50 35V25"
                    stroke="url(#softonicusGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                <circle cx="50" cy="55" r="8" fill="url(#softonicusGradient)" />
                <path d="M50 55L42 75H58L50 55Z" fill="url(#softonicusGradient)" />

                {/* Digital Pixels (Top Right) */}
                <rect x="75" y="15" width="8" height="8" rx="1" fill="url(#softonicusGradient)" opacity="0.8" />
                <rect x="85" y="5" width="6" height="6" rx="1" fill="url(#softonicusGradient)" opacity="0.6" />
                <rect x="65" y="25" width="6" height="6" rx="1" fill="url(#softonicusGradient)" opacity="0.9" />

            </svg>

            {showText && (
                <span
                    className="text-2xl font-bold uppercase tracking-tighter text-[#4ade80]"
                    style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.05em' }}
                >
                    Softonicus
                </span>
            )}
        </div>
    );
};

export default Logo;
