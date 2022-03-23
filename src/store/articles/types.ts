import { AnyAction } from "redux";

export interface Article {
  id?: string;
  title: string;
  content?: string | null;
  dateExpired?: string | null;
  datePosted: string | null;
  media?: string | null; // for media link
  isEnabled: boolean;
}

export interface ArticlesState {
  data: Article[];
  status: "idle" | "loading" | "success" | "failed";
  error: string | null | undefined;
}

export const CALL_ARTICLE_API = "call_article_api";
export const CALL_ARTICLE_API_SUCCESS = "call_article_api_success";
export const CALL_ARTICLE_API_FAILED = "call_article_api_failed";
export const SET_ARTICLES = "set_articles";
export const ADD_ARTICLE = "add_article";
export const UPDATE_ARTICLE = "update_article";
export const DELETE_ARTICLE = "delete_article";

export interface CallArticleApiAction {
  type: typeof CALL_ARTICLE_API;
  payload: null;
}

export interface CallArticleApiSuccessAction {
  type: typeof CALL_ARTICLE_API_SUCCESS;
  payload: null;
}

export interface CallArticleApiFailedAction {
  type: typeof CALL_ARTICLE_API_FAILED;
  payload: string | null;
}

export interface SetArticlesAction {
  type: typeof SET_ARTICLES;
  payload: Article[];
}

export interface AddArticleAction {
  type: typeof ADD_ARTICLE;
  payload: Article;
}

export interface UpdateArticleAction {
  type: typeof UPDATE_ARTICLE;
  payload: { id: string; updatedArticle: Article };
}

export interface DeleteArticleAction {
  type: typeof DELETE_ARTICLE;
  payload: { id: string };
}

export type ArticlesAction =
  | CallArticleApiAction
  | CallArticleApiSuccessAction
  | CallArticleApiFailedAction
  | SetArticlesAction
  | AddArticleAction
  | UpdateArticleAction
  | DeleteArticleAction
  | AnyAction;
