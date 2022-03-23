import { AnyAction } from "redux";

export interface TopPost {
  id?: string;
  title: string;
  content?: string | null;
  dateExpired?: string | null;
  datePosted: string | null;
  media?: string | null; // for media link
  isEnabled: boolean;
}

//State
export interface TopPostState {
  data: TopPost[];
  status: "idle" | "loading" | "success" | "failed";
  error: string | null | undefined;
}

//Action Type Constants
export const CALL_TOP_POST_API = "call_top_post_api";
export const CALL_TOP_POST_API_SUCCESS = "call_top_post_api_success";
export const CALL_TOP_POST_API_FAILED = "call_top_post_api_failed";
export const SET_TOP_POSTS = "set_top_posts";
export const ADD_TOP_POST = "add_top_post";
export const UPDATE_TOP_POST = "update_top_post";
export const DELETE_TOP_POST = "delete_top_post";

//Action Interface
export interface CallTopPostApiAction {
  type: typeof CALL_TOP_POST_API;
  payload: null;
}

export interface CallTopPostApiSuccessAction {
  type: typeof CALL_TOP_POST_API_SUCCESS;
  payload: null;
}

export interface CallTopPostApiFailedAction {
  type: typeof CALL_TOP_POST_API_FAILED;
  payload: string | null;
}

export interface SetTopPostsAction {
  type: typeof SET_TOP_POSTS;
  payload: { type: string; value: string };
}

export interface AddTopPostAction {
  type: typeof ADD_TOP_POST;
  payload: TopPost;
}

export interface UpdateTopPostAction {
  type: typeof UPDATE_TOP_POST;
  payload: { id: string; updatedTopPost: TopPost };
}

export interface DeleteTopPostAction {
  type: typeof DELETE_TOP_POST;
  payload: { id: string };
}

//Action Type
export type TopPostsAction =
  | CallTopPostApiAction
  | CallTopPostApiSuccessAction
  | CallTopPostApiFailedAction
  | SetTopPostsAction
  | AddTopPostAction
  | UpdateTopPostAction
  | DeleteTopPostAction
  | AnyAction;
