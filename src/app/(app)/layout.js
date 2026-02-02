import styles from "./app-shell.module.css";
import Topbar from "./Topbar";

export default function AppLayout({ children }) {
  return (
    <div className={styles.page}>
      <Topbar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
