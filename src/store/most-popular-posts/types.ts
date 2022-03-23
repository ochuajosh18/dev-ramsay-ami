import { AnyAction } from "redux";

export interface MostPopularPost {
  id: string;
  title: string;
  body?: string | null;
  datePosted: string | null;
  file?: string | null; // for media
  enabled: boolean;
}

export interface MostPopularPostsState {
  data: MostPopularPost[];
  loading: boolean;
  error: string | null | undefined;
}

export const SET_MOST_POPULAR_POSTS = "set_most_popular_posts";
export const ADD_MOST_POPULAR_POST = "add_most_popular_post";
export const UPDATE_MOST_POPULAR_POST = "update_most_popular_post";
export const DELETE_MOST_POPULAR_POST = "delete_most_popular_post";

export interface SetMostPopularPostsAction {
  type: typeof SET_MOST_POPULAR_POSTS;
  payload: MostPopularPost[];
}

export interface AddMostPopularPostAction {
  type: typeof ADD_MOST_POPULAR_POST;
  payload: MostPopularPost;
}

export interface UpdateMostPopularPostAction {
  type: typeof UPDATE_MOST_POPULAR_POST;
  payload: { id: string; updatedPost: MostPopularPost };
}

export interface DeleteMostPopularPostAction {
  type: typeof DELETE_MOST_POPULAR_POST;
  payload: { id: string };
}

export type MostPopularPostsAction =
  | SetMostPopularPostsAction
  | AddMostPopularPostAction
  | UpdateMostPopularPostAction
  | DeleteMostPopularPostAction
  | AnyAction;
