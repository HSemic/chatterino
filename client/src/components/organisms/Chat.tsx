import React, { useContext, useState } from 'react';
import { makeStyles } from '@mui/styles';

import { Box, Grid, Theme } from '@mui/material';

import { gridGap } from '../../styles/config';

import { SocketContext } from '../providers/SocketContext/SocketContext';
import Video from '../atoms/Video';

const useStyles = makeStyles((theme: Theme) => ({
  chatWrapper: {
    width: '90rem',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%'
    }
  },
  overflowHidden: {
    overflow: 'hidden'
  }
}));

export const Chat = (): React.ReactElement => {
  const classes = useStyles();

  const { myVideo, userVideo, testVideo } = useContext(SocketContext);

  return (
    <Box className={classes.chatWrapper}>
      <Grid container gap={3}>
        <Grid item className={classes.overflowHidden} xs={2} zeroMinWidth>
          <Grid container direction="column">
            <Grid item>
              <Video ref={myVideo} me={true} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.overflowHidden} xs={9} zeroMinWidth>
          <Grid container direction="column">
            <Grid item style={{ overflow: 'hidden "important' }}>
              <Video ref={testVideo} me={true} />
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
