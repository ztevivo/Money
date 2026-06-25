// ============================================
// CONSTANTES DO SISTEMA
// ============================================

export const USER_ID = 'single-user';

export const DEFAULT_GOALS = [
  { name: 'Viagem Japão', target: 2500, color: 'primary', icon: 'flight' },
  { name: 'Novo Jogo', target: 350, color: 'secondary', icon: 'sports_esports' },
  { name: 'Pet Fund', target: 1200, color: 'tertiary', icon: 'pets' },
];

export const SOURCE_OPTIONS = [
  { value: 'salary', label: 'Salário', icon: 'savings', color: 'secondary' },
  { value: 'bonus', label: 'Bônus / Extra', icon: 'redeem', color: 'tertiary' },
  { value: 'other', label: 'Outro', icon: 'more_horiz', color: 'primary' },
];

export const GOAL_COLORS = [
  { value: 'primary', label: 'Rosa', bg: 'bg-primary-container', text: 'text-primary' },
  { value: 'secondary', label: 'Menta', bg: 'bg-secondary-container', text: 'text-secondary' },
  { value: 'tertiary', label: 'Lavanda', bg: 'bg-tertiary-container', text: 'text-tertiary' },
];

export const GOAL_ICONS = [
  'flight', 'sports_esports', 'pets', 'savings', 'redeem',
  'beach_access', 'icecream', 'restaurant', 'shopping_bag',
  'directions_car', 'home', 'school', 'favorite', 'star',
];
