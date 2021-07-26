import { connect } from "react-redux";
import { Footer } from "./Footer";
import { killFeed, toggleFeedRequest } from "../../modules/actions";

const mapDispatch = (dispatch: any) => ({
  onToggleFeed: () => dispatch(toggleFeedRequest()),
  onKillFeed: () => dispatch(killFeed()),
});

export default connect(undefined, mapDispatch)(Footer);
