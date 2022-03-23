import {
  SET_SESSION,
  SET_SNACKBAR,
  SET_SYSTEM_LOADING,
  SystemAction,
  SystemState,
} from "./types";

const INITIAL_STATE: SystemState = {
  session: null,
  snackbar: null,
  loading: false,
};

export function systemReducers(
  state = INITIAL_STATE,
  action: SystemAction
): SystemState {
  switch (action.type) {
    case SET_SESSION:
      return { ...state, session: action.payload };
    case SET_SNACKBAR:
      return { ...state, snackbar: action.payload };
    case SET_SYSTEM_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
