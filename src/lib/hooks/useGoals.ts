'use client';

import { useState, useEffect, useCallback } from 'react';
import { getGoals, createGoal, updateGoal, deleteGoal } from '@/lib/supabase/goals';
import { Goal, CreateGoalInput } from '@/types';

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadGoals = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getGoals();
      setGoals(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addGoal = useCallback(async (input: CreateGoalInput) => {
    try {
      const newGoal = await createGoal(input);
      if (newGoal) {
        setGoals((prev) => [...prev, newGoal]);
      }
      return newGoal;
    } catch (err) {
      setError(err as Error);
      return null;
    }
  }, []);

  const updateGoalById = useCallback(async (id: string, updates: Partial<Goal>) => {
    try {
      const updated = await updateGoal(id, updates);
      if (updated) {
        setGoals((prev) => prev.map((g) => g.id === id ? updated : g));
      }
      return updated;
    } catch (err) {
      setError(err as Error);
      return null;
    }
  }, []);

  const deleteGoalById = useCallback(async (id: string) => {
    try {
      const success = await deleteGoal(id);
      if (success) {
        setGoals((prev) => prev.filter((g) => g.id !== id));
      }
      return success;
    } catch (err) {
      setError(err as Error);
      return false;
    }
  }, []);

  useEffect(() => {
    loadGoals();
  }, [loadGoals]);

  return {
    goals,
    loading,
    error,
    loadGoals,
    addGoal,
    updateGoal: updateGoalById,
    deleteGoal: deleteGoalById,
  };
}
