import { Panel } from "./Panel";
import { Header } from "./Header";
import { PriceMode } from "./Panel/PanelEntry/PanelEntry.types";
import { Footer } from "./Footer";
import styles from "./Orderbook.module.scss";

export function Orderbook(props: any) {
  const { asks, bids } = props;

  return (
    <>
      <Header />
      <div className={styles.panelsWrapper}>
        <Panel mode={PriceMode.Buy} info={asks} />
        <Panel mode={PriceMode.Sell} info={bids} />
      </div>
      <Footer />
    </>
  );
}
