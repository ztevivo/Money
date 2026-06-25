'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header, BottomNav } from '@/components/layout';
import { GoalCard } from '@/components/features/goals';
import { Button } from '@/components/ui/Button';
import { getGoals } from '@/lib/supabase/goals';
import { Goal } from '@/types';

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGoals() {
      try {
        const data = await getGoals();
        setGoals(data);
      } catch (error) {
        console.error('Error loading goals:', error);
      } finally {
        setLoading(false);
      }
    }
    loadGoals();
  }, []);

  if (loading) {
    return (
      <>
        <Header title="Caixinhas" />
        <main className="flex-1 px-container-padding pb-24 max-w-2xl mx-auto w-full">
          <div className="animate-pulse space-y-4">
            <div className="h-40 bg-surface-container-high rounded-lg" />
            <div className="h-40 bg-surface-container-high rounded-lg" />
          </div>
        </main>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <Header
        title="Caixinhas"
        rightAction={
          <Link href="/goals/new">
            <Button variant="primary" size="sm" icon="add">
              Nova
            </Button>
          </Link>
        }
      />

      <main className="flex-1 px-container-padding pb-24 max-w-2xl mx-auto w-full">
        {goals.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-32 h-32 mx-auto bg-primary-fixed rounded-full flex items-center justify-center mb-4 animate-float">
              <span className="material-symbols-outlined text-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                savings
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">
              Nenhuma caixinha ainda
            </h3>
            <p className="text-body-md text-on-surface-variant mb-4">
              Crie sua primeira caixinha para começar a guardar dinheiro.
            </p>
            <Link href="/goals/new">
              <Button variant="primary" icon="add">
                Criar Caixinha
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => (
              <Link key={goal.id} href={`/goals/${goal.id}`}>
                <GoalCard goal={goal} />
              </Link>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </>
  );
}
