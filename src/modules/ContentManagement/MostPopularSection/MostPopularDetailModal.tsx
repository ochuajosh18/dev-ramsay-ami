import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMostPopularPostById } from "../../../store/most-popular-posts/selectors";
import { formatDatePosted } from "../../../utils/helpers";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Label from "../../../components/common/Label";
import ImageDefault from "../../../components/common/ImageDefault";
import ImagePreview from "../../../components/common/ImagePreview";
import VideoPreview from "../../../components/common/VideoPreview";

const backToPath = "/content/most-popular";

type ModalParams = {
  postId: string;
};

const MostPopularDetailModal = (): JSX.Element | null => {
  const history = useHistory();
  const { postId } = useParams<ModalParams>();

  // post to view
  const post = useSelector(selectMostPopularPostById(postId));

  // early return if post is not found
  if (!post) return null;

  const { title, datePosted, body } = post;
  const mediaType = post?.file?.substr(5, 5);
  const mediaPreview = post?.file || undefined;

  function handleClose() {
    history.push(backToPath);
  }
  return (
    <Dialog
      open
      onClose={handleClose}
      fullWidth
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      sx={{ marginX: "10px" }}
    >
      <DialogTitle id='alert-dialog-title'>
        Information
        <IconButton
          aria-label='close most popular modal'
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} paddingY={2}>
          <Stack direction='row' spacing={2}>
            <Label sx={{ flex: 1 }} fontSize={15}>
              Title
            </Label>
            <Typography sx={{ flex: 3 }} fontSize={15}>
              {title}
            </Typography>
          </Stack>
          <Stack direction='row' spacing={2}>
            <Label sx={{ flex: 1 }} fontSize={15}>
              Date Posted
            </Label>
            <Typography sx={{ flex: 3 }} fontSize={15}>
              {formatDatePosted(datePosted)}
            </Typography>
          </Stack>
          <Stack direction='row' spacing={2}>
            <Label sx={{ flex: 1 }} fontSize={15}>
              Preview
            </Label>
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
          </Stack>
          <Stack direction='row' spacing={2}>
            <Label sx={{ flex: 1 }} fontSize={15}>
              Body
            </Label>
            <Typography sx={{ flex: 3 }} fontSize={15}>
              {body}
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ padding: "20px" }}>
        <Button
          disableElevation
          variant='contained'
          color='secondary'
          sx={{
            color: "white",
          }}
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MostPopularDetailModal;
