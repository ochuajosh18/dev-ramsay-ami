import React, { useState } from "react";
import PrimaryBannerHeading from "./PrimaryBannerHeading";
import PrimaryBannerActionBar from "./PrimaryBannerActionBar";
import PrimaryBannerTable from "./PrimaryBannerTable";
import { useHistory, useRouteMatch, Route } from "react-router-dom";
import PrimaryBannerDetailModal from "./PrimaryBannerDetailModal";
import PrimaryBannerDeleteModal from "./PrimaryBannerDeleteModal";

const PrimaryBannerListing = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("");
  const history = useHistory();
  const { path } = useRouteMatch();

  const handleChangeRowsPerPage = (pageSize: number) => {
    setRowsPerPage(pageSize);
  };

  const handleAddBannerClick = () => {
    history.push("/content/primary-banner/create");
  };

  return (
    <React.Fragment>
      <PrimaryBannerHeading>
        <PrimaryBannerActionBar
          numOfEntries={rowsPerPage}
          onNumOfEntriesChange={handleChangeRowsPerPage}
          onAddBannerClick={handleAddBannerClick}
          searchKeyword={searchKeyword}
          onSearchKeywordChange={(value: string) => setSearchKeyword(value)}
        />
      </PrimaryBannerHeading>
      <PrimaryBannerTable
        searchKeyword={searchKeyword}
        rowsPerPage={rowsPerPage}
      />
      <Route path={`${path}/:bannerId`}>
        <PrimaryBannerDetailModal />
      </Route>
      <Route path={`${path}/delete/:bannerId`}>
        <PrimaryBannerDeleteModal />
      </Route>
    </React.Fragment>
  );
};

export default PrimaryBannerListing;
