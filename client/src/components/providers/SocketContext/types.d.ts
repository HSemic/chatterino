import { RefObject } from 'react';
import { SignalData } from 'simple-peer';

interface CallData {
  isReceivedCall: boolean;
  from: string;
  name: string;
  signal: SignalData;
}

interface SocketContextData {
  call: CallData | undefined;
  callAccepted: boolean;
  myVideo: RefObject<HTMLVideoElement>;
  userVideo: RefObject<HTMLVideoElement>;
  testVideo: RefObject<HTMLVideoElement>;
  stream: MediaStream | undefined;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  callEnded: boolean;
  me: string;
  callUser: (id: string) => void;
  leaveCall: () => void;
  answerCall: () => void;
  sendMessage: (message: string) => void;
  chatMessages: ChatMessageData[];
}
