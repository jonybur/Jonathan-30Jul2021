import styles from "./MiddleHeader.module.scss";

export function MiddleHeader() {
  return (
    <div className={styles.headerWrapper}>
      <span className={styles.spread}>
        Spread: <span className={styles.digits}>17.0 (0.05%)</span>
      </span>
    </div>
  );
}
