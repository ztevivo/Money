import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'highlight';
  onClick?: () => void;
}

export function Card({ children, className, variant = 'default', onClick }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface-container-lowest rounded-lg p-6 transition-all',
        'shadow-[0_10px_40px_rgba(122,83,101,0.05)]',
        'border border-surface-container-high',
        variant === 'highlight' && 'bg-primary-fixed/20 border-primary-container',
        onClick && 'cursor-pointer hover:shadow-md active:scale-95',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
