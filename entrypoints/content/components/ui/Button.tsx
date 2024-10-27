import React, { ReactNode, MouseEventHandler } from 'react';

interface Props {
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

const Button: React.FC<Props> = ({ children, onClick, variant = 'primary', size = 'medium', className = '' }) => {
    const baseStyle = 'rounded-lg focus:outline-none focus:ring-1 focus:ring-opacity-50 transition duration-300 ease-in-out';

    const variants: Record<string, string> = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
    };

    const sizes: Record<string, string> = {
        small: 'px-1 py-0.5 text-sm font-light',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
    };

    const buttonClasses = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <button className={buttonClasses} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;