import React, { useState, useEffect, createContext } from "react";
import { darkTheme, lightTheme } from "../theme";

const ThemeContext = createContext();

const getActiveTheme = (themeMode) =>
  themeMode === "light" ? lightTheme : darkTheme;

const DarkModeProvider = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState(lightTheme);
  const [selectedTheme, setSelectedTheme] = useState("light");

  const toggleTheme = () => {
    const desiredTheme = selectedTheme === "light" ? "dark" : "light";
    setSelectedTheme(desiredTheme);
    setActiveTheme(desiredTheme === "light" ? lightTheme : darkTheme);
  };

  useEffect(() => {
    setActiveTheme(getActiveTheme(selectedTheme));
  }, [selectedTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, toggleTheme, selectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { DarkModeProvider, ThemeContext };
