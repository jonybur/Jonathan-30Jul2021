import { generateHashedOrders, generateTotals, updateOrders } from "./exchange";
import { CFOrder, HashedOrders, Order } from "./types";

const TEST_ORDERS: Order[] = [
  {
    price: 39382.5,
    size: 19664,
  },
  {
    price: 39379,
    size: 6444,
  },
  {
    price: 39377,
    size: 9354,
  },
  {
    price: 39375.5,
    size: 7500,
  },
  {
    price: 39375,
    size: 131202,
  },
  {
    price: 39371,
    size: 20000,
  },
  {
    price: 39370,
    size: 10574,
  },
  {
    price: 39369.5,
    size: 20000,
  },
  {
    price: 39367,
    size: 12320,
  },
  {
    price: 39366.5,
    size: 2637,
  },
  {
    price: 39362.5,
    size: 10965,
  },
  {
    price: 39362,
    size: 76505,
  },
  {
    price: 39357.5,
    size: 69506,
  },
  {
    price: 39357,
    size: 58689,
  },
  {
    price: 39353,
    size: 5000,
  },
  {
    price: 39352.5,
    size: 6262,
  },
  {
    price: 39352,
    size: 26700,
  },
  {
    price: 39350,
    size: 189888,
  },
  {
    price: 39349.5,
    size: 7766,
  },
  {
    price: 39348,
    size: 5000,
  },
  {
    price: 39345,
    size: 5043,
  },
  {
    price: 39343,
    size: 1070,
  },
  {
    price: 39342.5,
    size: 2500,
  },
  {
    price: 39339.5,
    size: 5779,
  },
  {
    price: 39336,
    size: 1801,
  },
];

const TEST_CF_ORDERS: CFOrder[] = [
  [39341.5, 96593],
  [39342.5, 479],
  [39348.5, 1200],
  [39349, 6012],
  [39352.5, 2500],
  [39358.5, 10000],
  [39359, 4273],
  [39360, 5000],
  [39360.5, 56290],
  [39362.5, 5000],
  [39365, 8859],
  [39367, 7251],
  [39369, 7419],
  [39369.5, 30000],
  [39371, 3130],
  [39374, 12892],
  [39375.5, 73596],
  [39379.5, 10965],
  [39381, 7500],
  [39382, 64822],
  [39382.5, 40000],
  [39386, 161844],
  [39387, 10481],
  [39387.5, 20000],
  [39389, 4401],
];

const TEST_HASHED_ORDERS: HashedOrders = {
  "39330": {
    price: 39330,
    size: 1200,
  },
  "39333": {
    price: 39333,
    size: 2500,
  },
  "39339": {
    price: 39339,
    size: 450,
  },
  "39340": {
    price: 39340,
    size: 5000,
  },
  "39345": {
    price: 39345,
    size: 6214,
  },
  "39346": {
    price: 39346,
    size: 50000,
  },
  "39352": {
    price: 39352,
    size: 7589,
  },
  "39354": {
    price: 39354,
    size: 10000,
  },
  "39360": {
    price: 39360,
    size: 7469,
  },
  "39368": {
    price: 39368,
    size: 2544,
  },
  "39373": {
    price: 39373,
    size: 4401,
  },
  "39375": {
    price: 39375,
    size: 6444,
  },
  "39376": {
    price: 39376,
    size: 450,
  },
  "39377": {
    price: 39377,
    size: 79746,
  },
  "39379": {
    price: 39379,
    size: 10965,
  },
  "39342.5": {
    price: 39342.5,
    size: 31580,
  },
  "39345.5": {
    price: 39345.5,
    size: 12000,
  },
  "39352.5": {
    price: 39352.5,
    size: 8542,
  },
  "39361.5": {
    price: 39361.5,
    size: 7500,
  },
  "39362.5": {
    price: 39362.5,
    size: 128123,
  },
  "39364.5": {
    price: 39364.5,
    size: 5000,
  },
  "39366.5": {
    price: 39366.5,
    size: 8804,
  },
  "39375.5": {
    price: 39375.5,
    size: 9297,
  },
  "39377.5": {
    price: 39377.5,
    size: 32600,
  },
  "39378.5": {
    price: 39378.5,
    size: 20418,
  },
};

