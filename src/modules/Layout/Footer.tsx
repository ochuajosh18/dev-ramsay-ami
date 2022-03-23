import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Label from "../../components/common/Label";

const Footer = (): JSX.Element => {
  return (
    <Stack
      direction='row'
      alignItems='center'
      component='footer'
      paddingY={2}
      paddingX={4}
      spacing={1}
      mt='auto'
    >
      <Label fontWeight='600' fontSize={13}>
        Copyright &copy; {new Date().getFullYear()}
      </Label>
      <Typography sx={{ color: "#3D8DBC" }} fontWeight='600' fontSize={13}>
        Jonvic Remulla.
      </Typography>
      <Label fontSize={13}>All rights reserved.</Label>
    </Stack>
  );
};

export default Footer;
