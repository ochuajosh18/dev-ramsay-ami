import { AppState } from "../index";

export const selectModifiedLatestVideos = (state: AppState) =>
  state.latestVideos.data.map((v, idx) => ({
    index: idx + 1,
    status: v.isEnabled ? "Enable" : "Disable",
    ...v,
  }));

export const selectLatestVideoById = (id: string) => (state: AppState) =>
  state.latestVideos.data.find((v) => v.id === id);
export const isVideosLoading = (state: AppState) =>
  state.latestVideos.status === "loading";

export const getVideoState = (state: AppState) => state.latestVideos;
export const getVideoStatus = (state: AppState) => state.latestVideos.status;
export const getVideoError = (state: AppState) => state.latestVideos.error;
export const getVideoCount = (state: AppState) =>
  state.latestVideos.data.length;
