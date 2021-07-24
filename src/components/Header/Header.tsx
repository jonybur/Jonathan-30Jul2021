import styles from "./Header.module.scss";

export function Header() {
  return (
    <div className={styles.headerWrapper}>
      <span>Order Book</span>
      <span>
        Spread: <span className={styles.digits}>17.0 (0.05%)</span>
      </span>
      <select></select>
    </div>
  );
}
