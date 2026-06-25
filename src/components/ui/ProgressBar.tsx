import { cn } from '@/lib/utils';
import { formatPercentage } from '@/lib/utils/format';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: 'primary' | 'secondary' | 'tertiary';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({
  value,
  max,
  color = 'primary',
  showLabel = false,
  size = 'md',
  className,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const colors = {
    primary: 'bg-primary-container',
    secondary: 'bg-secondary-container',
    tertiary: 'bg-tertiary-container',
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-3',
    lg: 'h-4',
  };

  const barColors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
  };

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full bg-surface-container rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn(
            'rounded-full transition-all duration-500 ease-out',
            barColors[color],
            sizes[size]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1">
          <span className="text-label-sm font-label-sm text-outline">
            {formatPercentage(percentage)}
          </span>
          <span className="text-label-sm font-label-sm text-outline">
            {value.toFixed(2)} / {max.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}
