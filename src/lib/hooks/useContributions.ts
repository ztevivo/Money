'use client';

import { useState, useEffect, useCallback } from 'react';
import { getContributions, createContribution, deleteContribution } from '@/lib/supabase/contributions';
import { Contribution, CreateContributionInput } from '@/types';

export function useContributions(goalId?: string) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadContributions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getContributions(goalId);
      setContributions(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [goalId]);

  const addContribution = useCallback(async (input: CreateContributionInput) => {
    try {
      const newContribution = await createContribution(input);
      if (newContribution) {
        setContributions((prev) => [newContribution, ...prev]);
      }
      return newContribution;
    } catch (err) {
      setError(err as Error);
      return null;
    }
  }, []);

  const deleteContributionById = useCallback(async (id: string) => {
    try {
      const success = await deleteContribution(id);
      if (success) {
        setContributions((prev) => prev.filter((c) => c.id !== id));
      }
      return success;
    } catch (err) {
      setError(err as Error);
      return false;
    }
  }, []);

  useEffect(() => {
    loadContributions();
  }, [loadContributions]);

  return {
    contributions,
    loading,
    error,
    loadContributions,
    addContribution,
    deleteContribution: deleteContributionById,
  };
}
