import { connect } from "react-redux";
import { emptyError } from "../../modules/actions";
import { ErrorToast } from "./ErrorToast";

const mapDispatch = (dispatch: any) => ({
  onClose: () => dispatch(emptyError()),
});

export default connect(undefined, mapDispatch)(ErrorToast);
