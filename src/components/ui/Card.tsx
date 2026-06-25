import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'highlight' | 'elevated';
  onClick?: () => void;
}

export function Card({ children, className, variant = 'default', onClick }: CardProps) {
  const variants = {
    default: 'bg-surface-container-lowest border border-surface-container-high',
    highlight: 'bg-primary-fixed/20 border-primary-container',
    elevated: 'bg-surface-container-lowest shadow-[0_10px_40px_rgba(122,83,101,0.05)]',
  };

  return (
    <div
      className={cn(
        'rounded-lg p-6 transition-all',
        variants[variant],
        onClick && 'cursor-pointer hover:shadow-md active:scale-95',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
