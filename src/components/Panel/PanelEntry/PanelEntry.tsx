import classnames from "classnames";
import { Props } from "./PanelEntry.types";
import { PriceMode } from "../../../modules/types";
import styles from "./PanelEntry.module.scss";

export function PanelEntry(props: Props) {
  const { mode, order, maxTotal } = props;

  const entryWrapperClassnames = classnames(styles.entryWrapper, {
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

  const backgroundWidth = ((order.total as number) / maxTotal) * 100;

  return (
    <div className={entryWrapperClassnames}>
      <div className={styles.cell}>
        {(order.total as number).toLocaleString()}
      </div>
      <div className={styles.cell}>{order.size.toLocaleString()}</div>
      <div className={priceClassnames}>
        {order.price.toFixed(2).toLocaleString()}
      </div>
      <div
        className={backgroundClassnames}
        style={{ width: `${backgroundWidth}%` }}
      />
    </div>
  );
}
