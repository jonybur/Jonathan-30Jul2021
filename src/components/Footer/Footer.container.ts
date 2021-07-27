import { connect } from "react-redux";
import { Footer } from "./Footer";
import { killFeed, toggleFeedRequest } from "../../modules/actions";
import { MapDispatch, MapDispatchProps } from "./Footer.types";

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onToggleFeed: () => dispatch(toggleFeedRequest()),
  onKillFeed: () => dispatch(killFeed()),
});

export default connect(undefined, mapDispatch)(Footer);
