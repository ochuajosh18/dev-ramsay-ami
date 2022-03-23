import React from "react";
import AMIContentPageContainer from "../../components/common/AMIContentPageContainer";
import ProfileHeading from "./ProfileHeading";
import ProfileTabs from "./ProfileTabs";

const ProfileSection = () => {
  return (
    <AMIContentPageContainer>
      <ProfileHeading />
      <ProfileTabs />
    </AMIContentPageContainer>
  );
};

export default ProfileSection;
