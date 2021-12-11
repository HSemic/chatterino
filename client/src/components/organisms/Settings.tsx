import React from 'react';
import { makeStyles } from '@mui/styles';
import { Options } from '../molecules/Options';
import Notifications from '../atoms/Notifications';
import { Grid, Paper, Theme } from '@mui/material';
import VideoSettings from '../molecules/SettingsVideo';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'inline-flex',
    position: 'absolute',
    padding: '2rem',
    top: '50%',
    left: '50%',
    borderRadius: '1rem',
    transform: 'translate(-50%, -50%)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70rem',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      width: '100%',
      height: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  video: {
    width: '100%'
  },
  gridContainer: {
    justifyContent: 'center'
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px'
  }
}));

export const Settings = (): React.ReactElement => {
  const classes = useStyles();

  // const { myVideo } = useContext(SocketContext);

  return (
    <Paper elevation={3} square className={classes.wrapper}>
      <Grid container gap={4}>
        <VideoSettings />
        <Options>
          <Notifications />
        </Options>
      </Grid>
    </Paper>
  );
};

export default Settings;
