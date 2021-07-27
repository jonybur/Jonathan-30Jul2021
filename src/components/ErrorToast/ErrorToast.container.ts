import { connect } from "react-redux";
import { emptyError } from "../../modules/actions";
import { ErrorToast } from "./ErrorToast";
import { MapDispatch, MapDispatchProps } from "./ErrorToast.types";

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onClose: () => dispatch(emptyError()),
});

export default connect(undefined, mapDispatch)(ErrorToast);
