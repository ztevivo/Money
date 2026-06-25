import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children, icon, className, ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-on-primary hover:opacity-90 shadow-lg shadow-primary/20',
    secondary: 'bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed-dim',
    tertiary: 'bg-tertiary text-on-tertiary hover:opacity-90',
    ghost: 'bg-transparent text-on-surface-variant hover:bg-surface-container-high',
  };

  const sizes = {
    sm: 'px-4 py-2 text-body-md',
    md: 'px-6 py-3 text-headline-md',
    lg: 'px-8 py-4 text-headline-md',
  };

  return (
    <button
      className={cn(
        'rounded-full font-body transition-all active:scale-95 flex items-center justify-center gap-2',
        'shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {icon && <span className="material-symbols-outlined">{icon}</span>}
      {children}
    </button>
  );
}
