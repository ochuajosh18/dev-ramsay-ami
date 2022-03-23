import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

type AMIContentFormButtonsProps = {
  saveText?: string;
  cancelText?: string;
  onCancel: () => void;
  onSave: () => void;
};

/**
 * @description The buttons for a form in a content mngt module which includes
 * the 'Save/Update' and 'Cancel' buttons
 */
const AMIContentFormButtons = ({
  saveText = "Save",
  cancelText = "Cancel",
  onSave,
  onCancel,
}: AMIContentFormButtonsProps) => {
  return (
    <Stack direction='row' ml='auto' spacing={2}>
      <Button
        onClick={onSave}
        disableElevation
        variant='contained'
        color='primary'
        sx={{ color: "white", height: "100%" }}
      >
        {saveText}
      </Button>
      <Button
        onClick={onCancel}
        disableElevation
        variant='contained'
        color='secondary'
        sx={{
          color: "white",
          height: "100%",
          mr: 2,
        }}
      >
        {cancelText}
      </Button>
    </Stack>
  );
};

export default AMIContentFormButtons;
