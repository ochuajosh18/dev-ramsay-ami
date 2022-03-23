import { AnyAction } from "redux";

export interface LatestVideo {
  id?: string;
  title: string;
  content?: string | null;
  dateExpired?: string | null;
  datePosted: string | null;
  media?: string | null; // for media link
  isEnabled: boolean;
}

export interface LatestVideosState {
  data: LatestVideo[];
  status: "idle" | "loading" | "success" | "failed";
  error: string | null | undefined;
}

export const CALL_VIDEOS_API = "call_videos_api";
export const CALL_VIDEOS_API_SUCCESS = "call_videos_api_success";
export const CALL_VIDEOS_API_FAILED = "call_videos_api_failed";
export const SET_LATEST_VIDEOS = "set_latest_videos";
export const ADD_LATEST_VIDEO = "add_latest_video";
export const UPDATE_LATEST_VIDEO = "update_latest_video";
export const DELETE_LATEST_VIDEO = "delete_latest_video";

export interface CallVideosApiAction {
  type: typeof CALL_VIDEOS_API;
  payload: null;
}

export interface CallVideosApiSuccessAction {
  type: typeof CALL_VIDEOS_API_SUCCESS;
  payload: null;
}

export interface CallVideosApiFailedAction {
  type: typeof CALL_VIDEOS_API_FAILED;
  payload: string | null;
}

export interface SetLatestVideosAction {
  type: typeof SET_LATEST_VIDEOS;
  payload: LatestVideo[];
}

export interface AddLatestVideoAction {
  type: typeof ADD_LATEST_VIDEO;
  payload: LatestVideo;
}

export interface UpdateLatestVideoAction {
  type: typeof UPDATE_LATEST_VIDEO;
  payload: { id: string; updatedVideo: LatestVideo };
}

export interface DeleteLatestVideoAction {
  type: typeof DELETE_LATEST_VIDEO;
  payload: { id: string };
}

export type LatestVideosAction =
  | CallVideosApiAction
  | CallVideosApiSuccessAction
  | CallVideosApiFailedAction
  | SetLatestVideosAction
  | AddLatestVideoAction
  | UpdateLatestVideoAction
  | DeleteLatestVideoAction
  | AnyAction;
