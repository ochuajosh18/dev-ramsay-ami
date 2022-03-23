import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableColumn } from "../../../types/table-types";
import { MostPopular } from "../../../types/most-popular-types";
import { formatDatePosted } from "../../../utils/helpers";
import { SxProps } from "@mui/system";

const titleButtonStyles: SxProps = {
  textTransform: "capitalize",
  color: "text.primary",
};

const mostPopularColumns: TableColumn[] = [
  {
    id: "index",
    label: "No.",
    property: "index",
    sortable: true,
    width: 30,
  },
  {
    id: "title",
    label: "Title",
    key: "title",
    sortable: true,
    content: (item: MostPopular) => (
      <Button
        sx={titleButtonStyles}
        component={Link}
        to={`/content/most-popular/${item.id}`}
      >
        {item.title}
      </Button>
    ),
  },
  {
    id: "datePosted",
    label: "Date Posted",
    key: "datePosted",
    sortable: true,
    content: (item: MostPopular) => formatDatePosted(item.datePosted),
  },
  {
    id: "status",
    label: "Status",
    property: "status",
    sortable: true,
  },
  {
    id: "actions",
    label: "Actions",
    key: "most-popular-actions",
    sortable: false,
    content: (item: MostPopular) => (
      <ButtonGroup
        disableElevation
        variant='contained'
        aria-label='most popular actions'
        sx={{ overflow: "hidden" }}
      >
        <Button
          sx={{
            paddingX: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          component={Link}
          to={`/content/most-popular/edit/${item.id}`}
        >
          <EditIcon fontSize='small' />
        </Button>
        <Button
          color='error'
          sx={{
            paddingX: 0,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          component={Link}
          to={`/content/most-popular/delete/${item.id}`}
        >
          <DeleteIcon fontSize='small' />
        </Button>
      </ButtonGroup>
    ),
  },
];

export default mostPopularColumns;
