import { Dispatch } from "react";
import { KillFeed, ToggleFeedRequest } from "../../modules/actions";

export type Props = {
  onToggleFeed: () => void;
  onKillFeed: () => void;
};

export type MapDispatchProps = Pick<Props, "onToggleFeed" | "onKillFeed">;

export type MapDispatch = Dispatch<ToggleFeedRequest | KillFeed>;
