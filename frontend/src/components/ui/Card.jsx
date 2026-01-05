import React from 'react';

const Card = ({ children, className = '', hover = false }) => {
    return (
        <div className={`
            bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 w-full
            ${hover ? 'hover:shadow-md hover:-translate-y-1 transition-all duration-300' : ''}
            ${className}
        `}>
            {children}
        </div>
    );
};

export default Card;

