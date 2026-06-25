'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header, BottomNav } from '@/components/layout';
import { Button, Toast } from '@/components/ui';
import { createGoal } from '@/lib/supabase/goals';
import { GOAL_ICONS, GOAL_COLORS } from '@/lib/utils/constants';

export default function NewGoalPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [color, setColor] = useState<'primary' | 'secondary' | 'tertiary'>('primary');
  const [icon, setIcon] = useState('savings');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: '', subtitle: '', type: 'success' as 'success' | 'error' });

  const handleSubmit = async () => {
    if (!name.trim()) {
      setToastMessage({
        message: 'Ops!',
        subtitle: 'Digite um nome para sua caixinha.',
        type: 'error',
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const targetValue = parseFloat(target.replace(',', '.'));
    if (!targetValue || targetValue <= 0) {
      setToastMessage({
        message: 'Ops!',
        subtitle: 'Digite um valor válido para a meta.',
        type: 'error',
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setLoading(true);
    try {
      await createGoal({
        name: name.trim(),
        target: targetValue,
        color,
        icon,
      });

      setToastMessage({
        message: 'Caixinha criada! 🎉',
        subtitle: 'Agora comece a contribuir para alcançar seu sonho.',
        type: 'success',
      });
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        router.push('/goals');
      }, 2500);
    } catch (error) {
      console.error('Error creating goal:', error);
      setToastMessage({
        message: 'Erro ao criar',
        subtitle: 'Tente novamente mais tarde.',
        type: 'error',
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title="Nova Caixinha" showBack />

      <main className="flex-1 px-container-padding pb-24 max-w-2xl mx-auto w-full">
        <div className="space-y-6">
          {/* Preview */}
          <div className="bg-surface-container-lowest rounded-lg p-6 text-center gummy-shadow">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-3 ${
              color === 'primary' ? 'bg-primary-container' :
              color === 'secondary' ? 'bg-secondary-container' :
              'bg-tertiary-container'
            }`}>
              <span className={`material-symbols-outlined text-4xl ${
                color === 'primary' ? 'text-primary' :
                color === 'secondary' ? 'text-secondary' :
                'text-tertiary'
              }`} style={{ fontVariationSettings: "'FILL' 1" }}>
                {icon}
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface">
              {name || 'Nome da Caixinha'}
            </h3>
            <p className="text-body-md text-outline">
              Meta: {target ? `R$ ${target}` : 'R$ 0,00'}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="text-label-sm font-label-sm text-outline uppercase tracking-widest block mb-2">
                Nome da Caixinha
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Viagem Japão"
                className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary-container focus:ring-0 rounded-xl px-4 py-3 font-body-md text-on-surface transition-all placeholder:text-outline/50"
              />
            </div>

            <div>
              <label className="text-label-sm font-label-sm text-outline uppercase tracking-widest block mb-2">
                Meta (R$)
              </label>
              <input
                type="text"
                value={target}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9,]/g, '');
                  setTarget(value);
                }}
                placeholder="0,00"
                className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary-container focus:ring-0 rounded-xl px-4 py-3 font-body-md text-on-surface transition-all placeholder:text-outline/50"
              />
            </div>

            <div>
              <label className="text-label-sm font-label-sm text-outline uppercase tracking-widest block mb-2">
                Cor
              </label>
              <div className="flex gap-3">
                {GOAL_COLORS.map((c) => (
                  <button
                    key={c.value}
                    className={`w-12 h-12 rounded-full transition-all ${
                      color === c.value
                        ? `${c.bg} ring-2 ring-primary ring-offset-2`
                        : `${c.bg} opacity-60`
                    }`}
                    onClick={() => setColor(c.value as 'primary' | 'secondary' | 'tertiary')}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-label-sm font-label-sm text-outline uppercase tracking-widest block mb-2">
                Ícone
              </label>
              <div className="grid grid-cols-6 gap-2">
                {GOAL_ICONS.map((i) => (
                  <button
                    key={i}
                    className={`p-2 rounded-lg transition-all ${
                      icon === i
                        ? 'bg-primary-fixed text-primary'
                        : 'bg-surface-container-low text-outline hover:bg-surface-container'
                    }`}
                    onClick={() => setIcon(i)}
                  >
                    <span className="material-symbols-outlined">{i}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-container-padding bg-gradient-to-t from-background via-background to-transparent pointer-events-none">
        <Button
          variant="primary"
          size="lg"
          className="pointer-events-auto w-full flex items-center justify-center gap-2"
          onClick={handleSubmit}
          disabled={loading || !name.trim() || !target}
          icon={loading ? 'refresh' : 'add'}
          isLoading={loading}
        >
          {loading ? 'Criando...' : 'Criar Caixinha'}
        </Button>
      </div>

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
