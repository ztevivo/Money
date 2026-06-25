import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';

interface NumpadProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export function Numpad({ value, onChange, maxLength = 10 }: NumpadProps) {
  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      if (value.length <= 1) {
        onChange('0');
      } else {
        onChange(value.slice(0, -1));
      }
      return;
    }

    if (key === ',' && value.includes(',')) return;

    let newValue = value;
    if (value === '0' && key !== ',') {
      newValue = key;
    } else {
      newValue = value + key;
    }

    if (newValue.replace(',', '').length > maxLength) return;
    onChange(newValue);
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', 'backspace'];

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
      {keys.map((key) => (
        <button
          key={key}
          className={cn(
            'numpad-key py-4 text-headline-md font-headline rounded-xl transition-all active:scale-90',
            key === 'backspace'
              ? 'bg-error-container/30 text-error hover:bg-error-container'
              : 'bg-surface-container-low text-on-surface hover:bg-primary-fixed-dim'
          )}
          onClick={() => handleKeyPress(key)}
        >
          {key === 'backspace' ? (
            <span className="material-symbols-outlined text-2xl">backspace</span>
          ) : (
            key
          )}
        </button>
      ))}
    </div>
  );
}
