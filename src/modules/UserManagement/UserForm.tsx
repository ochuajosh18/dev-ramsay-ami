import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../../store/users/actions";
import { initialValues, UserFormInputs, userSchema } from "./userSchema";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { SxProps } from "@mui/system";
import { selectUserById, selectUserEmails } from "../../store/users/selectors";
import UserManagementHeading from "./UserManagementHeading";
import Label from "../../components/common/Label";
import AMIAlert from "../../components/common/AMIAlert";
import { getSystemSnackbar } from "../../store/system/selectors";
import { getAuthEmail } from "../../store/auth/selectors";

const textFieldStyle: SxProps = {
  bgcolor: "transparent",
  flexGrow: 1,
  width: 400,
};
const labelStyle: SxProps = {
  fontWeight: "bold",
  width: 110,
  textAlign: "right",
  alignSelf: "start",
  marginTop: "8px",
};

type UserParams = {
  userId: string;
};

const UserForm = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errorAlertShown, setErrorAlertShown] = useState(false);
  // watch for error or success message from SYSTEM SNACKBAR
  const snackbar = useSelector(getSystemSnackbar);
  const userEmails = useSelector(selectUserEmails);
  const authEmail = useSelector(getAuthEmail);

  // the id of the user to update
  const { userId } = useParams<UserParams>();
  // the user to update
  const userToUpdate = useSelector(selectUserById(userId));
  const userOrigEmail = userToUpdate?.email;
  // get form initialvalues
  const defaultValues: UserFormInputs = userToUpdate
    ? {
        firstname: userToUpdate.firstname,
        lastname: userToUpdate.lastname,
        email: userToUpdate.email,
      }
    : initialValues;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<UserFormInputs>({
    resolver: yupResolver(userSchema),
    defaultValues,
  });

  // FOR resetting the form after SUCCESS (for create only)
  useEffect(() => {
    if (userId) return;
    if (snackbar && snackbar.type === "success") {
      reset(); // reset the form
    }
  }, [reset, snackbar, userId]);

  const hasError = (inputName: keyof UserFormInputs) =>
    errors[inputName] ? true : false;
  const getError = (inputName: keyof UserFormInputs) =>
    errors[inputName]?.message;

  function handleCancel() {
    history.push("/users");
  }

  function onError(err: typeof errors) {
    setErrorAlertShown(true);
  }

  function onSubmit(values: UserFormInputs) {
    // check here if email is already in use
    const emailExists =
      userEmails.includes(values.email) && authEmail !== values.email;
    if (emailExists) {
      setError("email", { message: "The provided email is already in use." });
      return;
    }
    if (userId) {
      // this means the form is for updating, so
      const updatedUser = { id: userId, ...values };
      // redux dispatch
      dispatch(updateUser(userId, updatedUser, userOrigEmail));
    } else {
      dispatch(createUser(values));
    }
  }

  return (
    <React.Fragment>
      <UserManagementHeading>
        <Stack direction='row' ml='auto' spacing={2}>
          <Button
            onClick={handleSubmit(onSubmit, onError)}
            disableElevation
            variant='contained'
            color='primary'
            sx={{ color: "white", height: "100%" }}
          >
            Save
          </Button>
          <Button
            onClick={handleCancel}
            disableElevation
            variant='contained'
            color='secondary'
            sx={{
              color: "white",
              height: "100%",
              mr: 2,
            }}
          >
            Cancel
          </Button>
        </Stack>
      </UserManagementHeading>
      <Stack alignItems='center' spacing={3} component='form'>
        <Stack direction='row' alignItems='center' spacing={2} flexGrow={1}>
          <Label sx={labelStyle}>First Name</Label>
          <TextField
            sx={textFieldStyle}
            size='small'
            type='text'
            placeholder='First Name'
            InputProps={{ sx: { bgcolor: "white" } }}
            error={hasError("firstname")}
            helperText={getError("firstname")}
            {...register("firstname")}
          />
        </Stack>
        <Stack direction='row' alignItems='center' spacing={2} flexGrow={1}>
          <Label sx={labelStyle}>Last Name</Label>
          <TextField
            sx={textFieldStyle}
            size='small'
            type='text'
            placeholder='Last Name'
            InputProps={{ sx: { bgcolor: "white" } }}
            error={hasError("lastname")}
            helperText={getError("lastname")}
            {...register("lastname")}
          />
        </Stack>
        <Stack direction='row' alignItems='center' spacing={2} flexGrow={1}>
          <Label sx={labelStyle}>Email</Label>
          <TextField
            sx={textFieldStyle}
            size='small'
            type='email'
            placeholder='Email'
            InputProps={{ sx: { bgcolor: "white" } }}
            error={hasError("email")}
            helperText={getError("email")}
            {...register("email")}
          />
        </Stack>
      </Stack>
      <AMIAlert
        message='Please check required field(s)'
        open={errorAlertShown && !isValid}
        type='error'
        autoHideDuration={3000}
        onClose={() => setErrorAlertShown(false)}
      />
    </React.Fragment>
  );
};

export default UserForm;
