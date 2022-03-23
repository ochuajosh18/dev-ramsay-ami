import { AppState } from "..";

export const selectModifiedBanners = (state: AppState) =>
  state.banner.data.map((item, idx) => ({
    index: idx + 1,
    status: item.isEnabled ? "Enable" : "Disable",
    ...item,
  }));

export const selectPrimaryBannerById =
  (bannerId: string) => (state: AppState) => {
    return state.banner.data.find((banner) => banner.id === bannerId);
  };

export const isBannersLoading = (state: AppState) =>
  state.banner.status === "loading";

export const getBannerState = (state: AppState) => state.banner;
export const getBannerStatus = (state: AppState) => state.banner.status;
export const getBannerError = (state: AppState) => state.banner.error;
export const getBannerCount = (state: AppState) => state.banner.data.length;
