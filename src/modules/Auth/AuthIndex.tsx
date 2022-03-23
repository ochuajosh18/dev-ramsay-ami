import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./LogIn";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import { useSelector } from "react-redux";
import { getIsAuthLoading } from "../../store/auth/selectors";
import AMILoadingIndicator from "../../components/common/AMILoadingIndicator";
import AMIAlert from "../../components/common/AMIAlert";
import { getSystemSnackbar } from "../../store/system/selectors";

function AuthIndex() {
  const isAuthLoading = useSelector(getIsAuthLoading);
  const snackbar = useSelector(getSystemSnackbar);

  return (
    <React.Fragment>
      <AMILoadingIndicator show={isAuthLoading} />
      <Switch>
        <Route path='/auth/login'>
          <Login />
        </Route>
        <Route path='/auth/forgot-password'>
          <ForgotPassword />
        </Route>
        <Route path='/auth/reset-password/:token'>
          <ResetPassword />
        </Route>
        <Redirect from='/auth' to='/auth/login' />
      </Switch>
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
}

export default AuthIndex;
