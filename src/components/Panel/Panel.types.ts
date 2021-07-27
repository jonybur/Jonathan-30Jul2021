import { Order, PriceMode } from "../../modules/types";

export type Props = {
  mode: PriceMode;
  orders: Order[];
  maxTotal: number;
};
