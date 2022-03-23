import React from "react";
import { Stack, Typography } from "@mui/material";
import UserIcon from "@mui/icons-material/PersonAddAlt1";
import ImageIcon from "@mui/icons-material/Collections";
import ArticleIcon from "@mui/icons-material/Article";
import VideoIcon from "@mui/icons-material/Videocam";
import Arrow from "@mui/icons-material/ArrowRightAltRounded";
import { useHistory } from "react-router-dom";

type DashboardBoxProps = {
  count: number;
  label: string;
  type: "users" | "banners" | "top-posts" | "most-popular" | "latest-videos";
};

const colorMap = {
  users: { light: "#F39C12", dark: "#DA8C14" },
  banners: { light: "#DD4B39", dark: "#C74334" },
  "top-posts": { light: "#1C75BB", dark: "#316791" },
  "most-popular": { light: "#56B97C", dark: "#5E9F76" },
  "latest-videos": { light: "#9E5AD0", dark: "#8053A0" },
};

const iconMap = {
  users: UserIcon,
  banners: ImageIcon,
  "top-posts": ArticleIcon,
  "most-popular": ArticleIcon,
  "latest-videos": VideoIcon,
};

const pathMap = {
  users: "/users",
  banners: "/content/primary-banner",
  "top-posts": "/content/top-posts",
  "most-popular": "/content/articles",
  "latest-videos": "/content/latest-videos",
};

const DashboardBox = ({
  type,
  count,
  label,
}: DashboardBoxProps): JSX.Element => {
  const history = useHistory();

  function goToForgotPassword() {
    history.push(pathMap[type]);
  }

  const color = colorMap[type];
  const Icon = iconMap[type];

  return (
    <Stack
      height={180}
      sx={{
        boxShadow: 3,
        bgcolor: color.light,
        borderRadius: 1,
        color: "#ffffff",
      }}
    >
      <Stack
        mt='auto'
        spacing={2}
        padding={2}
        position='relative'
        sx={{
          "&:hover .dashboard-box-icon": {
            transform: "scale(1.1)",
            transition: "transform 0.3s",
          },
        }}
      >
        <Typography variant='h4' fontWeight='bold'>
          {count}
        </Typography>
        <Typography fontWeight='bold' sx={{ zIndex: 1 }}>
          {label}
        </Typography>
        <Icon
          className='dashboard-box-icon'
          sx={{
            position: "absolute",
            fontSize: 130,
            color: color.dark,
            top: "-20px",
            right: "8px",
            zIndex: 0,
            transition: "transform 0.3s",
          }}
        />
      </Stack>
      <Stack
        onClick={goToForgotPassword}
        mt='auto'
        direction='row'
        justifyContent='center'
        alignItems='center'
        bgcolor={color.dark}
        sx={{ paddingY: "8px", cursor: "pointer" }}
      >
        <Typography fontSize={15} fontWeight='bold'>
          View Info
        </Typography>
        <Arrow />
      </Stack>
    </Stack>
  );
};

export default DashboardBox;
