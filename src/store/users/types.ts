import { AnyAction } from "redux";

export interface User {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface UsersState {
  data: User[];
  status: "idle" | "loading" | "success" | "failed";
  error: string | null | undefined;
}

export const CALL_USERS_API = "call_users_api";
export const CALL_USERS_API_SUCCESS = "call_users_api_success";
export const CALL_USERS_API_FAILED = "call_users_api_failed";
export const SET_USERS = "set_users";
export const ADD_USER = "add_user";
export const UPDATE_USER = "update_user";
export const DELETE_USER = "delete_user";

export interface CallUsersApiAction {
  type: typeof CALL_USERS_API;
  payload: null;
}

export interface CallUsersApiSuccessAction {
  type: typeof CALL_USERS_API_SUCCESS;
  payload: null;
}

export interface CallUsersApiFailedAction {
  type: typeof CALL_USERS_API_FAILED;
  payload: string | null;
}

export interface SetUsersAction {
  type: typeof SET_USERS;
  payload: User[];
}

export interface AddUserAction {
  type: typeof ADD_USER;
  payload: User;
}

export interface UpdateUserAction {
  type: typeof UPDATE_USER;
  payload: { id: string; updatedUser: User };
}

export interface DeleteUserAction {
  type: typeof DELETE_USER;
  payload: { id: string };
}

export type UsersAction =
  | CallUsersApiAction
  | CallUsersApiSuccessAction
  | CallUsersApiFailedAction
  | SetUsersAction
  | AddUserAction
  | UpdateUserAction
  | DeleteUserAction
  | AnyAction;
