import React, { ReactNode } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandMore";
import ExpandMore from "@mui/icons-material/ChevronLeft";
import Box from "@mui/material/Box";

interface IMenu {
  path: string;
  label: string;
  hasSubmenu?: boolean;
  icon: ReactNode;
}

type SidebarMenuItemProps = {
  menuItem: IMenu;
  expanded?: boolean | undefined;
  active: boolean;
  shrink?: boolean;
  onClick?: () => void;
};

export const SidebarPlainMenuItem = ({
  menuItem,
  expanded,
  onClick,
  active,
  shrink = false,
}: SidebarMenuItemProps) => {
  return (
    <ListItem
      disablePadding
      sx={{
        color: "inherit",
        borderLeft: "2px solid",
        borderColor: active ? "white" : "transparent",
        backgroundColor: active ? "#1E282C" : "",
        maxHeight: "45px",
      }}
    >
      <ListItemButton
        sx={{
          maxHeight: "45px",
          "&:hover": {
            bgcolor: "#1E282C",
          },
        }}
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
            transition: "transform 0.3s ease-in, opacity 0.1s",
            ".MuiListItemText-primary": { fontSize: 14 },
          }}
        />
        {menuItem.hasSubmenu && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              opacity: shrink ? 0 : 1,
              transform: `translateX(${shrink ? "200%" : "0"})`,
              transition: "transform 0.3s ease-in, opacity 0.1s",
            }}
          >
            {expanded && !shrink ? <ExpandLess /> : <ExpandMore />}
          </Box>
        )}
      </ListItemButton>
    </ListItem>
  );
};
