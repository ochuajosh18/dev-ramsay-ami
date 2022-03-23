import {
  ADD_LATEST_VIDEO,
  CALL_VIDEOS_API,
  CALL_VIDEOS_API_FAILED,
  CALL_VIDEOS_API_SUCCESS,
  DELETE_LATEST_VIDEO,
  LatestVideosAction,
  LatestVideosState,
  SET_LATEST_VIDEOS,
  UPDATE_LATEST_VIDEO,
} from "./types";

const INITIAL_STATE: LatestVideosState = {
  data: [],
  status: "idle",
  error: null,
};

export function latestVideosReducers(
  state = INITIAL_STATE,
  action: LatestVideosAction
): LatestVideosState {
  switch (action.type) {
    case CALL_VIDEOS_API:
      return { ...state, status: "loading" };
    case CALL_VIDEOS_API_SUCCESS:
      return { ...state, status: "success", error: null };
    case CALL_VIDEOS_API_FAILED:
      return { ...state, status: "failed", error: action.payload };
    case SET_LATEST_VIDEOS:
      return { ...state, data: action.payload, status: "idle" };
    case ADD_LATEST_VIDEO:
      return {
        ...state,
        data: [{ ...action.payload }, ...state.data],
        status: "idle",
      };
    case UPDATE_LATEST_VIDEO:
      return {
        ...state,
        data: state.data.map((v) =>
          v.id === action.payload.id
            ? { id: action.payload.id, ...action.payload.updatedVideo }
            : v
        ),
        status: "idle",
      };
    case DELETE_LATEST_VIDEO:
      return {
        ...state,
        data: state.data.filter((v) => v.id !== action.payload.id),
        status: "idle",
      };
    default:
      return state;
  }
}
