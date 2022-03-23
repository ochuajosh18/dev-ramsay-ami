import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";

import MetropolisThin from "../assets/fonts/Metropolis-Thin.otf";
import MetropolisLight from "../assets/fonts/Metropolis-Light.otf";
import MetropolisRegular from "../assets/fonts/Metropolis-Regular.otf";
import MetropolisMedium from "../assets/fonts/Metropolis-Medium.otf";
import MetropolisSemiBold from "../assets/fonts/Metropolis-SemiBold.otf";
import MetropolisBold from "../assets/fonts/Metropolis-Bold.otf";
import MetropolisExtraBold from "../assets/fonts/Metropolis-ExtraBold.otf";

const theme = createTheme({
  typography: {
    fontFamily: ["metropolis", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#0F25CB", // previous value -> "#0C2136",
    },
    secondary: {
      main: "#9a9a9a",
    },
    success: {
      main: "#1CAF3C",
      dark: "#1E7E34",
    },
    info: {
      main: "#0C2136",
      light: "#3675B6",
    },
    error: {
      main: "#DE4C38",
    },
    text: {
      primary: "#222222",
      secondary: "#9a9a9a",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Metropolis';
          font-style: normal;
          font-display: swap;
          font-weight: 200;
          src: local('Metropolis'), local('Metropolis-Thin'), url(${MetropolisThin}) format('otf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
            font-family: 'Metropolis';
            font-style: normal;
            font-display: swap;
            font-weight: 300;
            src: local('Metropolis'), local('Metropolis-Light'), url(${MetropolisLight}) format('otf');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        @font-face {
          font-family: 'Metropolis';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Metropolis'), local('Metropolis-Regular'), url(${MetropolisRegular}) format('otf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
         @font-face {
          font-family: 'Metropolis';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: local('Metropolis'), local('Metropolis-Medium'), url(${MetropolisMedium}) format('otf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Metropolis';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: local('Metropolis'), local('Metropolis-SemiBold'), url(${MetropolisSemiBold}) format('otf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Metropolis';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: local('Metropolis'), local('Metropolis-Bold'), url(${MetropolisBold}) format('otf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Metropolis';
          font-style: normal;
          font-display: swap;
          font-weight: 800;
          src: local('Metropolis'), local('Metropolis-ExtraBold'), url(${MetropolisExtraBold}) format('otf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

export default function AppThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
