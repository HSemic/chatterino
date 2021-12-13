import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: '100rem',
    [theme.breakpoints.down('lg')]: {
      width: '80rem'
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '100%'
    }
  }
}));

interface WrapperProps {
  children: JSX.Element;
}

export const Wrapper = ({ children }: WrapperProps): React.ReactElement => {
  const classes = useStyles();

  return <Box className={classes.wrapper}>{children}</Box>;
};
