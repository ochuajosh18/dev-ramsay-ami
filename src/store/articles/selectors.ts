import { AppState } from "../index";

export const selectModifiedArticles = (state: AppState) =>
  state.articles.data.map((item, idx) => ({
    index: idx + 1,
    status: item.isEnabled ? "Enable" : "Disable",
    ...item,
  }));

export const selectArticleById = (id: string) => (state: AppState) =>
  state.articles.data.find((item) => item.id === id);

export const isArticlesLoading = (state: AppState) =>
  state.articles.status === "loading";
export const getArticleState = (state: AppState) => state.articles;
export const getArticleStatus = (state: AppState) => state.articles.status;
export const getArticleError = (state: AppState) => state.articles.error;
export const getArticleCount = (state: AppState) => state.articles.data.length;
