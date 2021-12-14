import React, { useContext, useState } from 'react';
import { TextField, Button, Grid, Theme } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { makeStyles } from '@mui/styles';
import { PhoneDisabled } from '@mui/icons-material';
import { SocketContext } from '../providers/SocketContext/SocketContext';

const useStyles = makeStyles((theme: Theme) => ({
  chatForm: {
    width: '100%',
    height: '100%'
  },
  textField: {
    width: '100%'
  },
  formButton: {
    width: '100%'
  }
}));

interface TextChatFormProps {
  onSendMessage: (message: string) => void;
}

export const TextChatForm = ({
  onSendMessage
}: TextChatFormProps): React.ReactElement => {
  const classes = useStyles();

  const [message, setMessage] = useState('');

  const { leaveCall } = useContext(SocketContext);

  const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setMessage(event.currentTarget.value);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setMessage('');
  };

  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <form
      id="chat-form"
      action="#"
      onSubmit={onFormSubmit}
      className={classes.chatForm}
    >
      <Grid
        container
        direction={matchesMD ? 'column' : 'row'}
        spacing={2}
        style={{ width: '50rem' }}
      >
        <Grid item flexGrow={4}>
          <TextField
            id="outlined-multiline-static"
            label="Chat message"
            value={message}
            onChange={onMessageChange}
            className={classes.chatForm}
          />
        </Grid>
        <Grid item flexGrow={1}>
          <Grid
            container
            justifyContent="center"
            alignItems="space-between"
            style={{ height: '100%' }}
            spacing={1}
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                onClick={() => onSendMessage(message)}
              >
                Send message
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={leaveCall}
                startIcon={<PhoneDisabled />}
              >
                Hang up
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default TextChatForm;
