import { AnyAction } from "redux";

export type Token = string | null;
export interface AuthUser {
  firstname: string;
  lastname: string;
  email: string;
  datePosted: string; // used for 'member since'
  token: Token;
}

export interface AuthState {
  authUser: AuthUser | null;
  isAuthenticated: boolean;
  forgotPasswordToken?: Token;
  status: "idle" | "loading" | "success" | "failed";
  error: string | null | undefined;
}

export const CALL_AUTH = "call_auth";
export const CALL_AUTH_SUCCESS = "call_auth_success";
export const CALL_AUTH_FAILED = "call_auth_failed";
export const SET_AUTH_USER = "set_auth_user";
export const LOG_OUT_USER = "log_out_user";
export const CHANGE_PASSWORD = "change_password";
export const FORGOT_PASSWORD = "forgot_password";
export const RESET_PASSWORD = "reset_password";

export interface CallAuthAction {
  type: typeof CALL_AUTH;
  payload: null;
}

export interface CallAuthSuccessAction {
  type: typeof CALL_AUTH_SUCCESS;
  payload: null;
}

export interface CallAuthFailedAction {
  type: typeof CALL_AUTH_FAILED;
  payload: string | null;
}

export interface SetAuthUserAction {
  type: typeof SET_AUTH_USER;
  payload: AuthUser;
}

export interface LogoutUserAction {
  type: typeof LOG_OUT_USER;
  payload: null;
}

export interface ChangePasswordAction {
  type: typeof CHANGE_PASSWORD;
  payload: null;
}

export interface ForgotPasswordAction {
  type: typeof FORGOT_PASSWORD;
  payload: Token;
}

export interface ResetPasswordAction {
  type: typeof RESET_PASSWORD;
  payload: null;
}

export type AuthAction =
  | CallAuthAction
  | CallAuthSuccessAction
  | CallAuthFailedAction
  | SetAuthUserAction
  | LogoutUserAction
  | ChangePasswordAction
  | ForgotPasswordAction
  | ResetPasswordAction
  | AnyAction;
