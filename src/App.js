import { useContext } from "react";
import { ThemeProvider, Paper } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import { Card } from "@material-ui/core";
import { ThemeContext } from "./providers/DarkModeProvider";

const App = () => {
  const { activeTheme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={activeTheme}>
      <Navbar />
      <Paper>
        <Home />
      </Paper>
    </ThemeProvider>
  );
};

export default App;
