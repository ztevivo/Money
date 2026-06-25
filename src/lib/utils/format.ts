// ============================================
// FORMATAÇÃO DE VALORES
// ============================================

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatDateShort(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(date));
}

export function formatRelativeDate(date: string): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'agora';
  if (minutes < 60) return `${minutes}m atrás`;
  if (hours < 24) return `${hours}h atrás`;
  if (days < 7) return `${days}d atrás`;
  return formatDate(date);
}

// ============================================
// FORMATAÇÃO DE PERCENTUAL
// ============================================

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

// ============================================
// FORMATAÇÃO DE VALOR DO INPUT
// ============================================

export function parseCurrencyInput(value: string): number {
  // Remove tudo exceto números e vírgula
  const clean = value.replace(/[^0-9,]/g, '');
  // Substitui vírgula por ponto
  return parseFloat(clean.replace(',', '.')) || 0;
}

export function formatCurrencyInput(value: number): string {
  return value.toFixed(2).replace('.', ',');
}
