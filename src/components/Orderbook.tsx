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
import { generateTotals } from "../modules/exchange";

export function Orderbook(props: any) {
  const { asks, bids, group } = props;
  const [animationFrame, setAnimationFrame] = useState(0);

  const [memoAsks, setMemoAsks] = useState([]);
  const [memoBids, setMemoBids] = useState([]);
  const [maxTotal, setMaxTotal] = useState(0);

  const updateOrders = useCallback(() => {
    const sortedAsks = sortOrders(asks, PriceMode.Buy);
    const sortedBids = sortOrders(bids, PriceMode.Sell);

    const asksWithTotals = generateTotals(sortedAsks, group);
    const bidsWithTotals = generateTotals(sortedBids, group);

    const maxTotalAsks =
      asksWithTotals.length > 0
        ? asksWithTotals[asksWithTotals.length - 1].total
        : 0;
    const maxTotalBids =
      bidsWithTotals.length > 0
        ? bidsWithTotals[bidsWithTotals.length - 1].total
        : 0;

    setMemoAsks(asksWithTotals);
    setMemoBids(bidsWithTotals);
    setMaxTotal(Math.max(maxTotalAsks, maxTotalBids));
  }, [asks, bids, group]);

  useEffectAllDepsChange(() => {
    updateOrders();
  }, [animationFrame, updateOrders]);

  useAnimationFrame(() => {
    setAnimationFrame((prevFrame) => prevFrame + 1);
  });

  return (
    <div className={styles.orderBookWrapper}>
      <Header />
      <div className={styles.panelsWrapper}>
        <Panel mode={PriceMode.Buy} orders={memoAsks} maxTotal={maxTotal} />
        <MiddleHeader />
        <Panel mode={PriceMode.Sell} orders={memoBids} maxTotal={maxTotal} />
      </div>
      <Footer />
    </div>
  );
}
