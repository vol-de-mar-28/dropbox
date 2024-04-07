import { theme } from '@chakra-ui/react';

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'Georgia, serif',
    mono: 'Menlo, monospace',
  },
  colors: {
    ...theme.colors,
    sidebarBg: '#242321',
    sidebarActiveItem: '#2d2b29',
    dashboardBg: '#191918',
    itemBg: '#242321',
    fontColor: '#fff',
    buttonBg: '#3180ff',
    black: '#000',
  },
};

export default customTheme;
