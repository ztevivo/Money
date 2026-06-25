import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  subtitle?: string;
  icon?: string;
  duration?: number;
  onClose?: () => void;
}

export function Toast({ message, subtitle, icon = 'celebration', duration = 3000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={cn(
        'fixed bottom-32 left-1/2 -translate-x-1/2',
        'bg-on-tertiary-container text-tertiary-container',
        'px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl',
        'transition-all duration-300 pointer-events-none z-[100]',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      <div className="w-10 h-10 bg-tertiary rounded-full flex items-center justify-center">
        <span className="material-symbols-outlined text-white">{icon}</span>
      </div>
      <div>
        <p className="font-body-lg text-body-lg leading-tight">{message}</p>
        {subtitle && <p className="text-label-sm font-label-sm opacity-80">{subtitle}</p>}
      </div>
    </div>
  );
}
