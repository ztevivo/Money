import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils/format';

interface DashboardStatsProps {
  stats: {
    total_saved: number;
    total_target: number;
    total_goals: number;
    total_contributions: number;
    total_contributed: number;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <Card variant="elevated" className="bg-gradient-to-br from-primary-fixed/20 to-secondary-container/20">
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-label-sm font-label-sm text-outline">Total Guardado</p>
          <p className="font-headline-md text-headline-md text-primary">
            {formatCurrency(stats.total_saved)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-label-sm font-label-sm text-outline">Metas</p>
          <p className="font-headline-md text-headline-md text-on-surface">
            {stats.total_goals}
          </p>
        </div>
        <div className="text-center">
          <p className="text-label-sm font-label-sm text-outline">Contribuições</p>
          <p className="font-headline-md text-headline-md text-on-surface">
            {stats.total_contributions}
          </p>
        </div>
      </div>
    </Card>
  );
}
