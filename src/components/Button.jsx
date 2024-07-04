import React from 'react';

const Button = ({ children, onClick, variant = 'primary', size = 'medium', className = '' }) => {
    const baseStyle = 'font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out';

    const variants = {
        primary: 'bg-gray-700 hover:bg-blue-600 text-white focus:ring-blue-300',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-300',
        danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-300',
    };

    const sizes = {
        small: 'px-2 py-1 text-sm',
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