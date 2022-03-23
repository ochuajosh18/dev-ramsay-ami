import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import {
  TableColumn,
  SortColumn,
  TableOwnProps,
} from "../../../types/table-types";
import AMITableHeading from "../../../components/common/AMITableHeading";
import AMITableBody from "../../../components/common/AMITableBody";
import topPostColumns from "./TopPostColumns";
import { selectModifiedTopPosts } from "../../../store/top-posts/selectors";
import { paginate, sort } from "../../../utils/helpers";

const TopPostsTable = ({
  rowsPerPage,
  searchKeyword,
}: TableOwnProps): JSX.Element => {
  const [page, setPage] = React.useState(0);
  const [sortColumn, setSortColumn] = useState<SortColumn>({
    path: "index",
    order: "asc",
  });

  const data = useSelector(selectModifiedTopPosts, shallowEqual);
  const columns = React.useMemo<TableColumn[]>(() => topPostColumns, []);

  // sort handler
  const handleRequestSort = (sortCol: SortColumn) => {
    if (!sortCol) return;
    setSortColumn({ ...sortCol });
  };

  // page change handler
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPage(0);
  };

  const filteredData = data.filter((d) =>
    d.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );
  const sortedData = sort(filteredData, sortColumn.path, sortColumn.order);
  const paginatedData = paginate(sortedData, page, rowsPerPage);

  return (
    <Paper elevation={0}>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ maxHeight: 300 }} // subject to change
      >
        <Table size='small' stickyHeader>
          <AMITableHeading
            columns={columns}
            sortColumn={sortColumn}
            onSort={handleRequestSort}
          />
          <AMITableBody data={paginatedData} columns={columns} />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component='div'
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TopPostsTable;
