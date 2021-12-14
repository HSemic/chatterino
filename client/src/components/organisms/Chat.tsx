import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Box, Grid, Theme } from '@mui/material';

import { SocketContext } from '../providers/SocketContext/SocketContext';
import Video from '../atoms/Video';
import { TextChat } from '../molecules/TextChat';

const useStyles = makeStyles((theme: Theme) => ({
  chatWrapper: {
    width: '100rem',
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

  const { myVideo, userVideo, chatMessages } = useContext(SocketContext);

  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box className={classes.chatWrapper}>
      <Grid
        direction={matchesMD ? 'column' : 'row'}
        container
        spacing={2}
        columns={20}
      >
        <Grid item className={classes.overflowHidden} xs={8} zeroMinWidth>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Video ref={userVideo} me={false} />
            </Grid>
            <Grid item>{!matchesMD && <Video ref={myVideo} me={true} />}</Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.overflowHidden} xs={11} zeroMinWidth>
          <TextChat chatMessages={chatMessages} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
