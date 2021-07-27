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

import { Order, PriceMode } from "../modules/types";
import { generateTotals } from "../modules/exchange";
import { ErrorToast } from "./ErrorToast";
import { Props } from "./Orderbook.types";
import styles from "./Orderbook.module.scss";

export function Orderbook(props: Props) {
  const { asks, bids, error, group } = props;
  const [animationFrame, setAnimationFrame] = useState(0);

  const [memoAsks, setMemoAsks] = useState<Order[]>([]);
  const [memoBids, setMemoBids] = useState<Order[]>([]);
  const [maxTotal, setMaxTotal] = useState<number>(0);

  const updateOrders = useCallback(() => {
    const sortedAsks = sortOrders(asks, PriceMode.Buy);
    const sortedBids = sortOrders(bids, PriceMode.Sell);

    const asksWithTotals = generateTotals(sortedAsks, group);
    const bidsWithTotals = generateTotals(sortedBids, group);

    const maxTotalAsks =
      asksWithTotals.length > 0
        ? (asksWithTotals[asksWithTotals.length - 1].total as number)
        : 0;
    const maxTotalBids =
      bidsWithTotals.length > 0
        ? (bidsWithTotals[bidsWithTotals.length - 1].total as number)
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
    <>
      <div className={styles.orderBookWrapper}>
        <Header />
        <div className={styles.panelsWrapper}>
          <Panel mode={PriceMode.Buy} orders={memoAsks} maxTotal={maxTotal} />
          <MiddleHeader />
          <Panel mode={PriceMode.Sell} orders={memoBids} maxTotal={maxTotal} />
        </div>
        <Footer />
      </div>
      {error && <ErrorToast errorMessage={error} />}
    </>
  );
}
