import { useContext } from "react";
import { ThemeProvider, Paper, CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import { Card } from "@material-ui/core";
import { ThemeContext } from "./providers/DarkModeProvider";

const App = () => {
  const { activeTheme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={activeTheme}>
      <Navbar />
      <CssBaseline />
      <Paper>
        <Home />
      </Paper>
    </ThemeProvider>
  );
};

export default App;
