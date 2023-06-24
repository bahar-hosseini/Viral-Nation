import { createTheme } from "@mui/material/styles";

// Dark Mode Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#404040",
      light: "#212121",
      dark: "#121212",
    },
    secondary: {
      main: "#3B94ED",
    },
    moreBtn: {
      main: "#595959",
    },
    deleteBtn: {
      main: "#CC1016",
    },
    cancelBtn: {
      main: "#EEEEEE",
    },
    background: {
      default: "#1E1E1E",
      paper: "#181A1C",
    },
    typography: {
      fontFamily: "Roboto",
    },
  },
});

// Light Mode Theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FCFCFD",
      light: "#F6F6F6",
      dark: "#E0E0E0",
    },
    secondary: {
      main: "#3B94ED",
    },
    background: {
      default: "#F2F2F3",
      paper: "#F2F2F3",
    },
    moreBtn: {
      main: "#616161",
    },
    deleteBtn: {
      main: "#CC1016",
    },
    cancelBtn: {
      main: "#EEEEEE",
    },
    typography: {
      fontFamily: "Roboto",
      color: "#212121",
    },
  },
});

export { darkTheme, lightTheme };
