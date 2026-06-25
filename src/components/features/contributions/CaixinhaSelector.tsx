import { cn } from '@/lib/utils';
import { Goal } from '@/types';

interface CaixinhaSelectorProps {
  goals: Goal[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const iconMap: Record<string, string> = {
  'Viagem': 'beach_access',
  'Novo Jogo': 'icecream',
  'Pet Fund': 'pets',
  'default': 'savings',
};

export function CaixinhaSelector({ goals, selectedId, onSelect }: CaixinhaSelectorProps) {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-end">
        <h2 className="font-headline-md text-primary px-2">Selecionar Caixinha</h2>
        <span className="text-label-sm font-label-sm text-outline">1 de 3</span>
      </div>
      <div className="flex gap-element-gap overflow-x-auto hide-scrollbar py-2 -mx-2 px-2">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={cn(
              'min-w-[140px] bg-surface-container-lowest p-4 rounded-lg flex flex-col items-center gap-2',
              'border-2 border-transparent cursor-pointer transition-all hover:shadow-md',
              selectedId === goal.id && 'border-primary-container bg-primary-fixed/30 shadow-lg'
            )}
            onClick={() => onSelect(goal.id)}
          >
            <div className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center mb-2',
              goal.color === 'primary' && 'bg-primary-container',
              goal.color === 'secondary' && 'bg-secondary-container',
              goal.color === 'tertiary' && 'bg-tertiary-container'
            )}>
              <span className={cn(
                'scale-125',
                goal.color === 'primary' && 'text-primary',
                goal.color === 'secondary' && 'text-secondary',
                goal.color === 'tertiary' && 'text-tertiary'
              )}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {iconMap[goal.name] || 'savings'}
                </span>
              </span>
            </div>
            <span className="font-body-lg text-body-lg text-on-surface">{goal.name}</span>
            <span className={cn(
              'text-label-sm font-label-sm',
              goal.total === goal.saved ? 'text-primary' : 'text-outline'
            )}>
              R$ {goal.saved.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
