import React from 'react';
import { twMerge } from 'tailwind-merge';

const Input = ({ label, className, ...props }) => {
    return (
        <div className="flex flex-col gap-2 relative z-20">
            {label && <label className="text-sm font-medium text-gray-400 ml-1">{label}</label>}
            <input
                className={twMerge(
                    "bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-gray-600",
                    className
                )}
                {...props}
            />
        </div>
    );
};

export default Input;
