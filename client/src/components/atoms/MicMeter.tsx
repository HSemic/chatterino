import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../providers/SocketContext/SocketContext';
import LinearProgress from '@mui/material/LinearProgress';
import { Mic } from '@mui/icons-material';

import AudioStreamMeter from 'audio-stream-meter';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  meterContainer: {
    position: 'absolute',
    width: '80%',
    padding: '1rem 2rem',
    bottom: '4rem',
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  meter: {
    height: '1rem !important',
    width: '90%'
  }
}));

interface MicVolumeMeterProps {
  className: string;
}

export const MicVolumeMeter = ({
  className
}: MicVolumeMeterProps): React.ReactElement => {
  const classes = useStyles();

  const { stream } = useContext(SocketContext);

  const [volume, setVolume] = useState(0);

  useEffect(() => {
    let isMounted = true;

    if (!isMounted) return;

    if (!stream) return;

    const audioContext = new AudioContext();

    const mediaStream = audioContext.createMediaStreamSource(
      stream as MediaStream
    );

    const meter = AudioStreamMeter.audioStreamProcessor(
      audioContext,
      function () {
        setVolume(meter.volume * 150);
      }
    );

    mediaStream.connect(meter);

    meter.close.bind(meter);

    return () => {
      isMounted = false;
    };
  }, [stream]);

  return (
    <div className={classes.meterContainer}>
      <Mic />
      <LinearProgress
        className={classes.meter}
        variant="determinate"
        value={volume}
      />
    </div>
  );
};

export default MicVolumeMeter;
