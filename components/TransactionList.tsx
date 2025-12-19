import { Transaction } from '@/types/transaction';
import TransactionItem from './TransactionItem';
import styles from './TransactionList.module.css';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export default function TransactionList({ transactions, onDeleteTransaction }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className={styles.transactionsCard}>
        <h2 className={styles.transactionsTitle}>Historial de Transacciones</h2>
        <div className={styles.transactionsList}>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📊</div>
            <p className={styles.emptyText}>No hay transacciones aún</p>
            <p className={styles.emptySubtext}>Agrega tu primera transacción para comenzar</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.transactionsCard}>
      <h2 className={styles.transactionsTitle}>Historial de Transacciones</h2>
      <div className={styles.transactionsList}>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDelete={onDeleteTransaction}
          />
        ))}
      </div>
    </div>
  );
}
