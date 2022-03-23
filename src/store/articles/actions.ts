import { axiosInstance } from "../../utils/api";
import errorHandler from "../../utils/errorHandler";
import { uploadMedia } from "../../utils/upload";
import { AppThunk } from "../index";
import { showSuccessSnackbar } from "../system/actions";
import {
  ADD_ARTICLE,
  DELETE_ARTICLE,
  Article,
  ArticlesAction,
  UPDATE_ARTICLE,
  CALL_ARTICLE_API,
  CALL_ARTICLE_API_SUCCESS,
  CALL_ARTICLE_API_FAILED,
  SET_ARTICLES,
} from "./types";

const url = "articles";

export const callArticleApi = (): ArticlesAction => {
  return {
    type: CALL_ARTICLE_API,
  };
};

export const callArticleApiSuccess = (): ArticlesAction => {
  return {
    type: CALL_ARTICLE_API_SUCCESS,
  };
};

export const callArticleApiFailed = (err: string | null): ArticlesAction => {
  return {
    type: CALL_ARTICLE_API_FAILED,
    payload: err,
  };
};

/**
 *
 * @description Fetches all articles
 */
export const getArticles = (): AppThunk => async (dispatch) => {
  dispatch(callArticleApi());
  try {
    const response = await axiosInstance.request({ url });
    dispatch(setArticles(response.data));
    dispatch(callArticleApiSuccess());
  } catch (err: any) {
    dispatch(callArticleApiFailed(err.message));
    errorHandler(err, dispatch);
  }
};

/**
 *
 * @param article The new article resource
 * @param mediaAttachment The media attachment to be uploaded
 * @description Creates a new article
 */
export const createArticle =
  (article: Article, mediaAttachment?: File): AppThunk =>
  async (dispatch) => {
    dispatch(callArticleApi());
    // console.log(article);
    try {
      let media;
      if (mediaAttachment) {
        const type = mediaAttachment.type.substr(0, 5);
        const uploadRes = await uploadMedia(mediaAttachment, "articles", type);
        media = uploadRes[0];
      } else {
        media = article.media;
      }

      const data = { ...article, media };
      const response = await axiosInstance.request({
        url,
        data,
        method: "POST",
      });
      dispatch(addArticle(response.data));
      dispatch(callArticleApiSuccess());
      dispatch(showSuccessSnackbar("Successfully saved!"));
    } catch (err: any) {
      dispatch(callArticleApiFailed(err.message));
      errorHandler(err, dispatch);
    }
  };

/**
 *
 * @param id The id of the article to be updated
 * @param data The updated article
 * @param file The media attachment for the updated article
 * @description Updates an existing article
 */
export const updateArticle =
  (id: string, article: Article, mediaAttachment?: File): AppThunk =>
  async (dispatch) => {
    dispatch(callArticleApi());
    const _url = `${url}/${id}`;
    try {
      let media;
      if (mediaAttachment) {
        const type = mediaAttachment.type.substr(0, 5);
        const uploadRes = await uploadMedia(mediaAttachment, "articles", type);
        media = uploadRes[0];
      } else {
        media = article.media;
      }

      const data = { ...article, media: media as string };
      const response = await axiosInstance.request({
        url: _url,
        data,
        method: "PUT",
      });
      const updatedArticleId = response.data;
      dispatch(updateArticleSync(updatedArticleId, data));
      dispatch(callArticleApiSuccess());
      dispatch(showSuccessSnackbar("Successfully updated!"));
    } catch (err: any) {
      dispatch(callArticleApiFailed(err.message));
      errorHandler(err, dispatch);
    }
  };

/**
 *
 * @param id The id of the article to be deleted
 * @description Deletes a single article
 */
export const deleteArticle =
  (id: string): AppThunk =>
  async (dispatch) => {
    const _url = `${url}/${id}`;
    dispatch(callArticleApi());
    try {
      const response = await axiosInstance.request({
        url: _url,
        method: "DELETE",
      });
      dispatch(deleteArticleSync(response.data));
      dispatch(callArticleApiSuccess());
      dispatch(showSuccessSnackbar("The article was successfully deleted!"));
    } catch (err: any) {
      dispatch(callArticleApiFailed(err.message));
      errorHandler(err, dispatch);
    }
  };

export const setArticles = (articles: Article[]): ArticlesAction => {
  return {
    type: SET_ARTICLES,
    payload: articles,
  };
};

export function addArticle(article: Article): ArticlesAction {
  return {
    type: ADD_ARTICLE,
    payload: article,
  };
}

export function updateArticleSync(
  id: string,
  updatedArticle: Article
): ArticlesAction {
  return {
    type: UPDATE_ARTICLE,
    payload: { id, updatedArticle },
  };
}

export function deleteArticleSync(id: string): ArticlesAction {
  return {
    type: DELETE_ARTICLE,
    payload: { id },
  };
}
