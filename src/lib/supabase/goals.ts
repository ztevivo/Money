import { supabase } from './client';
import { Goal } from '@/types';

export async function createGoal(data: Omit<Goal, 'id' | 'created_at'>) {
  const { data: goal, error } = await supabase
    .from('goals')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return goal;
}

export async function updateGoal(id: string, updates: Partial<Goal>) {
  const { data: goal, error } = await supabase
    .from('goals')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return goal;
}

export async function getGoals(userId: string) {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
