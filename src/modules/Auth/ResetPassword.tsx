import React, { useState } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import AuthBackground from "./AuthBackground";
import Logo from "../Layout/Logo";
import { SxProps } from "@mui/system";
import PasswordField from "../../components/common/PasswordField";
import SuccessIcon from "../../assets/icons/SuccessIcon";
import { PasswordGuidelines } from "../../components/common/PasswordGuidelines";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../store/auth/actions";

const labelStyle: SxProps = {
  mt: "10px",
  mb: "5px",
  fontSize: "15px",
  color: "white",
};

type Inputs = {
  password: string;
  repeatPassword: string;
};

const validationSchema = yup.object({
  password: yup
    .string()
    .required("This field is required.")
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,36}$)/,
      "Must follow the guidelines on the right."
    ),
  repeatPassword: yup
    .string()
    .trim()
    .required("This field is required")
    .oneOf([yup.ref("password"), null], "Passwords do not match."),
});

type ResetPassParams = {
  token: string;
};

const ResetPassword = (): JSX.Element => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { token } = useParams<ResetPassParams>();
  const history = useHistory();
  const dispatch = useDispatch();

  // console.log(token);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: { password: "", repeatPassword: "" },
  });

  // if no token in the URL, redirect to login page
  if (!token) return <Redirect to='/auth/login' />;

  const onSubmit = (values: Inputs) => {
    const callback = () => setIsSuccess(true);
    const { password, repeatPassword } = values;
    dispatch(resetPassword(token, password, repeatPassword, callback));
  };

  const onError = (err: typeof errors) => {
    //console.log(err.password);
  };

  const hasError = (inputName: keyof Inputs) =>
    errors[inputName] ? true : false;
  const getError = (inputName: keyof Inputs) => errors[inputName]?.message;

  const withError = Object.keys(errors).length > 0 ? true : false || !isValid;

  const goToLogin = () => {
    history.push("/auth/login");
  };

  const renderForm = () => {
    return (
      <Stack direction='row' spacing={3}>
        <Stack>
          <InputLabel sx={labelStyle} htmlFor='password'>
            Password
          </InputLabel>
          <PasswordField
            id='password'
            sx={{ marginBottom: "10px", width: "300px" }}
            error={hasError("password")}
            helperText={getError("password")}
            {...register("password")}
          />
          <InputLabel sx={labelStyle} htmlFor='repeat-password'>
            Confirm Password
          </InputLabel>
          <PasswordField
            id='repeat-password'
            sx={{ marginBottom: "30px" }}
            error={hasError("repeatPassword")}
            helperText={getError("repeatPassword")}
            {...register("repeatPassword")}
          />
          <Button
            disableElevation
            variant='contained'
            type='submit'
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              width: "max-content",
              alignSelf: "center",
              ...(withError && {
                pointerEvents: "none",
                color: "#ddd",
                bgcolor: "secondary.main",
              }),
            }}
          >
            Change Password
          </Button>
        </Stack>
        <Stack
          flexWrap='nowrap'
          height='max-content'
          sx={{
            border: 1,
            borderRadius: 1,
            borderColor: "#ccc",
            padding: "16px",
            width: "400px",
            transform: "translateY(15px)",
          }}
        >
          <PasswordGuidelines hasLastGuideLine={false} />
        </Stack>
      </Stack>
    );
  };

  const renderSuccess = () => {
    return (
      <Stack alignItems='center'>
        <SuccessIcon sx={{ color: "#28a744", fontSize: "100px" }} />
        <Typography fontSize={14} mt='30px'>
          Password has been successfully changed.
        </Typography>
        <Button
          disableElevation
          variant='contained'
          onClick={goToLogin}
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            width: "max-content",
            alignSelf: "center",
            marginTop: "60px",
          }}
        >
          Go to Login
        </Button>
      </Stack>
    );
  };

  return (
    <AuthBackground>
      <Stack
        component='form'
        onSubmit={handleSubmit(onSubmit, onError)}
        sx={{
          borderRadius: 2,
          bgcolor: "#0c2136",
          color: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "36px 24px",
          minWidth: "772px",
        }}
      >
        <Typography
          fontSize={16}
          fontWeight='bold'
          sx={{ position: "absolute", top: "24px", left: "24px" }}
        >
          Reset Password
        </Typography>
        <Stack
          width='230px'
          height='70px'
          alignItems='center'
          alignSelf='center'
          marginBottom='50px'
        >
          <Logo />
        </Stack>
        {isSuccess ? renderSuccess() : renderForm()}
      </Stack>
    </AuthBackground>
  );
};

export default ResetPassword;
