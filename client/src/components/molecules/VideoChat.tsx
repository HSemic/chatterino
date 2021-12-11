import React, { useContext } from 'react';
import { Theme, Grid, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SocketContext } from '../providers/SocketContext/SocketContext';

const useStyles = makeStyles((theme: Theme) => ({
  videoChat: {
    transition: 'all .5s',
    '&:hover': {
      border: '2px solid lightblue'
    }
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px'
  }
}));

export const VideoChat = (): React.ReactElement => {
  const classes = useStyles();
  const { myVideo, userVideo, name, callAccepted, callEnded, stream, call } =
    useContext(SocketContext);

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || 'Name'}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.videoChat}
            />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call?.name || 'Name'}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.videoChat}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoChat;
