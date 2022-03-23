import React from "react";
import { Button, Grid, Stack, TextField } from "@mui/material";
import {
  PasswordGuidelines,
  PasswordNameValidation,
} from "../../components/common/PasswordGuidelines";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Label from "../../components/common/Label";
import {
  getAuthEmail,
  getAuthFirstName,
  getAuthLastName,
  getIsAuthLoading,
} from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../store/auth/actions";
import { getSystemSnackbar } from "../../store/system/selectors";
import AMIAlert from "../../components/common/AMIAlert";
import AMILoadingIndicator from "../../components/common/AMILoadingIndicator";

type Inputs = {
  password: string;
  repeatPassword: string;
  oldPassword: string;
};

const validationSchema = yup.object({
  password: yup
    .string()
    .required("This field is required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,36}$)/,
      "Must follow the guidelines on the right."
    ),
  repeatPassword: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password"), null], "Passwords do not match."),
  oldPassword: yup.string().required("This field is required"),
});

const ProfileSettings = (): JSX.Element => {
  const email = useSelector(getAuthEmail) as string;
  const firstName = useSelector(getAuthFirstName) as string;
  const lastName = useSelector(getAuthLastName) as string;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: { password: "", repeatPassword: "", oldPassword: "" },
  });

  const snackbar = useSelector(getSystemSnackbar);
  const isLoading = useSelector(getIsAuthLoading);

  const hasError = (inputName: keyof Inputs) =>
    errors[inputName] ? true : false;
  const getError = (inputName: keyof Inputs) => errors[inputName]?.message;

  const onSubmit = (values: Inputs) => {
    const { password, repeatPassword, oldPassword } = values;
    if (
      PasswordNameValidation(firstName, password) &&
      PasswordNameValidation(lastName, password)
    ) {
      setError("password", {
        message: "Passwords must NOT include the user’s first OR last name.",
      });
    } else {
      dispatch(changePassword(email, password, repeatPassword, oldPassword));
      reset();
    }
  };

  const onError = (err: typeof errors) => {
    //console.log(err.password);
  };

  const history = useHistory();
  function goToDashboard() {
    history.push("/");
  }
  return (
    <React.Fragment>
      <AMILoadingIndicator show={isLoading} />
      <Grid sx={{ padding: "20px 10px" }} container spacing={2.5}>
        <Grid item xs={7}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <Grid container alignItems='center'>
                <Grid item xs={4}>
                  <Label>Old Password</Label>
                </Grid>
                <Grid item xs>
                  <TextField
                    id='oldPassword'
                    type='password'
                    fullWidth
                    size='small'
                    InputProps={{ sx: { bgcolor: "#FFFFFF" } }}
                    error={hasError("oldPassword")}
                    helperText={getError("oldPassword")}
                    {...register("oldPassword")}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems='center'>
                <Grid item xs={4}>
                  <Label>New Password</Label>
                </Grid>
                <Grid item xs>
                  <TextField
                    id='password'
                    type='password'
                    fullWidth
                    size='small'
                    InputProps={{ sx: { bgcolor: "#FFFFFF" } }}
                    error={hasError("password")}
                    helperText={getError("password")}
                    {...register("password")}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems='center'>
                <Grid item xs={4}>
                  <Label>Confirm Password</Label>
                </Grid>
                <Grid item xs>
                  <TextField
                    id='confirm-password'
                    type='password'
                    fullWidth
                    size='small'
                    InputProps={{ sx: { bgcolor: "#FFFFFF" } }}
                    error={hasError("repeatPassword")}
                    helperText={getError("repeatPassword")}
                    {...register("repeatPassword")}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            sx={{ pt: "25px" }}
            container
            direction='row'
            justifyContent='flex-end'
            spacing={2}
          >
            <Grid item>
              <Button
                variant='contained'
                sx={{ fontWeight: "bold", color: "white" }}
                onClick={handleSubmit(onSubmit, onError)}
              >
                {" "}
                Save{" "}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='secondary'
                sx={{ fontWeight: "bold", color: "white" }}
                onClick={goToDashboard}
              >
                {" "}
                Cancel{" "}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Stack
            height='max-content'
            sx={{
              border: 1,
              borderRadius: 1,
              borderColor: "#ccc",
              padding: "16px",
            }}
          >
            <PasswordGuidelines />
          </Stack>
        </Grid>
      </Grid>
      {snackbar && (
        <AMIAlert
          message={snackbar?.message as string}
          open={snackbar?.open}
          type={snackbar?.type}
          autoHideDuration={3000}
          onClose={() => {}}
        />
      )}
    </React.Fragment>
  );
};

export default ProfileSettings;
