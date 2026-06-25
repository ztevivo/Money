// Usuário único
export const USER_ID = 'single-user';

// Metas padrão
export const DEFAULT_GOALS = [
  { name: 'Viagem Japão', target: 2500, color: 'primary', icon: 'flight' },
  { name: 'Novo Jogo', target: 350, color: 'secondary', icon: 'sports_esports' },
  { name: 'Pet Fund', target: 1200, color: 'tertiary', icon: 'pets' },
];

// Ícones por categoria
export const ICON_MAP: Record<string, string> = {
  'Viagem Japão': 'flight',
  'Novo Jogo': 'sports_esports',
  'Pet Fund': 'pets',
  default: 'savings',
};

// Cores por categoria
export const COLOR_MAP: Record<string, string> = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
};
