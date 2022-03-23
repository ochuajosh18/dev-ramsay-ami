import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import AccountMenu from "../Profile/AccountMenu";

interface ITopBarProps {
  onMenuToggle?: () => void;
}

const TopBar = ({ onMenuToggle }: ITopBarProps): JSX.Element => {
  return (
    <AppBar elevation={0} sx={{ bgcolor: "white" }}>
      <Toolbar sx={{ height: 60, display: "flex", bgcolor: "white" }}>
        <IconButton edge='start' onClick={onMenuToggle}>
          <MenuIcon />
        </IconButton>
        <Box ml='auto'>
          <AccountMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
