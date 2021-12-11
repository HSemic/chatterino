import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import ChatVideo from '../molecules/ChatVideo';
import { Theme } from '@mui/material';
import { ClassNames } from '@emotion/react';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  videoContainer: {
    width: '50%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      width: '80%'
    },
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  }
}));

export const Chat = () => {
  const classes = useStyles();

  const [userMaximized, setUserMaximized] = useState(true);

  return (
    <div className={classes.wrapper}>
      <div className={classes.videoContainer}>
        <ChatVideo user={true} maximized={userMaximized} />
        <ChatVideo user={false} maximized={!userMaximized} />
      </div>
    </div>
  );
};

export default Chat;
