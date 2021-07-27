import { HashedOrders, Order } from "../modules/types";

export type Props = {
  asks: HashedOrders;
  bids: HashedOrders;
  error: string | undefined;
  group: number;
};

export type MapStateProps = Pick<Props, "asks" | "bids" | "error" | "group">;
