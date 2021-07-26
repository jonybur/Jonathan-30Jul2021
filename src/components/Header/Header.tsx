import styles from "./Header.module.scss";

export function Header(props: any) {
  const { onChangeGroup, group } = props;

  const handleChange = (event: any) => {
    onChangeGroup(event.target.value);
  };

  return (
    <div className={styles.headerWrapper}>
      <span className={styles.title}>Order Book</span>
      <span className={styles.spread}>
        <span className={styles.digits}>Group by: {group}</span>
        {/* Spread: <span className={styles.digits}>17.0 (0.05%)</span> */}
      </span>
      <select className={styles.select} onChange={handleChange}>
        <option value={0.5}>Group 0.5</option>
        <option value={1}>Group 1.0</option>
        <option value={2.5}>Group 2.5</option>
      </select>
    </div>
  );
}
