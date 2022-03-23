import {
  ADD_USER,
  DELETE_USER,
  SET_USERS,
  UPDATE_USER,
  CALL_USERS_API,
  CALL_USERS_API_SUCCESS,
  CALL_USERS_API_FAILED,
  UsersAction,
  UsersState,
} from "./types";

const INITIAL_STATE: UsersState = {
  data: [],
  status: "idle",
  error: null,
};

export function usersReducers(
  state = INITIAL_STATE,
  action: UsersAction
): UsersState {
  switch (action.type) {
    case CALL_USERS_API:
      return { ...state, status: "loading" };
    case CALL_USERS_API_SUCCESS:
      return { ...state, status: "success" };
    case CALL_USERS_API_FAILED:
      return { ...state, status: "failed", error: action.payload };
    case SET_USERS:
      return { ...state, data: action.payload };
    case ADD_USER:
      return { ...state, data: [{ ...action.payload }, ...state.data] };
    case UPDATE_USER:
      return {
        ...state,
        data: state.data.map((u) =>
          u.id === action.payload.id
            ? { id: u.id, ...action.payload.updatedUser }
            : u
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        data: state.data.filter((u) => u.id !== action.payload.id),
      };
    default:
      return state;
  }
}
