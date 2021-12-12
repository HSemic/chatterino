import React, { useState } from 'react';
import { TextField, Button, Grid, Theme } from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  chatForm: {
    flex: '1 1 20%'
  }
}));

export const TextChatForm = (): React.ReactElement => {
  const classes = useStyles();

  const [message, setMessage] = useState('');

  const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setMessage(event.currentTarget.value);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    console.log(message);
    setMessage('');
  };

  return (
    <form
      className={classes.chatForm}
      id="chat-form"
      action="#"
      onSubmit={onFormSubmit}
    >
      <Grid container direction="column" gap={2}>
        <TextField
          id="outlined-multiline-static"
          label="Chat message"
          value={message}
          onChange={onMessageChange}
          multiline
          rows={4}
        />
        <Button variant="contained" color="primary" type="submit">
          Send message
        </Button>
      </Grid>
    </form>
  );
};

export default TextChatForm;
