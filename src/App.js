import { useContext } from "react";
import {
  ThemeProvider,
  Paper,
  CssBaseline,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Navbar from "./components/Navbar";
import HomeWeb from "./screens/web/HomeWeb";

import { ThemeContext } from "./providers/DarkModeProvider";
import HomeMobile from "./screens/mobile/HomeMobile";

const App = () => {
  const { activeTheme } = useContext(ThemeContext);

  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ThemeProvider theme={activeTheme}>
      <Navbar />
      <CssBaseline />

      {!match && <HomeWeb />}
      {match && <HomeMobile />}
    </ThemeProvider>
  );
};

export default App;
