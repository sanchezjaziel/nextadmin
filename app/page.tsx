'use client';

import { useMemo } from 'react';
import { Transaction } from '@/types/transaction';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import BalanceCard from '@/components/BalanceCard';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';

export default function Home() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('budget-transactions', []);

  // Calculate totals
  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses
    };
  }, [transactions]);

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <h1 className="title">💰 Mi Presupuesto</h1>
          <p className="subtitle">Gestiona tus finanzas mensuales</p>
        </div>
      </header>

      <main className="main-content">
        <BalanceCard
          balance={balance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />

        <TransactionForm onAddTransaction={handleAddTransaction} />

        <TransactionList
          transactions={transactions}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </main>
    </div>
  );
}
