import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    to,
    fullWidth = false,
    icon: Icon,
    iconPosition = 'left',
    loading = false,
    disabled,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none gap-2";

    const variants = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/20",
        secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
        danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100",
        outline: "bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50"
    };

    const sizes = {
        sm: "px-3 h-9 text-xs rounded-lg",
        md: "px-5 h-12 text-sm rounded-xl",
        lg: "px-7 h-14 text-base rounded-xl",
        icon: "size-12 rounded-xl"
    };

    const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

    const content = (
        <>
            {loading ? (
                <Loader2 size={size === 'sm' ? 16 : 18} className="animate-spin" />
            ) : (
                Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 16 : 18} />
            )}
            {children}
            {!loading && Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 16 : 18} />}
        </>
    );

    if (to) {
        return (
            <Link to={to} className={combinedClasses} {...props}>
                {content}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={combinedClasses}
            disabled={disabled || loading}
            {...props}
        >
            {content}
        </button>
    );
};


export default Button;

