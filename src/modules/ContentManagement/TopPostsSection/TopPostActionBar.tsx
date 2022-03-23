import React from "react";
import Stack from "@mui/material/Stack";
import PageSizeSelect from "../../../components/common/PageSizeSelect";
import SearchField from "../../../components/common/SearchField";
import AddButton from "../../../components/common/AddButton";

type TopPostActionsBarProps = {
  numOfEntries: number;
  onNumOfEntriesChange: (pageSize: number) => void;
  searchKeyword: string;
  onSearchKeywordChange: (value: string) => void;
  onAddTopPostClick: () => void;
};

const TopPostActionBar = ({
  numOfEntries,
  onNumOfEntriesChange,
  onAddTopPostClick,
  searchKeyword,
  onSearchKeywordChange,
}: TopPostActionsBarProps): JSX.Element => {
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
          id='searchbox-top-post'
          placeholder='Search post'
          searchKeyword={searchKeyword}
          onSearchKeywordChange={onSearchKeywordChange}
        />
        <AddButton onClick={onAddTopPostClick} />
      </Stack>
    </Stack>
  );
};

export default TopPostActionBar;
