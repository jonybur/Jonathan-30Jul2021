import classnames from "classnames";

import { PanelEntry } from "./PanelEntry";
import { PanelHeader } from "./PanelHeader";
import { PriceMode } from "./PanelEntry/PanelEntry.types";

import styles from "./Panel.module.scss";

export function Panel(props: any) {
  const { mode, info } = props;

  const tableClassnames = classnames(styles.table, {
    [styles.buyTable]: mode === PriceMode.Buy,
    [styles.sellTable]: mode === PriceMode.Sell,
  });

  return (
    <div className={tableClassnames}>
      <PanelHeader />
      {info.map((i: any) => (
        <PanelEntry mode={mode} info={i} />
      ))}
    </div>
  );
}
