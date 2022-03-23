import React from "react";
import Stack from "@mui/material/Stack";
import PageSizeSelect from "../../../components/common/PageSizeSelect";
import SearchField from "../../../components/common/SearchField";
import AddButton from "../../../components/common/AddButton";

type MostPopularActionsBarProps = {
  numOfEntries: number;
  onNumOfEntriesChange: (pageSize: number) => void;
  searchKeyword: string;
  onSearchKeywordChange: (value: string) => void;
  onAddArticleClick: () => void;
};

const MostPopularActionsBar = ({
  numOfEntries,
  onNumOfEntriesChange,
  onAddArticleClick,
  searchKeyword,
  onSearchKeywordChange,
}: MostPopularActionsBarProps): JSX.Element => {
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
          id='searchbox-most-popular'
          placeholder='Search article'
          searchKeyword={searchKeyword}
          onSearchKeywordChange={onSearchKeywordChange}
        />
        <AddButton onClick={onAddArticleClick} />
      </Stack>
    </Stack>
  );
};

export default MostPopularActionsBar;
