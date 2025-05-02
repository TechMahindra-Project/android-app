// src/context/ThemeContext.js
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode
      ? {
          background: '#121212',
          text: '#ffffff',
          card: '#1e1e1e',
          border: '#333333',
          tabBar: '#222222',
        }
      : {
        background: '#f8f9fa',
        text: '#212529',
        secondaryText: '#6c757d',
        card: '#ffffff',
        border: '#e9ecef',
        tabBar: '#f8f9fa',
        icon: '#495057',
        placeholder: '#adb5bd',
        },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};