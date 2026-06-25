import { cn } from '@/lib/utils';

interface NumpadProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  onClear?: () => void;
}

export function Numpad({ value, onChange, maxLength = 10, onClear }: NumpadProps) {
  const handleKeyPress = (key: string) => {
    if (key === 'clear') {
      onChange('0');
      onClear?.();
      return;
    }

    if (key === 'backspace') {
      if (value.length <= 1 || (value.length === 4 && value.startsWith('0,'))) {
        onChange('0');
      } else {
        const newValue = value.slice(0, -1);
        onChange(newValue || '0');
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

    const numbersOnly = newValue.replace(/[^0-9]/g, '');
    if (numbersOnly.length > maxLength) return;

    if (newValue.includes(',')) {
      const parts = newValue.split(',');
      if (parts[1]?.length > 2) return;
    }

    onChange(newValue);
  };

  const keys = [
    { key: '1', label: '1' },
    { key: '2', label: '2' },
    { key: '3', label: '3' },
    { key: '4', label: '4' },
    { key: '5', label: '5' },
    { key: '6', label: '6' },
    { key: '7', label: '7' },
    { key: '8', label: '8' },
    { key: '9', label: '9' },
    { key: 'clear', label: 'C', isAction: true },
    { key: '0', label: '0' },
    { key: 'backspace', label: '⌫', isAction: true },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
      {keys.map(({ key, label, isAction }) => (
        <button
          key={key}
          className={cn(
            'py-4 text-headline-md font-headline rounded-xl transition-all active:scale-90',
            isAction
              ? 'bg-error-container/30 text-error hover:bg-error-container'
              : 'bg-surface-container-low text-on-surface hover:bg-primary-fixed-dim/30'
          )}
          onClick={() => handleKeyPress(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
