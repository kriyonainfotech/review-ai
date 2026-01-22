import React from 'react';
import { ChevronRight } from 'lucide-react';

const CardRenderer = ({
    label,
    url,
    icon: Icon,
    primary = false,
}) => {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
                group relative flex items-center justify-center w-full p-4 
                transition-all duration-300 ease-out
                hover:scale-[1.02] active:scale-[0.98]
                overflow-hidden
            `}
            style={{
                backgroundColor: 'var(--btn-bg)',
                color: 'var(--btn-text)',
                borderRadius: 'var(--btn-radius)',
                boxShadow: 'var(--btn-shadow)',
                border: 'var(--btn-border)',
                backdropFilter: `blur(var(--btn-blur))`,
                WebkitBackdropFilter: `blur(var(--btn-blur))`,
                fontFamily: 'var(--theme-font-body)',
                minHeight: '56px',
            }}
        >
            {/* Overlay for glass/outline effects */}
            <div
                className="absolute inset-0 transition-colors pointer-events-none"
                style={{
                    backgroundColor: 'currentColor',
                    opacity: 'var(--btn-opacity, 0.1)'
                }}
            />

            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />

            {/* Icon (Optional) */}
            {Icon && (
                <div
                    className="absolute left-4 opacity-80 group-hover:opacity-100 transition-opacity"
                    style={{ color: 'var(--btn-text)' }}
                >
                    <Icon size={20} />
                </div>
            )}

            {/* Content */}
            <div
                className="font-bold text-sm sm:text-base tracking-tight text-center relative z-10 truncate px-10"
                style={{ color: 'var(--btn-text)' }}
            >
                {label}
            </div>

            {/* Primary Arrow */}
            {primary && (
                <div
                    className="absolute right-4 animate-pulse relative z-10"
                    style={{ color: 'var(--btn-text)' }}
                >
                    <ChevronRight size={20} />
                </div>
            )}
        </a>
    );
};

export default CardRenderer;
