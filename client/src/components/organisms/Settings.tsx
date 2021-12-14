import React from 'react';
import { Box, Grid, Theme } from '@mui/material';

import VideoMic from '../molecules/VideoMic';
import { Options } from '../molecules/Options';
import Notifications from '../atoms/Notifications';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  settingsWrapper: {
    width: '55rem',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%'
    }
  },
  gridItemSettingsVideo: {
    overflow: 'auto'
  },
  gridItemSettingsOptions: {
    borderRadius: '10px'
  }
}));

export const Settings = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <Box className={classes.settingsWrapper}>
      <Grid container direction="column">
        <Grid item className={classes.gridItemSettingsVideo}>
          <VideoMic />
        </Grid>
        <Grid item className={classes.gridItemSettingsOptions}>
          <Options>
            <Notifications />
          </Options>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
