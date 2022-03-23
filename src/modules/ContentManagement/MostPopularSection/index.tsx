import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import MostPopularForm from "./MostPopularForm";
import MostPopularListing from "./MostPopularListing";
import MostPopularUpdateForm from "./MostPopularUpdateForm";

const MostPopularSection = () => {
  const { path } = useRouteMatch();
  
  return (
    <Switch>
      <Route path={`${path}/edit/:postId`}>
        <MostPopularUpdateForm />
      </Route>
      <Route path={`${path}/create`}>
        <MostPopularForm />
      </Route>
      <Route path={path}>
        <MostPopularListing />
      </Route>
    </Switch>
  );
};

export default MostPopularSection;
