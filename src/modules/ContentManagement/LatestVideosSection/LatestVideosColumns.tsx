import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableColumn } from "../../../types/table-types";
import { LatestVideo } from "../../../types/latest-videos-types";
import { formatDatePosted } from "../../../utils/helpers";
import { SxProps } from "@mui/system";

const titleButtonStyles: SxProps = {
  textTransform: "capitalize",
  color: "text.primary",
};

const latestVideosColumns: TableColumn[] = [
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
    content: (item: LatestVideo) => (
      <Button
        sx={titleButtonStyles}
        component={Link}
        to={`/content/latest-videos/${item.id}`}
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
    content: (item: LatestVideo) => formatDatePosted(item.datePosted),
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
    key: "latest-videos-actions",
    sortable: false,
    content: (item: LatestVideo) => (
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
          to={`/content/latest-videos/edit/${item.id}`}
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
          to={`/content/latest-videos/delete/${item.id}`}
        >
          <DeleteIcon fontSize='small' />
        </Button>
      </ButtonGroup>
    ),
  },
];

export default latestVideosColumns;
