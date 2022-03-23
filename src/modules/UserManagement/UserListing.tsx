import React, { useState } from "react";
import { useHistory, useRouteMatch, Route } from "react-router-dom";

import UserManagementHeading from "./UserManagementHeading";
import UserActionsBar from "./UserActionsBar";
import UsersTable from "./UsersTable";
import UserDeleteModal from "./UserDeleteModal";

const UserListing = (): JSX.Element => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("");
  const history = useHistory();
  const { path } = useRouteMatch();

  const handleChangeRowsPerPage = (pageSize: number) => {
    setRowsPerPage(pageSize);
  };

  const handleAddUserClick = () => {
    history.push("/users/create");
  };

  return (
    <React.Fragment>
      <UserManagementHeading>
        <UserActionsBar
          numOfEntries={rowsPerPage}
          onNumOfEntriesChange={handleChangeRowsPerPage}
          onAddUserClick={handleAddUserClick}
          searchKeyword={searchKeyword}
          onSearchKeywordChange={(value: string) => setSearchKeyword(value)}
        />
      </UserManagementHeading>
      <UsersTable searchKeyword={searchKeyword} rowsPerPage={rowsPerPage} />
      <Route path={`${path}/delete/:userId`}>
        <UserDeleteModal />
      </Route>
    </React.Fragment>
  );
};

export default UserListing;
