import React, { ReactNode } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Stack, { StackProps } from "@mui/material/Stack";
import Typography, { TypographyProps } from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface AMIDetailModalProps {
  onClose?: () => void;
  children?: ReactNode;
  detailModalFor?: string;
}

const AMIDetailModal = ({
  onClose,
  detailModalFor,
  children,
}: AMIDetailModalProps) => {
  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      aria-labelledby={`${detailModalFor}-alert-dialog-title`}
      aria-describedby='alert-dialog-description'
      sx={{ marginX: "10px" }}
    >
      <DialogTitle id={`${detailModalFor}-alert-dialog-title`}>
        Information
        <IconButton
          aria-label={`close ${detailModalFor} modal`}
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
      <DialogContent dividers>
        <Stack spacing={3} paddingY={2}>
          {children}
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
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DetailModalRow = (props: StackProps) => {
  return (
    <Stack direction='row' spacing={2} {...props}>
      {props.children}
    </Stack>
  );
};

const DetailModalLabel = (props: TypographyProps) => {
  return (
    <Typography
      fontSize={15}
      {...props}
      sx={{ flex: 1, color: "#0C2136", fontWeight: "bold", ...props.sx }}
    >
      {props.children}
    </Typography>
  );
};

const DetailModalText = (props: TypographyProps) => {
  return (
    <Typography sx={{ flex: 3 }} fontSize={15} {...props}>
      {props.children}
    </Typography>
  );
};

const ContentParser = ({ data }: { data: string }) => {
  return (
    <Grid
      container
      width={400}
      borderColor='#ccc'
      bgcolor='white'
      borderRadius={1}
    >
      <Grid
        item
        xs={12}
        sx={{
          "& .ck > .ck-editor__top": {
            display: "none",
          },
        }}
      >
        {data ? (
          <CKEditor
            name='ami-rich-text-editor-for-modal'
            data={data}
            editor={ClassicEditor}
            disabled
            // @ts-ignore
            onBlur={(event, editor) => {}}
          />
        ) : (
          <Typography color='GrayText'>No content yet.</Typography>
        )}
      </Grid>
    </Grid>
  );
};

AMIDetailModal.Row = DetailModalRow;
AMIDetailModal.Label = DetailModalLabel;
AMIDetailModal.Text = DetailModalText;
AMIDetailModal.ContentParser = ContentParser;

export default AMIDetailModal;
