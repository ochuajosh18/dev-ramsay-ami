import React from "react";
import { Stack, Box } from "@mui/material";
import DashboardHeading from "./DashboardHeading";
import DashboardBox from "./DashboardBox";
import { useSelector } from "react-redux";
import { getUserCount } from "../../store/users/selectors";
import { getBannerCount } from "../../store/banner/selectors";
import { getTopPostCount } from "../../store/top-posts/selectors";
import { getArticleCount } from "../../store/articles/selectors";
import { getVideoCount } from "../../store/latest-videos/selectors";

interface DashboardPageProps {
  expanded?: boolean;
}

const DashboardPage = ({ expanded }: DashboardPageProps) => {
  const userCount = useSelector(getUserCount);
  const bannerCount = useSelector(getBannerCount);
  const topPostCount = useSelector(getTopPostCount);
  const articlecount = useSelector(getArticleCount);
  const videoCount = useSelector(getVideoCount);
  return (
    <Stack sx={{ width: "100%" }}>
      <Box
        padding={2}
        sx={{
          bgcolor: "#ECF0F4",
          flex: "1",
          maxHeight: "100%",
        }}
      >
        <DashboardHeading />
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          <DashboardBox
            type='users'
            count={userCount}
            label='Registered Users'
          />
          <DashboardBox
            type='banners'
            count={bannerCount}
            label='Images: Primary Banner'
          />
          <DashboardBox
            type='top-posts'
            count={topPostCount}
            label='Articles: Top Posts'
          />
          <DashboardBox
            type='most-popular'
            count={articlecount}
            label='Articles: List of Articles'
          />
          <DashboardBox
            type='latest-videos'
            count={videoCount}
            label='Videos: Latest Videos'
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default DashboardPage;
