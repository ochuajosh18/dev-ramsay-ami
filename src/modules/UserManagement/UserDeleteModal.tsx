import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUserById } from "../../store/users/selectors";
import { deleteUser } from "../../store/users/actions";

import Typography from "@mui/material/Typography";
import AMIDeleteModal from "../../components/common/AMIDeleteModal";

const backToPath = "/users";
type ModalParams = {
  userId: string;
};

const UserDeleteModal = (): JSX.Element | null => {
  const history = useHistory();
  const { userId } = useParams<ModalParams>();
  const dispatch = useDispatch();
  // user to delete
  const userToDelete = useSelector(selectUserById(userId));

  // early return if user is not found
  if (!userToDelete) return null;

  const { firstname, lastname } = userToDelete;

  function handleDelete() {
    dispatch(deleteUser(userId));
    // some loading here
    handleClose();
  }

  function handleClose() {
    history.push(backToPath);
  }

  return (
    <AMIDeleteModal
      title='Delete User'
      modalFor='user'
      onClose={handleClose}
      onDelete={handleDelete}
    >
      <AMIDeleteModal.Content>
        <Typography>
          Are you sure you want to delete
          <Typography component='span' color='error.main' fontWeight='bold'>
            &nbsp;{firstname} {lastname}
          </Typography>{" "}
          ?
        </Typography>
      </AMIDeleteModal.Content>
    </AMIDeleteModal>
  );
};

export default UserDeleteModal;
