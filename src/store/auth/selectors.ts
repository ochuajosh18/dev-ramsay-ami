import { AppState } from "..";

export const getIsAuthLoading = (state: AppState) =>
  state.auth.status === "loading";

export const getAuthUserName = (state: AppState) =>
  state.auth.authUser?.firstname + " " + state.auth.authUser?.lastname;

export const getAuthEmail = (state: AppState) => state.auth.authUser?.email;

export const getForgotPasswordToken = (state: AppState) =>
  state.auth.forgotPasswordToken;

export const getIsAuthenticated = (state: AppState) =>
  state.auth.isAuthenticated && state.auth.authUser; // add the token later

export const getAuthUser = (state: AppState) => state.auth.authUser;

export const getAuthFirstName = (state: AppState) =>
  state.auth.authUser?.firstname;
  
export const getAuthLastName = (state: AppState) =>
  state.auth.authUser?.lastname;
