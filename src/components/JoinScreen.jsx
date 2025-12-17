import { useState } from 'react';
import { createMeeting, VIDEOSDK_TOKEN } from '../config/videosdk.config';
import toast from 'react-hot-toast';

const JoinScreen = ({ onJoinRoom }) => {
  const [roomId, setRoomId] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRoom = async () => {
    if (!participantName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!VIDEOSDK_TOKEN ) {
      toast.error('Please configure your VideoSDK token in .env file');
      return;
    }

    setIsCreating(true);

    try {
      const newRoomId = await createMeeting({ token: VIDEOSDK_TOKEN });
      onJoinRoom({ roomId: newRoomId, participantName, token: VIDEOSDK_TOKEN });
    } catch (err) {
      toast.error('Failed to create room. Please check your token.');
      console.error('Error creating room:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinRoom = () => {
    if (!participantName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!roomId.trim()) {
      toast.error('Please enter a room ID');
      return;
    }

    if (!VIDEOSDK_TOKEN ) {
      toast.error('Please configure your VideoSDK token in .env file');
      return;
    }

    onJoinRoom({ roomId: roomId.trim(), participantName, token: VIDEOSDK_TOKEN });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 ">
          <h1 className="text-6xl font-bold mb-4 text-gradient">
           <span>VideoSDK</span> <span  className="text-white">Room Switch</span>
          </h1>
          <p className="text-white/70 text-lg">
            Experience seamless room switching with Media Relay
          </p>
        </div>

        <div className="card space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-white/90">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              className="input-field"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateRoom()}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-white/50 font-semibold">
                CREATE NEW ROOM
              </span>
            </div>
          </div>

          <button
            onClick={handleCreateRoom}
            disabled={isCreating}
            className="btn-primary w-full"
          >
            {isCreating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Room...
              </span>
            ) : (
              'Create New Room'
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-white/50 font-semibold">
                OR JOIN EXISTING
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white/90">
              Room ID
            </label>
            <input
              type="text"
              placeholder="Enter room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="input-field"
              onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom()}
            />
          </div>

          <button
            onClick={handleJoinRoom}
            className="btn-secondary w-full"
          >
            Join Existing Room
          </button>


{/* 
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-300 mb-2">
              ℹ️ Quick Setup
            </h3>
            <ol className="text-xs text-white/70 space-y-1 list-decimal list-inside">
              <li>Get your token from <a href="https://app.videosdk.live/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">VideoSDK Dashboard</a></li>
              <li>Create a <code className="bg-white/10 px-1 rounded">.env</code> file with <code className="bg-white/10 px-1 rounded">VITE_VIDEOSDK_TOKEN</code></li>
              <li>Restart the dev server</li>
            </ol>
          </div> */}
        </div>

      </div>
    </div>
  );
};

export default JoinScreen;
