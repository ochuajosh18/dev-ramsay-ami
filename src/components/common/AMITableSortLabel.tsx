import TableSortLabel, {
  tableSortLabelClasses,
} from "@mui/material/TableSortLabel";
import { styled } from "@mui/material/styles";

const AMITableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  [`&.${tableSortLabelClasses.root}`]: {
    marginLeft: "20px",
  },
  [`&.${tableSortLabelClasses.active}`]: {
    color: theme.palette.common.white,
  },
}));

export default AMITableSortLabel;
