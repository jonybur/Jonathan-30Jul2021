import classNames from "classnames";
import { PriceMode } from "../PanelEntry/PanelEntry.types";
import styles from "./PanelHeader.module.scss";

export function PanelHeader(props: any) {
  const { mode } = props;

  const headerWrapperClassnames = classNames(styles.headerWrapper, {
    [styles.headerWrapperBuy]: mode === PriceMode.Buy,
    [styles.headerWrapperSell]: mode === PriceMode.Sell,
  });

  return (
    <div className={headerWrapperClassnames}>
      <div className={styles.cell}>Total</div>
      <div className={styles.cell}>Size</div>
      <div className={styles.cell}>Price</div>
    </div>
  );
}
