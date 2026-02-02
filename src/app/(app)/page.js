"use client";

import React from "react";
import Link from "next/link";
import styles from "./page.module.css";
import MovementModalTrigger from "./components/MovementModalTrigger";
import { loadAccounts } from "./data/accounts";
import { loadMovements } from "./data/movements";
import { getCategoryLabel } from "./data/categories";

function parseAmount(value) {
  const numeric = Number(String(value || "").replace(/[$, ]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

function formatAmount(value, currency = "MXN") {
  const numeric = parseAmount(value);
  try {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numeric);
  } catch {
    const sign = numeric < 0 ? "-" : "";
    const absolute = Math.abs(numeric);
    return `${sign}$${absolute.toFixed(2)}`;
  }
}

export default function Home() {
  const [accounts, setAccounts] = React.useState([]);
  const [movements, setMovements] = React.useState([]);
  const [rangeDays, setRangeDays] = React.useState(7);

  React.useEffect(() => {
    setAccounts(loadAccounts());
    setMovements(loadMovements());
  }, []);

  const incomeTotal = movements.reduce((sum, movement) => {
    if (movement.type === "income") return sum + parseAmount(movement.amount);
    return sum;
  }, 0);
  const expenseTotal = movements.reduce((sum, movement) => {
    if (movement.type === "expense") return sum + parseAmount(movement.amount);
    return sum;
  }, 0);
  const totalAccounts = accounts.reduce(
    (sum, account) => sum + parseAmount(account.balance),
    0
  );
  const totalAvailable = totalAccounts + incomeTotal - expenseTotal;

  const baseCurrency = accounts[0]?.currency || "MXN";

  function getAccountById(accountId) {
    return accounts.find((account) => account.id === accountId);
  }

  function isWithinRange(dateValue, days) {
    if (!dateValue) return false;
    if (days === 0) return true;
    const movementDate = new Date(dateValue);
    if (Number.isNaN(movementDate.getTime())) return false;
    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setDate(now.getDate() - days);
    return movementDate >= cutoff;
  }

  const filteredByRange = movements.filter((movement) =>
    isWithinRange(movement.date, rangeDays)
  );

  const recentMovements = filteredByRange.slice(0, 3);
  const recentAccounts = accounts.slice(0, 3);

  const maxBar = Math.max(incomeTotal, expenseTotal, 1);
  const incomePercent = Math.min((incomeTotal / maxBar) * 100, 100);
  const expensePercent = Math.min((expenseTotal / maxBar) * 100, 100);
  const availablePercent = Math.min(
    (Math.abs(totalAvailable) / maxBar) * 100,
    100
  );

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Control simple, decisiones claras</p>
          <h1>Tu tablero muestra lo que capturas en Cuentas.</h1>
          <p className={styles.lead}>
            Registra cuentas y movimientos y revisa aqui tu disponibilidad,
            ingresos y gastos en tiempo real.
          </p>
          <div className={styles.heroActions}>
            <MovementModalTrigger
              label="Nuevo movimiento"
              buttonClassName={styles.primary}
              defaultType="income"
              defaultCategory="salary"
              accounts={accounts}
            />
            <button className={styles.secondary}>Importar movimientos</button>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statCard}>
              <p>Ingresos</p>
              <strong>{formatAmount(incomeTotal, baseCurrency)}</strong>
              <span>{movements.length} movimientos</span>
            </div>
            <div className={styles.statCard}>
              <p>Gastos</p>
              <strong>{formatAmount(expenseTotal, baseCurrency)}</strong>
              <span>{accounts.length} cuentas activas</span>
            </div>
            <div className={styles.statCard}>
              <p>Disponible</p>
              <strong>{formatAmount(totalAvailable, baseCurrency)}</strong>
              <span>Saldo total en cuentas</span>
            </div>
          </div>
        </div>

        <aside className={styles.snapshot}>
          <div className={styles.snapshotHeader}>
            <div>
              <p>Resumen del mes</p>
              <h3>Disponible hoy</h3>
            </div>
            <span className={styles.chip}>Actual</span>
          </div>
          <div className={styles.balance}>
            {formatAmount(totalAvailable, baseCurrency)}
          </div>
          <div className={styles.snapshotBars}>
            <div>
              <span>Ingresos</span>
              <div className={styles.bar}>
                <div
                  className={styles.barFill}
                  style={{ width: `${incomePercent}%` }}
                />
              </div>
            </div>
            <div>
              <span>Gastos</span>
              <div className={styles.bar}>
                <div
                  className={styles.barFill}
                  style={{ width: `${expensePercent}%` }}
                />
              </div>
            </div>
            <div>
              <span>Disponibilidad</span>
              <div className={styles.bar}>
                <div
                  className={styles.barFill}
                  style={{ width: `${availablePercent}%` }}
                />
              </div>
            </div>
          </div>
          <div className={styles.snapshotFooter}>
            <Link className={styles.ghost} href="/accounts">
              Ver cuentas
            </Link>
            <Link className={styles.primary} href="/accounts">
              Ver movimientos
            </Link>
          </div>
        </aside>
      </section>

      <section className={styles.grid}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Movimientos recientes</h2>
            <span className={styles.tag}>{filteredByRange.length} en rango</span>
          </div>
          <div className={styles.rangeToggle}>
            <button
              type="button"
              className={rangeDays === 7 ? styles.rangeActive : styles.range}
              onClick={() => setRangeDays(7)}
            >
              7 dias
            </button>
            <button
              type="button"
              className={rangeDays === 30 ? styles.rangeActive : styles.range}
              onClick={() => setRangeDays(30)}
            >
              30 dias
            </button>
            <button
              type="button"
              className={rangeDays === 0 ? styles.rangeActive : styles.range}
              onClick={() => setRangeDays(0)}
            >
              Todo
            </button>
          </div>
          <div className={styles.billList}>
            {recentMovements.length === 0 && (
              <div className={styles.billItem}>
                <div>
                  <p>Sin movimientos aun</p>
                  <span>Agrega movimientos en Cuentas.</span>
                </div>
                <strong>—</strong>
              </div>
            )}
            {recentMovements.map((movement) => {
              const account = getAccountById(movement.account);
              const currency = account?.currency || baseCurrency;
              return (
                <div key={movement.id} className={styles.billItem}>
                  <div>
                    <p>
                      {movement.description || "Movimiento"} ·{" "}
                      {getCategoryLabel(movement.category)}
                    </p>
                    <span>{movement.date}</span>
                  </div>
                  <strong>{formatAmount(movement.amount, currency)}</strong>
                </div>
              );
            })}
          </div>
          <button className={styles.ghostWide}>Ver todo</button>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Resumen de cuentas</h2>
            <span className={styles.tag}>{accounts.length} cuentas</span>
          </div>
          <div className={styles.progressList}>
            <div className={styles.progressRow}>
              <div>
                <p>Saldo total</p>
                <span>{formatAmount(totalAccounts, baseCurrency)}</span>
              </div>
              <div className={styles.progress}>
                <div style={{ width: "100%" }} />
              </div>
            </div>
            <div className={styles.progressRow}>
              <div>
                <p>Ingresos</p>
                <span>{formatAmount(incomeTotal, baseCurrency)}</span>
              </div>
              <div className={styles.progress}>
                <div style={{ width: `${incomePercent}%` }} />
              </div>
            </div>
            <div className={styles.progressRow}>
              <div>
                <p>Gastos</p>
                <span>{formatAmount(expenseTotal, baseCurrency)}</span>
              </div>
              <div className={styles.progress}>
                <div style={{ width: `${expensePercent}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Cuentas y saldos</h2>
            <span className={styles.tag}>{accounts.length} cuentas</span>
          </div>
          <div className={styles.accountList}>
            {recentAccounts.length === 0 && (
              <div className={styles.accountItem}>
                <div>
                  <p>Sin cuentas aun</p>
                  <span>Agrega una cuenta para empezar.</span>
                </div>
                <strong>—</strong>
              </div>
            )}
            {recentAccounts.map((account) => (
              <div key={account.id} className={styles.accountItem}>
                <div>
                  <p>{account.name}</p>
                  <span>{account.type}</span>
                </div>
                <strong>{formatAmount(account.balance, account.currency)}</strong>
              </div>
            ))}
          </div>
          <div className={styles.accountTotals}>
            <p>Total liquido</p>
            <strong>{formatAmount(totalAvailable, baseCurrency)}</strong>
          </div>
        </div>
      </section>
    </>
  );
}

