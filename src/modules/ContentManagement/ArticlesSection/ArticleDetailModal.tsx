import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectArticleById } from "../../../store/articles/selectors";
import { formatDatePosted } from "../../../utils/helpers";

import Box from "@mui/material/Box";
import ImageDefault from "../../../components/common/ImageDefault";
import ImagePreview from "../../../components/common/ImagePreview";
import AMIDetailModal from "../../../components/common/AMIDetailModal";
import ReactPlayer from "react-player/youtube";

const backToPath = "/content/articles";

type ModalParams = {
  articleId: string;
};

const ArticleDetailModal = (): JSX.Element | null => {
  const history = useHistory();
  const { articleId } = useParams<ModalParams>();

  // post to view
  const article = useSelector(selectArticleById(articleId));

  // early return if article is not found
  if (!article) return null;

  const { title, datePosted, content } = article;
  const mediaType = article?.media?.includes("pajrw/articles")
    ? "image"
    : "video";
  const mediaPreview = article?.media || undefined;

  function handleClose() {
    history.push(backToPath);
  }
  return (
    <AMIDetailModal detailModalFor='article' onClose={handleClose}>
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

export default ArticleDetailModal;
