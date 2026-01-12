import React from 'react';

const Input = ({ label, id, error, className = '', leftIcon: LeftIcon, rightIcon: RightIcon, ...props }) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-xs font-bold text-slate-700 mb-1.5 ml-1 uppercase tracking-wider"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {LeftIcon && (
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <LeftIcon size={18} />
                    </div>
                )}
                <input
                    id={id}
                    className={`
                        w-full h-11 transition-all duration-200 outline-none font-medium
                        bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm
                        focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600
                        placeholder:text-slate-400 placeholder:font-normal
                        ${LeftIcon ? 'pl-11' : 'pl-4'}
                        ${RightIcon ? 'pr-11' : 'pr-4'}
                        ${error ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200'}
                        disabled:bg-slate-100 disabled:text-slate-500
                    `}
                    {...props}
                />
                {RightIcon && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                        {RightIcon}
                    </div>
                )}
            </div>
            {error && <p className="mt-1.5 text-[10px] font-bold text-red-500 ml-1 uppercase">{error}</p>}
        </div>
    );
};

export default Input;

