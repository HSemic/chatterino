import React, { useContext } from 'react';
import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SocketContext } from '../providers/SocketContext/SocketContext';

const useStyles = makeStyles((theme: Theme) => ({
  chatVideo: {
    width: '100%',
    transform: 'scaleX(-1)',
    maxHeight: '100%'
  },
  chatVideoSmall: {
    zIndex: '20',
    '&:hover': {
      border: '2px solid lightblue',
      cursor: 'pointer'
    }
  },
  paperVideo: {
    position: 'relative',
    transition: 'all .2s',
    maxHeight: '80vh',
    padding: '0'
  },
  paperVideoSmall: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '25%'
  },
  paperVideoLarge: {
    width: '100%'
  },
  name: {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem'
  }
}));

interface ChatVideoProps {
  maximized: boolean;
  user: boolean;
  setUserMaximized: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatVideo = ({
  maximized,
  user,
  setUserMaximized
}: ChatVideoProps): React.ReactElement => {
  const classes = useStyles();
  const { myVideo, userVideo, name, call, stream } = useContext(SocketContext);

  if (user === false && myVideo.current)
    myVideo.current.srcObject = stream as MediaStream;

  const handleClick = () => {
    if (maximized === true) return;

    if (user === true) setUserMaximized(!maximized);

    if (user === false) setUserMaximized(maximized);

    console.log(maximized);
  };

  return (
    <div
      className={`${classes.paperVideo} ${
        maximized === true ? classes.paperVideoLarge : classes.paperVideoSmall
      }`}
    >
      <video
        playsInline
        muted={user === true ? false : true}
        ref={user === true ? userVideo : myVideo}
        autoPlay
        className={`${classes.chatVideo} ${
          maximized === false ? classes.chatVideoSmall : ''
        }`}
        onClick={handleClick}
      />
      <Typography
        className={classes.name}
        variant={`${maximized === true ? 'h3' : 'body1'}`}
      >
        {user === true ? call?.name : name}
      </Typography>
    </div>
  );
};

export default ChatVideo;
