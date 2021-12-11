import { MutableRefObject, Ref } from 'react';
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
  myVideo: MutableRefObject<HTMLVideoElement | null>;
  userVideo: MutableRefObjec<HTMLVideoElement | null>;
  stream: MediaStream | undefined;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  callEnded: boolean;
  me: string;
  callUser: (id: string) => void;
  leaveCall: () => void;
  answerCall: () => void;
}
