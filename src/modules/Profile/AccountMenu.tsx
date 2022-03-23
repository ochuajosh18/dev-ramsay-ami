import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import AccountIcon from "@mui/icons-material/AccountCircle";
import DownIcon from "@mui/icons-material/KeyboardArrowDown";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import { SxProps } from "@mui/system";
import Logo from "../Layout/Logo";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../../store/auth/selectors";
import { AuthUser } from "../../store/auth/types";
import { formatDatePosted } from "../../utils/helpers";
import { setLogOutUser } from "../../store/auth/actions";
const darkBlueColor = "#0C2136";

const buttonStyles: SxProps = {
  color: darkBlueColor,
  fontWeight: "bold",
};

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const user = useSelector(getAuthUser);

  if (!user) return null;

  const { email, firstname, lastname, datePosted } = user as AuthUser;
  const userName = `${firstname} ${lastname}`;
  const memberSince = formatDatePosted(datePosted);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignOut = () => {
    dispatch(setLogOutUser());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Tooltip title='Account'>
        <Button
          sx={buttonStyles}
          startIcon={<AccountIcon />}
          endIcon={open ? <UpIcon /> : <DownIcon />}
          onClick={handleClick}
        >
          {userName}
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        elevation={1}
        PaperProps={{
          sx: { width: 265, bgcolor: darkBlueColor, paddingX: 3, paddingY: 2 },
        }}
      >
        <Stack alignItems='center'>
          <Logo sx={{ marginBottom: "20px" }} />
          <Typography color='white' fontWeight='bold'>
            {userName}
          </Typography>
          <Typography color='white' fontSize={12}>
            {email}
          </Typography>
          <Typography color='white' fontSize={12} mt={2}>
            Member since: {memberSince}
          </Typography>
          <Stack mt={2} direction='row' spacing={3}>
            <Button
              variant='contained'
              sx={{ fontWeight: "bold" }}
              component={Link}
              to='/profile'
            >
              Profile
            </Button>
            <Button
              color='secondary'
              variant='contained'
              sx={{ fontWeight: "bold", color: "white" }}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Stack>
        </Stack>
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;
