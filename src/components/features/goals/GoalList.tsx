import { Goal } from '@/types';
import { GoalCard } from './GoalCard';

interface GoalListProps {
  goals: Goal[];
}

export function GoalList({ goals }: GoalListProps) {
  if (goals.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-body-md text-outline">
          Nenhuma caixinha ainda.
          <br />
          <span className="text-label-sm">Crie sua primeira caixinha para começar!</span>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
}
