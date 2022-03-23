import { AppThunk } from "..";
import {
  forgotPasswordAxiosInstance,
  loginAxiosInstance,
} from "../../utils/api";
import errorHandler from "../../utils/errorHandler";
import { showSuccessSnackbar } from "../system/actions";
import {
  AuthAction,
  AuthUser,
  CALL_AUTH,
  CALL_AUTH_FAILED,
  CALL_AUTH_SUCCESS,
  FORGOT_PASSWORD,
  SET_AUTH_USER,
  LOG_OUT_USER,
  Token,
} from "./types";

const loginUrl = "/login";
const changePasswordUrl = "change-password";

export const callAuth = (): AuthAction => {
  return {
    type: CALL_AUTH,
  };
};

export const callAuthSuccess = (): AuthAction => {
  return {
    type: CALL_AUTH_SUCCESS,
  };
};

export const callAuthFailed = (err: string | null): AuthAction => {
  return {
    type: CALL_AUTH_FAILED,
    payload: err,
  };
};

export const setForgotPasswordToken = (token: Token): AuthAction => {
  return {
    type: FORGOT_PASSWORD,
    payload: token,
  };
};

export const setAuthUser = (authUser: AuthUser | null): AuthAction => {
  return {
    type: SET_AUTH_USER,
    payload: authUser,
  };
};

export const setLogOutUser = (): AuthAction => {
  localStorage.removeItem("userDetails");
  localStorage.removeItem("session");
  return {
    type: LOG_OUT_USER,
  };
};

// ASYNC Actions
/**
 *
 * @param email the user-provided email
 * @param password the user-provided password
 * @description logs in a user
 */
export const login =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    dispatch(callAuth());
    try {
      const response = await loginAxiosInstance.request({
        url: loginUrl,
        method: "POST",
        data: { email, password },
      });
      const {
        datePosted,
        email: userEmail,
        firstname,
        lastname,
        accessToken,
      } = response.data;

      const authUser = {
        datePosted,
        email: userEmail,
        firstname,
        lastname,
        token: accessToken,
      } as AuthUser;
      dispatch(setAuthUser(authUser));
      saveUserInLocalStorage(authUser);
      dispatch(runLogoutTimer(3599 * 1000));
      dispatch(callAuthSuccess());
    } catch (err: any) {
      dispatch(callAuthFailed(err.message));
      errorHandler(err, dispatch);
    }
  };

/**
 *
 * @param email the authenticated user email
 * @param password the authenticated user desired new password
 * @param repeatPassword the authenticated user desired password (confirm password)
 * @param oldPassword the authenticated user old password
 * @description changes the authenticated user's password (done in Profile Settings page)
 */
export const changePassword =
  (
    email: string,
    password: string,
    repeatPassword: string,
    oldPassword: string
  ): AppThunk =>
  async (dispatch) => {
    dispatch(callAuth());
    try {
      const response = await forgotPasswordAxiosInstance.request({
        url: changePasswordUrl,
        method: "PUT",
        data: { email, password, repeatPassword, oldPassword },
      });
      const forgotPasswordToken = response.data;
      dispatch(setForgotPasswordToken(forgotPasswordToken));
      dispatch(callAuthSuccess());

      dispatch(showSuccessSnackbar("Password successfully changed!"));
    } catch (err: any) {
      dispatch(callAuthFailed(err.message));
      errorHandler(err, dispatch);
    }
  };

/**
 *
 * @param email the email of the user who desires to request a password reset link
 * @description requests the server to send a password reset link to the provided user email. Done in Forgot Password page
 */
export const sendPasswordResetLink =
  (email: string, callback?: () => void): AppThunk =>
  async (dispatch) => {
    const url = `${changePasswordUrl}/${email}`;
    dispatch(callAuth());
    try {
      const response = await forgotPasswordAxiosInstance.request({ url });
      const forgotPasswordToken = response.data;
      dispatch(setForgotPasswordToken(forgotPasswordToken));
      dispatch(callAuthSuccess());

      if (callback) callback();
    } catch (err: any) {
      dispatch(callAuthFailed(err.message));
      errorHandler(err, dispatch);
    }
  };

/**
 *
 * @param token the token from the password reset link url
 * @param password the user's new password
 * @param repeatPassword the user's password confirmation
 * @description requests the server to change a user's password
 */
export const resetPassword =
  (
    token: string,
    password: string,
    repeatPassword: string,
    callback?: () => void
  ): AppThunk =>
  async (dispatch) => {
    const url = `${changePasswordUrl}/${token}`;
    dispatch(callAuth());
    try {
      const data = { password, repeatPassword };

      // will verify if this will be used
      const response = await forgotPasswordAxiosInstance.request({
        url,
        data,
        method: "POST",
      });
      console.log(response.data);
      dispatch(callAuthSuccess());
      if (callback) callback();
    } catch (err: any) {
      dispatch(callAuthFailed(err.message));
      errorHandler(err, dispatch);
    }
  };

// HELPER METHODS
export function saveUserInLocalStorage(userDetails: any) {
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
  localStorage.setItem(
    "session",
    JSON.stringify({ expireDate: new Date(new Date().getTime() + 3599 * 1000) })
  );
}
export function checkSession(dispatch: any) {
  const session = localStorage.getItem("session");
  const user = localStorage.getItem("userDetails");
  if (user && session) {
    const parsedUser = JSON.parse(user);
    const parsedSession = JSON.parse(session);
    const expireDate = new Date(parsedSession.expireDate);
    const todaysDate = new Date();
    if (todaysDate > expireDate) {
      dispatch(setLogOutUser);
      return;
    }
    dispatch(setAuthUser(parsedUser));
    dispatch(runLogoutTimer(expireDate.getTime() - todaysDate.getTime()));
  } else {
    dispatch(setLogOutUser);
  }
}

export const runLogoutTimer =
  (timer: any): AppThunk =>
  async (dispatch) => {
    setTimeout(() => {
      dispatch(setLogOutUser());
    }, timer);
  };
