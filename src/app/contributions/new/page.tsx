'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header, BottomNav } from '@/components/layout';
import { Button, Card, Numpad, Toast } from '@/components/ui';
import { getGoals } from '@/lib/supabase/goals';
import { createContribution } from '@/lib/supabase/contributions';
import { formatCurrency } from '@/lib/utils/format';
import { Goal } from '@/types';

export default function NewContributionPage() {
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [amount, setAmount] = useState('0');
  const [contributorName, setContributorName] = useState('');
  const [source, setSource] = useState<'salary' | 'bonus' | 'other'>('salary');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: '', subtitle: '' });
  const [loadingGoals, setLoadingGoals] = useState(true);

  useEffect(() => {
    async function loadGoals() {
      try {
        const data = await getGoals();
        setGoals(data);
        if (data.length > 0) {
          setSelectedGoalId(data[0].id);
        }
      } catch (error) {
        console.error('Error loading goals:', error);
      } finally {
        setLoadingGoals(false);
      }
    }
    loadGoals();
  }, []);

  const formattedAmount = amount === '0' ? 'R$ 0,00' : `R$ ${amount.replace(',', '.').padStart(3, '0')}`;

  const handleSubmit = async () => {
    if (!selectedGoalId || amount === '0') {
      setToastMessage({
        message: 'Oops!',
        subtitle: 'Selecione uma caixinha e digite um valor válido.',
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setLoading(true);
    try {
      await createContribution({
        goal_id: selectedGoalId,
        amount: parseFloat(amount.replace(',', '.')),
        contributor_name: contributorName || undefined,
        source,
      });

      setToastMessage({
        message: 'Sucesso! Contribuição salva.',
        subtitle: 'Você está mais perto do seu sonho! 🎉',
      });
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        router.push('/');
      }, 3000);
    } catch (error) {
      console.error('Error creating contribution:', error);
      setToastMessage({
        message: 'Erro ao salvar',
        subtitle: 'Tente novamente mais tarde.',
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const getGoalIcon = (goal: Goal) => {
    const icons: Record<string, string> = {
      'Viagem Japão': 'flight',
      'Novo Jogo': 'sports_esports',
      'Pet Fund': 'pets',
    };
    return icons[goal.name] || goal.icon || 'savings';
  };

  const getGoalColor = (goal: Goal) => {
    return goal.color || 'primary';
  };

  if (loadingGoals) {
    return (
      <>
        <Header title="Registrar Contribuição" showBack />
        <main className="flex-1 px-container-padding pb-24 max-w-2xl mx-auto w-full">
          <div className="animate-pulse space-y-4">
            <div className="h-24 bg-surface-container-high rounded-lg" />
            <div className="h-64 bg-surface-container-high rounded-lg" />
          </div>
        </main>
        <BottomNav />
      </>
    );
  }

  if (goals.length === 0) {
    return (
      <>
        <Header title="Registrar Contribuição" showBack />
        <main className="flex-1 px-container-padding pb-24 max-w-2xl mx-auto w-full">
          <div className="text-center py-12">
            <div className="w-32 h-32 mx-auto bg-tertiary-container rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-tertiary text-6xl">savings</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">
              Nenhuma caixinha ainda
            </h3>
            <p className="text-body-md text-on-surface-variant mb-4">
              Crie uma caixinha primeiro para poder contribuir.
            </p>
            <Button variant="primary" icon="add" onClick={() => router.push('/goals/new')}>
              Criar Caixinha
            </Button>
          </div>
        </main>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <Header title="Registrar Contribuição" showBack />

      <main className="flex-1 px-container-padding pb-24 max-w-2xl mx-auto w-full space-y-6">
        {/* Selecionar Caixinha */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="font-headline-md text-headline-md text-primary">Selecionar Caixinha</h2>
            <span className="text-label-sm font-label-sm text-outline">1 de 3</span>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar py-2 -mx-2 px-2">
            {goals.map((goal) => {
              const isSelected = selectedGoalId === goal.id;
              const color = getGoalColor(goal);
              const icon = getGoalIcon(goal);
              const bgColor = color === 'primary' ? 'bg-primary-container' :
                             color === 'secondary' ? 'bg-secondary-container' :
                             'bg-tertiary-container';
              const textColor = color === 'primary' ? 'text-primary' :
                               color === 'secondary' ? 'text-secondary' :
                               'text-tertiary';

              return (
                <div
                  key={goal.id}
                  className={`min-w-[130px] bg-surface-container-lowest p-4 rounded-lg flex flex-col items-center gap-2 border-2 cursor-pointer transition-all hover:shadow-md ${
                    isSelected
                      ? 'border-primary-container bg-primary-fixed/30 shadow-lg'
                      : 'border-transparent'
                  }`}
                  onClick={() => setSelectedGoalId(goal.id)}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-1 ${bgColor}`}>
                    <span className={`material-symbols-outlined scale-125 ${textColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                      {icon}
                    </span>
                  </div>
                  <span className="font-body-lg text-body-lg text-on-surface">{goal.name}</span>
                  <span className={`text-label-sm font-label-sm ${goal.saved >= goal.target ? 'text-primary' : 'text-outline'}`}>
                    {formatCurrency(goal.saved)}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Valor e Numpad */}
        <Card className="flex flex-col items-center gap-6">
          <div className="text-center w-full">
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-widest">Valor</span>
            <div className="text-[48px] font-headline-lg text-primary tracking-tighter mt-1 font-headline">
              {formattedAmount}
            </div>
          </div>

          <div className="w-full max-w-sm space-y-2">
            <label className="text-label-sm font-label-sm text-outline uppercase tracking-widest px-2">
              Quem está contribuindo?
            </label>
            <input
              type="text"
              value={contributorName}
              onChange={(e) => setContributorName(e.target.value)}
              placeholder="Nome do contribuidor..."
              className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary-container focus:ring-0 rounded-xl px-4 py-3 font-body-md text-on-surface transition-all placeholder:text-outline/50"
            />
          </div>

          <Numpad
            value={amount}
            onChange={setAmount}
            maxLength={10}
          />
        </Card>

        {/* Origem */}
        <section className="space-y-4 pb-8">
          <h2 className="font-headline-md text-headline-md text-primary">Origem</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="source"
                value="salary"
                checked={source === 'salary'}
                onChange={() => setSource('salary')}
                className="hidden peer"
              />
              <div className="bg-surface-container-lowest p-5 rounded-lg border-2 border-transparent peer-checked:border-primary-container peer-checked:bg-primary-fixed/20 flex flex-col items-center gap-3 transition-all hover:shadow-sm">
                <div className="w-12 h-12 bg-secondary-fixed-dim rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary-fixed-variant" style={{ fontVariationSettings: "'FILL' 1" }}>
                    savings
                  </span>
                </div>
                <span className="font-body-lg text-body-lg text-on-surface">Salário</span>
              </div>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                name="source"
                value="bonus"
                checked={source === 'bonus'}
                onChange={() => setSource('bonus')}
                className="hidden peer"
              />
              <div className="bg-surface-container-lowest p-5 rounded-lg border-2 border-transparent peer-checked:border-primary-container peer-checked:bg-primary-fixed/20 flex flex-col items-center gap-3 transition-all hover:shadow-sm">
                <div className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                    redeem
                  </span>
                </div>
                <span className="font-body-lg text-body-lg text-on-surface">Bônus / Extra</span>
              </div>
            </label>
          </div>
        </section>
      </main>

      {/* Botão Fixo */}
      <div className="fixed bottom-0 left-0 w-full p-container-padding bg-gradient-to-t from-background via-background to-transparent pointer-events-none">
        <Button
          variant="primary"
          size="lg"
          className="pointer-events-auto w-full flex items-center justify-center gap-2"
          onClick={handleSubmit}
          disabled={loading || !selectedGoalId || amount === '0'}
          icon={loading ? 'refresh' : 'celebration'}
          isLoading={loading}
        >
          {loading ? 'Enviando...' : 'Registrar Contribuição'}
        </Button>
      </div>

      {showToast && (
        <Toast
          message={toastMessage.message}
          subtitle={toastMessage.subtitle}
          type={toastMessage.message.includes('Erro') ? 'error' : 'success'}
          onClose={() => setShowToast(false)}
        />
      )}

      <BottomNav />
    </>
  );
}
