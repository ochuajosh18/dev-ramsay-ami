import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import PersonIcon from "@mui/icons-material/Person";
import AuthBackground from "./AuthBackground";
import SuccessIcon from "../../assets/icons/SuccessIcon";
import useInterval from "../../hooks/useInterval";
import { useDispatch } from "react-redux";
import { sendPasswordResetLink } from "../../store/auth/actions";

type Inputs = {
  email: string;
};

const ForgotPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [submitCount, setSubmitCount] = useState<number>(0);
  const initialTime = 300; // 5min = 300sec
  const [timeRemainingToResend, setTimeRemainingToResend] =
    useState<number>(initialTime);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(
      yup.object({
        email: yup
          .string()
          .required("Email is required.")
          .trim()
          .email("Provide a valid email."),
      })
    ),
    defaultValues: { email: "" },
  });

  const isTimerRunning = isSuccess && timeRemainingToResend > 0 && timerRunning;
  const timeRemainingCallback = () => {
    if (!isSuccess || !timerRunning) return;
    if (timeRemainingToResend === 0) {
      setTimeRemainingToResend(initialTime);
      setTimerRunning(false);
      return;
    }
    setTimeRemainingToResend((val) => (val -= 1));
  };

  useInterval(timeRemainingCallback, 1000);

  const goToLogin = () => {
    history.push("/auth/login");
  };

  const onSubmit = (values: Inputs) => {
    // if good to go,
    // send reset password link to specified email (api call)
    const { email } = values;
    const callback = () => {
      // hide form, show success message
      setIsSuccess(true);
      // start the timer
      setTimerRunning(true);

      setSubmitCount((val) => (val = val + 1));
    };
    dispatch(sendPasswordResetLink(email, callback));
  };

  const renderForgotPasswordForm = () => {
    return (
      <Stack>
        <Typography fontSize={14}>
          Type your email below to receive a password reset link
        </Typography>
        <Typography
          fontSize={15}
          sx={{
            display: "flex",
            alignItems: "center",
            mt: "10px",
            mb: "5px",
          }}
        >
          <PersonIcon sx={{ mr: "3px" }} /> Email Address
        </Typography>
        <TextField
          {...register("email")}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          InputProps={{ sx: { bgcolor: "white" } }}
          type='email'
          size='small'
          placeholder='Enter your email'
        />
      </Stack>
    );
  };

  const renderSuccess = () => {
    return (
      <Stack alignItems='center' spacing={3}>
        <SuccessIcon sx={{ color: "#28a744", fontSize: "100px" }} />
        <Typography fontSize={12}>
          A password reset link has been sent to your email.
        </Typography>
        <Typography fontSize={12} width='90%' fontStyle='italic'>
          Click the link in the email to create a new password. If you did not
          receive an email within 5 minutes, click the resend button below.
        </Typography>
      </Stack>
    );
  };

  return (
    <AuthBackground>
      <Stack
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        spacing={4}
        sx={{
          borderRadius: 2,
          bgcolor: "#0c2136",
          color: "white",
          position: "absolute",
          top: "100px",
          right: "60px",
          padding: "36px 24px",
          width: "370px",
        }}
      >
        <Typography fontSize={24} fontWeight='bold'>
          Forgot Password?
        </Typography>
        {isSuccess ? renderSuccess() : renderForgotPasswordForm()}
        <Stack direction='row' spacing={2} height='42px'>
          <Button
            disableElevation
            variant='contained'
            type='submit'
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              flex: 1,
              ...(isTimerRunning && {
                pointerEvents: "none",
                color: "#ddd",
                bgcolor: "secondary.main",
              }),
            }}
          >
            {isTimerRunning
              ? `(${timeRemainingToResend}) Resend`
              : submitCount > 0
              ? "Resend"
              : "Send"}
          </Button>
          <Button
            disableElevation
            color='secondary'
            variant='contained'
            onClick={goToLogin}
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "white",
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </AuthBackground>
  );
};

export default ForgotPassword;
