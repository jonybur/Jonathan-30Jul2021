import { connect } from "react-redux";
import { Header } from "./Header";
import { changeGroup } from "../../modules/actions";
import { getGroup } from "../../modules/selectors";

const mapState = (state: any): any => ({
  group: getGroup(state),
});

const mapDispatch = (dispatch: any) => ({
  onChangeGroup: (group: any) => dispatch(changeGroup(group)),
});

export default connect(mapState, mapDispatch)(Header);
