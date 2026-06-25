// ============================================
// TIPOS PRINCIPAIS
// ============================================

export interface Goal {
  id: string;
  name: string;
  target: number;
  saved: number;
  color: 'primary' | 'secondary' | 'tertiary';
  icon: string;
  created_at: string;
}

export interface Contribution {
  id: string;
  goal_id: string;
  amount: number;
  contributor_name: string | null;
  source: 'salary' | 'bonus' | 'other';
  created_at: string;
}

export interface DashboardStats {
  total_saved: number;
  total_target: number;
  total_goals: number;
  total_contributions: number;
  total_contributed: number;
}

// ============================================
// TIPOS PARA FORMULÁRIOS
// ============================================

export interface CreateGoalInput {
  name: string;
  target: number;
  color: 'primary' | 'secondary' | 'tertiary';
  icon: string;
}

export interface CreateContributionInput {
  goal_id: string;
  amount: number;
  contributor_name?: string;
  source: 'salary' | 'bonus' | 'other';
}

// ============================================
// TIPOS PARA COMPONENTES
// ============================================

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  subtitle?: string;
  type: ToastType;
  duration?: number;
}
