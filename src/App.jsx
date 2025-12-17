import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { MeetingProvider } from '@videosdk.live/react-sdk';
import JoinScreen from './components/JoinScreen';
import MeetingView from './components/MeetingView';
import './index.css';

function App() {
  const [meetingConfig, setMeetingConfig] = useState(null);

  const handleJoinRoom = ({ roomId, participantName, token }) => {
    setMeetingConfig({
      meetingId: roomId,
      micEnabled: true,
      webcamEnabled: true,
      name: participantName,
      token: token,
    });
  };
  const handleLeaveMeeting = () => {
    setMeetingConfig(null);
  };

  const handleRoomSwitch = (newRoomId) => {
    setMeetingConfig(prev => ({
      ...prev,
      meetingId: newRoomId
    }));
  };

  return (
    <div className="App">
      {meetingConfig ? (
        <MeetingProvider
          config={{
            meetingId: meetingConfig.meetingId,
            micEnabled: meetingConfig.micEnabled,
            webcamEnabled: meetingConfig.webcamEnabled,
            name: meetingConfig.name,
          }}
          token={meetingConfig.token}
        >
          <MeetingView
            onLeave={handleLeaveMeeting}
            onSwitchRoom={handleRoomSwitch}
            token={meetingConfig.token}
            initialRoomId={meetingConfig.meetingId}
            participantName={meetingConfig.name}
          />
        </MeetingProvider>
      ) : (
        <JoinScreen onJoinRoom={handleJoinRoom} />
      )}
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }} />
    </div>
  );
}

export default App;
