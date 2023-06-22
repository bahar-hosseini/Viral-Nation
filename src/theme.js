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
      dark: "#F6F6F6",
    },
    secondary: {
      main: "#2196f3",
    },
    background: {
      default: "#ffffff",
      paper: "#F6F6F6",
    },
  },
});

export { darkTheme, lightTheme };
