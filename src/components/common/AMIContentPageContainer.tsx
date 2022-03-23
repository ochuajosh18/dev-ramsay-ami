import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/system";

type PageContainerProps = {
  children: ReactNode;
  sx?: SxProps;
};

const AMIContentPageContainer = ({
  children,
  sx,
}: PageContainerProps): JSX.Element => {
  return (
    <Box
      padding={2}
      sx={{
        bgcolor: "#ECF0F4",
        flex: 1,
        marginTop: "64px",
        height: "calc(100% - 115px)",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default AMIContentPageContainer;
