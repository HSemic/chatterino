import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import { Helmet } from 'react-helmet';

import Settings from './components/organisms/Settings';
import Chat from './components/organisms/Chat';

const App = (): React.ReactElement => {
  return (
    <>
      <Helmet>
        <title>Chatterino</title>
        <meta name="description" content="Web and text chat" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Helmet>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Settings />} />
        <Route path="/chat" element={<Chat />} />
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
