import React, { useState } from "react";
import Box from "@mui/material/Box";
import AMITabs from "../../components/common/AMITabs";
import AMITabItem from "../../components/common/AMITabItem";
import AMITabPanel from "../../components/common/AMITabPanel";
import ProfileInfo from "./ProfileInfo";
import ProfileSettings from "./ProfileSettings";

const ProfileTabs = (): JSX.Element => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <AMITabs
          currentTabIndex={currentTabIndex}
          onTabIndexChange={setCurrentTabIndex}
          aria-label='profile tabs'
        >
          <AMITabItem
            label='Profile'
            id='profile-info-tab'
            aria-controls='profile-info-panel'
            index={0}
            currentTabIndex={currentTabIndex}
          />
          <AMITabItem
            label='Settings'
            id='profile-settings-tab'
            aria-controls='profile-settings-panel'
            index={1}
            currentTabIndex={currentTabIndex}
          />
        </AMITabs>
      </Box>
      <AMITabPanel index={0} currentTabIndex={currentTabIndex}>
        <ProfileInfo />
      </AMITabPanel>
      <AMITabPanel index={1} currentTabIndex={currentTabIndex}>
        <ProfileSettings/>
      </AMITabPanel>
    </Box>
  );
};

export default ProfileTabs;
