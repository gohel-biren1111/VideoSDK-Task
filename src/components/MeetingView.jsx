import { useState, useEffect, useRef } from "react";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import ParticipantView from "./ParticipantView";
import { createMeeting } from "../config/videosdk.config";
import toast from "react-hot-toast";

const LocalMediaControls = ({ localParticipantId, toggleMic, toggleWebcam }) => {
  const { micOn, webcamOn } = useParticipant(localParticipantId);
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleMic = async () => {
    if (isToggling) return;
    setIsToggling(true);
    try {
      await toggleMic();
      toast.success(micOn ? "Microphone Muted" : "Microphone Active");
    } catch (error) {
      console.error("Mic toggle failed:", error);
      toast.error(`Mic Error: ${error.message || "Permission denied"}`);
    } finally {
      setIsToggling(false);
    }
  };

  const handleToggleWebcam = async () => {
    if (isToggling) return;
    setIsToggling(true);
    try {
      await toggleWebcam();
      toast.success(webcamOn ? "Camera Turned Off" : "Camera Turned On");
    } catch (error) {
      console.error("Webcam toggle failed:", error);
      toast.error(`Camera Error: ${error.message || "Permission denied"}`);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={handleToggleMic}
        disabled={isToggling}
        className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
          isToggling ? "opacity-50 cursor-not-allowed" : ""
        } ${
          micOn 
            ? "bg-gray-600 hover:bg-gray-500 text-white" 
            : "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30"
        }`}
      >
        {micOn ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
             <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
        )}
        <span>{micOn ? "Mute" : "Unmute"}</span>
      </button>

      <button
        onClick={handleToggleWebcam}
        disabled={isToggling}
        className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
           isToggling ? "opacity-50 cursor-not-allowed" : ""
        } ${
          webcamOn 
            ? "bg-gray-600 hover:bg-gray-500 text-white" 
            : "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30"
        }`}
      >
        {webcamOn ? (
           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
             <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
           </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.919 14.47 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
          </svg>
        )}
        <span>{webcamOn ? "Stop Cam" : "Start Cam"}</span>
      </button>
    </div>
  );
};

