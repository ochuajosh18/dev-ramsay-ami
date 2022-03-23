import React, { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";

import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import AMITable from "../../../components/common/AMITable";
import AMITableHeading from "../../../components/common/AMITableHeading";
import AMITableBody from "../../../components/common/AMITableBody";
import {
  TableColumn,
  SortColumn,
  TableOwnProps,
} from "../../../types/table-types";
import latestVideosColumns from "./LatestVideosColumns";
import { selectModifiedLatestVideos } from "../../../store/latest-videos/selectors";
import { paginate, sort } from "../../../utils/helpers";

const LatestVideosTable = ({ rowsPerPage, searchKeyword }: TableOwnProps) => {
  const [page, setPage] = React.useState(0);
  const [sortColumn, setSortColumn] = useState<SortColumn>({
    path: "index",
    order: "asc",
  });
  const data = useSelector(selectModifiedLatestVideos, shallowEqual);
  const columns = React.useMemo<TableColumn[]>(() => latestVideosColumns, []);
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
      <AMITable>
        <AMITableHeading
          columns={columns}
          sortColumn={sortColumn}
          onSort={handleRequestSort}
        />
        <AMITableBody data={paginatedData} columns={columns} />
      </AMITable>
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

export default LatestVideosTable;
