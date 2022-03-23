import { AppThunk } from "..";
import { axiosInstance } from "../../utils/api";
import errorHandler from "../../utils/errorHandler";
import { setArticles } from "../articles/actions";
import { setBanners } from "../banner/actions";
import { setLatestVideos } from "../latest-videos/actions";
import { setTopPosts } from "../top-posts/actions";
import { setUsers } from "../users/actions";
import {
  SET_SESSION,
  Session,
  SystemAction,
  Snackbar,
  SET_SNACKBAR,
  SET_SYSTEM_LOADING,
} from "./types";

export function setSession(session: Session): SystemAction {
  return {
    type: SET_SESSION,
    payload: session,
  };
}

export function setSnackbar(snackbar: Snackbar | null): SystemAction {
  return {
    type: SET_SNACKBAR,
    payload: snackbar,
  };
}

export const showSuccessSnackbar =
  (message: string): AppThunk =>
  async (dispatch) => {
    dispatch(
      setSnackbar({
        open: true,
        type: "success",
        message,
      })
    );
    setTimeout(() => {
      dispatch(setSnackbar(null));
    }, 3000);
  };

// used for fetching all resource at once
export const setSystemLoading = (isLoading: boolean): SystemAction => {
  return {
    type: SET_SYSTEM_LOADING,
    payload: isLoading,
  };
};

export const fetchAllResources = (): AppThunk => async (dispatch) => {
  dispatch(setSystemLoading(true));
  try {
    const users = await axiosInstance.request({ url: "users" });
    const banners = await axiosInstance.request({ url: "banners" });
    const articles = await axiosInstance.request({ url: "articles" });
    const videos = await axiosInstance.request({ url: "videos" });
    const topPosts = await axiosInstance.request({
      url: "articles/most-viewed",
    });

    dispatch(setUsers(users.data));
    dispatch(setBanners(banners.data));
    dispatch(setArticles(articles.data));
    dispatch(setLatestVideos(videos.data));
    dispatch(setTopPosts(topPosts.data));
  } catch (err: any) {
    errorHandler(err, dispatch);
  } finally {
    dispatch(setSystemLoading(false));
  }
};
