import styles from "./ErrorToast.module.scss";

export function ErrorToast(props: any) {
  const { onClose, errorMessage } = props;

  const handleCloseError = (event: any) => {
    onClose(event.target.value);
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
