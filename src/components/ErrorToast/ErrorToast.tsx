import styles from "./ErrorToast.module.scss";
import { Props } from "./ErrorToast.types";

export function ErrorToast(props: Props) {
  const { onClose, errorMessage } = props;

  const handleCloseError = () => {
    onClose();
  };

  if (!errorMessage) {
    return <div />;
  }

  return (
    <div className={styles.toastWrapper}>
      <div className={styles.closeButton} onClick={handleCloseError}>
        Close
      </div>
      {errorMessage.toString()}
    </div>
  );
}
