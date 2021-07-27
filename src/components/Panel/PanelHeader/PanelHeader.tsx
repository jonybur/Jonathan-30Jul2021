import classnames from "classnames";
import { PriceMode } from "../../../modules/types";
import { Props } from "./PanelHeader.types";
import styles from "./PanelHeader.module.scss";

export function PanelHeader(props: Props) {
  const { mode } = props;

  const headerWrapperClassnames = classnames(styles.headerWrapper, {
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
