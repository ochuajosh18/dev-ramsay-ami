import React from "react";
import { TypographyProps, Typography } from "@mui/material";
import { SxProps } from "@mui/system";

const textStyles: SxProps = {
  color: "#0C2136",
  fontWeight: "bold",
};

const Label = (props: TypographyProps): JSX.Element => {
  return (
    <Typography {...props} sx={{ ...textStyles, ...props.sx }}>
      {props.children}
    </Typography>
  );
};

export default Label;
