import React from "react";
import _ from "lodash";
import Alert from "@mui/material/Alert";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";

type AMIAlertProps = {
  message?: string;
  type?: "success" | "error";
};

const colorMap = {
  success: "#62B546",
  error: "#DC3644",
};

const AMIAlert = ({
  message,
  type = "success",
  ...snackProps
}: AMIAlertProps & SnackbarProps): JSX.Element => {
  const bgcolor = colorMap[type];
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      key='topright'
      {...snackProps}
    >
      <Alert
        variant='filled'
        sx={{ bgcolor, paddingY: "10px" }}
        severity={type}
        elevation={6}
      >
        {_.capitalize(message)}
      </Alert>
    </Snackbar>
  );
};

export default AMIAlert;
