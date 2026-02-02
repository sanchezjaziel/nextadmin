"use client";

import { useMemo, useState, useEffect } from "react";
import {
  categoryGroups,
  getCategoriesByType,
  movementTypes,
} from "../data/categories";
import styles from "./movement-form.module.css";

const emptyErrors = {
  amount: "",
  date: "",
  account: "",
  category: "",
  description: "",
};

const accounts = [
  "Banco Norte · Nómina",
  "Banco Uno · Crédito",
  "Cooperativa · Ahorro",
];

export default function MovementForm({
  isOpen,
  onClose,
  onSave,
  defaultType = "income",
  defaultCategory = "",
  accounts = [],
}) {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [type, setType] = useState(defaultType);
  const accountOptions =
    accounts.length > 0 ? accounts : [
      { id: "acc-1", name: "Banco Norte", type: "Nomina" },
      { id: "acc-2", name: "Banco Uno", type: "Credito" },
      { id: "acc-3", name: "Cooperativa", type: "Ahorro" },
    ];

  const [form, setForm] = useState({
    amount: "",
    date: today,
    account: accountOptions[0]?.id || "",
    category: defaultCategory,
    description: "",
  });
  const [errors, setErrors] = useState(emptyErrors);

  const categories = useMemo(() => getCategoriesByType(type), [type]);

  useEffect(() => {
    if (!isOpen) return;
    setType(defaultType);
    setForm((prev) => ({
      ...prev,
      date: today,
      category: defaultCategory,
      account: accountOptions[0]?.id || "",
    }));
  }, [accountOptions, defaultCategory, defaultType, isOpen, today]);

  useEffect(() => {
    if (!form.category) return;
    const exists = categories.some((category) => category.id === form.category);
    if (!exists) {
      setForm((prev) => ({ ...prev, category: "" }));
    }
  }, [categories, form.category]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const next = { ...emptyErrors };
    const amountValue = Number(
      String(form.amount).replace(/[$, ]/g, "")
    );

    if (!form.amount || Number.isNaN(amountValue) || amountValue <= 0) {
      next.amount = "Ingresa un monto válido.";
    }
    if (!form.date) {
      next.date = "Selecciona una fecha.";
    }
    if (!form.account) {
      next.account = "Selecciona una cuenta.";
    }
    if (!form.category) {
      next.category = "Selecciona una categoría.";
    }
    if (form.description.length > 80) {
      next.description = "La descripción es muy larga.";
    }

    setErrors(next);
    return Object.values(next).every((value) => value === "");
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    const payload = {
      id: `${Date.now()}`,
      type,
      amount: form.amount,
      date: form.date,
      account: form.account,
      category: form.category,
      description: form.description.trim(),
      createdAt: new Date().toISOString(),
    };

    if (onSave) onSave(payload);

    setForm((prev) => ({
      ...prev,
      amount: "",
      description: "",
      category: "",
    }));
    if (onClose) onClose();
  }

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div>
            <h3>Agregar movimiento</h3>
            <p className={styles.muted}>
              Registra ingresos, gastos o transferencias con su categoría.
            </p>
          </div>
          <button type="button" className={styles.close} onClick={onClose}>
            ✕
          </button>
        </div>

        <form className={styles.formBody} onSubmit={handleSubmit}>
          <div className={styles.toggleGroup}>
            {movementTypes.map((item) => (
              <button
                key={item.id}
                type="button"
                className={
                  item.id === type ? styles.toggleActive : styles.toggle
                }
                onClick={() => setType(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className={styles.formGrid}>
            <label className={styles.field}>
              <span>Monto</span>
              <input
                type="text"
                placeholder="$0.00"
                value={form.amount}
                onChange={(event) =>
                  updateField("amount", event.target.value)
                }
                aria-invalid={Boolean(errors.amount)}
              />
              {errors.amount && (
                <em className={styles.error}>{errors.amount}</em>
              )}
            </label>
            <label className={styles.field}>
              <span>Fecha</span>
              <input
                type="date"
                value={form.date}
                onChange={(event) => updateField("date", event.target.value)}
                aria-invalid={Boolean(errors.date)}
              />
              {errors.date && (
                <em className={styles.error}>{errors.date}</em>
              )}
            </label>
            <label className={styles.field}>
              <span>Cuenta</span>
              <select
                value={form.account}
                onChange={(event) => updateField("account", event.target.value)}
                aria-invalid={Boolean(errors.account)}
              >
                {accountOptions.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} · {account.type}
                  </option>
                ))}
              </select>
              {errors.account && (
                <em className={styles.error}>{errors.account}</em>
              )}
            </label>
            <label className={styles.field}>
              <span>Categoría</span>
              <select
                value={form.category}
                onChange={(event) => updateField("category", event.target.value)}
                aria-invalid={Boolean(errors.category)}
              >
                <option value="">Seleccionar</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <em className={styles.error}>{errors.category}</em>
              )}
            </label>
          </div>

          <label className={styles.field}>
            <span>Descripción</span>
            <input
              type="text"
              placeholder="Ej. Pago de nómina"
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              aria-invalid={Boolean(errors.description)}
            />
            {errors.description && (
              <em className={styles.error}>{errors.description}</em>
            )}
          </label>

          <div className={styles.categoryStrip}>
            <span>Tipos de categoría</span>
            <div className={styles.categoryChips}>
              {categoryGroups
                .filter((group) => group.type === type)
                .map((group) => (
                  <button key={group.id} type="button">
                    {group.label}
                  </button>
                ))}
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.ghost} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.primary}>
              Guardar movimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
