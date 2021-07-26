import { connect } from "react-redux";
import { MiddleHeader } from "./MiddleHeader";
import { getGroup } from "../../modules/selectors";

const mapState = (state: any): any => ({
  group: getGroup(state),
});

export default connect(mapState)(MiddleHeader);
