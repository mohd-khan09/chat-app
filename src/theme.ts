import { createTheme, rem } from '@mantine/core';
import { MantineTheme } from '@mantine/core';
export const theme = <MantineTheme>createTheme({
  colors: {
    // Add your color
    deepBlue: [
      '#E9EDFC',
      '#C1CCF6',
      '#99ABF0',
      '#color4',
      '#color5',
      '#color6',
      '#color7',
      '#color8',
      '#color9',
      '#color10' /* ... */,
    ],
    // or replace default theme color
    blue: [
      '#E9EDFC',
      '#C1CCF6',
      '#99ABF0',
      '#color4',
      '#color5',
      '#color6',
      '#color7',
      '#color8',
      '#color9',
      '#color10',
    ],
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },
});
