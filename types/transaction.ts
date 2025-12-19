export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'salario'
  | 'freelance'
  | 'otros-ingresos'
  | 'comida'
  | 'transporte'
  | 'entretenimiento'
  | 'servicios'
  | 'compras'
  | 'otros-gastos';
