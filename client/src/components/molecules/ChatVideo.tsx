import React from 'react';
import { Box, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Video from '../atoms/Video';

const useStyles = makeStyles((theme: Theme) => ({}));

const boxStyles = {
  display: 'inline-block',
  width: '100%',
  borderRadius: '10px'
};

interface ChatVideoProps {
  me: boolean;
}

export const ChatVideo = React.forwardRef(
  (
    { me }: ChatVideoProps,
    ref: React.ForwardedRef<HTMLVideoElement>
  ): React.ReactElement => {
    return (
      <Box sx={boxStyles}>
        <Video me={me} ref={ref} />
      </Box>
    );
  }
);

export default ChatVideo;
