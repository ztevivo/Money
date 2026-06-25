import { supabase } from './client';
import { Goal, CreateGoalInput } from '@/types';

// ============================================
// METAS (CAIXINHAS)
// ============================================

export async function getGoals(): Promise<Goal[]> {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching goals:', error);
    return [];
  }

  return data || [];
}

export async function getGoalById(id: string): Promise<Goal | null> {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching goal:', error);
    return null;
  }

  return data;
}

export async function createGoal(input: CreateGoalInput): Promise<Goal | null> {
  const { data, error } = await supabase
    .from('goals')
    .insert([input])
    .select()
    .single();

  if (error) {
    console.error('Error creating goal:', error);
    return null;
  }

  return data;
}

export async function updateGoal(id: string, updates: Partial<Goal>): Promise<Goal | null> {
  const { data, error } = await supabase
    .from('goals')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating goal:', error);
    return null;
  }

  return data;
}

export async function deleteGoal(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('goals')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting goal:', error);
    return false;
  }

  return true;
}

export async function getDashboardStats(): Promise<{
  total_saved: number;
  total_target: number;
  total_goals: number;
  total_contributions: number;
  total_contributed: number;
}> {
  const { data, error } = await supabase
    .from('dashboard_stats')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      total_saved: 0,
      total_target: 0,
      total_goals: 0,
      total_contributions: 0,
      total_contributed: 0,
    };
  }

  return data;
}
