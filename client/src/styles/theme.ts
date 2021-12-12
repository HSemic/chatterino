import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    htmlFontSize: 10
  }
});

export default responsiveFontSizes(theme);
