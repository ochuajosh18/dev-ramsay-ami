import { AppThunk } from "..";
import { axiosInstance } from "../../utils/api";
import errorHandler from "../../utils/errorHandler";
import { showSuccessSnackbar } from "../system/actions";
import {
  ADD_LATEST_VIDEO,
  CALL_VIDEOS_API,
  CALL_VIDEOS_API_FAILED,
  CALL_VIDEOS_API_SUCCESS,
  DELETE_LATEST_VIDEO,
  LatestVideo,
  LatestVideosAction,
  SET_LATEST_VIDEOS,
  UPDATE_LATEST_VIDEO,
} from "./types";

const url = "videos";

export const callVideosApi = (): LatestVideosAction => {
  return {
    type: CALL_VIDEOS_API,
  };
};

export const callVideosApiSuccess = (): LatestVideosAction => {
  return {
    type: CALL_VIDEOS_API_SUCCESS,
  };
};

export const callVideosApiFailed = (err: string | null): LatestVideosAction => {
  return {
    type: CALL_VIDEOS_API_FAILED,
    payload: err,
  };
};

/**
 *
 * @description Fetches all videos
 */
export const getVideos = (): AppThunk => async (dispatch) => {
  dispatch(callVideosApi());
  try {
    const response = await axiosInstance.request({ url });
    dispatch(setLatestVideos(response.data));
    dispatch(callVideosApiSuccess());
  } catch (err: any) {
    dispatch(callVideosApiFailed(err.message));
    errorHandler(err, dispatch);
  }
};

/**
 *
 * @param video The new video resource
 * @description Creates new video
 */
export const createVideo =
  (video: LatestVideo): AppThunk =>
  async (dispatch) => {
    dispatch(callVideosApi());
    try {
      const data = { ...video };
      const response = await axiosInstance.request({
        url,
        data,
        method: "POST",
      });
      dispatch(addLatestVideo(response.data));
      dispatch(callVideosApiSuccess());
      dispatch(showSuccessSnackbar("Successfully saved!"));
    } catch (err: any) {
      dispatch(callVideosApiFailed(err.message));
      errorHandler(err, dispatch);
    }
  };

/**
 *
 * @param id The id of the video to be updated
 * @param data The updated video
 * @description Updates an existing video
 */
export const updateVideo =
  (id: string, data: LatestVideo): AppThunk =>
  async (dispatch) => {
    dispatch(callVideosApi());
    const _url = `${url}/${id}`;
    try {
      const response = await axiosInstance.request({
        url: _url,
        data,
        method: "PUT",
      });
      const updatedVideoId = response.data;
      dispatch(updateVideoSync(updatedVideoId, data));
      dispatch(callVideosApiSuccess());
      dispatch(showSuccessSnackbar("Successfully updated!"));
    } catch (err: any) {
      dispatch(callVideosApiFailed(err.message));
      errorHandler(err, dispatch);
    }
  };

/**
 *
 * @param id The id of the video to be deleted
 * @description Deletes a single video
 */
export const deleteVideo =
  (id: string): AppThunk =>
  async (dispatch) => {
    const _url = `${url}/${id}`;
    dispatch(callVideosApi());
    try {
      const response = await axiosInstance.request({
        url: _url,
        method: "DELETE",
      });
      dispatch(deleteVideoSync(response.data));
      dispatch(callVideosApiSuccess());
      dispatch(showSuccessSnackbar("The video was successfully deleted!"));
    } catch (err: any) {
      dispatch(callVideosApiFailed(err.message));
      errorHandler(err, dispatch);
    }
  };

export function setLatestVideos(
  latestVideos: LatestVideo[]
): LatestVideosAction {
  return {
    type: SET_LATEST_VIDEOS,
    payload: latestVideos,
  };
}

export function addLatestVideo(latestVideo: LatestVideo): LatestVideosAction {
  return {
    type: ADD_LATEST_VIDEO,
    payload: latestVideo,
  };
}

export function updateVideoSync(
  id: string,
  updatedVideo: LatestVideo
): LatestVideosAction {
  return {
    type: UPDATE_LATEST_VIDEO,
    payload: { id, updatedVideo },
  };
}

export function deleteVideoSync(id: string): LatestVideosAction {
  return {
    type: DELETE_LATEST_VIDEO,
    payload: { id },
  };
}
