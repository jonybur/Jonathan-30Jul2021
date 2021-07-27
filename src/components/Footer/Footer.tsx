import classNames from "classnames";
import { Props } from "./Footer.types";
import styles from "./Footer.module.scss";

export function Footer(props: Props) {
  const { onToggleFeed, onKillFeed } = props;

  const handleFeed = () => {
    onToggleFeed();
  };

  const killFeed = () => {
    onKillFeed();
  };

  return (
    <div className={styles.footerWrapper}>
      <div
        className={classNames(styles.button, styles.toggleButton)}
        onClick={handleFeed}
      >
        Toggle Feed
      </div>
      <div
        className={classNames(styles.button, styles.killButton)}
        onClick={killFeed}
      >
        Kill Feed
      </div>
    </div>
  );
}
