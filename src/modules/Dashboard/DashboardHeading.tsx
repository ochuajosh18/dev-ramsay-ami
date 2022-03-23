import React, { ReactNode } from "react";
import moment from "moment";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { getAuthUserName } from "../../store/auth/selectors";

type DashboardHeadingProps = {
  children?: ReactNode;
};

const DashboardHeading = ({ children }: DashboardHeadingProps): JSX.Element => {
  const dateToday = moment().format("MMMM D, YYYY - dddd");
  const userName = useSelector(getAuthUserName);
  return (
    <Box marginBottom={3} borderBottom='3px solid #ccc'>
      <Stack direction='row' alignItems='center'>
        <Stack>
          <Typography fontWeight={600} letterSpacing={1}>
            Welcome, {userName}
          </Typography>
          <Typography fontSize={13} fontWeight={400}>
            {dateToday}
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

export default DashboardHeading;
