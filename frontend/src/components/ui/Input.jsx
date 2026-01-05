import React from 'react';

const Input = ({ label, id, error, className = '', ...props }) => {
    return (
        <div className={`w-full mb-5 ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-zinc-700 mb-1.5 ml-1"
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`
                    w-full px-4 py-3 rounded-xl border bg-white text-zinc-900 text-[15px]
                    transition-all duration-200 outline-hidden
                    focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                    placeholder:text-zinc-400
                    ${error ? 'border-red-500 ring-2 ring-red-500/10' : 'border-zinc-200'}
                    disabled:bg-zinc-50 disabled:text-zinc-500
                `}
                {...props}
            />
            {error && <p className="mt-1.5 text-xs text-red-500 ml-1">{error}</p>}
        </div>
    );
};

export default Input;

