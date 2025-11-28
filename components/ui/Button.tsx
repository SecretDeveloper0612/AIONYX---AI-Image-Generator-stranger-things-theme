import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  withArrow?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  withArrow = false,
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-sm font-bold tracking-wide transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none uppercase font-display";
  
  const variants = {
    primary: "bg-btn-gradient text-white shadow-[0_0_20px_rgba(255,9,0,0.4)] hover:shadow-[0_0_30px_rgba(255,9,0,0.6)] hover:brightness-110 animate-flicker",
    outline: "border border-stranger-red bg-transparent text-stranger-red hover:bg-stranger-red/10 hover:shadow-[0_0_15px_rgba(255,9,0,0.3)] backdrop-blur-sm",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5"
  };

  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {withArrow && <ArrowRight className="ml-2 w-4 h-4" />}
    </button>
  );
};