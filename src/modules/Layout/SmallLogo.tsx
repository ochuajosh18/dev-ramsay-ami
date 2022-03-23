import { styled } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import logo from "../../assets/images/logo_small.png";

const StyledImageForLogo = styled("img")(({ theme }) => ({
  width: "70%",
  objectFit: "cover",
  backfaceVisibility: "hidden",
  transform: "translateZ(0)",
  imageRendering: "-webkit-optimize-contrast",
  verticalAlign: "middle",
}));

type LogoProps = {
  sx?: SxProps;
};

const SmallLogo = ({ sx }: LogoProps): JSX.Element => {
  return <StyledImageForLogo sx={sx} src={logo} alt='Jonvic Remulla Logo' />;
};

export default SmallLogo;
