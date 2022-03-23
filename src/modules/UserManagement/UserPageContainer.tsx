import React, { ReactNode } from "react";
import Box from "@mui/material/Box";

type UserPageContainerProps = {
  children: ReactNode;
};

const UserPageContainer = ({
  children,
}: UserPageContainerProps): JSX.Element => {
  return (
    <Box
      padding={2}
      sx={{
        bgcolor: "#ECF0F4",
        flex: 1,
        marginTop: "64px",
        height: "calc(100% - 115px)",
      }}
    >
      {children}
    </Box>
  );
};

export default UserPageContainer;
