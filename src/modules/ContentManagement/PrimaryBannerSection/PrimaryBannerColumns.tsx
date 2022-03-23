import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableColumn } from "../../../types/table-types";
import { SxProps } from "@mui/system";
import { PrimaryBanner } from "../../../types/banner-types";
import { formatDatePosted } from "../../../utils/helpers";

const titleButtonStyles: SxProps = {
  textTransform: "capitalize",
  color: "text.primary",
};

const bannerColumns: TableColumn[] = [
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
    content: (item: PrimaryBanner) => (
      <Button
        sx={titleButtonStyles}
        component={Link}
        to={`/content/primary-banner/${item.id}`}
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
    key: "primary-banner-actions",
    sortable: false,
    content: (item: PrimaryBanner) => (
      <ButtonGroup
        disableElevation
        variant='contained'
        aria-label='primary banner actions'
        sx={{ overflow: "hidden" }}
      >
        <Button
          sx={{
            paddingX: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          component={Link}
          to={`/content/primary-banner/edit/${item.id}`}
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
          to={`/content/primary-banner/delete/${item.id}`}
        >
          <DeleteIcon fontSize='small' />
        </Button>
      </ButtonGroup>
    ),
  },
];

export default bannerColumns;
