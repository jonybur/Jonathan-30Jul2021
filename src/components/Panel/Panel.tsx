import classnames from "classnames";

import { PanelEntry } from "./PanelEntry";
import { PanelHeader } from "./PanelHeader";

import { PriceMode } from "./PanelEntry/PanelEntry.types";
import styles from "./Panel.module.scss";

export function Panel(props: any) {
  const { mode, orders, maxTotal } = props;

  const tableClassnames = classnames(styles.table, {
    [styles.buyTable]: mode === PriceMode.Buy,
    [styles.sellTable]: mode === PriceMode.Sell,
  });

  if (!orders) {
    return <div />;
  }

  return (
    <div className={tableClassnames}>
      <PanelHeader mode={mode} />
      {orders.map((order: any) => (
        <PanelEntry
          key={`${order.price}-${mode}`}
          mode={mode}
          order={order}
          maxTotal={maxTotal}
        />
      ))}
    </div>
  );
}
