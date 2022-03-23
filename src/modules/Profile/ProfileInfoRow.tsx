import React from "react";
import TextField from "@mui/material/TextField";
import Label from "../../components/common/Label";

const offWhite = "#EAEAEA";

type ProfileInfoRowProps = {
  label: string;
  value: string;
};

const ProfileInfoRow = ({ label, value }: ProfileInfoRowProps): JSX.Element => {
  return (
    <React.Fragment>
      <Label>{label}</Label>
      <TextField
        disabled
        size='small'
        type='text'
        InputProps={{ sx: { bgcolor: offWhite } }}
        defaultValue={value}
      />
    </React.Fragment>
  );
};

export default ProfileInfoRow;
