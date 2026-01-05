import React from 'react';
import { Link } from 'react-router-dom';

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
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none gap-2";

    const variants = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]",
        secondary: "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 shadow-sm",
        ghost: "bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
        danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100",
        outline: "bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm rounded-lg",
        md: "px-6 py-3 text-[15px] rounded-xl",
        lg: "px-8 py-4 text-base rounded-2xl"
    };

    const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

    const content = (
        <>
            {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 16 : 18} />}
            {children}
            {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 16 : 18} />}
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
            {...props}
        >
            {content}
        </button>
    );
};

export default Button;

