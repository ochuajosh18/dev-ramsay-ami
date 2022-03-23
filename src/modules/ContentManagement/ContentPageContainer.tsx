import React, { ReactNode } from "react";
import Box from "@mui/material/Box";

type ContentPageContainerProps = {
  children: ReactNode;
};

const ContentPageContainer = ({
  children,
}: ContentPageContainerProps): JSX.Element => {
  return (
    <Box
      padding={2}
      sx={{
        bgcolor: "#ECF0F4",
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        marginTop: "64px",
        maxHeight: "calc(100% - 125px)",
      }}
    >
      {children}
    </Box>
  );
};

export default ContentPageContainer;
