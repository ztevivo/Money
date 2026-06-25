import { supabase } from './client';
import { Contribution, CreateContributionInput } from '@/types';

// ============================================
// CONTRIBUIÇÕES
// ============================================

export async function getContributions(goalId?: string): Promise<Contribution[]> {
  let query = supabase
    .from('contributions')
    .select('*')
    .order('created_at', { ascending: false });

  if (goalId) {
    query = query.eq('goal_id', goalId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching contributions:', error);
    return [];
  }

  return data || [];
}

export async function createContribution(input: CreateContributionInput): Promise<Contribution | null> {
  const { data, error } = await supabase
    .from('contributions')
    .insert([input])
    .select()
    .single();

  if (error) {
    console.error('Error creating contribution:', error);
    return null;
  }

  return data;
}

export async function deleteContribution(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('contributions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting contribution:', error);
    return false;
  }

  return true;
}

export async function getRecentContributions(limit: number = 5): Promise<Contribution[]> {
  const { data, error } = await supabase
    .from('contributions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent contributions:', error);
    return [];
  }

  return data || [];
}
