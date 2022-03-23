import React, { ReactNode } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { NavLink } from "react-router-dom";

interface IMenu {
  path: string;
  label: string;
  hasSubmenu?: boolean;
  icon: ReactNode;
}

type SidebarMenuItemProps = {
  menuItem: IMenu;
  expanded?: boolean | undefined;
  onClick?: () => void;
  shrink?: boolean;
};

const SidebarMenuItem = ({
  menuItem,
  expanded,
  onClick,
  shrink = false,
}: SidebarMenuItemProps): JSX.Element => {
  return (
    <ListItem
      component={NavLink}
      to={menuItem.path}
      exact={menuItem.path === "/"}
      disablePadding
      activeStyle={{
        backgroundColor: "#1E282C",
        borderLeft: "2px solid white",
      }}
      sx={{
        color: "inherit",
        borderLeft: "2px solid transparent",
        maxHeight: "45px",
      }}
    >
      <ListItemButton
        sx={{ maxHeight: "45px", "&:hover": { bgcolor: "#1E282C" } }}
        onClick={onClick}
      >
        <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
          {menuItem.icon}
        </ListItemIcon>
        <ListItemText
          primary={menuItem.label}
          sx={{
            opacity: shrink ? 0 : 1,
            transform: `translateX(${shrink ? "200%" : "0"})`,
            transition: "transform 0.3s, opacity 0.1s",
            ".MuiListItemText-primary": { fontSize: 14 },
          }}
        />
        {menuItem.hasSubmenu && (
          <React.Fragment>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </React.Fragment>
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarMenuItem;
