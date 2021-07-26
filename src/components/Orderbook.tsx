import { useState, useCallback } from "react";
import { Panel } from "./Panel";
import { Header } from "./Header";
import { MiddleHeader } from "./MiddleHeader";
import { Footer } from "./Footer";
import {
  sortOrders,
  useAnimationFrame,
  useEffectAllDepsChange,
} from "./helpers";

import { PriceMode } from "./Panel/PanelEntry/PanelEntry.types";
import styles from "./Orderbook.module.scss";

export function Orderbook(props: any) {
  const { asks, bids } = props;
  const [animationFrame, setAnimationFrame] = useState(0);

  const [memoAsks, setMemoAsks] = useState([]);
  const [memoBids, setMemoBids] = useState([]);
  const [maxTotal, setMaxTotal] = useState(0);

  const updateOrders = useCallback(() => {
    const sortedAsks = sortOrders(asks, PriceMode.Buy);
    const sortedBids = sortOrders(bids, PriceMode.Sell);
    const maxTotalAsks =
      sortedAsks.length > 0 ? sortedAsks[sortedAsks.length - 1].total : 0;
    const maxTotalBids =
      sortedBids.length > 0 ? sortedBids[sortedBids.length - 1].total : 0;
    setMemoAsks(sortedAsks);
    setMemoBids(sortedBids);
    setMaxTotal(Math.max(maxTotalAsks, maxTotalBids));
  }, [asks, bids]);

  useEffectAllDepsChange(() => {
    updateOrders();
  }, [animationFrame, updateOrders]);

  useAnimationFrame(() => {
    setAnimationFrame((prevFrame) => prevFrame + 1);
  });

  return (
    <>
      <Header />
      <div className={styles.panelsWrapper}>
        <Panel mode={PriceMode.Buy} orders={memoAsks} maxTotal={maxTotal} />
        <MiddleHeader />
        <Panel mode={PriceMode.Sell} orders={memoBids} maxTotal={maxTotal} />
      </div>
      <Footer />
    </>
  );
}
