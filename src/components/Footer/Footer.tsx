import classNames from "classnames";
import styles from "./Footer.module.scss";

export function Footer(props: any) {
  const { onToggleFeed } = props;

  const handleFeed = () => {
    onToggleFeed();
  };

  return (
    <div className={styles.footerWrapper}>
      <div
        className={classNames(styles.button, styles.toggleButton)}
        onClick={handleFeed}
      >
        Toggle Feed
      </div>
      <div className={`${styles.button} ${styles.killButton}`}>Kill Feed</div>
    </div>
  );
}
