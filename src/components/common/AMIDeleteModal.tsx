import React, { ReactNode } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

type AMIDeleteModalProps = {
  onClose: () => void;
  onDelete: () => void;
  title: string;
  modalFor?: string;
  deleteButtonText?: string;
  children: ReactNode;
};

const AMIDeleteModalContent = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  return <DialogContent dividers>{children}</DialogContent>;
};

const AMIDeleteModal = ({
  onClose,
  onDelete,
  deleteButtonText = "Confirm",
  title,
  modalFor,
  children,
}: AMIDeleteModalProps): JSX.Element => {
  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      sx={{ marginX: "10px" }}
    >
      <DialogTitle id='alert-dialog-title'>
        {title}
        <IconButton
          aria-label={`close ${modalFor} delete modal`}
          onClick={onClose}
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
      {children}
      <DialogActions sx={{ padding: "10px 20px" }}>
        <Button
          disableElevation
          variant='contained'
          color='secondary'
          sx={{
            color: "white",
          }}
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          disableElevation
          variant='contained'
          color='error'
          onClick={onDelete}
        >
          {deleteButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AMIDeleteModal.Content = AMIDeleteModalContent;

export default AMIDeleteModal;
