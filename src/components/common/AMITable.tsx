import React, { ReactNode } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

type AMITableProps = {
  children: ReactNode;
};

const AMITable = ({ children }: AMITableProps): JSX.Element => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ height: 300 }} // subject to change
    >
      <Table size='small' stickyHeader>
        {children}
      </Table>
    </TableContainer>
  );
};

export default AMITable;
