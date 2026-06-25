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
            }`
