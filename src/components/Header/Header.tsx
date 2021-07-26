import styles from "./Header.module.scss";

export function Header() {
  return (
    <div className={styles.headerWrapper}>
      <span className={styles.title}>Order Book</span>
      <span className={styles.spread}>
        Spread: <span className={styles.digits}>17.0 (0.05%)</span>
      </span>
      <select></select>
    </div>
  );
}