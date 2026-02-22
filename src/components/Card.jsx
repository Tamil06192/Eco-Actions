import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Card = ({
    children,
    className,
    hover = true,
    animate = true,
    delay = '',
    glass = false
}) => {
    return (
        <div
            className={twMerge(
                'rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden',
                glass ? 'glass-card' : 'bg-white dark:bg-gray-800',
                hover && 'hover-lift',
                animate && 'opacity-0 animate-slide-up',
                delay,
                className
            )}
        >
            {children}
        </div>
    );
};

export default Card;
