import { AppThunk } from "..";
import { axiosInstance } from "../../utils/api";
import errorHandler from "../../utils/errorHandler";
import { uploadMedia } from "../../utils/upload";
import { showSuccessSnackbar } from "../system/actions";
import {
  SET_BANNER,
  ADD_BANNER,
  UPDATE_BANNER,
  DELETE_BANNER,
  Banner,
  BannersAction,
  CALL_BANNER_API,
  CALL_BANNER_API_SUCCESS,
  CALL_BANNER_API_FAILED,
} from "./types";

const url = "banners";

export const callBannerApi = (): BannersAction => {
  return {
    type: CALL_BANNER_API,
  };
};

export const callBannerApiSuccess = (): BannersAction => {
  return {
    type: CALL_BANNER_API_SUCCESS,
  };
};

export const callBannerApiFailed = (err: string | null): BannersAction => {
  return {
    type: CALL_BANNER_API_FAILED,
    payload: err,
  };
};

export function setBanners(banners: Banner[]): BannersAction {
  return {
    type: SET_BANNER,
    payload: banners,
  };
}

export function addBanner(banner: Banner): BannersAction {
  return {
    type: ADD_BANNER,
    payload: banner,
  };
}

export function updateBannerSync(
  id: string,
  updatedBanner: Banner
): BannersAction {
  return {
    type: UPDATE_BANNER,
    payload: { id, updatedBanner },
  };
}

export function deleteBannerSync(id: string): BannersAction {
  return {
    type: DELETE_BANNER,
    payload: { id },
  };
}

// ASYNC Actions

/**
 *
 * @description fetches all banners
 */
export const getBanners = (): AppThunk => async (dispatch) => {
  dispatch(callBannerApi());
  try {
    const response = await axiosInstance.request({ url });
    dispatch(setBanners(response.data));
    dispatch(callBannerApiSuccess());
  } catch (err: any) {
    dispatch(callBannerApiFailed(err.message));
    errorHandler(err, dispatch);
  }
};

/**
 *
 * @param banner The new banner resource
 * @param mediaAttachment The media attachment to be uploaded
 * @description Creates a new banner
 */
export const createBanner =
  (banner: Banner, mediaAttachment: File): AppThunk =>
  async (dispatch) => {
    dispatch(callBannerApi());
    try {
      if (mediaAttachment) {
        const type = mediaAttachment.type.substr(0, 5);
        const media = await uploadMedia(mediaAttachment, "banners", type);
        const data = { ...banner, media: media[0] };
        const response = await axiosInstance.request({
          url,
          data,
          method: "POST",
        });
        dispatch(addBanner(response.data));
        dispatch(callBannerApiSuccess());
        dispatch(showSuccessSnackbar("Successfully saved!"));
      }
    } catch (err: any) {
      dispatch(callBannerApiFailed(err.message));
      errorHandler(err, dispatch);
    }
  };

/**
 *
 * @param id The id of the banner to be updated
 * @param data The updated banner
 * @param file The media attachment for the updated banner
 * @description Updates an existing banner
 */
export const updateBanner =
  (id: string, banner: Banner, mediaAttachment?: File): AppThunk =>
  async (dispatch) => {
    dispatch(callBannerApi());
    const _url = `${url}/${id}`;
    try {
      let media;
      if (mediaAttachment) {
        const type = mediaAttachment.type.substr(0, 5);
        const uploadRes = await uploadMedia(mediaAttachment, "banners", type);
        media = uploadRes[0];
      } else {
        media = banner.media;
      }

      const data = { ...banner, media: media as string };
      const response = await axiosInstance.request({
        url: _url,
        data,
        method: "PUT",
      });
      const updatedBannerId = response.data;
      dispatch(updateBannerSync(updatedBannerId, data));
      dispatch(callBannerApiSuccess());
      dispatch(showSuccessSnackbar("Successfully updated!"));
    } catch (err: any) {
      dispatch(callBannerApiFailed(err.message));
      errorHandler(err, dispatch);
    }
  };

/**
 *
 * @param id The id of the banner to be deleted
 * @description Deletes a single banner
 */
export const deleteBanner =
  (id: string): AppThunk =>
  async (dispatch) => {
    const _url = `${url}/${id}`;
    dispatch(callBannerApi());
    try {
      const response = await axiosInstance.request({
        url: _url,
        method: "DELETE",
      });
      dispatch(deleteBannerSync(response.data));
      dispatch(callBannerApiSuccess());
      dispatch(showSuccessSnackbar("The banner was successfully deleted!"));
    } catch (err: any) {
      dispatch(callBannerApiFailed(err.message));
      errorHandler(err, dispatch);
    }
  };
