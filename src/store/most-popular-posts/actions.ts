import {
  ADD_MOST_POPULAR_POST,
  SET_MOST_POPULAR_POSTS,
  MostPopularPost,
  MostPopularPostsAction,
  UPDATE_MOST_POPULAR_POST,
  DELETE_MOST_POPULAR_POST,
} from "./types";

export function setMostPopularPosts(
  mostPopularPosts: MostPopularPost[]
): MostPopularPostsAction {
  return {
    type: SET_MOST_POPULAR_POSTS,
    payload: mostPopularPosts,
  };
}

export function addMostPopularPost(
  mostPopularPost: MostPopularPost
): MostPopularPostsAction {
  return {
    type: ADD_MOST_POPULAR_POST,
    payload: mostPopularPost,
  };
}

export function updateMostPopularPost(
  id: string,
  updatedPost: MostPopularPost
): MostPopularPostsAction {
  return {
    type: UPDATE_MOST_POPULAR_POST,
    payload: { id, updatedPost },
  };
}

export function deleteMostPopularPost(id: string): MostPopularPostsAction {
  return {
    type: DELETE_MOST_POPULAR_POST,
    payload: { id },
  };
}
