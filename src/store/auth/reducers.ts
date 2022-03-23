import {
  AuthAction,
  AuthState,
  CALL_AUTH,
  CALL_AUTH_FAILED,
  CALL_AUTH_SUCCESS,
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  LOG_OUT_USER,
  RESET_PASSWORD,
  SET_AUTH_USER,
} from "./types";

const INITIAL_STATE: AuthState = {
  authUser: null,
  forgotPasswordToken: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

export function authReducers(
  state = INITIAL_STATE,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case CALL_AUTH:
      return { ...state, status: "loading" };
    case CALL_AUTH_SUCCESS:
      return { ...state, status: "success", error: null };
    case CALL_AUTH_FAILED:
      return { ...state, status: "failed", error: action.payload };
    case SET_AUTH_USER:
      return {
        ...state,
        authUser: action.payload,
        status: "idle",
        isAuthenticated: true,
      };
    case LOG_OUT_USER:
      return {
        ...state,
        authUser: null,
        status: "idle",
        isAuthenticated: false,
      };
    case CHANGE_PASSWORD:
      return { ...state, status: "idle" };
    case FORGOT_PASSWORD:
      return { ...state, forgotPasswordToken: action.payload, status: "idle" };
    case RESET_PASSWORD:
      return { ...state, status: "idle" };
    default:
      return state;
  }
}
