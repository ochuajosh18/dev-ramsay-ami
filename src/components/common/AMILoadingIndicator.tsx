import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type AMILoadingIndicatorProps = {
  show: boolean;
};

const AMILoadingIndicator = ({ show }: AMILoadingIndicatorProps) => {
  return ReactDOM.createPortal(
    <Backdrop
      open={show}
      sx={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <CircularProgress color='primary' />
    </Backdrop>,
    document.getElementById("loader") as HTMLElement
  );
};

export default AMILoadingIndicator;
