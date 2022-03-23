import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPrimaryBannerById } from "../../../store/banner/selectors";

import Box from "@mui/material/Box";
import ImageDefault from "../../../components/common/ImageDefault";
import ImagePreview from "../../../components/common/ImagePreview";
import VideoPreview from "../../../components/common/VideoPreview";
import AMIDetailModal from "../../../components/common/AMIDetailModal";
import { formatDatePosted } from "../../../utils/helpers";

const backToPath = "/content/primary-banner";
type ModalParams = {
  bannerId: string;
};

const PrimaryBannerDetailModal = (): JSX.Element | null => {
  const history = useHistory();
  const { bannerId } = useParams<ModalParams>();

  // banner to view
  const banner = useSelector(selectPrimaryBannerById(bannerId));

  // early return if banner is not found
  if (!banner) return null;

  const { title, datePosted } = banner;
  //   const mediaType = banner?.media?.substr(5, 5);
  const mediaType = "image"; // will determine type from the server
  const mediaPreview = banner?.media || undefined;

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
              <VideoPreview src={mediaPreview} />
            )
          ) : (
            <ImageDefault />
          )}
        </Box>
      </AMIDetailModal.Row>
      {/* <AMIDetailModal.Row>
        <AMIDetailModal.Label>Body</AMIDetailModal.Label>
        <AMIDetailModal.ContentParser data={content as string} />
      </AMIDetailModal.Row> */}
    </AMIDetailModal>
  );
};

export default PrimaryBannerDetailModal;
