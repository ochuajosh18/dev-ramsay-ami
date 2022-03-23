import React from "react";
import Stack from "@mui/material/Stack";
import PageSizeSelect from "../../../components/common/PageSizeSelect";
import SearchField from "../../../components/common/SearchField";
import AddButton from "../../../components/common/AddButton";

type LatestVideosActionsBarProps = {
  numOfEntries: number;
  onNumOfEntriesChange: (pageSize: number) => void;
  searchKeyword: string;
  onSearchKeywordChange: (value: string) => void;
  onAddVideoClick: () => void;
};

const LatestVideosActionsBar = ({
  numOfEntries,
  onNumOfEntriesChange,
  onAddVideoClick,
  searchKeyword,
  onSearchKeywordChange,
}: LatestVideosActionsBarProps): JSX.Element => {
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
          id='searchbox-latest-videos'
          placeholder='Search videos'
          searchKeyword={searchKeyword}
          onSearchKeywordChange={onSearchKeywordChange}
        />
        <AddButton onClick={onAddVideoClick} />
      </Stack>
    </Stack>
  );
};

export default LatestVideosActionsBar;
