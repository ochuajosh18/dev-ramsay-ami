import { AppState } from "..";

export const selectModifiedTopPosts = (state: AppState) =>
  state.topPost.data.map((item, idx) => ({
    index: idx + 1,
    status: item.isEnabled ? "Enable" : "Disable",
    ...item,
  }));

export const selectTopPostById = (topPostId: string) => (state: AppState) => {
  return state.topPost.data.find((topPost) => topPost.id === topPostId);
};

export const isTopPostsLoading = (state: AppState) =>
  state.topPost.status === "loading";

export const getTopPostState = (state: AppState) => state.topPost;
export const getTopPostStatus = (state: AppState) => state.topPost.status;
export const getTopPostError = (state: AppState) => state.topPost.error;
export const getTopPostCount = (state: AppState) => state.topPost.data.length;
