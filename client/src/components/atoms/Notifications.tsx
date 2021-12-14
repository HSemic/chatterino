import React, { useContext, useState } from 'react';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import { Phone, PhoneDisabled } from '@mui/icons-material';

import { SocketContext } from '../providers/SocketContext/SocketContext';

const Notifications = (): React.ReactElement => {
  const { answerCall, leaveCall, call, callAccepted } =
    useContext(SocketContext);

  const [, setOpen] = useState(false);

  const onCallAccept = () => {
    answerCall();
    setOpen(false);
  };

  const onCallReject = () => {
    leaveCall();
    setOpen(false);
  };

  const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  return (
    <>
      {call?.isReceivedCall && !callAccepted && (
        <Modal
          open={true}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Box sx={boxStyle}>
            <Typography variant="h6" component="h2" gutterBottom>
              Call from: {call.name}
            </Typography>
            <Grid container gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={onCallAccept}
                startIcon={<Phone />}
              >
                Answer
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={onCallReject}
                startIcon={<PhoneDisabled />}
              >
                Hang up
              </Button>
            </Grid>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Notifications;
