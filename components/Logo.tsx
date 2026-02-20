import React from 'react';

interface LogoProps {
    className?: string;
    showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10", showText = false }) => {
    return (
        <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Softonicus Logo" className={`${className} object-contain`} />

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
