import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLatestVideoById } from "../../../store/latest-videos/selectors";
import { formatDatePosted } from "../../../utils/helpers";

import Box from "@mui/material/Box";
import ImageDefault from "../../../components/common/ImageDefault";
import AMIDetailModal from "../../../components/common/AMIDetailModal";
import ReactPlayer from "react-player/youtube";

const backToPath = "/content/latest-videos";
type ModalParams = {
  videoId: string;
};

const LatestVideoDetailModal = (): JSX.Element | null => {
  const history = useHistory();
  const { videoId } = useParams<ModalParams>();

  // video to view
  const video = useSelector(selectLatestVideoById(videoId));

  // early return if video is not found
  if (!video) return null;

  const { title, datePosted, content } = video;
  const mediaType = "video";
  const mediaPreview = video?.media || undefined;

  function handleClose() {
    history.push(backToPath);
  }
  return (
    <AMIDetailModal detailModalFor='video' onClose={handleClose}>
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
            <ReactPlayer url={mediaPreview} width={400} height={200} controls />
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

export default LatestVideoDetailModal;
