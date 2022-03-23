import React, { ReactNode } from "react";
import { SxProps } from "@mui/system";
import Box, { BoxProps } from "@mui/material/Box";

type AMITabPanelProps = {
  children?: ReactNode;
  index: number;
  currentTabIndex: number;
  bordered?: boolean;
};

const borderedStyles: SxProps = {
  border: 1,
  borderColor: "divider",
};

const AMITabPanel = ({
  children,
  index,
  currentTabIndex,
  bordered = true,
  ...props
}: AMITabPanelProps & BoxProps): JSX.Element => {
  return (
    <Box
      {...props}
      sx={{
        ...(bordered && borderedStyles),
        padding: "12px 16px",
        marginTop: "-1px",
        ...props.sx,
      }}
      hidden={currentTabIndex !== index}
      role='tab panel'
    >
      {children}
    </Box>
  );
};

export default AMITabPanel;
