import { AnyAction } from "redux";

export interface Banner {
  id?: string;
  title: string;
  content?: string | null;
  dateExpired?: string | null;
  datePosted: string | null;
  media?: string | null; // for media link
  isEnabled: boolean;
}

//State
export interface BannerState {
  data: Banner[];
  status: "idle" | "loading" | "success" | "failed";
  error: string | null | undefined;
}

//Action Type Constants
export const CALL_BANNER_API = "call_banner_api";
export const CALL_BANNER_API_SUCCESS = "call_banner_api_success";
export const CALL_BANNER_API_FAILED = "call_banner_api_failed";
export const SET_BANNER = "set_banners";
export const ADD_BANNER = "add_banner";
export const UPDATE_BANNER = "update_banner";
export const DELETE_BANNER = "delete_banner";

//Action Interface
export interface CallBannerApiAction {
  type: typeof CALL_BANNER_API;
  payload: null;
}

export interface CallBannerApiSuccessAction {
  type: typeof CALL_BANNER_API_SUCCESS;
  payload: null;
}

export interface CallBannerApiFailedAction {
  type: typeof CALL_BANNER_API_FAILED;
  payload: string | null;
}

export interface SetBannersAction {
  type: typeof SET_BANNER;
  payload: { type: string; value: string };
}

export interface AddBannerAction {
  type: typeof ADD_BANNER;
  payload: Banner;
}

export interface UpdateBannerAction {
  type: typeof UPDATE_BANNER;
  payload: { id: string; updatedBanner: Banner };
}

export interface DeleteBannerAction {
  type: typeof DELETE_BANNER;
  payload: { id: string };
}

//Action Type
export type BannersAction =
  | CallBannerApiAction
  | CallBannerApiSuccessAction
  | CallBannerApiFailedAction
  | SetBannersAction
  | AddBannerAction
  | UpdateBannerAction
  | DeleteBannerAction
  | AnyAction;