describe("Exchange", () => {
  describe("updateOrders", () => {
    it("should return an updated orders object", () => {
      expect(updateOrders(TEST_HASHED_ORDERS, TEST_CF_ORDERS)).toStrictEqual({
        "39330": { price: 39330, size: 1200 },
        "39333": { price: 39333, size: 2500 },
        "39339": { price: 39339, size: 450 },
        "39340": { price: 39340, size: 5000 },
        "39345": { price: 39345, size: 6214 },
        "39346": { price: 39346, size: 50000 },
        "39349": { price: 39349, size: 6012 },
        "39352": { price: 39352, size: 7589 },
        "39354": { price: 39354, size: 10000 },
        "39359": { price: 39359, size: 4273 },
        "39360": { price: 39360, size: 5000 },
        "39365": { price: 39365, size: 8859 },
        "39367": { price: 39367, size: 7251 },
        "39368": { price: 39368, size: 2544 },
        "39369": { price: 39369, size: 7419 },
        "39371": { price: 39371, size: 3130 },
        "39373": { price: 39373, size: 4401 },
        "39374": { price: 39374, size: 12892 },
        "39375": { price: 39375, size: 6444 },
        "39376": { price: 39376, size: 450 },
        "39377": { price: 39377, size: 79746 },
        "39379": { price: 39379, size: 10965 },
        "39381": { price: 39381, size: 7500 },
        "39382": { price: 39382, size: 64822 },
        "39386": { price: 39386, size: 161844 },
        "39387": { price: 39387, size: 10481 },
        "39389": { price: 39389, size: 4401 },
        "39342.5": { price: 39342.5, size: 479 },
        "39345.5": { price: 39345.5, size: 12000 },
        "39352.5": { price: 39352.5, size: 2500 },
        "39361.5": { price: 39361.5, size: 7500 },
        "39362.5": { price: 39362.5, size: 5000 },
        "39364.5": { price: 39364.5, size: 5000 },
        "39366.5": { price: 39366.5, size: 8804 },
        "39375.5": { price: 39375.5, size: 73596 },
        "39377.5": { price: 39377.5, size: 32600 },
        "39378.5": { price: 39378.5, size: 20418 },
        "39341.5": { price: 39341.5, size: 96593 },
        "39348.5": { price: 39348.5, size: 1200 },
        "39358.5": { price: 39358.5, size: 10000 },
        "39360.5": { price: 39360.5, size: 56290 },
        "39369.5": { price: 39369.5, size: 30000 },
        "39379.5": { price: 39379.5, size: 10965 },
        "39382.5": { price: 39382.5, size: 40000 },
        "39387.5": { price: 39387.5, size: 20000 },
      });
    });
  });

  describe("generateHashedOrders", () => {
    it("should return an object with order price as key", () => {
      expect(generateHashedOrders(TEST_CF_ORDERS)).toStrictEqual({
        "39349": { price: 39349, size: 6012 },
        "39359": { price: 39359, size: 4273 },
        "39360": { price: 39360, size: 5000 },
        "39365": { price: 39365, size: 8859 },
        "39367": { price: 39367, size: 7251 },
        "39369": { price: 39369, size: 7419 },
        "39371": { price: 39371, size: 3130 },
        "39374": { price: 39374, size: 12892 },
        "39381": { price: 39381, size: 7500 },
        "39382": { price: 39382, size: 64822 },
        "39386": { price: 39386, size: 161844 },
        "39387": { price: 39387, size: 10481 },
        "39389": { price: 39389, size: 4401 },
        "39341.5": { price: 39341.5, size: 96593 },
        "39342.5": { price: 39342.5, size: 479 },
        "39348.5": { price: 39348.5, size: 1200 },
        "39352.5": { price: 39352.5, size: 2500 },
        "39358.5": { price: 39358.5, size: 10000 },
        "39360.5": { price: 39360.5, size: 56290 },
        "39362.5": { price: 39362.5, size: 5000 },
        "39369.5": { price: 39369.5, size: 30000 },
        "39375.5": { price: 39375.5, size: 73596 },
        "39379.5": { price: 39379.5, size: 10965 },
        "39382.5": { price: 39382.5, size: 40000 },
        "39387.5": { price: 39387.5, size: 20000 },
      });
    });
  });

  describe("generateTotals", () => {
    it("should return order list with totals", () => {
      expect(generateTotals(TEST_ORDERS, 1)).toStrictEqual([
        { price: 39383, size: 19664, total: 19664 },
        { price: 39379, size: 6444, total: 26108 },
        { price: 39377, size: 9354, total: 35462 },
        { price: 39376, size: 7500, total: 42962 },
        { price: 39375, size: 131202, total: 174164 },
        { price: 39371, size: 20000, total: 194164 },
        { price: 39370, size: 10574, total: 224738 },
        { price: 39367, size: 12320, total: 239695 },
        { price: 39363, size: 10965, total: 250660 },
        { price: 39362, size: 76505, total: 327165 },
        { price: 39358, size: 69506, total: 396671 },
        { price: 39357, size: 58689, total: 455360 },
        { price: 39353, size: 5000, total: 466622 },
        { price: 39352, size: 26700, total: 493322 },
        { price: 39350, size: 189888, total: 690976 },
        { price: 39348, size: 5000, total: 695976 },
        { price: 39345, size: 5043, total: 701019 },
        { price: 39343, size: 1070, total: 704589 },
        { price: 39340, size: 5779, total: 710368 },
        { price: 39336, size: 1801, total: 712169 },
      ]);
    });
  });
});
