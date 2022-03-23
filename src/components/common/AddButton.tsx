import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import Pluscon from "../../assets/icons/PlusIcon";

type AddButtonProps = {
  onClick?: () => void;
};

const AddButton = ({
  onClick,
  ...props
}: AddButtonProps & ButtonProps): JSX.Element => {
  return (
    <Button
      {...props}
      onClick={onClick}
      disableElevation
      variant='contained'
      color='primary'
      sx={{
        color: "white",
        height: "100%",
        ml: 2,
        paddingX: 0,
        minWidth: "40px",
        ...props.sx,
      }}
    >
      <Pluscon />
    </Button>
  );
};

export default AddButton;
