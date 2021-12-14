import React, { useState, useEffect, useRef, createContext } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { CallData, SocketContextData } from './types';

import { useNavigate } from 'react-router-dom';

const SocketContext = createContext<SocketContextData>({} as SocketContextData);

const socket = io('https://chatterino2.herokuapp.com/');

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
  const [currentPeer, setCurrentPeer] = useState<Peer.Instance>(
    {} as Peer.Instance
  );
  const [chatMessages, setChatMessages] = useState<ChatMessageData[]>([
    { who: 'bot', name: 'Bot', message: 'Hello! You can chat here.' }
  ]);

  const testVideo = useRef<HTMLVideoElement>(null);
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  // const connectionRef = useRef<any>();

  const navigate = useNavigate();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        // if (myVideo.current) myVideo.current.srcObject = currentStream;

        if (testVideo.current) testVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setMe(id));

    socket.on('calluser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });

    socket.on('callended', () => {
      leaveCall();
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    setCurrentPeer(peer);

    peer.on('signal', (data) => {
      socket.emit('answercall', { signal: data, to: call?.from });
    });

    peer.on('stream', (userStream) => {
      if (userVideo.current) userVideo.current.srcObject = userStream;

      if (myVideo.current && stream !== undefined)
        myVideo.current.srcObject = stream;
    });

    peer.on('data', (data) => {
      setChatMessages((chatMessages) => [
        ...chatMessages,
        {
          who: 'user',
          name: call !== undefined && call.name.length > 0 ? call.name : 'User',
          message: new TextDecoder().decode(data)
        }
      ]);
    });

    peer.on('close', () => {
      leaveCall();
    });

    peer.on('error', () => {
      leaveCall();
    });

    if (!call) return;

    peer.signal(call.signal);

    // if (!connectionRef.current) return;

    // connectionRef.current = peer;

    navigate('/chat', { replace: true });
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

    peer.on('data', (data) => {
      setChatMessages((chatMessages) => [
        ...chatMessages,
        {
          who: 'user',
          name: call !== undefined && call.name.length > 0 ? call.name : 'User',
          message: new TextDecoder().decode(data)
        }
      ]);
    });

    peer.on('close', () => {
      leaveCall();
    });

    peer.on('error', () => {
      leaveCall();
    });

    socket.on('callaccepted', (signal: Peer.SignalData) => {
      setCallAccepted(true);

      peer.signal(signal);

      navigate('/chat', { replace: true });
    });
  };

  function leaveCall() {
    setCallEnded(true);

    setCurrentPeer({} as Peer.Instance);

    setChatMessages((chatMessages) => [
      { who: 'bot', name: 'Bot', message: 'Hello! You can chat here.' }
    ]);

    // connectionRef.current.destroy();

    setCall(undefined);

    navigate('/', { replace: true });

    window.location.reload();
  }

  const sendMessage = (message: string) => {
    if (Object.keys(currentPeer).length === 0) return;

    currentPeer.send(message);

    setChatMessages((chatMessages) => [
      ...chatMessages,
      { who: 'me', message: message, name: 'You' }
    ]);
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        testVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        sendMessage,
        chatMessages
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
