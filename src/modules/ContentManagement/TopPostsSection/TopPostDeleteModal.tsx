import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectTopPostById } from "../../../store/top-posts/selectors";
import { deleteTopPost } from "../../../store/top-posts/actions";

import Typography from "@mui/material/Typography";
import AMIDeleteModal from "../../../components/common/AMIDeleteModal";

const backToPath = "/content/top-posts";

type ModalParams = {
  postId: string;
};

const TopPostDeleteModal = () => {
  const history = useHistory();
  const { postId } = useParams<ModalParams>();
  const dispatch = useDispatch();
  // post to delete
  const postToDelete = useSelector(selectTopPostById(postId));

  // early return if post is not found
  if (!postToDelete) return null;

  const { title } = postToDelete;

  function handleDelete() {
    dispatch(deleteTopPost(postId));
    // some loading here
    handleClose();
  }

  function handleClose() {
    history.push(backToPath);
  }
  return (
    <AMIDeleteModal
      title='Delete Top Post'
      modalFor='top post'
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

export default TopPostDeleteModal;
