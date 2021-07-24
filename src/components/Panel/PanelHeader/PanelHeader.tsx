import styles from "./PanelHeader.module.scss";

export function PanelHeader() {
  return (
    <>
      <div className={styles.cell}>Total</div>
      <div className={styles.cell}>Size</div>
      <div className={styles.cell}>Price</div>
    </>
  );
}
