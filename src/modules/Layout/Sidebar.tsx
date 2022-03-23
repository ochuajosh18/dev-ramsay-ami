import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import Logo from "./Logo";

// temporary icons, will change
import DashboardIcon from "@mui/icons-material/Dashboard";
import UsersIcon from "../../assets/icons/UsersIcon";
import ContentIcon from "@mui/icons-material/AccountTree";
import SidebarMenuItem from "./SidebarMenuItem";
import SidebarSubMenuItem from "./SidebarSubMenuItem";
import { SidebarPlainMenuItem } from "./SidebarPlainMenuItem";
import { drawerWidth } from "./constants";
import SmallLogo from "./SmallLogo";

const menu = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { label: "User Management", icon: <UsersIcon />, path: "/users" },
];
const content = {
  label: "Content Management",
  icon: <ContentIcon />,
  path: "/content",
  hasSubmenu: true,
};
const contentSubMenu = [
  {
    label: "Primary Banner Section",
    path: "/content/primary-banner",
  },
  {
    label: "Top Posts Section",
    path: "/content/top-posts",
  },
  {
    label: "List of Articles",
    path: "/content/articles",
  },
  // {
  //   label: "Most Popular Section",
  //   path: "/content/most-popular",
  // },
  {
    label: "Latest Videos Section",
    path: "/content/latest-videos",
  },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  backgroundColor: "#0C2136",
  height: 64,
}));

interface ISidebarProps {
  expanded?: boolean;
}

const Sidebar = ({ expanded = true }: ISidebarProps): JSX.Element => {
  const [contentToggled, setContentToggled] = useState<boolean>(false);
  const [contentActive, setContentActive] = useState<boolean>(false);
  const { pathname } = useLocation();
  const history = useHistory();

  const sidebarWidth = expanded ? drawerWidth.expanded : drawerWidth.small;

  useEffect(() => {
    if (pathname.includes("/content")) setContentActive(true);
    else setContentActive(false);
  }, [pathname]);

  function handleContentMenuClick() {
    setContentToggled((t) => !t);
    if (pathname.includes("/content")) return;
    history.push("/content");
  }

  return (
    <Drawer
      variant='persistent'
      anchor='left'
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "#222D31",
        width: sidebarWidth,
        transition: "width 0.3s",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          boxSizing: "border-box",
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
      open
    >
      <DrawerHeader>{expanded ? <Logo /> : <SmallLogo />}</DrawerHeader>
      <List
        component='nav'
        sx={{ bgcolor: "#222D31", color: "white", flex: 1 }}
      >
        {menu.map((item) => (
          <SidebarMenuItem
            menuItem={item}
            key={item.label}
            shrink={!expanded}
          />
        ))}
        <SidebarPlainMenuItem
          active={contentActive}
          menuItem={content}
          expanded={contentToggled}
          onClick={handleContentMenuClick}
          shrink={!expanded}
        />
        {expanded && (
          <Collapse in={contentToggled} timeout='auto'>
            <List
              component='nav'
              sx={{ bgcolor: "#222D31", color: "white", flex: 1 }}
            >
              {contentSubMenu.map((item) => (
                <SidebarSubMenuItem menuItem={item} key={item.label} />
              ))}
            </List>
          </Collapse>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
