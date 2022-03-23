import { styled } from "@mui/material/styles";

const ImagePreview = styled("img")(({ width = 400, height = 200, theme }) => ({
  objectFit: "contain",
  width,
  height,
  borderRadius: 1,
  border: "1px solid #ccc",
  bgcolor: "white",
}));

export default ImagePreview;
