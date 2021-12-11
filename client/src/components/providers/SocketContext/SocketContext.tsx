import React, { useState, useEffect, useRef, createContext } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { CallData, SocketContextData } from './types';

import { useNavigate } from 'react-router-dom';

const SocketContext = createContext<SocketContextData>({} as SocketContextData);

const socket = io('http://localhost:5000');

interface ContextProviderProps {
  children: JSX.Element;
}

const ContextProvider = ({
  children
}: ContextProviderProps): React.ReactElement => {
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const [me, setMe] = useState('');
  const [call, setCall] = useState<CallData | undefined>(undefined);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');

  const myVideo = useRef<HTMLVideoElement>();
  const userVideo = useRef<HTMLVideoElement>();
  const connectionRef = useRef<any>();

  const navigate = useNavigate();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        if (!myVideo.current) return;

        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setMe(id));

    socket.on('calluser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answercall', { signal: data, to: call?.from });
    });

    peer.on('stream', (userStream) => {
      if (!userVideo.current) return;

      userVideo.current.srcObject = userStream;
    });

    if (!call) return;

    peer.signal(call.signal);

    if (!connectionRef.current) return;

    connectionRef.current = peer;
  };

  const callUser = (id: string) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('calluser', {
        userToCall: id,
        signalData: data,
        from: me,
        name
      });
    });

    peer.on('stream', (userStream) => {
      if (!userVideo.current) return;

      userVideo.current.srcObject = userStream;
    });

    socket.on('callaccepted', (signal: Peer.SignalData) => {
      setCallAccepted(true);

      peer.signal(signal);
    });
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    navigate('/', { replace: true });

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
