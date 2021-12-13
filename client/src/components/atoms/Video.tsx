import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  video: {
    width: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    transform: 'scaleX(-1)',
    borderRadius: '10px'
  },
  videoContainer: {
    width: '100%',
    padding: '0',
    position: 'relative'
  }
}));

interface VideoProps {
  me: boolean;
  children?: JSX.Element;
}

export const Video = React.forwardRef(
  (
    { me, children }: VideoProps,
    ref: React.ForwardedRef<HTMLVideoElement>
  ): React.ReactElement => {
    const classes = useStyles();

    return (
      <div className={classes.videoContainer}>
        <video
          className={classes.video}
          playsInline
          muted={me}
          ref={ref}
          autoPlay
        />
        {children}
      </div>
    );
  }
);

export default Video;
