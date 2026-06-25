'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header, BottomNav } from '@/components/layout';
import { Button, Card, ProgressBar, Toast } from '@/components/ui';
import { getGoalById, deleteGoal } from '@/lib/supabase/goals';
import { getContributions } from '@/lib/supabase/contributions';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { Goal, Contribution } from '@/types';

export default function GoalDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: '', subtitle: '', type: 'success' as 'success' | 'error' });

  useEffect(() => {
    async function loadData() {
      try {
        const [goalData, contributionsData] = await Promise.all([
          getGoalById(params.id),
          getContributions(params.id),
        ]);
        setGoal(goalData);
        setContributions(contributionsData);
      } catch (error) {
        console.error('Error loading goal:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm('Tem certeza que quer deletar esta caixinha?')) return;

    try {
      await deleteGoal(params.id);
      router.push('/goals');
    } catch (error) {
      console.error('Error deleting goal:', error);
      setToastMessage({
        message: 'Erro ao deletar',
        subtitle: 'Tente novamente mais tarde.',
        type: 'error',
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  if (loading) {
    return (
      <>
        <Header title="Detalhe" showBack />
        <main className="flex-1 px-container-padding pb-24 max-w-2xl mx-auto w-full">
          <div className="animate-pulse space-y-4">
            <div className="h-48 bg-surface-container-high rounded-lg" />
            <div className="h-32 bg-surface-container-high rounded-lg" />
          </div>
        </main>
        <BottomNav />
      </>
    );
  }

  if (!goal) {
    return (
      <>
        <Header title="Detalhe" showBack />
        <main className="flex-1 px-container-padding pb-24 max-w-2xl mx-auto w-full">
          <div className="text-center py-12">
            <p className="text-body-md text-outline">Caixinha não encontrada</p>
            <Button variant="primary" className="mt-4" onClick={() => router.push('/goals')}>
              Voltar
            </Button>
          </div>
        </main>
        <BottomNav />
      </>
    );
  }

  const percentage = (goal.saved / goal.target) * 100;
  const isComplete = goal.saved >= goal.target;

  return (
    <>
      <Header title="Detalhe" showBack />

      <main className="flex-1 px-container-padding pb-24 max-w-2xl mx-auto w-full space-y-6">
        {/* Card Principal */}
        <Card variant="highlight" className="text-center">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
            goal.color === 'primary' ? 'bg-primary-container' :
            goal.color === 'secondary' ? 'bg-secondary-container' :
            'bg-tertiary-container'
          }`}>
            <span className={`material-symbols-outlined text-4xl ${
              goal.color === 'primary' ? 'text-primary' :
              goal.color === 'secondary' ? 'text-secondary' :
              'text-tertiary'
            }`} style={{ fontVariationSettings: "'FILL' 1" }}>
              {goal.icon || 'savings'}
            </span>
          </div>

          <h2 className="font-headline-md text-headline-md text-on-surface">{goal.name}</h2>

          {isComplete ? (
            <div className="mt-2 bg-primary-fixed px-4 py-2 rounded-full inline-block">
              <span className="text-label-sm font-label-sm text-on-primary-container">🎉 Meta Alcançada!</span>
            </div>
          ) : null}

          <div className="mt-4">
            <ProgressBar
              value={goal.saved}
              max={goal.target}
              color={goal.color}
              showLabel
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-label-sm font-label-sm text-outline">Guardado</p>
              <p className="font-headline-md text-headline-md text-primary">
                {formatCurrency(goal.saved)}
              </p>
            </div>
            <div>
              <p className="text-label-sm font-label-sm text-outline">Meta</p>
              <p className="font-headline-md text-headline-md text-on-surface">
                {formatCurrency(goal.target)}
              </p>
            </div>
          </div>
        </Card>

        {/* Ações */}
        <div className="flex gap-3">
          <Link href={`/contributions/new`} className="flex-1">
            <Button variant="primary" icon="add" size="md" className="w-full">
              Contribuir
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="md"
            icon="delete"
            className="!p-3 !rounded-full"
            onClick={handleDelete}
          />
        </div>

        {/* Histórico */}
        <div>
          <h3 className="font-headline-md text-headline-md text-primary mb-4">
            Histórico
          </h3>
          {contributions.length === 0 ? (
            <p className="text-body-md text-outline text-center py-8">
              Nenhuma contribuição ainda.
              <br />
              <span className="text-label-sm">Seja a primeira pessoa a contribuir!</span>
            </p>
          ) : (
            <div className="space-y-2">
              {contributions.map((contribution) => (
                <div
                  key={contribution.id}
                  className="bg-surface-container-lowest rounded-lg p-4 flex items-center justify-between gummy-shadow"
                >
                  <div>
                    <p className="font-body-md text-body-md text-on-surface">
                      {contribution.contributor_name || 'Você'}
                    </p>
                    <p className="text-label-sm font-label-sm text-outline">
                      {formatDate(contribution.created_at)} • {
                        contribution.source === 'salary' ? 'Salário' :
                        contribution.source === 'bonus' ? 'Bônus' : 'Outro'
                      }
                    </p>
                  </div>
                  <span className="font-headline-md text-headline-md text-primary">
                    +{formatCurrency(contribution.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {showToast && (
        <Toast
          message={toastMessage.message}
          subtitle={toastMessage.subtitle}
          type={toastMessage.type}
          onClose={() => setShowToast(false)}
        />
      )}

      <BottomNav />
    </>
  );
}
