import { State } from "./types";

export const getBids = (state: State) => state.bids;
export const getAsks = (state: State) => state.asks;
export const getError = (state: State) => state.error;
export const getGroup = (state: State) => state.group;
export const getGroups = (state: State) => state.groups;
export const getCurrentProductID = (state: State) => state.productID;
