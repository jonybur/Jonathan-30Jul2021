import { connect } from "react-redux";
import { getAsks, getBids, getError, getGroup } from "../modules/selectors";
import { State } from "../modules/types";
import { Orderbook } from "./Orderbook";
import { MapStateProps } from "./Orderbook.types";

const mapState = (state: State): MapStateProps => ({
  asks: getAsks(state),
  bids: getBids(state),
  error: getError(state),
  group: getGroup(state),
});

export default connect(mapState)(Orderbook);
