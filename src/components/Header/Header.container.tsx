import { connect } from "react-redux";
import { Header } from "./Header";
import { changeGroup } from "../../modules/actions";
import {
  getCurrentProductID,
  getGroup,
  getGroups,
} from "../../modules/selectors";

const mapState = (state: any): any => ({
  productID: getCurrentProductID(state),
  group: getGroup(state),
  groups: getGroups(state),
});

const mapDispatch = (dispatch: any) => ({
  onChangeGroup: (group: any) => dispatch(changeGroup(group)),
});

export default connect(mapState, mapDispatch)(Header);
