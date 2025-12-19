import { Transaction } from '@/types/transaction';
import { getCategoryIcon, getCategoryName } from '@/utils/helpers';
import styles from './TransactionItem.module.css';

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

export default function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
  const icon = getCategoryIcon(transaction.category);
  const sign = transaction.type === 'income' ? '+' : '-';

  return (
    <div className={`${styles.transactionItem} ${styles[transaction.type]}`}>
      <div className={styles.transactionIcon}>{icon}</div>
      <div className={styles.transactionInfo}>
        <div className={styles.transactionDescription}>{transaction.description}</div>
        <div className={styles.transactionCategory}>{getCategoryName(transaction.category)}</div>
      </div>
      <div className={styles.transactionAmount}>
        {sign}${transaction.amount.toFixed(2)}
      </div>
      <button 
        className={styles.transactionDelete}
        onClick={() => onDelete(transaction.id)}
        aria-label="Eliminar transacción"
      >
        🗑️
      </button>
    </div>
  );
}
