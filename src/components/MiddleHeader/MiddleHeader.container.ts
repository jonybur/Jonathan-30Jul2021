import { connect } from "react-redux";
import { MiddleHeader } from "./MiddleHeader";
import { MapStateProps } from "./MiddleHeader.types";
import { getGroup } from "../../modules/selectors";
import { State } from "../../modules/types";

const mapState = (state: State): MapStateProps => ({
  group: getGroup(state),
});

export default connect(mapState)(MiddleHeader);
