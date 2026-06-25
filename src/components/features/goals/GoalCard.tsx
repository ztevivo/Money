import { Goal } from '@/types';
import { formatCurrency } from '@/lib/utils/format';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface GoalCardProps {
  goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
  const percentage = (goal.saved / goal.target) * 100;
  const isComplete = goal.saved >= goal.target;

  return (
    <div className="bg-surface-container-lowest rounded-lg p-4 gummy-shadow hover:gummy-shadow-hover transition-all active:scale-95">
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
          goal.color === 'primary' ? 'bg-primary-container' :
          goal.color === 'secondary' ? 'bg-secondary-container' :
          'bg-tertiary-container'
        }`}>
          <span className={`material-symbols-outlined text-2xl ${
            goal.color === 'primary' ? 'text-primary' :
            goal.color === 'secondary' ? 'text-secondary' :
            'text-tertiary'
          }`} style={{ fontVariationSettings: "'FILL' 1" }}>
            {goal.icon || 'savings'}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-body-lg text-body-lg text-on-surface truncate">
              {goal.name}
            </h3>
            <span className="font-headline-md text-headline-md text-primary ml-2 flex-shrink-0">
              {formatCurrency(goal.saved)}
            </span>
          </div>

          <div className="flex justify-between items-center mt-1">
            <span className="text-label-sm font-label-sm text-outline">
              {isComplete ? '🎉 Concluída!' : `${Math.min(percentage, 100).toFixed(0)}%`}
            </span>
            <span className="text-label-sm font-label-sm text-outline">
              Meta: {formatCurrency(goal.target)}
            </span>
          </div>

          <ProgressBar
            value={goal.saved}
            max={goal.target}
            color={goal.color}
            size="sm"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
}
