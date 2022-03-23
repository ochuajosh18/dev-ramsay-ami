import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type AMIContentFormProps = {
  children?: ReactNode;
};

/**
 * @description The grid box to align the fields horizontally. This is an optional child of AMIContentForm
 */
const AMIContentFormGridBox = ({ children }: AMIContentFormProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        gridTemplateColumns: "auto 550px",
      }}
    >
      {children}
    </Box>
  );
};

/**
 * @description The text field for AMI content form. This is an optional child of AMIContentForm
 */
const AMIContentFormTextField = React.forwardRef<
  HTMLInputElement,
  TextFieldProps
>((props, ref) => {
  return (
    <TextField
      ref={ref}
      sx={{ bgcolor: "transparent", width: 400, ...props.sx }}
      size='small'
      type='text'
      placeholder='Title'
      InputProps={{ sx: { bgcolor: "white" } }}
      {...props}
    />
  );
});

/**
 * @description The form to use inside content mngt modules
 */
const AMIContentForm = ({ children }: AMIContentFormProps) => {
  return (
    <Stack
      alignItems='center'
      spacing={3}
      component='form'
      sx={{
        paddingY: "10px",
        overflow: "auto",
        maxHeight: "calc(100% - 150px)",
      }}
    >
      {children}
    </Stack>
  );
};

/**
 * @description The grid box to align the fields horizontally. This is an optional child of AMIContentForm
 */
AMIContentForm.Grid = AMIContentFormGridBox;

/**
 * @description The text field for AMI content form. This is an optional child of AMIContentForm
 */
AMIContentForm.TextField = AMIContentFormTextField;
export default AMIContentForm;
