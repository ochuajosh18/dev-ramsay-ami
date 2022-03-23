import React from "react";
import { connect, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppState } from "./store";
import { SystemState } from "./store/system/types";
import AuthIndex from "./modules/Auth/AuthIndex";
import AMIContent from "./modules/AMIContent";
import ProtectedRoute from "./components/common/ProtectedRoute";

import { checkSession } from "./store/auth/actions";
interface AppProps {
  system: SystemState;
}

function App(props: AppProps): JSX.Element {
  const dispatch = useDispatch();
  React.useEffect(() => {
    checkSession(dispatch);
  }, [dispatch]);
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path='/auth'>
            <AuthIndex />
          </Route>
          <ProtectedRoute path='/' component={AMIContent} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}
export const mapStateToProps = (state: AppState) => ({
  system: state.system,
});

export default connect(mapStateToProps)(App);
