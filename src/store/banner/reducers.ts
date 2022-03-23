import {
  CALL_BANNER_API,
  CALL_BANNER_API_SUCCESS,
  CALL_BANNER_API_FAILED,
  SET_BANNER,
  ADD_BANNER,
  UPDATE_BANNER,
  DELETE_BANNER,
  BannerState,
  BannersAction,
} from "./types";

const INITIAL_STATE: BannerState = {
  data: [],
  status: "idle",
  error: null,
};

const reducers = (
  state = INITIAL_STATE,
  action: BannersAction
): BannerState => {
  switch (action.type) {
    case CALL_BANNER_API:
      return { ...state, status: "loading" };
    case CALL_BANNER_API_SUCCESS:
      return { ...state, status: "success", error: null };
    case CALL_BANNER_API_FAILED:
      return { ...state, status: "failed", error: action.payload };
    case SET_BANNER:
      return { ...state, data: action.payload, status: "idle" };
    case ADD_BANNER:
      return {
        ...state,
        data: [{ ...action.payload }, ...state.data],
        status: "idle",
      };
    case UPDATE_BANNER:
      return {
        ...state,
        data: state.data.map((p) =>
          p.id === action.payload.id
            ? { id: p.id, ...action.payload.updatedBanner }
            : p
        ),
        status: "idle",
      };
    case DELETE_BANNER:
      const updatedItem = state.data.filter((b) => b.id !== action.payload.id);
      return { ...state, data: updatedItem, status: "idle" };
    default:
      return state;
  }
};

export default reducers;
