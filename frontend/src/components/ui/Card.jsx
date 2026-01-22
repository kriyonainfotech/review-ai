import React from 'react';

const Card = ({ children, className = '', hover = false }) => {
    return (
        <div className={`
            bg-transparent md:rounded-2xl md:border md:border-zinc-100 md:shadow-premium p-0 md:p-6 w-full
            ${hover ? 'md:hover:shadow-card-hover md:hover:-translate-y-1 transition-all duration-300' : ''}
            ${className}
        `}>
            {children}
        </div>
    );
};

export default Card;

