import { useContext } from "react";
import {
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Navbar from "./components/Navbar";

import { ThemeContext } from "./providers/DarkModeProvider";
import HomeMobile from "./screens/mobile/HomeMobile";
import HomeWeb from "./screens/web/HomeWeb";

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
