// React import
import ReactDOM from 'react-dom';

// Material-UI imports
import { ThemeProvider } from '@mui/material';

// App component import
import App from './App';

// Local font import
import '@fontsource/roboto';

// Styles imports
import './styles/styles.css';
import theme from './styles/theme';

// App render
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
