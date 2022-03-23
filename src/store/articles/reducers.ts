import {
  ADD_ARTICLE,
  DELETE_ARTICLE,
  ArticlesAction,
  ArticlesState,
  SET_ARTICLES,
  UPDATE_ARTICLE,
  CALL_ARTICLE_API,
  CALL_ARTICLE_API_SUCCESS,
  CALL_ARTICLE_API_FAILED,
} from "./types";

const INITIAL_STATE: ArticlesState = {
  data: [],
  status: "idle",
  error: null,
};

export function articlesReducers(
  state = INITIAL_STATE,
  action: ArticlesAction
): ArticlesState {
  switch (action.type) {
    case CALL_ARTICLE_API:
      return { ...state, status: "loading" };
    case CALL_ARTICLE_API_SUCCESS:
      return { ...state, status: "success", error: null };
    case CALL_ARTICLE_API_FAILED:
      return { ...state, status: "failed", error: action.payload };
    case SET_ARTICLES:
      return { ...state, data: action.payload, status: "idle" };
    case ADD_ARTICLE:
      return {
        ...state,
        data: [{ ...action.payload }, ...state.data],
        status: "idle",
      };
    case UPDATE_ARTICLE:
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload.id
            ? { id: item.id, ...action.payload.updatedArticle }
            : item
        ),
        status: "idle",
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id),
        status: "idle",
      };
    default:
      return state;
  }
}
