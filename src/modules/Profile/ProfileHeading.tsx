import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const ProfileHeading = () => {
  return (
    <Box marginBottom={3} paddingBottom={3} borderBottom='3px solid #ccc'>
      <Stack direction='row' alignItems='center'>
        <Typography fontWeight={600} letterSpacing={1}>
          Profile
        </Typography>
      </Stack>
    </Box>
  );
};

export default ProfileHeading;
