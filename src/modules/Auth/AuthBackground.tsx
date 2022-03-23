import React, { ReactNode } from "react";
import Paper from "@mui/material/Paper";
import backGround from "../../assets/images/login-background.jpg";

type AuthBackgroundProps = { children?: ReactNode };

const AuthBackground = ({ children }: AuthBackgroundProps) => {
  return (
    <Paper
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${backGround})`,
      }}
    >
      {children}
    </Paper>
  );
};

export default AuthBackground;
