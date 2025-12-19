/**
 * Format a number as MXN currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(amount);
}

/**
 * Get display name for a category
 */
export function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    'salario': 'Salario',
    'freelance': 'Freelance',
    'otros-ingresos': 'Otros Ingresos',
    'comida': 'Comida',
    'transporte': 'Transporte',
    'entretenimiento': 'Entretenimiento',
    'servicios': 'Servicios',
    'compras': 'Compras',
    'otros-gastos': 'Otros Gastos'
  };
  return names[category] || category;
}

/**
 * Get emoji icon for a category
 */
export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'salario': '💼',
    'freelance': '💻',
    'otros-ingresos': '💵',
    'comida': '🍔',
    'transporte': '🚗',
    'entretenimiento': '🎮',
    'servicios': '💡',
    'compras': '🛍️',
    'otros-gastos': '📦'
  };
  return icons[category] || '📌';
}

/**
 * Generate a unique ID for transactions
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
