import React, { createContext, useContext, useMemo, useState } from 'react';
import { themes, THEME_IDS } from './themes';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(THEME_IDS.DEFAULT);

  const value = useMemo(
    () => ({
      theme: themes[themeId],
      themeId,
      setThemeId,
      resetTheme: () => setThemeId(THEME_IDS.DEFAULT),
    }),
    [themeId]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used within a ThemeProvider');
  return ctx;
}
