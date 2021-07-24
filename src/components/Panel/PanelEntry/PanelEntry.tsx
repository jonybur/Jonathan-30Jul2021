import classnames from "classnames";
import { PriceMode } from "./PanelEntry.types";
import styles from "./PanelEntry.module.scss";

export function PanelEntry(props: any) {
  const { mode, info } = props;

  const priceClassnames = classnames(styles.cell, {
    [styles.priceCellBuy]: mode === PriceMode.Buy,
    [styles.priceCellSell]: mode === PriceMode.Sell,
  });

  console.log({ info });

  return (
    <>
      <div className={styles.cell}>-</div>
      <div className={styles.cell}>{info[0]}</div>
      <div className={priceClassnames}>{info[1]}</div>
    </>
  );
}
