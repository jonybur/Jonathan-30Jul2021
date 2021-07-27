import { Dispatch } from "react";
import { EmptyError } from "../../modules/actions";

export type Props = {
  onClose: () => void;
  errorMessage: string;
};

export type MapDispatchProps = Pick<Props, "onClose">;

export type MapDispatch = Dispatch<EmptyError>;
