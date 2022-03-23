import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getArticles } from "../store/articles/actions";
import { getBanners } from "../store/banner/actions";
import { getVideos } from "../store/latest-videos/actions";
import { setSystemLoading } from "../store/system/actions";
import { getTopPosts } from "../store/top-posts/actions";
import { getUsers } from "../store/users/actions";

export default function useFetchAllResources() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSystemLoading(true));
    dispatch(getUsers());
    dispatch(getBanners());
    dispatch(getTopPosts());
    dispatch(getArticles());
    dispatch(getVideos());
    dispatch(setSystemLoading(false));
  }, [dispatch]);
}
