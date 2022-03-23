import React, { ReactNode } from "react";
import moment from "moment";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import UsersIcon from "../../assets/icons/UsersIcon";

type UserManagementHeadingProps = {
  children?: ReactNode;
};

const UserManagementHeading = ({
  children,
}: UserManagementHeadingProps): JSX.Element => {
  const dateToday = moment().format("MMMM D, YYYY - dddd");

  return (
    <Box marginBottom={3} borderBottom='3px solid #ccc'>
      <Stack direction='row' alignItems='center'>
        <Stack>
          <Typography fontWeight={600} letterSpacing={1}>
            User Management
          </Typography>
          <Typography fontSize={13} fontWeight={400}>
            {dateToday}
          </Typography>
        </Stack>
        <Stack direction='row' alignItems='end' spacing={1} ml='auto'>
          <UsersIcon />
          <Typography fontSize={13} fontWeight={400}>
            User Management
          </Typography>
        </Stack>
      </Stack>
      <Box
        marginTop={3}
        marginBottom={2}
        sx={{ display: "flex", alignItems: "center" }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default UserManagementHeading;
