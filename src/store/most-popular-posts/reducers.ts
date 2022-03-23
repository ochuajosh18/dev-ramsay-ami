import {
  ADD_MOST_POPULAR_POST,
  SET_MOST_POPULAR_POSTS,
  MostPopularPostsAction,
  MostPopularPostsState,
  UPDATE_MOST_POPULAR_POST,
  DELETE_MOST_POPULAR_POST,
} from "./types";
import MOCK_DATA from "./MOCK_DATA.json";

const INITIAL_STATE: MostPopularPostsState = {
  data: MOCK_DATA,
  loading: false,
  error: null,
};

export function mostPopularPostsReducers(
  state = INITIAL_STATE,
  action: MostPopularPostsAction
): MostPopularPostsState {
  switch (action.type) {
    case SET_MOST_POPULAR_POSTS:
      return { ...state, data: action.payload };
    case ADD_MOST_POPULAR_POST:
      return { ...state, data: [{ ...action.payload }, ...state.data] };
    case UPDATE_MOST_POPULAR_POST:
      return {
        ...state,
        data: state.data.map((p) =>
          p.id === action.payload.id ? action.payload.updatedPost : p
        ),
      };
    case DELETE_MOST_POPULAR_POST:
      return {
        ...state,
        data: state.data.filter((p) => p.id !== action.payload.id),
      };
    default:
      return state;
  }
}
