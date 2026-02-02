import styles from "../simple-page.module.css";

export default function BudgetsPage() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h1>Presupuestos</h1>
          <p>
            Define límites por categoría y controla cuánto te falta para
            alcanzar tus metas mensuales.
          </p>
        </div>
        <div className={styles.actions}>
          <button className={styles.primary}>Nuevo presupuesto</button>
          <button className={styles.ghost}>Duplicar mes</button>
        </div>
      </div>

      <div className={styles.grid}>
        <article className={styles.card}>
          <h3>Alimentación</h3>
          <p>$3,200 de $4,000</p>
          <div className={styles.progress}>
            <div style={{ width: "80%" }} />
          </div>
        </article>
        <article className={styles.card}>
          <h3>Transporte</h3>
          <p>$1,050 de $1,600</p>
          <div className={styles.progress}>
            <div style={{ width: "66%" }} />
          </div>
        </article>
        <article className={styles.card}>
          <h3>Salud</h3>
          <p>$600 de $1,200</p>
          <div className={styles.progress}>
            <div style={{ width: "50%" }} />
          </div>
        </article>
      </div>

      <article className={styles.card}>
        <h3>Recordatorios del mes</h3>
        <div className={styles.list}>
          <div className={styles.row}>
            <div>
              <p>Meta de ahorro</p>
              <span>Separar $1,200 antes del 15</span>
            </div>
            <strong>En progreso</strong>
          </div>
          <div className={styles.row}>
            <div>
              <p>Entretenimiento</p>
              <span>Gasto recomendado $800</span>
            </div>
            <strong>Faltan $320</strong>
          </div>
          <div className={styles.row}>
            <div>
              <p>Educación</p>
              <span>Curso mensual</span>
            </div>
            <strong>$350</strong>
          </div>
        </div>
      </article>
    </section>
  );
}
