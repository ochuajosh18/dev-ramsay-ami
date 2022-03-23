import React from "react";
import Stack from "@mui/material/Stack";
import PageSizeSelect from "../../../components/common/PageSizeSelect";
import SearchField from "../../../components/common/SearchField";
import AddButton from "../../../components/common/AddButton";

type PrimaryBannerActionsBarProps = {
  numOfEntries: number;
  onNumOfEntriesChange: (pageSize: number) => void;
  searchKeyword: string;
  onSearchKeywordChange: (value: string) => void;
  onAddBannerClick: () => void;
};

const PrimaryBannerActionBar = ({
  numOfEntries,
  onNumOfEntriesChange,
  onAddBannerClick,
  searchKeyword,
  onSearchKeywordChange,
}: PrimaryBannerActionsBarProps): JSX.Element => {
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
          id='searchbox-banner'
          placeholder='Search banner'
          searchKeyword={searchKeyword}
          onSearchKeywordChange={onSearchKeywordChange}
        />
        <AddButton onClick={onAddBannerClick} />
      </Stack>
    </Stack>
  );
};

export default PrimaryBannerActionBar;
