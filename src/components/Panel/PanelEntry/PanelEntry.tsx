import classnames from "classnames";
import { PriceMode } from "./PanelEntry.types";
import styles from "./PanelEntry.module.scss";
import classNames from "classnames";

export function PanelEntry(props: any) {
  const { mode, order, maxTotal } = props;

  const entryWrapperClassnames = classNames(styles.entryWrapper, {
    [styles.entryWrapperBuy]: mode === PriceMode.Buy,
    [styles.entryWrapperSell]: mode === PriceMode.Sell,
  });

  const priceClassnames = classnames(styles.cell, {
    [styles.priceCellBuy]: mode === PriceMode.Buy,
    [styles.priceCellSell]: mode === PriceMode.Sell,
  });

  const backgroundClassnames = classnames(styles.background, {
    [styles.backgroundBuy]: mode === PriceMode.Buy,
    [styles.backgroundSell]: mode === PriceMode.Sell,
  });

  const backgroundWidth = (order.total / maxTotal) * 100;

  return (
    <div className={entryWrapperClassnames}>
      <div className={styles.cell}>{order.total.toLocaleString()}</div>
      <div className={styles.cell}>{order.size.toLocaleString()}</div>
      <div className={priceClassnames}>{order.price.toLocaleString()}</div>
      <div
        className={backgroundClassnames}
        style={{ width: `${backgroundWidth}%` }}
      />
    </div>
  );
}
