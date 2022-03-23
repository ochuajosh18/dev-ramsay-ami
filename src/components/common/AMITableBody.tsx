import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import AMITableRow from "./AMITableRow";

import { TableColumn } from "../../types/table-types";
import Typography from "@mui/material/Typography";

interface AMITableBodyProps {
  data: any[];
  columns: TableColumn[];
}

const AMITableBody = ({ data, columns }: AMITableBodyProps) => {
  // create row cell key
  function createRowCellKey(rowItem: any, column: any) {
    return `${rowItem.id}-${column.id}`;
  }

  // cell content renderer
  function renderCellContent(rowItem: any, rowIndex: number, column: any) {
    if (column.content) return column.content(rowItem, rowIndex);
    return rowItem[column.property];
  }

  return (
    <TableBody>
      {data.length === 0 && (
        <AMITableRow>
          <TableCell
            colSpan={columns.length}
            sx={{
              bgcolor: "white",
              padding: "20px 10px",
              textAlign: "center",
            }}
          >
            <Typography color='GrayText'>No results found.</Typography>
          </TableCell>
        </AMITableRow>
      )}
      {data &&
        data.map((item, index) => (
          <AMITableRow key={item.id}>
            {columns.map((column) => (
              <TableCell align='center' key={createRowCellKey(item, column)}>
                {renderCellContent(item, index, column)}
              </TableCell>
            ))}
          </AMITableRow>
        ))}
    </TableBody>
  );
};

export default AMITableBody;
