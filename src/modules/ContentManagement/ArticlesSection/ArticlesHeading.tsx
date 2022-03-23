import React, { ReactNode } from "react";
import moment from "moment";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ContentIcon from "@mui/icons-material/AccountTree";

type ArticlesHeadingProps = {
  children?: ReactNode;
};

const ArticlesHeading = ({ children }: ArticlesHeadingProps): JSX.Element => {
  const dateToday = moment().format("MMMM D, YYYY - dddd");

  return (
    <Box marginBottom={3} borderBottom='3px solid #ccc'>
      <Stack direction='row' alignItems='center'>
        <Stack>
          <Typography fontWeight={600} letterSpacing={1}>
            Articles Section
          </Typography>
          <Typography fontSize={13} fontWeight={400}>
            {dateToday}
          </Typography>
        </Stack>
        <Stack direction='row' alignItems='end' spacing={1} ml='auto'>
          <ContentIcon />
          <Typography fontSize={13} fontWeight={400}>
            Content Management &gt; List of Articles
          </Typography>
        </Stack>
      </Stack>
      <Box
        marginTop={3}
        marginBottom={2}
        sx={{ display: "flex", alignItems: "center" }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ArticlesHeading;
