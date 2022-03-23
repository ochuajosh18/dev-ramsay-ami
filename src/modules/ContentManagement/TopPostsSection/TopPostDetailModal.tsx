import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTopPostById } from "../../../store/top-posts/selectors";

import Box from "@mui/material/Box";
import ImageDefault from "../../../components/common/ImageDefault";
import ImagePreview from "../../../components/common/ImagePreview";
import AMIDetailModal from "../../../components/common/AMIDetailModal";
import { formatDatePosted } from "../../../utils/helpers";
import ReactPlayer from "react-player/youtube";

const backToPath = "/content/top-posts";
type ModalParams = {
  postId: string;
};

const TopPostsDetailModal = (): JSX.Element | null => {
  const history = useHistory();
  const { postId } = useParams<ModalParams>();

  // post to view
  const topPost = useSelector(selectTopPostById(postId));

  // early return if post is not found
  if (!topPost) return null;

  const { title, datePosted, content } = topPost;
  const mediaType = topPost?.media?.includes("pajrw/articles")
    ? "image"
    : "video";
  const mediaPreview = topPost?.media || undefined;

  function handleClose() {
    history.push(backToPath);
  }
  return (
    <AMIDetailModal detailModalFor='banner' onClose={handleClose}>
      <AMIDetailModal.Row>
        <AMIDetailModal.Label>Title</AMIDetailModal.Label>
        <AMIDetailModal.Text>{title}</AMIDetailModal.Text>
      </AMIDetailModal.Row>
      <AMIDetailModal.Row>
        <AMIDetailModal.Label>Date Posted</AMIDetailModal.Label>
        <AMIDetailModal.Text>
          {formatDatePosted(datePosted as string)}
        </AMIDetailModal.Text>
      </AMIDetailModal.Row>
      <AMIDetailModal.Row>
        <AMIDetailModal.Label>Preview</AMIDetailModal.Label>
        <Box sx={{ flex: 3 }}>
          {mediaType ? (
            mediaType === "image" ? (
              <ImagePreview src={mediaPreview} />
            ) : (
              <ReactPlayer
                url={mediaPreview}
                width={400}
                height={230}
                controls
              />
            )
          ) : (
            <ImageDefault />
          )}
        </Box>
      </AMIDetailModal.Row>
      <AMIDetailModal.Row>
        <AMIDetailModal.Label>Body</AMIDetailModal.Label>
        <AMIDetailModal.ContentParser data={content as string} />
      </AMIDetailModal.Row>
    </AMIDetailModal>
  );
};

export default TopPostsDetailModal;
