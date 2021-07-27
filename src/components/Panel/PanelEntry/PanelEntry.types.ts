import { Order, PriceMode } from "../../../modules/types";

export type Props = {
  mode: PriceMode;
  order: Order;
  maxTotal: number;
};
