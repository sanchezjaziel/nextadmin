import { formatCurrency } from '@/utils/helpers';
import styles from './BalanceCard.module.css';

interface BalanceCardProps {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
}

export default function BalanceCard({ balance, totalIncome, totalExpenses }: BalanceCardProps) {
  const getBalanceColor = () => {
    if (balance > 0) return 'var(--color-success-light)';
    if (balance < 0) return 'var(--color-danger-light)';
    return 'white';
  };

  return (
    <div className={styles.balanceCard}>
      <div className={styles.balanceHeader}>
        <span className={styles.balanceLabel}>Balance Total</span>
      </div>
      <div className={styles.balanceAmount} style={{ color: getBalanceColor() }}>
        {formatCurrency(balance)}
      </div>
      <div className={styles.balanceDetails}>
        <div className={styles.balanceItem}>
          <span className={styles.balanceItemLabel}>Ingresos</span>
          <span className={styles.balanceItemAmount}>{formatCurrency(totalIncome)}</span>
        </div>
        <div className={styles.balanceDivider}></div>
        <div className={styles.balanceItem}>
          <span className={styles.balanceItemLabel}>Gastos</span>
          <span className={styles.balanceItemAmount}>{formatCurrency(totalExpenses)}</span>
        </div>
      </div>
    </div>
  );
}
