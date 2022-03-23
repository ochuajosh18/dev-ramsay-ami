import React from "react";
import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import ArticlesSection from "./ArticlesSection";
import ContentPageContainer from "./ContentPageContainer";
import LatestVideosSection from "./LatestVideosSection";
import PrimaryBannerSection from "./PrimaryBannerSection";
import TopPostsSection from "./TopPostsSection";

const ContentManagementPage = () => {
  const { path } = useRouteMatch();

  return (
    <ContentPageContainer>
      <Switch>
        <Route path={`${path}/latest-videos`}>
          <LatestVideosSection />
        </Route>
        <Route path={`${path}/primary-banner`}>
          <PrimaryBannerSection />
        </Route>
        <Route path={`${path}/top-posts`}>
          <TopPostsSection />
        </Route>
        <Route path={`${path}/articles`}>
          <ArticlesSection />
        </Route>
        <Redirect from={path} to={`${path}/primary-banner`} />
      </Switch>
    </ContentPageContainer>
  );
};

export default ContentManagementPage;
