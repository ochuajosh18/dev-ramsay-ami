import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Main from "./Layout/Main";
import Sidebar from "./Layout/Sidebar";
import TopBar from "./Layout/TopBar";
import Stack from "@mui/material/Stack";
import UserManagementPage from "./UserManagement/UserManagementPage";
import ContentManagementPage from "./ContentManagement/ContentManagementPage";
import ProfileSection from "./Profile";
import Footer from "./Layout/Footer";
import DashboardPage from "./Dashboard/DashboardPage";
import AMILoadingIndicator from "../components/common/AMILoadingIndicator";
import { fetchAllResources } from "../store/system/actions";
import { getSystemLoadingState } from "../store/system/selectors";

const AMIContent = (): JSX.Element => {
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  const isSystemLoading = useSelector(getSystemLoadingState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllResources());
  }, [dispatch]);

  return (
    <React.Fragment>
      <AMILoadingIndicator show={isSystemLoading} />
      <Sidebar expanded={sidebarExpanded} />
      <Main expanded={sidebarExpanded}>
        <TopBar onMenuToggle={() => setSidebarExpanded((s) => !s)} />
        <Switch>
          <Route path='/' exact>
            <Stack alignItems='center' sx={{ marginTop: "64px" }}>
              <DashboardPage expanded={sidebarExpanded} />
            </Stack>
          </Route>
          <Route path='/users'>
            <UserManagementPage />
          </Route>
          <Route path='/content'>
            <ContentManagementPage />
          </Route>
          <Route path='/profile'>
            <ProfileSection />
          </Route>
        </Switch>
        <Footer />
      </Main>
    </React.Fragment>
  );
};

export default AMIContent;
