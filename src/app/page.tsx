'use client';

import { useEffect, useState } from 'react';
import { Header, BottomNav } from '@/components/layout';
import { DashboardStats } from '@/components/features/dashboard';
import { GoalList } from '@/components/features/goals';
import { Button } from '@/components/ui/Button';
import { getGoals, getDashboardStats } from '@/lib/supabase/goals';
import { getRecentContributions } from '@/lib/supabase/contributions';
import { Goal, Contribution } from '@/types';
import Link from 'next/link';

export default function DashboardPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [stats, setStats] = useState({
    total_saved: 0,
    total_target: 0,
    total_goals: 0,
    total_contributions: 0,
    total_contributed: 0,
  });
  const [recentContributions, setRecentContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [goalsData, statsData, contributionsData] = await Promise.all([
          getGoals(),
          getDashboardStats(),
          getRecentContributions(5),
        ]);

        setGoals(goalsData);
        setStats(statsData);
        setRecentContributions(contributionsData);
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <>
        <Header title="ZenFinance" />
        <main className="flex-1 px-container-padding pb-24 max-w-2xl mx-auto w-full">
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-surface-container-high rounded-lg" />
            <div className="h-48 bg-surface-container-high rounded-lg" />
          </div>
        </main>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <Header
        title="ZenFinance"
        rightAction={
          <div className="w-10 h-10 bg-primary-fixed rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
              stars
            </span>
          </div>
        }
      />

      <main className="flex-1 px-container-padding pb-24 max-w-2xl mx-auto w-full space-y-6">
        <DashboardStats stats={stats} />

        <div className="flex justify-between items-center">
          <h2 className="font-headline-md text-headline-md text-primary">Suas Caixinhas</h2>
          <Link href="/goals/new">
            <Button variant="primary" size="sm" icon="add">
              Nova
            </Button>
          </Link>
        </div>

        <GoalList goals={goals} />

        {recentContributions.length > 0 && (
          <div className="mt-6">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              Últimas Contribuições
            </h2>
            <div className="space-y-2">
              {recentContributions.map((contribution) => {
                const goal = goals.find((g) => g.id === contribution.goal_id);
                return (
                  <div
                    key={contribution.id}
                    className="bg-surface-container-lowest rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-fixed rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-xl">
                          {goal?.icon || 'savings'}
                        </span>
                      </div>
                      <div>
                        <p className="font-body-md text-body-md text-on-surface">
                          {contribution.contributor_name || 'Você'}
                        </p>
                        <p className="text-label-sm font-label-sm text-outline">
                          {goal?.name || 'Caixinha'} • {new Date(contribution.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <span className="font-headline-md text-headline-md text-primary">
                      +R$ {contribution.amount.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {goals.length === 0 && (
          <div className="text-center py-12">
            <div className="w-32 h-32 mx-auto bg-primary-fixed rounded-full flex items-center justify-center mb-4 animate-float">
              <span className="material-symbols-outlined text-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                savings
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">
              Sua primeira caixinha!
            </h3>
            <p className="text-body-md text-on-surface-variant mb-4">
              Crie uma caixinha para começar a guardar dinheiro para seus sonhos.
            </p>
            <Link href="/goals/new">
              <Button variant="primary" icon="add">
                Criar Caixinha
              </Button>
            </Link>
          </div>
        )}
      </main>

      <BottomNav />
    </>
  );
}
