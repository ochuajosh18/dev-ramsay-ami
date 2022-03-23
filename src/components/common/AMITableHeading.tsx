import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import AMITableCell from "./AMITableCell";
import AMITableSortLabel from "./AMITableSortLabel";

import { TableColumn, SortColumn } from "../../types/table-types";

interface AMITableHeadingProps {
  columns: TableColumn[];
  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
}

const AMITableHeading = ({
  columns,
  sortColumn,
  onSort,
}: AMITableHeadingProps) => {
  // create column head cell key
  function createColumnKey(column: TableColumn) {
    return `col-${column.id}`;
  }

  function handleSort(sortColumnProperty: string) {
    if (!sortColumnProperty) return;

    const isAsc =
      sortColumn.path === sortColumnProperty && sortColumn.order === "asc";
    const newSortColumn: SortColumn = {
      path: sortColumnProperty,
      order: isAsc ? "desc" : "asc",
    };

    onSort(newSortColumn);
  }

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <React.Fragment key={createColumnKey(column)}>
            {column.sortable ? (
              <AMITableCell
                sortDirection={
                  sortColumn.path === column.property ? sortColumn.order : false
                }
                sx={{ width: column.width ? column.width : "auto" }}
              >
                <AMITableSortLabel
                  active={sortColumn.path === column.id}
                  direction={
                    sortColumn.path === column.id ? sortColumn.order : "asc"
                  }
                  onClick={(e) => handleSort(column.id)}
                  sx={{ color: "white" }}
                >
                  {column.label}
                </AMITableSortLabel>
              </AMITableCell>
            ) : (
              <AMITableCell>{column.label}</AMITableCell>
            )}
          </React.Fragment>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default AMITableHeading;
