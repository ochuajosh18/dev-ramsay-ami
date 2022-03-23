import { AppState } from "../index";

export const selectModifiedMostPopularPosts = (state: AppState) =>
  state.mostPopularPosts.data.map((p, idx) => ({
    index: idx + 1,
    status: p.enabled ? "Enable" : "Disable",
    ...p,
  }));

export const selectMostPopularPostById = (id: string) => (state: AppState) =>
  state.mostPopularPosts.data.find((u) => u.id === id);
