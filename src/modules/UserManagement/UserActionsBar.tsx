import React from "react";
import Stack from "@mui/material/Stack";
import PageSizeSelect from "../../components/common/PageSizeSelect";
import SearchField from "../../components/common/SearchField";
import AddButton from "../../components/common/AddButton";

type UserActionsBarProps = {
  numOfEntries: number;
  onNumOfEntriesChange: (pageSize: number) => void;
  searchKeyword: string;
  onSearchKeywordChange: (value: string) => void;
  onAddUserClick: () => void;
};

const UserActionsBar = ({
  numOfEntries,
  onNumOfEntriesChange,
  onAddUserClick,
  searchKeyword,
  onSearchKeywordChange,
}: UserActionsBarProps): JSX.Element => {
  return (
    <Stack direction='row' flex={1}>
      <Stack direction='row' alignItems='center' spacing={1}>
        <PageSizeSelect
          numOfEntries={numOfEntries}
          onNumOfEntriesChange={onNumOfEntriesChange}
        />
      </Stack>
      <Stack
        direction='row'
        alignItems='center'
        spacing={1}
        sx={{ marginLeft: "auto" }}
      >
        <SearchField
          id='searchbox-user'
          placeholder='Search user'
          searchKeyword={searchKeyword}
          onSearchKeywordChange={onSearchKeywordChange}
        />
        <AddButton onClick={onAddUserClick} />
      </Stack>
    </Stack>
  );
};

export default UserActionsBar;
