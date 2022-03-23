import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { getSystemSnackbar } from "../../../store/system/selectors";
import { isTopPostsLoading } from "../../../store/top-posts/selectors";
import TopPostListing from "./TopPostListing";
import TopPostForm from "./TopPostForm";
import TopPostUpdateForm from "./TopPostUpdateForm";
import AMILoadingIndicator from "../../../components/common/AMILoadingIndicator";
import AMIAlert from "../../../components/common/AMIAlert";

const TopPostsSection = () => {
  const { path } = useRouteMatch();
  const isLoading = useSelector(isTopPostsLoading, shallowEqual);

  // watch for error or success message from SYSTEM SNACKBAR
  const snackbar = useSelector(getSystemSnackbar);

  // useEffect(() => {
  //   dispatch(getTopPosts());
  // }, [dispatch]);

  return (
    <React.Fragment>
      <AMILoadingIndicator show={isLoading} />
      <Switch>
        <Route path={`${path}/edit/:topPostId`}>
          <TopPostUpdateForm />
        </Route>
        <Route path={`${path}/create`}>
          <TopPostForm />
        </Route>
        <Route path={`${path}`}>
          <TopPostListing />
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
    </React.Fragment>
  );
};

export default TopPostsSection;
