import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectPrimaryBannerById } from "../../../store/banner/selectors";
import { deleteBanner } from "../../../store/banner/actions";

import Typography from "@mui/material/Typography";
import AMIDeleteModal from "../../../components/common/AMIDeleteModal";

const backToPath = "/content/primary-banner";

type ModalParams = {
  bannerId: string;
};

const PrimaryBannerDeleteModal = () => {
  const history = useHistory();
  const { bannerId } = useParams<ModalParams>();
  const dispatch = useDispatch();
  // banner to delete
  const bannerToDelete = useSelector(selectPrimaryBannerById(bannerId));

  // early return if banner is not found
  if (!bannerToDelete) return null;

  const { title } = bannerToDelete;

  function handleDelete() {
    dispatch(deleteBanner(bannerId));
    // some loading here
    handleClose();
  }

  function handleClose() {
    history.push(backToPath);
  }
  return (
    <AMIDeleteModal
      title='Delete Banner'
      modalFor='banner'
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

export default PrimaryBannerDeleteModal;
