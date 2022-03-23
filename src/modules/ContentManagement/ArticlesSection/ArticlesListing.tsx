import React, { useState } from "react";
import { useHistory, useRouteMatch, Route } from "react-router-dom";
import ArticleDeleteModal from "./ArticleDeleteModal";
import ArticleDetailModal from "./ArticleDetailModal";
import ArticlesActionsBar from "./ArticlesActionBar";
import ArticlesHeading from "./ArticlesHeading";
import ArticlesTable from "./ArticlesTable";

const ArticlesListing = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("");
  const history = useHistory();
  const { path } = useRouteMatch();

  const handleChangeRowsPerPage = (pageSize: number) => {
    setRowsPerPage(pageSize);
  };

  const handleAddArticleClick = () => {
    history.push("/content/articles/create");
  };

  return (
    <React.Fragment>
      <ArticlesHeading>
        <ArticlesActionsBar
          numOfEntries={rowsPerPage}
          onNumOfEntriesChange={handleChangeRowsPerPage}
          onAddArticleClick={handleAddArticleClick}
          searchKeyword={searchKeyword}
          onSearchKeywordChange={(value: string) => setSearchKeyword(value)}
        />
      </ArticlesHeading>
      <ArticlesTable rowsPerPage={rowsPerPage} searchKeyword={searchKeyword} />
      <Route path={`${path}/:articleId`}>
        <ArticleDetailModal />
      </Route>
      <Route path={`${path}/delete/:articleId`}>
        <ArticleDeleteModal />
      </Route>
    </React.Fragment>
  );
};

export default ArticlesListing;
