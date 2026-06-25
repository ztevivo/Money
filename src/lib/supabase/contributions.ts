import { supabase } from './client';
import { Contribution } from '@/types';

export async function createContribution(data: Omit<Contribution, 'id' | 'created_at'>) {
  const { data: contribution, error } = await supabase
    .from('contributions')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return contribution;
}

export async function getContributions(userId: string) {
  const { data, error } = await supabase
    .from('contributions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
