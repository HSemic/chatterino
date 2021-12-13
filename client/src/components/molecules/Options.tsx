import React, { useContext, useState } from 'react';
import { Button, TextField, Grid, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { SocketContext } from '../providers/SocketContext/SocketContext';

const useStyles = makeStyles((theme) => ({
  optionsForm: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px'
  },
  gridContainer: {
    width: '100%'
  },
  margin: {
    marginTop: '2rem !important'
  },
  padding: {
    padding: 20
  },
  optionsContainer: {
    padding: '10px 20px',
    border: '1px solid lightgrey',
    width: '100%'
  },
  optionsPaper: {
    width: '100%'
  }
}));

interface OptionsProps {
  children: JSX.Element;
}

export const Options = ({ children }: OptionsProps) => {
  const classes = useStyles();

  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);

  const [idToCall, setIdToCall] = useState('');

  return (
    <Paper elevation={10} className={classes.optionsContainer}>
      <form className={classes.optionsForm} noValidate autoComplete="off">
        <Grid
          container
          direction={'column'}
          className={classes.gridContainer}
          gap={2}
        >
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              className={`${classes.optionsPaper} ${classes.padding}`}
            >
              <Typography gutterBottom variant="h6">
                Account Info
              </Typography>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                variant="standard"
                fullWidth
              />
              <CopyToClipboard text={me}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                  className={classes.margin}
                >
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              className={`${classes.optionsPaper} ${classes.padding}`}
            >
              <Typography gutterBottom variant="h6">
                Make a call
              </Typography>
              <TextField
                label="ID to Call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.currentTarget.value)}
                variant="standard"
                fullWidth
              />
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PhoneDisabled />}
                  fullWidth
                  onClick={leaveCall}
                  className={classes.margin}
                >
                  Hang Up
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Phone />}
                  fullWidth
                  onClick={() => {
                    callUser(idToCall);
                  }}
                  className={classes.margin}
                >
                  Call
                </Button>
              )}
            </Paper>
          </Grid>
        </Grid>
      </form>
      {children}
    </Paper>
  );
};
