// React import
import ReactDOM from 'react-dom';

// React-Router import
import { BrowserRouter } from 'react-router-dom';

// Material-UI imports
import { ThemeProvider } from '@mui/material';

// App component import
import App from './App';
import { ContextProvider } from './components/providers/SocketContext/SocketContext';

// Local font import
import '@fontsource/roboto';

// Styles imports
import './styles/styles.css';
import theme from './styles/theme';

// App render
ReactDOM.render(
  <BrowserRouter>
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
