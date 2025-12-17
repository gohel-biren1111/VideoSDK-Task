import { useState } from 'react';

const RoomSwitcher = ({ currentRoom, onSwitch, isLoading }) => {
  const [selectedMethod, setSelectedMethod] = useState('normal');

  const methods = [
    {
      id: 'normal',
      name: 'Normal Switch',
      icon: '🔄',
      description: 'Leave current room and join new room',
      color: 'blue',
      steps: [
        'Disconnect from current room',
        'Clean up media streams',
        'Join new room',
        'Reconnect media streams'
      ]
    },
    {
      id: 'relay',
      name: 'Media Relay',
      icon: '📡',
      description: 'Stream media to new room while staying connected',
      color: 'purple',
      steps: [
        'Start HLS stream in current room',
        'Configure stream layout',
        'Relay to target room',
        'Maintain dual connection'
      ]
    }
  ];

  const selectedMethodData = methods.find(m => m.id === selectedMethod);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedMethod === method.id
                ? `border-${method.color}-500 bg-${method.color}-500/20`
                : 'border-white/20 bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="text-2xl mb-2">{method.icon}</div>
            <div className="font-semibold text-sm mb-1">{method.name}</div>
            <div className="text-xs text-white/60">{method.description}</div>
          </button>
        ))}
      </div>

      {selectedMethodData && (
        <div className="card bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/30">
          <h4 className="font-semibold mb-3 flex items-center">
            <span className="text-xl mr-2">{selectedMethodData.icon}</span>
            {selectedMethodData.name} Process
          </h4>
          <ol className="space-y-2">
            {selectedMethodData.steps.map((step, index) => (
              <li key={index} className="flex items-start text-sm">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-xs font-semibold mr-3">
                  {index + 1}
                </span>
                <span className="text-white/80 pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <button
        onClick={() => onSwitch(selectedMethod)}
        disabled={isLoading}
        className={`btn-primary w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Switching...
          </span>
        ) : (
          `Switch Using ${selectedMethodData.name}`
        )}
      </button>
    </div>
  );
};

export default RoomSwitcher;
