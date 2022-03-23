import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import AMIAlert from "../../../components/common/AMIAlert";
import AMILoadingIndicator from "../../../components/common/AMILoadingIndicator";
import { isArticlesLoading } from "../../../store/articles/selectors";
import { getSystemSnackbar } from "../../../store/system/selectors";
import ArticleForm from "./ArticleForm";
import ArticlesListing from "./ArticlesListing";
import ArticleUpdateForm from "./ArticleUpdateForm";

const ArticlesSection = () => {
  const { path } = useRouteMatch();
  const isLoading = useSelector(isArticlesLoading, shallowEqual);

  // watch for error or success message from SYSTEM SNACKBAR
  const snackbar = useSelector(getSystemSnackbar);

  // useEffect(() => {
  //   dispatch(getArticles());
  // }, [dispatch]);

  return (
    <React.Fragment>
      <AMILoadingIndicator show={isLoading} />
      <Switch>
        <Route path={`${path}/edit/:articleId`}>
          <ArticleUpdateForm />
        </Route>
        <Route path={`${path}/create`}>
          <ArticleForm />
        </Route>
        <Route path={path}>
          <ArticlesListing />
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

export default ArticlesSection;
