export interface Goal {
  id: string;
  user_id: string;
  name: string;
  target: number;
  saved: number;
  color: 'primary' | 'secondary' | 'tertiary';
  icon?: string;
  created_at: string;
}

export interface Contribution {
  id: string;
  user_id: string;
  goal_id: string;
  amount: number;
  contributor_name?: string;
  source: 'salary' | 'bonus' | 'other';
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
}
