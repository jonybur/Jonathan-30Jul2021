import { connect } from "react-redux";
import { Header } from "./Header";
import { changeGroup } from "../../modules/actions";
import {
  getCurrentProductID,
  getGroup,
  getGroups,
} from "../../modules/selectors";
import { State } from "../../modules/types";
import { MapDispatch, MapDispatchProps, MapStateProps } from "./Header.types";

const mapState = (state: State): MapStateProps => ({
  productID: getCurrentProductID(state),
  group: getGroup(state),
  groups: getGroups(state),
});

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onChangeGroup: (group: number) => dispatch(changeGroup(group)),
});

export default connect(mapState, mapDispatch)(Header);
