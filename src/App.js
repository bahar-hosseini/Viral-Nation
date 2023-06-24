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
      <Paper
        elevation={0}
        square={false}
        sx={{
          width: "80vw",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          border: 0,
        }}
      >
        <Home />
      </Paper>
    </ThemeProvider>
  );
};

export default App;
