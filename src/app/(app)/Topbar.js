"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./app-shell.module.css";

const links = [
  { href: "/", label: "Tablero" },
  { href: "/accounts", label: "Cuentas" },
];

export default function Topbar() {
  const pathname = usePathname();

  return (
    <header className={styles.topbar}>
      <div className={styles.brand}>
        <span className={styles.logoMark}>◎</span>
        <div>
          <p className={styles.brandName}>Budgeta</p>
          <p className={styles.brandTag}>presupuesto personal</p>
        </div>
      </div>
      <nav className={styles.nav}>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${
                isActive ? styles.navLinkActive : ""
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
