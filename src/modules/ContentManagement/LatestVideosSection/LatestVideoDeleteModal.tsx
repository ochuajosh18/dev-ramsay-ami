import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectLatestVideoById } from "../../../store/latest-videos/selectors";
import { deleteVideo } from "../../../store/latest-videos/actions";

import Typography from "@mui/material/Typography";
import AMIDeleteModal from "../../../components/common/AMIDeleteModal";

const backToPath = "/content/latest-videos";

type ModalParams = {
  videoId: string;
};

const LatestVideoDeleteModal = (): JSX.Element | null => {
  const history = useHistory();
  const { videoId } = useParams<ModalParams>();
  const dispatch = useDispatch();
  // video to delete
  const videoToDelete = useSelector(selectLatestVideoById(videoId));

  // early return if video is not found
  if (!videoToDelete) return null;

  const { title } = videoToDelete;

  function handleDelete() {
    dispatch(deleteVideo(videoId));
    // some loading here
    handleClose();
  }

  function handleClose() {
    history.push(backToPath);
  }

  return (
    <AMIDeleteModal
      title='Delete Video Post'
      modalFor='video'
      onClose={handleClose}
      onDelete={handleDelete}
    >
      <AMIDeleteModal.Content>
        <Typography>
          Are you sure you want to delete
          <Typography component='span' color='error.main' fontWeight='bold'>
            &nbsp;{title}
          </Typography>
          ?
        </Typography>
      </AMIDeleteModal.Content>
    </AMIDeleteModal>
  );
};

export default LatestVideoDeleteModal;
