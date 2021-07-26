import { connect } from "react-redux";
import { Footer } from "./Footer";
import { toggleFeed } from "../../modules/actions";

const mapDispatch = (dispatch: any) => ({
  onToggleFeed: () => dispatch(toggleFeed()),
});

export default connect(undefined, mapDispatch)(Footer);
