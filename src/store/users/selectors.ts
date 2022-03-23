import { AppState } from "../index";

// adds 'index' and 'name' key & value
export const selectModifiedUsers = (state: AppState) =>
  state.users.data.map((u, idx) => ({
    ...u,
    index: idx + 1,
    name: `${u.firstname} ${u.lastname}`,
  }));

export const selectUserEmails = (state: AppState) =>
  state.users.data.map((u) => u.email);

export const selectUserById = (id: string) => (state: AppState) =>
  state.users.data.find((u) => u.id === id);

export const isUsersLoading = (state: AppState) =>
  state.users.status === "loading";

export const getUserCount = (state: AppState) => state.users.data.length;
