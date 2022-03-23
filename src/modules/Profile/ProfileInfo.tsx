import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProfileInfoRow from "./ProfileInfoRow";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../store/auth/selectors";
import { AuthUser } from "../../store/auth/types";
import { formatDatePosted } from "../../utils/helpers";

const gray = "#aaa";

const ProfileInfo = (): JSX.Element => {
  const user = useSelector(getAuthUser);
  const { email, firstname, lastname, datePosted } = user as AuthUser;
  const memberSince = formatDatePosted(datePosted);
  return (
    <Box
      sx={{
        padding: "20px 10px",
        display: "grid",
        gridTemplateColumns: "100px 420px",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <ProfileInfoRow label='First Name' value={firstname} />
      <ProfileInfoRow label='Last Name' value={lastname} />
      <ProfileInfoRow label='Email' value={email} />
      <Typography sx={{ gridColumn: "span 2", color: gray }} fontSize={11}>
        Member since {memberSince}
      </Typography>
    </Box>
  );
};

export default ProfileInfo;
