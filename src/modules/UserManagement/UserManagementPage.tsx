import { Switch, Route, useRouteMatch } from "react-router-dom";
import UserPageContainer from "./UserPageContainer";
import UserForm from "./UserForm";
import UserListing from "./UserListing";
import { shallowEqual, useSelector } from "react-redux";
import { getSystemSnackbar } from "../../store/system/selectors";
import { isUsersLoading } from "../../store/users/selectors";
import AMILoadingIndicator from "../../components/common/AMILoadingIndicator";
import AMIAlert from "../../components/common/AMIAlert";

const UserManagementPage = (): JSX.Element => {
  const { path } = useRouteMatch();

  const isLoading = useSelector(isUsersLoading, shallowEqual);

  // watch for error or success message from SYSTEM SNACKBAR
  const snackbar = useSelector(getSystemSnackbar);

  // useEffect(() => {
  //   dispatch(getUsers());
  // }, [dispatch]);

  return (
    <UserPageContainer>
      <AMILoadingIndicator show={isLoading} />
      <Switch>
        <Route path={`${path}/edit/:userId`}>
          <UserForm />
        </Route>
        <Route path={`${path}/create`}>
          <UserForm />
        </Route>
        <Route path={path}>
          <UserListing />
        </Route>
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
    </UserPageContainer>
  );
};

export default UserManagementPage;
