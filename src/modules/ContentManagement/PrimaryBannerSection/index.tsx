import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { isBannersLoading } from "../../../store/banner/selectors";
import { getSystemSnackbar } from "../../../store/system/selectors";
import PrimaryBannerListing from "./PrimaryBannerListing";
import PrimaryBannerForm from "./PrimaryBannerForm";
import PrimaryBannerUpdateForm from "./PrimaryBannerUpdateForm";
import AMILoadingIndicator from "../../../components/common/AMILoadingIndicator";
import AMIAlert from "../../../components/common/AMIAlert";

const PrimaryBannerSection = () => {
  const { path } = useRouteMatch();

  const isLoading = useSelector(isBannersLoading, shallowEqual);
  // watch for error or success message from SYSTEM SNACKBAR
  const snackbar = useSelector(getSystemSnackbar);

  // useEffect(() => {
  //   dispatch(getBanners());
  // }, [dispatch]);

  return (
    <React.Fragment>
      <AMILoadingIndicator show={isLoading} />
      <Switch>
        <Route path={`${path}/edit/:bannerId`}>
          <PrimaryBannerUpdateForm />
        </Route>
        <Route path={`${path}/create`}>
          <PrimaryBannerForm />
        </Route>
        <Route path={`${path}`}>
          <PrimaryBannerListing />
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

export default PrimaryBannerSection;
