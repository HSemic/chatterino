import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { SocketContext } from '../providers/SocketContext/SocketContext';

import Video from '../atoms/Video';
import MicMeter from '../atoms/MicMeter';

const useStyles = makeStyles(() => ({
  meter: {
    position: 'absolute',
    height: '1.5rem !important',
    width: '80%',
    bottom: '4rem'
  }
}));

export const VideoMic = (): React.ReactElement => {
  const classes = useStyles();
  const { testVideo } = useContext(SocketContext);

  return (
    <Video me={true} ref={testVideo}>
      <MicMeter className={classes.meter} />
    </Video>
  );
};

export default VideoMic;
