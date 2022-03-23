import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Label from "./Label";

type PageSizeSelectProps = {
  preLabel?: string;
  postLabel?: string;
  numOfEntries: number;
  onNumOfEntriesChange: (pageSize: number) => void;
  pageSizeArr?: number[];
};

const PageSizeSelect = ({
  pageSizeArr = [10, 20, 30],
  preLabel = "Show",
  postLabel = "entries",
  numOfEntries,
  onNumOfEntriesChange,
}: PageSizeSelectProps): JSX.Element => {
  const handleChange = (event: SelectChangeEvent) =>
    onNumOfEntriesChange(parseInt(event.target.value, 10));

  return (
    <React.Fragment>
      <Label>{preLabel}</Label>
      <Select
        sx={{ width: 80, bgcolor: "white" }}
        size='small'
        value={numOfEntries.toString()}
        onChange={handleChange}
        displayEmpty
      >
        {pageSizeArr.map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </Select>
      <Label>{postLabel}</Label>
    </React.Fragment>
  );
};

export default PageSizeSelect;
