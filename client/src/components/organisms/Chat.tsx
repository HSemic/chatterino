import React, { useContext, useState } from 'react';
import { makeStyles } from '@mui/styles';

import { styled, useTheme } from '@mui/material/styles';
import { Grid, Paper, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { PhoneDisabled } from '@mui/icons-material';
import { SocketContext } from '../providers/SocketContext/SocketContext';

import ChatVideo from '../molecules/ChatVideo';
import TextChatForm from '../molecules/TextChatForm';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0
  },
  videoContainer: {
    width: '90%',
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: `${config.drawerWidth}%`,
    [theme.breakpoints.down('lg')]: {
      width: '80%'
    },
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  toolbar: {
    width: '90%',
    marginTop: '2rem',
    borderRadius: '2rem',
    padding: '1rem 2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconButton: {
    backgroundColor: 'black',
    borderRadius: '100px'
  },
  drawer: {
    width: `${config.drawerWidth}%`,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    gap: 8,
    padding: '1rem',
    '& .MuiDrawer-paper': {
      width: `${config.drawerWidth}%`
    }
  }
}));

const config = {
  drawerWidth: 20
};

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginRight: `${-1 * config.drawerWidth}%`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  })
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${config.drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: `${config.drawerWidth}%`
  })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start'
}));

export const Chat = (): React.ReactElement => {
  const classes = useStyles();

  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const { leaveCall } = useContext(SocketContext);

  const [userMaximized, setUserMaximized] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box className={classes.wrapper}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Persistent drawer
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            sx={{
              width: '50%',
              marginRight: '25rem',
              [theme.breakpoints.down('md')]: {
                marginRight: '15rem'
              }
            }}
          >
            <div className={classes.videoContainer}>
              <ChatVideo
                user={true}
                maximized={userMaximized}
                setUserMaximized={setUserMaximized}
              />
              <ChatVideo
                user={false}
                maximized={!userMaximized}
                setUserMaximized={setUserMaximized}
              />
            </div>
            <div className={classes.toolbar}>
              <IconButton
                className={classes.iconButton}
                color="default"
                size="large"
                onClick={leaveCall}
              >
                <PhoneDisabled />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Main>
      <Drawer
        // className={classes.drawer}
        classes={{ paper: classes.drawer }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <Paper style={{ flex: '4 80%' }}></Paper>
        <Divider />
        <TextChatForm />
      </Drawer>
    </Box>
  );
};

export default Chat;
