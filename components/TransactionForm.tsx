import { useState, FormEvent } from 'react';
import { Transaction } from '@/types/transaction';
import { generateId } from '@/utils/helpers';
import styles from './TransactionForm.module.css';

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
}

export default function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('salario');
  const [type, setType] = useState<'income' | 'expense'>('income');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const amountValue = parseFloat(amount);
    
    if (!description.trim() || !amountValue || amountValue <= 0) {
      alert('Por favor, completa todos los campos correctamente');
      return;
    }

    const transaction: Transaction = {
      id: generateId(),
      description: description.trim(),
      amount: amountValue,
      category,
      type,
      date: new Date().toISOString()
    };

    onAddTransaction(transaction);
    
    // Reset form
    setDescription('');
    setAmount('');
    setCategory('salario');
  };

  return (
    <div className={styles.formCard}>
      <h2 className={styles.formTitle}>Nueva Transacción</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.formLabel}>
            Descripción
          </label>
          <input
            type="text"
            id="description"
            className={styles.formInput}
            placeholder="Ej: Salario, Compras, Renta..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="amount" className={styles.formLabel}>
              Cantidad
            </label>
            <input
              type="number"
              id="amount"
              className={styles.formInput}
              placeholder="0.00"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.formLabel}>
              Categoría
            </label>
            <select
              id="category"
              className={styles.formInput}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="salario">💼 Salario</option>
              <option value="freelance">💻 Freelance</option>
              <option value="otros-ingresos">💵 Otros Ingresos</option>
              <option value="comida">🍔 Comida</option>
              <option value="transporte">🚗 Transporte</option>
              <option value="entretenimiento">🎮 Entretenimiento</option>
              <option value="servicios">💡 Servicios</option>
              <option value="compras">🛍️ Compras</option>
              <option value="otros-gastos">📦 Otros Gastos</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Tipo</label>
          <div className={styles.typeSelector}>
            <button
              type="button"
              className={`${styles.typeBtn} ${type === 'income' ? styles.active : ''}`}
              onClick={() => setType('income')}
            >
              <span className={styles.typeIcon}>📈</span>
              <span>Ingreso</span>
            </button>
            <button
              type="button"
              className={`${styles.typeBtn} ${type === 'expense' ? styles.active : ''}`}
              onClick={() => setType('expense')}
            >
              <span className={styles.typeIcon}>📉</span>
              <span>Gasto</span>
            </button>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          <span>Agregar Transacción</span>
        </button>
      </form>
    </div>
  );
}
