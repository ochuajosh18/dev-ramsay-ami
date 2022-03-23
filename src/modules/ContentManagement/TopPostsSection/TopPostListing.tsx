import React, { useState } from "react";
import TopPostHeading from "./TopPostHeading";
import TopPostActionBar from "./TopPostActionBar";
import TopPostTable from "./TopPostTable";
import { useHistory, useRouteMatch, Route } from "react-router-dom";
import TopPostDetailModal from "./TopPostDetailModal";
import TopPostDeleteModal from "./TopPostDeleteModal";

const TopPostListing = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("");
  const history = useHistory();
  const { path } = useRouteMatch();

  const handleChangeRowsPerPage = (pageSize: number) => {
    setRowsPerPage(pageSize);
  };

  const handleAddTopPostClick = () => {
    history.push("/content/top-posts/create");
  };

  return (
    <React.Fragment>
      <TopPostHeading>
        <TopPostActionBar
          numOfEntries={rowsPerPage}
          onNumOfEntriesChange={handleChangeRowsPerPage}
          onAddTopPostClick={handleAddTopPostClick}
          searchKeyword={searchKeyword}
          onSearchKeywordChange={(value: string) => setSearchKeyword(value)}
        />
      </TopPostHeading>
      <TopPostTable searchKeyword={searchKeyword} rowsPerPage={rowsPerPage} />
      <Route path={`${path}/:postId`}>
        <TopPostDetailModal />
      </Route>
      <Route path={`${path}/delete/:postId`}>
        <TopPostDeleteModal />
      </Route>
    </React.Fragment>
  );
};

export default TopPostListing;
