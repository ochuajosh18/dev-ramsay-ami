import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import HollowCircleIcon from "../../assets/icons/HollowCircleIcon";

interface IMenu {
  path: string;
  label: string;
  hasSubmenu?: boolean;
}

type SidebarSubMenuItemProps = {
  menuItem: IMenu;
  expanded?: boolean | undefined;
  onClick?: () => void;
};

const SidebarSubMenuItem = ({
  menuItem,
  expanded,
  onClick,
}: SidebarSubMenuItemProps): JSX.Element => {
  return (
    <ListItem
      component={NavLink}
      to={menuItem.path}
      exact={menuItem.path === "/"}
      disablePadding
      activeStyle={{
        backgroundColor: "#1E282C",
      }}
      sx={{
        color: "inherit",
      }}
    >
      <ListItemButton
        sx={{ "&:hover": { bgcolor: "#1E282C" } }}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            color: "white",
            minWidth: 30,
            fontSize: 12,
            marginLeft: "10px",
          }}
        >
          <HollowCircleIcon fontSize='inherit' />
        </ListItemIcon>
        <ListItemText
          primary={menuItem.label}
          sx={{ ".MuiListItemText-primary": { fontSize: 14 } }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarSubMenuItem;
