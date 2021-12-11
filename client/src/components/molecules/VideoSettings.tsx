import React, { useContext } from 'react';
import { Theme, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SocketContext } from '../providers/SocketContext/SocketContext';

import MicVolumeMeter from '../atoms/MicVolumeMeter';

const useStyles = makeStyles((theme: Theme) => ({
  video: {
    width: '100%',
    transform: 'scaleX(-1)'
  },
  paperVideoContainer: {
    width: '100%',
    padding: '0',
    position: 'relative'
  },
  meter: {
    position: 'absolute',
    height: '1.5rem !important',
    width: '80%',
    bottom: '4rem'
  }
}));

export const VideoSettings = (): React.ReactElement => {
  const classes = useStyles();
  const { myVideo } = useContext(SocketContext);

  return (
    <Paper className={classes.paperVideoContainer}>
      <video
        playsInline
        muted
        ref={myVideo}
        autoPlay
        className={classes.video}
      />
      <MicVolumeMeter className={classes.meter} />
    </Paper>
  );
};

export default VideoSettings;
