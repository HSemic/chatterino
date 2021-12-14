import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Grid } from '@mui/material';

import { red, blue } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
  messageBot: {
    color: red[300]
  },
  messageUser: {
    color: blue[300]
  },
  messageGridItem: {
    width: '100%'
  }
}));

export const ChatMessage = ({
  name,
  message,
  who
}: ChatMessageData): React.ReactElement => {
  const classes = useStyles();

  return (
    <Grid item xs={12} flexGrow={1} className={classes.messageGridItem}>
      <Grid container direction="column">
        <Grid item>
          <Typography
            variant="body1"
            fontWeight={600}
            className={
              who === 'user'
                ? classes.messageUser
                : who === 'bot'
                ? classes.messageBot
                : ''
            }
          >
            {name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            style={{
              wordWrap: 'break-word',
              maxWidth: '45rem'
            }}
            variant="body2"
          >
            {message}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
