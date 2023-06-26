import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import CustomSwitch from "./customSwitch";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";

import { ThemeContext } from "../providers/DarkModeProvider";

const Navbar = () => {
  const { selectedTheme } = useContext(ThemeContext);

  return (
    <Stack sx={{ mb: 1 }}>
      <AppBar position="static" enableColorOnDark>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <img
                src={selectedTheme === "dark" ? "V-light.png" : "V-dark.png"}
                alt="V"
                style={{
                  width: "33px",
                  height: "32px",
                }}
              />
              <span
                style={{
                  fontFamily: "Roboto",
                  fontWeight: 400,
                  letterSpacing: ".1rem",
                  color: selectedTheme === "dark" ? "white" : "black",
                  textDecoration: "none",
                }}
              >
                iral Nation
              </span>
            </Box>
            <CustomSwitch />
          </Toolbar>
        </Container>
      </AppBar>
    </Stack>
  );
};

export default Navbar;
