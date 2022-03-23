import React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const Pluscon = (props: SvgIconProps): JSX.Element => {
  return (
    <SvgIcon {...props}>
      <path fill='currentColor' d='M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z' />
    </SvgIcon>
  );
};

export default Pluscon;
