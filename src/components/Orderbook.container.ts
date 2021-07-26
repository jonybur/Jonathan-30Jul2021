import { connect } from "react-redux";
import { getAsks, getBids, getGroup } from "../modules/selectors";
import { Orderbook } from "./Orderbook";

const mapState = (state: any): any => ({
  asks: getAsks(state),
  bids: getBids(state),
  group: getGroup(state),
});

export default connect(mapState)(Orderbook);
