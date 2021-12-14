import React, { useContext, useRef } from 'react';
import { Paper, Grid, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

import TextChatForm from './TextChatForm';
import { ChatMessage } from './ChatMessage';

import { v4 } from 'uuid';
import { SocketContext } from '../providers/SocketContext/SocketContext';

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    width: '100%',
    height: '99%',
    borderRadius: '10px !important'
  },
  padding: {
    padding: '1rem'
  },
  chatPaper: {
    height: '100%',
    maxWidth: '100%'
  },
  messages: {
    overflow: 'auto',
    maxHeight: '43rem',
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  },
  gridItem: {
    maxWidth: '100%'
  }
}));

interface TextChatProps {
  chatMessages: ChatMessageData[];
}

export const TextChat = ({
  chatMessages
}: TextChatProps): React.ReactElement => {
  const classes = useStyles();

  const messagesRef = useRef<HTMLDivElement>(null);

  const { sendMessage } = useContext(SocketContext);

  const onSendMessage = (message: string) => {
    if (message.length === 0) return;

    sendMessage(message);

    messagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Paper className={`${classes.chatContainer} ${classes.padding}`}>
      <Grid
        container
        direction="column"
        spacing={1}
        style={{ height: '100%' }}
        justifyContent={'space-evenly'}
      >
        <Grid item flexGrow={3} className={classes.gridItem}>
          <Paper
            className={`${classes.chatPaper} ${classes.padding} ${classes.messages}`}
            elevation={4}
          >
            <Box
              style={{
                width: '100%',
                height: '100%',
                overflow: 'auto',
                overflowWrap: 'break-word',
                padding: '2rem'
              }}
            >
              <Grid container spacing={2} direction="column">
                {chatMessages.map((message) => {
                  return <ChatMessage key={v4()} {...message} />;
                })}
                <Grid style={{ height: '1rem' }} item ref={messagesRef}></Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item flexGrow={0} className={classes.gridItem}>
          <Paper
            className={`${classes.chatPaper} ${classes.padding}`}
            elevation={4}
          >
            <TextChatForm onSendMessage={onSendMessage} />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};
