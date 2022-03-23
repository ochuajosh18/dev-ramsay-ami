import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

type SearchFieldProps = {
  searchKeyword: string;
  onSearchKeywordChange: (value: string) => void;
  placeholder?: string;
  id?: string;
};

const SearchField = ({
  searchKeyword,
  onSearchKeywordChange,
  placeholder = "Search",
  id,
}: SearchFieldProps): JSX.Element => {
  return (
    <TextField
      sx={{ bgcolor: "white", flex: 1, minWidth: "300px" }}
      size='small'
      type='search'
      id={id}
      placeholder={placeholder}
      value={searchKeyword}
      onChange={(e) => onSearchKeywordChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;
