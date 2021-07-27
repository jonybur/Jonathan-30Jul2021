import { Dispatch } from "react";
import { ChangeGroup } from "../../modules/actions";

export type Props = {
  onChangeGroup: (group: number) => void;
  productID: string;
  group: number;
  groups: number[];
};

export type MapStateProps = Pick<Props, "productID" | "group" | "groups">;

export type MapDispatchProps = Pick<Props, "onChangeGroup">;

export type MapDispatch = Dispatch<ChangeGroup>;
