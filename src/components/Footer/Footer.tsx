import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <div className={`${styles.button} ${styles.toggleButton}`}>
        Toggle Feed
      </div>
      <div className={`${styles.button} ${styles.killButton}`}>Kill Feed</div>
    </div>
  );
}
