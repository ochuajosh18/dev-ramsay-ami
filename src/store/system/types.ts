import { AnyAction } from "redux";
import { AuthUser } from "../auth/types";

export interface Session {
  iat: number;
  exp: number;
  token: string | AuthUser;
}

export interface Snackbar {
  open: boolean;
  type: "success" | "error";
  message?: string | null;
}

export interface SystemState {
  session: Session | null | undefined;
  snackbar: Snackbar | null | undefined;
  loading: boolean;
}

export const SET_SESSION = "set_session";
export const SET_SNACKBAR = "set_snackbar";
export const SET_SYSTEM_LOADING = "set_system_loading";

export interface SetSessionAction {
  type: typeof SET_SESSION;
  payload: Session;
}

export interface SetSnackbarAction {
  type: typeof SET_SNACKBAR;
  payload: Snackbar;
}

export interface SetSystemLoadingAction {
  type: typeof SET_SYSTEM_LOADING;
  payload: boolean;
}

export type SystemAction =
  | SetSessionAction
  | SetSnackbarAction
  | SetSystemLoadingAction
  | AnyAction;
