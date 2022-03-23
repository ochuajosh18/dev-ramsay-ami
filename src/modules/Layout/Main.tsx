import React, { ReactNode } from "react";
import Stack from "@mui/material/Stack";
import { drawerWidth } from "./constants";

interface IMainProps {
  expanded?: boolean;
  children: ReactNode;
}

const Main = ({ expanded = true, children }: IMainProps): JSX.Element => {
  const translateXTo = expanded ? drawerWidth.expanded : drawerWidth.small;
  return (
    <Stack
      sx={{
        height: "100vh",
        width: `calc(100vw - ${translateXTo}px)`, // will make automatic
        transform: `translateX(${translateXTo}px)`,
        transition: "transform 0.3s",
      }}
    >
      {children}
    </Stack>
  );
};

export default Main;
