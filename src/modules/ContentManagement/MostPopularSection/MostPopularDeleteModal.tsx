import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectMostPopularPostById } from "../../../store/most-popular-posts/selectors";
import { deleteMostPopularPost } from "../../../store/most-popular-posts/actions";

import Typography from "@mui/material/Typography";
import AMIDeleteModal from "../../../components/common/AMIDeleteModal";

const backToPath = "/content/most-popular";

type ModalParams = {
  postId: string;
};

const MostPopularDeleteModal = (): JSX.Element | null => {
  const history = useHistory();
  const { postId } = useParams<ModalParams>();
  const dispatch = useDispatch();
  // post to delete
  const postToDelete = useSelector(selectMostPopularPostById(postId));

  // early return if post is not found
  if (!postToDelete) return null;

  const { title } = postToDelete;

  function handleDelete() {
    dispatch(deleteMostPopularPost(postId));
    // some loading here
    handleClose();
  }

  function handleClose() {
    history.push(backToPath);
  }

  return (
    <AMIDeleteModal
      title='Delete Post'
      modalFor='most popular post'
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

export default MostPopularDeleteModal;
