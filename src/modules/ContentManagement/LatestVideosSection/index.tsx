import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { getSystemSnackbar } from "../../../store/system/selectors";
import { isVideosLoading } from "../../../store/latest-videos/selectors";
import LatestVideosListing from "./LatestVideosListing";
import LatestVideoForm from "./LatestVideoForm";
import LatestVideoUpdateForm from "./LatestVideoUpdateForm";
import AMIAlert from "../../../components/common/AMIAlert";
import AMILoadingIndicator from "../../../components/common/AMILoadingIndicator";

const LatestVideosSection = () => {
  const { path } = useRouteMatch();
  const isLoading = useSelector(isVideosLoading, shallowEqual);

  // watch for error or success message from SYSTEM SNACKBAR
  const snackbar = useSelector(getSystemSnackbar);

  // useEffect(() => {
  //   dispatch(getVideos());
  // }, [dispatch]);

  return (
    <React.Fragment>
      <AMILoadingIndicator show={isLoading} />
      <Switch>
        <Route path={`${path}/edit/:videoId`}>
          <LatestVideoUpdateForm />
        </Route>
        <Route path={`${path}/create`}>
          <LatestVideoForm />
        </Route>
        <Route path={path}>
          <LatestVideosListing />
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

export default LatestVideosSection;
