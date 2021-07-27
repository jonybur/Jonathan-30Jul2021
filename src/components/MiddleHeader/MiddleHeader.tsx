import styles from "./MiddleHeader.module.scss";
import { Props } from "./MiddleHeader.types";

export function MiddleHeader(props: Props) {
  const { group } = props;

  return (
    <div className={styles.headerWrapper}>
      <span className={styles.spread}>
        Group by: <span className={styles.digits}>{group}</span>
      </span>
    </div>
  );
}
