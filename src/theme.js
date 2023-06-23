import { createTheme } from "@mui/material/styles";

// Dark Mode Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#404040",
      light: "#181A1C",
      dark: "#121212",
    },
    secondary: {
      main: "#3B94ED",
    },
    moreBtn: {
      main: "#121212",
    },
    background: {
      default: "#1E1E1E",
      paper: "#181A1C",
    },
  },
});

// Light Mode Theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FCFCFD",
      light: "#FCFCFD",
      dark: "#E0E0E0",
    },
    secondary: {
      main: "#3B94ED",
    },
    background: {
      default: "#ffffff",
      paper: "#F6F6F6",
    },
    moreBtn: {
      main: "#616161",
    },
  },
});

export { darkTheme, lightTheme };
