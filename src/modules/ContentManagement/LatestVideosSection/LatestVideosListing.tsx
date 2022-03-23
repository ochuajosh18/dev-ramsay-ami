import React, { useState } from "react";
import { useHistory, useRouteMatch, Route } from "react-router-dom";
import LatestVideosTable from "./LatestVideosTable";
import LatestVideosHeading from "./LatestVideosHeading";
import LatestVideosActionsBar from "./LatestVideosActionBar";
import LatestVideoDetailModal from "./LatestVideoDetailModal";
import LatestVideoDeleteModal from "./LatestVideoDeleteModal";

const LatestVideosListing = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("");
  const history = useHistory();
  const { path } = useRouteMatch();

  const handleChangeRowsPerPage = (pageSize: number) => {
    setRowsPerPage(pageSize);
  };

  const handleAddVideoClick = () => {
    history.push("/content/latest-videos/create");
  };
  return (
    <React.Fragment>
      <LatestVideosHeading>
        <LatestVideosActionsBar
          numOfEntries={rowsPerPage}
          onNumOfEntriesChange={handleChangeRowsPerPage}
          onAddVideoClick={handleAddVideoClick}
          searchKeyword={searchKeyword}
          onSearchKeywordChange={(value: string) => setSearchKeyword(value)}
        />
      </LatestVideosHeading>
      <LatestVideosTable
        rowsPerPage={rowsPerPage}
        searchKeyword={searchKeyword}
      />
      <Route path={`${path}/delete/:videoId`}>
        <LatestVideoDeleteModal />
      </Route>
      <Route path={`${path}/:videoId`}>
        <LatestVideoDetailModal />
      </Route>
    </React.Fragment>
  );
};

export default LatestVideosListing;
