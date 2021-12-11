import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import Settings from './components/organisms/Settings';

const App = (): React.ReactElement => {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Settings />} />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <h1>This page does not exist</h1>
            </main>
          }
        />
      </Routes>
    </>
  );
};

export default App;
