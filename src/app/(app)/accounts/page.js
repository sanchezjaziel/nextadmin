"use client";

import React from "react";
import styles from "../simple-page.module.css";
import formStyles from "./accounts.module.css";
import MovementModalTrigger from "../components/MovementModalTrigger";
import { addMovement, loadMovements } from "../data/movements";
import {
  addAccount,
  loadAccounts,
  removeAccount,
  updateAccount,
} from "../data/accounts";
import {
  categories,
  getCategoryLabel,
  movementTypes,
} from "../data/categories";

const accountTypes = [
  { id: "checking", label: "Nomina" },
  { id: "credit", label: "Credito" },
  { id: "savings", label: "Ahorro" },
];

function parseAmount(value) {
  const numeric = Number(String(value || "").replace(/[$, ]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

function formatAmount(value) {
  const numeric = parseAmount(value);
  const sign = numeric < 0 ? "-" : "";
  const absolute = Math.abs(numeric);
  return `${sign}$${absolute.toFixed(2)}`;
}

function AccountModal({ isOpen, onClose, onSave, initialData }) {
  const [form, setForm] = React.useState({
    name: "",
    type: "checking",
    balance: "",
    currency: "MXN",
  });
  const [errors, setErrors] = React.useState({ name: "", balance: "" });

  React.useEffect(() => {
    if (!isOpen) return;
    if (initialData) {
      setForm({
        name: initialData.name || "",
        type: accountTypes.find((item) => item.label === initialData.type)?.id ||
          "checking",
        balance: initialData.balance || "",
        currency: initialData.currency || "MXN",
      });
    } else {
      setForm({ name: "", type: "checking", balance: "", currency: "MXN" });
    }
    setErrors({ name: "", balance: "" });
  }, [initialData, isOpen]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validateAccount() {
    const next = { name: "", balance: "" };
    if (!form.name.trim()) {
      next.name = "El nombre es obligatorio.";
    }
    const balanceValue = Number(String(form.balance).replace(/[$, ]/g, ""));
    if (Number.isNaN(balanceValue)) {
      next.balance = "Saldo invalido.";
    }
    setErrors(next);
    return Object.values(next).every((value) => value === "");
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateAccount()) return;

    const payload = {
      id: initialData?.id || `${Date.now()}`,
      name: form.name.trim(),
      type: accountTypes.find((item) => item.id === form.type)?.label || "Nomina",
      balance: form.balance,
      currency: form.currency || "MXN",
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };

    onSave(payload);
  }

  if (!isOpen) return null;

  return (
    <div className={formStyles.modalOverlay}>
      <div className={formStyles.modal}>
        <div className={formStyles.modalHeader}>
          <div>
            <h3>{initialData ? "Editar cuenta" : "Agregar cuenta"}</h3>
            <p className={formStyles.hint}>
              Guarda tus cuentas locales para calcular tu saldo total.
            </p>
          </div>
          <button type="button" className={formStyles.close} onClick={onClose}>
            ?
          </button>
        </div>

        <form className={formStyles.formCard} onSubmit={handleSubmit}>
          <div className={formStyles.formGrid}>
            <label className={formStyles.field}>
              <span>Nombre</span>
              <input
                type="text"
                placeholder="Ej. Banco Norte"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <em className={formStyles.error}>{errors.name}</em>}
            </label>
            <label className={formStyles.field}>
              <span>Tipo</span>
              <select
                value={form.type}
                onChange={(event) => updateField("type", event.target.value)}
              >
                {accountTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </label>
            <label className={formStyles.field}>
              <span>Saldo inicial</span>
              <input
                type="text"
                placeholder="$0.00"
                value={form.balance}
                onChange={(event) => updateField("balance", event.target.value)}
                aria-invalid={Boolean(errors.balance)}
              />
              {errors.balance && (
                <em className={formStyles.error}>{errors.balance}</em>
              )}
            </label>
            <label className={formStyles.field}>
              <span>Moneda</span>
              <input
                type="text"
                value={form.currency}
                onChange={(event) => updateField("currency", event.target.value)}
              />
            </label>
          </div>
          <div className={formStyles.actions}>
            <button className={formStyles.primary} type="submit">
              {initialData ? "Guardar cambios" : "Guardar cuenta"}
            </button>
            <button
              className={formStyles.ghost}
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AccountsPage() {
  const [movements, setMovements] = React.useState([]);
  const [accounts, setAccounts] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingAccount, setEditingAccount] = React.useState(null);
  const [filters, setFilters] = React.useState({
    search: "",
    type: "all",
    category: "all",
    dateFrom: "",
    dateTo: "",
  });

  React.useEffect(() => {
    setMovements(loadMovements());
    setAccounts(loadAccounts());
  }, []);

  function handleSaveMovement(movement) {
    const next = addMovement(movement);
    setMovements(next);
  }

  function handleSaveAccount(account) {
    const next = editingAccount
      ? updateAccount(account.id, account)
      : addAccount(account);
    setAccounts(next);
    setModalOpen(false);
    setEditingAccount(null);
  }

  function handleRemoveAccount(accountId) {
    const next = removeAccount(accountId);
    setAccounts(next);
  }

  function getAccountLabel(accountId) {
    const found = accounts.find((account) => account.id === accountId);
    if (!found) return accountId || "Sin cuenta";
    return `${found.name} · ${found.type}`;
  }

  const totalAccounts = accounts.reduce(
    (sum, account) => sum + parseAmount(account.balance),
    0
  );
  const movementImpact = movements.reduce((sum, movement) => {
    const amount = parseAmount(movement.amount);
    if (movement.type === "income") return sum + amount;
    if (movement.type === "expense") return sum - amount;
    return sum;
  }, 0);
  const totalAvailable = totalAccounts + movementImpact;

  const filteredMovements = movements.filter((movement) => {
    if (filters.type !== "all" && movement.type !== filters.type) {
      return false;
    }
    if (filters.category !== "all" && movement.category !== filters.category) {
      return false;
    }
    if (filters.dateFrom && movement.date < filters.dateFrom) return false;
    if (filters.dateTo && movement.date > filters.dateTo) return false;
    const haystack = `${movement.description || ""} ${getCategoryLabel(
      movement.category
    )} ${getAccountLabel(movement.account)}`.toLowerCase();
    if (filters.search && !haystack.includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h1>Cuentas</h1>
          <p>
            Administra tus cuentas, movimientos y un presupuesto base para el
            mes actual.
          </p>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.ghost}
            type="button"
            onClick={() => {
              setEditingAccount(null);
              setModalOpen(true);
            }}
          >
            Nueva cuenta
          </button>
          <MovementModalTrigger
            label="Agregar movimiento"
            buttonClassName={styles.primary}
            defaultType="income"
            defaultCategory="salary"
            onSave={handleSaveMovement}
            accounts={accounts}
          />
        </div>
      </div>

      <article className={styles.card}>
        <div className={styles.panelHeader}>
          <h2>Resumen</h2>
          <span className={styles.tag}>Local</span>
        </div>
        <div className={styles.list}>
          <div className={formStyles.listRow}>
            <div className={formStyles.listMeta}>
              <strong>Saldo total en cuentas</strong>
              <span className={formStyles.hint}>Suma de saldos guardados</span>
            </div>
            <strong>{formatAmount(totalAccounts)}</strong>
          </div>
          <div className={formStyles.listRow}>
            <div className={formStyles.listMeta}>
              <strong>Disponibilidad</strong>
              <span className={formStyles.hint}>
                Saldos + movimientos registrados
              </span>
            </div>
            <strong>{formatAmount(totalAvailable)}</strong>
          </div>
        </div>
      </article>

      <article className={styles.card}>
        <div className={styles.panelHeader}>
          <h2>Mis cuentas</h2>
          <span className={styles.tag}>{accounts.length} cuentas</span>
        </div>
        <div className={styles.list}>
          {accounts.length === 0 && (
            <div className={formStyles.listRow}>
              <div className={formStyles.listMeta}>
                <p>Sin cuentas aun</p>
                <span className={formStyles.hint}>
                  Agrega tu primera cuenta para empezar.
                </span>
              </div>
              <strong>—</strong>
            </div>
          )}
          {accounts.map((account) => (
            <div key={account.id} className={formStyles.listRow}>
              <div className={formStyles.listMeta}>
                <strong>{account.name}</strong>
                <span className={formStyles.hint}>
                  {account.type} · {account.currency}
                </span>
              </div>
              <div className={formStyles.actions}>
                <strong>{formatAmount(account.balance)}</strong>
                <button
                  type="button"
                  className={formStyles.edit}
                  onClick={() => {
                    setEditingAccount(account);
                    setModalOpen(true);
                  }}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className={formStyles.delete}
                  onClick={() => handleRemoveAccount(account.id)}
                >
                  Borrar
                </button>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className={styles.card}>
        <div className={styles.panelHeader}>
          <h2>Movimientos</h2>
          <span className={styles.tag}>{filteredMovements.length} items</span>
        </div>
        <form className={formStyles.formCard}>
          <div className={formStyles.formGrid}>
            <label className={formStyles.field}>
              <span>Buscar</span>
              <input
                type="text"
                placeholder="Texto libre"
                value={filters.search}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, search: event.target.value }))
                }
              />
            </label>
            <label className={formStyles.field}>
              <span>Tipo</span>
              <select
                value={filters.type}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, type: event.target.value }))
                }
              >
                <option value="all">Todos</option>
                {movementTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </label>
            <label className={formStyles.field}>
              <span>Categoria</span>
              <select
                value={filters.category}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, category: event.target.value }))
                }
              >
                <option value="all">Todas</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </label>
            <label className={formStyles.field}>
              <span>Desde</span>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, dateFrom: event.target.value }))
                }
              />
            </label>
            <label className={formStyles.field}>
              <span>Hasta</span>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, dateTo: event.target.value }))
                }
              />
            </label>
          </div>
        </form>
        <div className={styles.list}>
          {filteredMovements.length === 0 && (
            <div className={styles.row}>
              <div>
                <p>Sin movimientos aun</p>
                <span>Agrega tu primer movimiento para empezar.</span>
              </div>
              <strong>—</strong>
            </div>
          )}
          {filteredMovements.map((movement) => (
            <div key={movement.id} className={styles.row}>
              <div>
                <p>
                  {movement.description || "Movimiento sin descripcion"} ·{" "}
                  {getCategoryLabel(movement.category)}
                </p>
                <span>
                  {movement.date} · {getAccountLabel(movement.account)} ·{" "}
                  {movementTypes.find((type) => type.id === movement.type)?.label ||
                    movement.type}
                </span>
              </div>
              <strong
                style={{
                  color: movement.type === "expense" ? "#b63a2f" : "inherit",
                }}
              >
                {movement.type === "expense"
                  ? `-${formatAmount(movement.amount).replace("-", "")}`
                  : formatAmount(movement.amount)}
              </strong>
            </div>
          ))}
        </div>
      </article>

      <AccountModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingAccount(null);
        }}
        onSave={handleSaveAccount}
        initialData={editingAccount}
      />
    </section>
  );
}

