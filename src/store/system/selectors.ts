import { AppState } from "../index";

export const getSystemSnackbar = (state: AppState) => state.system.snackbar;
export const getSystemLoadingState = (state: AppState) => state.system.loading;
