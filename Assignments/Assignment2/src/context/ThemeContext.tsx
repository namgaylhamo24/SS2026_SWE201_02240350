import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorValue } from 'react-native';

const light = {
  colors: {
    primary: '#5b8cff',
    background: '#f7f9ff',
    card: '#ffffff',
    text: '#122028',
    muted: '#6b7785'
  }
};

const dark = {
  colors: {
    primary: '#7aa7ff',
    background: '#0b1216',
    card: '#071018',
    text: '#e6f2ff',
    muted: '#9aa6b0'
  }
};

type Theme = typeof light;

type ThemeContextType = {
  theme: Theme;
  darkMode: boolean;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('APP_DARK_MODE');
        if (raw != null) setDarkMode(raw === 'true');
      } catch (e) {
        // ignore load errors
      }
    })();
  }, []);

  const toggle = () => {
    const next = !darkMode;
    setDarkMode(next);
    AsyncStorage.setItem('APP_DARK_MODE', next ? 'true' : 'false').catch(() => {});
  };

  const theme = useMemo(() => (darkMode ? dark : light), [darkMode]);

  return <ThemeContext.Provider value={{ theme, darkMode, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export default ThemeContext;
