import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectArticleById } from "../../../store/articles/selectors";
import { deleteArticle } from "../../../store/articles/actions";

import Typography from "@mui/material/Typography";
import AMIDeleteModal from "../../../components/common/AMIDeleteModal";

const backToPath = "/content/articles";

type ModalParams = {
  articleId: string;
};

const ArticleDeleteModal = (): JSX.Element | null => {
  const history = useHistory();
  const { articleId } = useParams<ModalParams>();
  const dispatch = useDispatch();
  // article to delete
  const articleToDelete = useSelector(selectArticleById(articleId));

  // early return if article is not found
  if (!articleToDelete) return null;

  const { title } = articleToDelete;

  function handleDelete() {
    dispatch(deleteArticle(articleId));
    // some loading here
    handleClose();
  }

  function handleClose() {
    history.push(backToPath);
  }

  return (
    <AMIDeleteModal
      title='Delete Article'
      modalFor='article'
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

export default ArticleDeleteModal;
