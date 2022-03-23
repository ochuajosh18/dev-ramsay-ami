import { AppThunk } from "..";
import { axiosInstance } from "../../utils/api";
import errorHandler from "../../utils/errorHandler";
import { uploadMedia } from "../../utils/upload";
import {
  addArticle,
  deleteArticleSync,
  updateArticleSync,
} from "../articles/actions";
import { Article } from "../articles/types";
import { showSuccessSnackbar } from "../system/actions";
import {
  SET_TOP_POSTS,
  ADD_TOP_POST,
  UPDATE_TOP_POST,
  DELETE_TOP_POST,
  TopPost,
  TopPostsAction,
  CALL_TOP_POST_API,
  CALL_TOP_POST_API_SUCCESS,
  CALL_TOP_POST_API_FAILED,
} from "./types";

const url = "articles";

export const callTopPostApi = (): TopPostsAction => {
  return {
    type: CALL_TOP_POST_API,
  };
};

export const callTopPostApiSuccess = (): TopPostsAction => {
  return {
    type: CALL_TOP_POST_API_SUCCESS,
  };
};

export const callTopPostApiFailed = (err: string | null): TopPostsAction => {
  return {
    type: CALL_TOP_POST_API_FAILED,
    payload: err,
  };
};

export function setTopPosts(topPosts: TopPost[]): TopPostsAction {
  return {
    type: SET_TOP_POSTS,
    payload: topPosts,
  };
}

export function addTopPost(topPost: TopPost): TopPostsAction {
  return {
    type: ADD_TOP_POST,
    payload: topPost,
  };
}

export function updateTopPostSync(
  id: string,
  updatedTopPost: TopPost
): TopPostsAction {
  return {
    type: UPDATE_TOP_POST,
    payload: { id, updatedTopPost },
  };
}

export function deleteTopPostSync(id: string): TopPostsAction {
  return {
    type: DELETE_TOP_POST,
    payload: { id },
  };
}

// ASYNC Actions

/**
 *
 * @description fetches the top posts (most-viewed articles)
 */
export const getTopPosts = (): AppThunk => async (dispatch) => {
  dispatch(callTopPostApi());
  const _url = `${url}/most-viewed`;
  try {
    const response = await axiosInstance.request({ url: _url });
    dispatch(setTopPosts(response.data));
    dispatch(callTopPostApiSuccess());
  } catch (err: any) {
    dispatch(callTopPostApiFailed(err.message));
    errorHandler(err, dispatch);
  }
};

/**
 *
 * @param topPost The new top post resource
 * @param mediaAttachment The media attachment to be uploaded
 * @description Creates a new top post (similar to article)
 */
export const createTopPost =
  (topPost: Article, mediaAttachment?: File): AppThunk =>
  async (dispatch) => {
    dispatch(callTopPostApi());
    // console.log(article);
    try {
      let media;
      if (mediaAttachment) {
        const type = mediaAttachment.type.substr(0, 5);
        const uploadRes = await uploadMedia(mediaAttachment, "articles", type);
        media = uploadRes[0];
      } else {
        media = topPost.media;
      }

      const data = { ...topPost, media };
      const response = await axiosInstance.request({
        url,
        data,
        method: "POST",
      });
      dispatch(addTopPost(response.data));
      // add to articles post as well
      dispatch(addArticle(response.data));
      dispatch(callTopPostApiSuccess());
      dispatch(showSuccessSnackbar("Successfully saved!"));
    } catch (err: any) {
      dispatch(callTopPostApiFailed(err.message));
      errorHandler(err, dispatch);
    }
  };

/**
 *
 * @param id The id of the top post to be updated
 * @param data The updated top post
 * @param file The media attachment for the updated top post
 * @description Updates an existing top post (actually an article)
 */
export const updateTopPost =
  (id: string, topPost: Article, mediaAttachment?: File): AppThunk =>
  async (dispatch) => {
    dispatch(callTopPostApi());
    const _url = `${url}/${id}`;
    try {
      let media;
      if (mediaAttachment) {
        const type = mediaAttachment.type.substr(0, 5);
        const uploadRes = await uploadMedia(mediaAttachment, "articles", type);
        media = uploadRes[0];
      } else {
        media = topPost.media;
      }

      const data = { ...topPost, media: media as string };
      const response = await axiosInstance.request({
        url: _url,
        data,
        method: "PUT",
      });
      const updatedArticleId = response.data;
      dispatch(updateTopPostSync(updatedArticleId, data));
      // update the article as well
      dispatch(updateArticleSync(updatedArticleId, data));
      dispatch(callTopPostApiSuccess());
      dispatch(showSuccessSnackbar("Successfully updated!"));
    } catch (err: any) {
      dispatch(callTopPostApiFailed(err.message));
      errorHandler(err, dispatch);
    }
  };

/**
 *
 * @param id the id of the post to be deleted
 * @description deletes a top post (which is actually an article)
 */
export const deleteTopPost =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(callTopPostApi());
    const _url = `${url}/${id}`;
    try {
      const response = await axiosInstance.request({
        url: _url,
        method: "DELETE",
      });
      const deletedPostId = response.data;
      dispatch(deleteTopPostSync(deletedPostId));

      // delete the article as well
      dispatch(deleteArticleSync(deletedPostId));
      dispatch(callTopPostApiSuccess());
      dispatch(showSuccessSnackbar("The post was successfully deleted!"));
    } catch (err: any) {
      dispatch(callTopPostApiFailed(err.message));
      errorHandler(err, dispatch);
    }
  };
