import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

const AMITableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default AMITableRow;
