import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import imagePlaceholder from "../../assets/images/image-placeholder.png";
import { Typography } from "@mui/material";

const ImageDefaultComponent = styled("img")(({ theme }) => ({
  objectFit: "cover",
}));

const ImageDefault = ({
  width = 400,
  height = 150,
  error = false,
  errorMessage = "",
  fullWidth = false,
}): JSX.Element => {
  return (
    <React.Fragment>
      <Box
        width={fullWidth ? "100%" : width}
        height={height}
        sx={{
          borderRadius: 1,
          border: "1px solid",
          borderColor: error ? "error.main" : "#ccc",
          bgcolor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ImageDefaultComponent
          src={imagePlaceholder}
          alt='media attachment placeholder'
        />
      </Box>
      <Typography
        component='p'
        fontSize={12}
        color='error.main'
        sx={{ margin: "4px 14px 0" }}
      >
        {errorMessage}
      </Typography>
    </React.Fragment>
  );
};

export default ImageDefault;