const MeetingView = ({ onLeave, onSwitchRoom, token, initialRoomId, participantName }) => {
  const [currentRoomId, setCurrentRoomId] = useState(initialRoomId);
  const [targetRoomId, setTargetRoomId] = useState("");
  const [isSwitching, setIsSwitching] = useState(false);
  const [switchMethod, setSwitchMethod] = useState("normal");
  const [relayStatus, setRelayStatus] = useState("");
  const [roomAId, setRoomAId] = useState(initialRoomId);
  const [roomBId, setRoomBId] = useState("");
  const [isCreatingRoomB, setIsCreatingRoomB] = useState(false);

  const [hlsUrl, setHlsUrl] = useState("");
  const [hlsState, setHlsState] = useState("HLS_STOPPED");

  const {
    join,
    leave,
    toggleMic,
    toggleWebcam,
    participants,
    localParticipant,
    startHls,
    stopHls,
  } = useMeeting({
    onMeetingJoined: () => {
      console.log("Meeting Joined");
      setIsSwitching(false);
    },
    onMeetingLeft: () => {
      console.log("Meeting Left");
      if (isSwitching && switchMethod === "normal" && targetRoomId) {
        onSwitchRoom(targetRoomId);
      } else {
        onLeave();
      }
    },
    onHlsStateChanged: (data) => {
      console.log("HLS State Changed:", data);
      setHlsState(data.status);
      if (data.status === "HLS_STARTED" || data.status === "HLS_PLAYABLE") {
        setHlsUrl(data.downstreamUrl);
        setRelayStatus("Broacasting Live! Copied link below.");
        toast.success("Live Stream Started!");
      }
      if (data.status === "HLS_STOPPED") {
        setHlsUrl("");
        setRelayStatus("");
      }
    },
    onParticipantJoined: (participant) => {
      console.log("Participant Joined", participant);
    },
  });

  const participantsArray = [...participants.keys()];

  useEffect(() => {
    join();
  }, []);

  useEffect(() => {
    setCurrentRoomId(initialRoomId);
  }, [initialRoomId]);

  const handleCreateRoomB = async () => {
    setIsCreatingRoomB(true);
    try {
      const newRoomId = await createMeeting({ token });
      setRoomBId(newRoomId);
      setTargetRoomId(newRoomId);
    } catch (error) {
      console.error("Error creating Room B:", error);
      toast.error("Failed to create Room B");
    } finally {
      setIsCreatingRoomB(false);
    }
  };

  const handleNormalSwitch = async () => {
    if (!targetRoomId) {
      toast.error("Please create or enter Room B ID");
      return;
    }

    setIsSwitching(true);
    setSwitchMethod("normal");
    leave();
  };

  const handleMediaRelaySwitch = async () => {
    if (hlsState === "HLS_STARTED" || hlsState === "HLS_PLAYABLE") {
      stopHls();
      toast.success("Stopping Broadcast...");
      return;
    }

    setSwitchMethod("relay");
    setRelayStatus("Initializing Broadcast...");

    try {
      if (startHls) {
        await startHls({
          layout: {
            type: "GRID",
            priority: "SPEAKER",
            gridSize: 4,
          },
          theme: "DARK",
          mode: "video-and-audio",
          quality: "high",
          orientation: "landscape",
        });
        toast.loading("Starting HLS Stream...");
      }
    } catch (error) {
      console.error("Error during media relay:", error);
      toast.error("Failed to start Broadcast: " + error.message);
      setRelayStatus("Broadcast failed");
      setIsSwitching(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleLeaveMeeting = () => {
    leave();
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="card mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gradient mb-1">
                Video Conference
              </h1>
              <div className="flex items-center space-x-3">
                <span className="status-active">
                  Room: {currentRoomId}
                </span>
                <span className="text-white/60 text-sm">
                  {participantsArray.length} participant(s)
                </span>
              </div>
            </div>
            <button
              onClick={handleLeaveMeeting}
              className="btn-danger"
            >
              Leave Meeting
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
                You
              </h3>
              {localParticipant && (
                <ParticipantView
                  participantId={localParticipant.id}
                  isLocal={true}
                />
              )}
            </div>

            {participantsArray.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
                  Other Participants ({participantsArray.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {participantsArray.map((participantId) => (
                    <ParticipantView
                      key={participantId}
                      participantId={participantId}
                      isLocal={false}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Media Controls</h3>
              {localParticipant ? (
                <LocalMediaControls 
                  localParticipantId={localParticipant.id} 
                  toggleMic={toggleMic} 
                  toggleWebcam={toggleWebcam} 
                />
              ) : (
                <div className="text-center text-white/50 py-4">
                  Initializing controls...
                </div>
              )}
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="text-2xl mr-2">🔄</span>
                Room Switch
              </h3>

              <div className="space-y-4">
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="text-xs text-green-300 font-semibold mb-1">ROOM A (Current)</div>
                  <div className="text-sm font-mono text-white/90 break-all">{roomAId}</div>
                </div>

                {!roomBId ? (
                  <button
                    onClick={handleCreateRoomB}
                    disabled={isCreatingRoomB}
                    className="btn-primary w-full"
                  >
                    {isCreatingRoomB ? "Creating Room B..." : "Create Room B"}
                  </button>
                ) : (
                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="text-xs text-blue-300 font-semibold mb-1">ROOM B (Target)</div>
                    <div className="text-sm font-mono text-white/90 break-all">{roomBId}</div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium mb-2 text-white/70">
                    Or enter existing Room B ID:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Room B ID"
                    value={targetRoomId}
                    onChange={(e) => setTargetRoomId(e.target.value)}
                    className="input-field text-sm"
                    disabled={isSwitching}
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-white/70 uppercase tracking-wide">
                    Switch Method:
                  </div>
                  
                  <button
                    onClick={handleNormalSwitch}
                    disabled={isSwitching || !targetRoomId}
                    className="btn-primary w-full text-sm"
                  >
                    {isSwitching && switchMethod === "normal" 
                      ? "Switching..." 
                      : "Normal Switch (Leave & Join)"}
                  </button>

                  <button
                    onClick={handleMediaRelaySwitch}
                    disabled={isSwitching || !targetRoomId}
                    className="btn-secondary w-full text-sm"
                  >
                    {isSwitching && switchMethod === "relay" 
                      ? "Relaying..." 
                      : "Media Relay Switch"}
                  </button>
                </div>

                {(relayStatus || hlsUrl) && (
                  <div className={`p-3 rounded-lg border ${hlsUrl ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
                    <div className={`text-xs font-semibold mb-1 ${hlsUrl ? 'text-green-300' : 'text-yellow-300'}`}>
                      {relayStatus}
                    </div>
                    {hlsUrl && (
                      <div className="mt-2 flex items-center space-x-2">
                        <input 
                          readOnly 
                          value={hlsUrl} 
                          className="flex-1 bg-black/30 border border-white/10 rounded px-2 py-1 text-xs text-white/90"
                        />
                        <button 
                          onClick={() => copyToClipboard(hlsUrl)}
                          className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors"
                          title="Copy Stream URL"
                        >
                          📋
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="card bg-purple-500/10 border-purple-500/30">
              <h3 className="text-sm font-semibold mb-3 flex items-center text-purple-300">
                <span className="text-xl mr-2">ℹ️</span>
                How It Works
              </h3>
              <div className="space-y-3 text-xs text-white/70">
                <div>
                  <div className="font-semibold text-white/90 mb-1">Normal Switch:</div>
                  <p>Leaves current room and joins the new room. Brief disconnection occurs.</p>
                </div>
                <div>
                  <div className="font-semibold text-white/90 mb-1">Media Relay:</div>
                  <p>Streams your media to the new room while staying in the current room. Requires HLS/RTMP setup.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingView;
