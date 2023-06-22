import React, { useContext } from "react";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { FormControlLabel } from "@mui/material";
import { ThemeContext } from "../providers/DarkModeProvider";

const CustomSwitch = () => {
  // const [{toggleTheme}] = useDarkMode();
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <FormControlLabel
      control={
        <Stack direction="row" spacing={1} alignItems="center">
          <LightModeIcon />
          <Switch onChange={toggleTheme} />
          <DarkModeIcon />
        </Stack>
      }
    />
  );
};

export default CustomSwitch;
