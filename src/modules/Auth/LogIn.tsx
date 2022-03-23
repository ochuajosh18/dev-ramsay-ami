import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CheckBox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Key from "@mui/icons-material/VpnKey";
import Box from "@mui/material/Box";
import logo from "../../assets/images/GOV LOGO.png";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import AuthBackground from "./AuthBackground";
import { useHistory, Redirect } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import PasswordField from "../../components/common/PasswordField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/actions";
import { getIsAuthenticated } from "../../store/auth/selectors";

type Inputs = {
  password: string;
  email: string;
  rememberMe: boolean;
};

const validationSchema = yup.object({
  email: yup
    .string()
    .required("This field is required.")
    .email("Provide a valid email."),
  password: yup.string().required("This field is required"),
});

function Login() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: { password: "", email: "", rememberMe: false },
  });
  const dispatch = useDispatch();
  const hasError = (inputName: keyof Inputs) =>
    errors[inputName] ? true : false;
  const getError = (inputName: keyof Inputs) => errors[inputName]?.message;

  const onSubmit = (values: Inputs) => {
    dispatch(login(values.email, values.password));
    // localStorage.setItem("isAuthenticated", "true");
    // goToDashboard();
  };

  const onError = (err: typeof errors) => {
    //console.log(err.password);
  };

  function goToForgotPassword() {
    history.push("/auth/forgot-password");
  }

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Stack height='100%' alignItems='center'>
      <AuthBackground>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit, onError)}
          sx={{
            position: "absolute",
            top: "100px",
            right: "60px",
            padding: "15px 24px",
            width: "370px",
            borderRadius: 2,
            bgcolor: "#0c2136",
            color: "#ffffff",
          }}
        >
          <Paper
            sx={{ py: "20px", width: "75%", mx: "auto ", bgcolor: "#0c2136" }}
            elevation={0}
          >
            <img style={{ width: "100%" }} src={logo} alt='Jonvic Remulla' />
          </Paper>

          <Stack spacing={2}>
            <Typography>
              <PersonIcon
                sx={{
                  position: "relative",
                  top: "5px",
                }}
              />{" "}
              Email Address
            </Typography>
            <TextField
              size='small'
              fullWidth
              id='email'
              sx={{ borderRadius: "3px" }}
              InputProps={{
                sx: { bgcolor: "white" },
              }}
              error={hasError("email")}
              helperText={getError("email")}
              {...register("email")}
            />

            <Typography>
              <Key
                sx={{
                  position: "relative",
                  top: "5px",
                }}
              />{" "}
              Password
            </Typography>
            <PasswordField
              fullWidth
              id='password'
              sx={{ marginBottom: "10px" }}
              error={hasError("password")}
              helperText={getError("password")}
              {...register("password")}
            />
          </Stack>

          <Stack sx={{ padding: "15px" }} spacing={3}>
            <Controller
              name='rememberMe'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <FormControlLabel
                  sx={{ width: "max-content", alignSelf: "center" }}
                  control={
                    <CheckBox
                      onChange={onChange}
                      ref={ref}
                      sx={{
                        fill: "#ffffff",
                        "&.Mui-checked": { color: "#ffffff" },
                      }}
                    />
                  }
                  label='Remember Me'
                  labelPlacement='end'
                />
              )}
            />
            <Button
              type='submit'
              disableElevation
              variant='contained'
              color='primary'
              fullWidth
              sx={{
                borderRadius: "3px",
                color: "white",
                width: "50%",
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>

            <Button
              disableElevation
              color='primary'
              fullWidth
              onClick={goToForgotPassword}
              sx={{
                borderRadius: "3px",
                color: "white",
                width: "100%",
                alignSelf: "center",
                textTransform: "none",
              }}
            >
              Forgot Password?
            </Button>
          </Stack>
        </Box>
      </AuthBackground>
    </Stack>
  );
}

export default Login;
