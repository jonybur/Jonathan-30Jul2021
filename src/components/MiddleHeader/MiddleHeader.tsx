import styles from "./MiddleHeader.module.scss";

export function MiddleHeader(props: any) {
  const { group } = props;

  return (
    <div className={styles.headerWrapper}>
      <span className={styles.spread}>
        Group by: <span className={styles.digits}>{group}</span>
      </span>
    </div>
  );
}
