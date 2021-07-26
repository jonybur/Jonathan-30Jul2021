import styles from "./Header.module.scss";

export function Header(props: any) {
  const { onChangeGroup, group, groups, productID } = props;

  const handleChange = (event: any) => {
    onChangeGroup(event.target.value);
  };

  return (
    <div className={styles.headerWrapper}>
      <span className={styles.title}>{productID}</span>
      <span className={styles.spread}>
        <span className={styles.digits}>Group by: {group}</span>
      </span>
      <select className={styles.select} onChange={handleChange}>
        {groups.map((g: number) => (
          <option value={g} key={g}>
            Group {g.toFixed(2)}
          </option>
        ))}
      </select>
    </div>
  );
}
