export type Order = {
  price: number;
  size: number;
  total?: number;
};

export type CFOrder = [price: number, size: number];

export type HashedOrders = {
  [price: number]: Order;
};

export type State = {
  asks: HashedOrders;
  bids: HashedOrders;
  error: string | undefined;
  group: number;
  groups: number[];
  productID: string;
};

export enum PriceMode {
  Buy = 0,
  Sell,
}

export type OrderbookSnapshot = {
  asks: CFOrder[];
  bids: CFOrder[];
};
