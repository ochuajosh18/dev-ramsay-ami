import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableColumn } from "../../../types/table-types";
import { SxProps } from "@mui/system";
import { TopPostTypes } from "../../../types/top-post-types";
import { formatDatePosted } from "../../../utils/helpers";

const titleButtonStyles: SxProps = {
  textTransform: "capitalize",
  color: "text.primary",
};

const topPostColumns: TableColumn[] = [
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
    property: "title",
    sortable: true,
    content: (item: TopPostTypes) => (
      <Button
        sx={titleButtonStyles}
        component={Link}
        to={`/content/top-posts/${item.id}`}
      >
        {item.title}
      </Button>
    ),
  },
  {
    id: "datePosted",
    label: "Date Posted",
    property: "datePosted",
    sortable: true,
    content: (item) => formatDatePosted(item.datePosted),
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
    key: "top-posts-actions",
    sortable: false,
    content: (item: TopPostTypes) => (
      <ButtonGroup
        disableElevation
        variant='contained'
        aria-label='top posts actions'
        sx={{ overflow: "hidden" }}
      >
        <Button
          sx={{
            paddingX: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          component={Link}
          to={`/content/top-posts/edit/${item.id}`}
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
          to={`/content/top-posts/delete/${item.id}`}
        >
          <DeleteIcon fontSize='small' />
        </Button>
      </ButtonGroup>
    ),
  },
];

export default topPostColumns;
