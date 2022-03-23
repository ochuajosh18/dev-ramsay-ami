import React, { useState } from "react";
import { useHistory, useRouteMatch, Route } from "react-router-dom";

import MostPopularActionsBar from "./MostPopularActionBar";
import MostPopularHeading from "./MostPopularHeading";
import MostPopularTable from "./MostPopularTable";
import MostPopularDetailModal from "./MostPopularDetailModal";
import MostPopularDeleteModal from "./MostPopularDeleteModal";

const MostPopularListing = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("");
  const history = useHistory();
  const { path } = useRouteMatch();

  const handleChangeRowsPerPage = (pageSize: number) => {
    setRowsPerPage(pageSize);
  };

  const handleAddArticleClick = () => {
    history.push("/content/most-popular/create");
  };
  return (
    <React.Fragment>
      <MostPopularHeading>
        <MostPopularActionsBar
          numOfEntries={rowsPerPage}
          onNumOfEntriesChange={handleChangeRowsPerPage}
          onAddArticleClick={handleAddArticleClick}
          searchKeyword={searchKeyword}
          onSearchKeywordChange={(value: string) => setSearchKeyword(value)}
        />
      </MostPopularHeading>
      <MostPopularTable
        rowsPerPage={rowsPerPage}
        searchKeyword={searchKeyword}
      />
      <Route path={`${path}/delete/:postId`}>
        <MostPopularDeleteModal />
      </Route>
      <Route path={`${path}/:postId`}>
        <MostPopularDetailModal />
      </Route>
    </React.Fragment>
  );
};

export default MostPopularListing;
