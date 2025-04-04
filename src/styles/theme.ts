import { DefaultTheme } from 'styled-components';

export const theme = {
  colors: {
    primary: '#00ff00',
    secondary: '#1a1a1a',
    background: '#1a1a1a',
    text: '#ffffff',
    terminal: '#00FF00',
    terminalBackground: '#1A1A1A',
  },
  fonts: {
    mono: 'Courier New, monospace',
    sans: "'Inter', sans-serif",
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
} as const;

export type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
} 