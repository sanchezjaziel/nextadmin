import styles from "../simple-page.module.css";
import MovementModalTrigger from "../components/MovementModalTrigger";

export default function CalendarPage() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h1>Calendario</h1>
          <p>
            Visualiza tus pagos próximos y programa recordatorios antes de las
            fechas clave.
          </p>
        </div>
        <div className={styles.actions}>
          <MovementModalTrigger
            label="Programar pago"
            buttonClassName={styles.primary}
            defaultType="expense"
            defaultCategory="rent"
          />
          <button className={styles.ghost}>Exportar</button>
        </div>
      </div>

      <div className={styles.grid}>
        <article className={styles.card}>
          <span className={styles.pill}>05 feb</span>
          <h3>Renta</h3>
          <p>Fijo · Departamento</p>
          <strong>$8,500</strong>
        </article>
        <article className={styles.card}>
          <span className={styles.pill}>07 feb</span>
          <h3>Crédito auto</h3>
          <p>Mensual · Banco Uno</p>
          <strong>$2,450</strong>
        </article>
        <article className={styles.card}>
          <span className={styles.pill}>08 feb</span>
          <h3>Seguro médico</h3>
          <p>Mensual · SaludPlus</p>
          <strong>$1,100</strong>
        </article>
      </div>

      <article className={styles.card}>
        <h3>Semana próxima</h3>
        <div className={styles.list}>
          <div className={styles.row}>
            <div>
              <p>Internet</p>
              <span>12 de febrero · Automático</span>
            </div>
            <strong>$720</strong>
          </div>
          <div className={styles.row}>
            <div>
              <p>Electricidad</p>
              <span>13 de febrero · Estimado</span>
            </div>
            <strong>$640</strong>
          </div>
          <div className={styles.row}>
            <div>
              <p>Tarjeta crédito</p>
              <span>15 de febrero · Corte</span>
            </div>
            <strong>$3,420</strong>
          </div>
        </div>
      </article>

    </section>
  );
}
