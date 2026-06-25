'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  subtitle?: string;
  icon?: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

export function Toast({
  message,
  subtitle,
  icon = 'celebration',
  type = 'success',
  duration = 3000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: 'bg-on-tertiary-container text-tertiary-container',
    error: 'bg-error-container text-on-error-container',
    info: 'bg-secondary-container text-on-secondary-container',
  };

  const icons = {
    success: 'celebration',
    error: 'error',
    info: 'info',
  };

  return (
    <div
      className={cn(
        'fixed bottom-32 left-1/2 -translate-x-1/2',
        'px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl',
        'transition-all duration-300 pointer-events-none z-[100] max-w-sm w-full',
        colors[type],
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      <div className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
        type === 'success' && 'bg-tertiary',
        type === 'error' && 'bg-error',
        type === 'info' && 'bg-secondary',
      )}>
        <span className="material-symbols-outlined text-white text-2xl">
          {icons[type]}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body-lg text-body-lg leading-tight">{message}</p>
        {subtitle && <p className="text-label-sm font-label-sm opacity-80">{subtitle}</p>}
      </div>
    </div>
  );
}
