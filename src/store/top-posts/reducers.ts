import {
  SET_TOP_POSTS,
  ADD_TOP_POST,
  UPDATE_TOP_POST,
  DELETE_TOP_POST,
  TopPostState,
  TopPostsAction,
  CALL_TOP_POST_API,
  CALL_TOP_POST_API_SUCCESS,
  CALL_TOP_POST_API_FAILED,
} from "./types";

const INITIAL_STATE: TopPostState = {
  data: [],
  status: "idle",
  error: null,
};

const reducers = (
  state = INITIAL_STATE,
  action: TopPostsAction
): TopPostState => {
  switch (action.type) {
    case CALL_TOP_POST_API:
      return { ...state, status: "loading" };
    case CALL_TOP_POST_API_SUCCESS:
      return { ...state, status: "success", error: null };
    case CALL_TOP_POST_API_FAILED:
      return { ...state, status: "failed", error: action.payload };
    case SET_TOP_POSTS:
      return { ...state, data: action.payload, status: "idle" };
    case ADD_TOP_POST:
      return {
        ...state,
        data: [{ ...action.payload }, ...state.data],
        status: "idle",
      };
    case UPDATE_TOP_POST:
      return {
        ...state,
        data: state.data.map((p) =>
          p.id === action.payload.id
            ? { id: p.id, ...action.payload.updatedTopPost }
            : p
        ),
        status: "idle",
      };
    case DELETE_TOP_POST:
      const updatedItem = state.data.filter((b) => b.id !== action.payload.id);
      return { ...state, data: updatedItem, status: "idle" };
    default:
      return state;
  }
};

export default reducers;
