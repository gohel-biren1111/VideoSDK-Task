# VideoSDK Room Switch Demo

A React application demonstrating seamless room switching functionality using VideoSDK, including both automated instant switching and Media Relay features.

![VideoSDK Room Switch](https://img.shields.io/badge/VideoSDK-Room%20Switch-blue)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8)

## 🎯 Features

- ✅ **Seamless Room Switching**: **Instant switch** between rooms without page reload (New!)
- ✅ **Create or Join Rooms**: Easy-to-use interface for creating new rooms or joining existing ones
- ✅ **Media Relay Demonstration**: Showcase media relay functionality for advanced use cases
- ✅ **Real-time Video/Audio**: HD video and audio communication
- ✅ **Participant Management**: View all participants with active speaker detection
- ✅ **Media Controls**: Reactive mic/camera toggles with instant visual feedback
- ✅ **Smart Notifications**: Integrated `react-hot-toast` for real-time success/error alerts
- ✅ **Beautiful UI**: Modern glassmorphism design with smooth animations
- ✅ **Robust Error Handling**: Auto-detects token issues and handles permission errors

## 🚀 Quick Start

### Prerequisites

- Node.js (v20.18.0 or higher)
- npm or yarn
- VideoSDK account and API token

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gohel-biren1111/VideoSDK-Task.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your VideoSDK token**
   - Visit [VideoSDK Dashboard](https://app.videosdk.live/api-keys)
   - Sign up or log in
   - Copy your API token (or generate a JWT)

4. **Configure environment variables**
   ```bash
   # Create .env file
   cp .env.example .env
   ```
   
   Edit `.env` and add your token:
   ```env
   VITE_VIDEOSDK_TOKEN=10c1b03d6c3f14b3f0ea8529b5b9454a1b3ea36fda0e59b53d6721a292851655
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Enter your name and create a room

---

## 📖 A to Z: How This Project Works

This section explains the inner workings of every feature in the application, making it easy to understand the code flow.

### 1. Application Architecture (`main.jsx` & `App.jsx`)
- **App Wrapper**: The entry point. It holds the global state `meetingConfig` which decides whether to show the **Join Screen** or the **Meeting View**.
- **Instant Switch Logic**: The `App.jsx` component defines a function `handleRoomSwitch`. when this is called with a new `roomId`, it updates the state. React detects this change and instantly remounts the `MeetingProvider` with the new Room ID. This achieves a "seamless switch" feel without reloading the webpage.
- **Toast Provider**: We place `<Toaster />` here so notifications can pop up on top of any screen.

### 2. The Join Screen (`JoinScreen.jsx`)
This is the landing page.
- **Validation**: It checks if you entered a Name and if a Token is present. If not, it uses `toast.error` to alert you.
- **Creating a Room**: Calls `VideoSDK.createMeeting()` API. This returns a unique 12-character ID (e.g., `abc-defg-hij`).
- **Joining**: Passes this ID up to `App.jsx` via the `onJoinRoom` callback.

### 3. The Meeting View (`MeetingView.jsx`)
This is the heart of the application.
- **Initialization**: Uses the `useMeeting` hook to connect to the VideoSDK servers.
- **Layout**: 
  - **Left Side**: Shows video grid.
  - **Right Side**: Shows control panel.
- **Participant Grid**: Sub-component `ParticipantView` renders individual video tiles.

### 4. Interactive Features

#### A. Media Controls (Mic/Cam)
- **Component**: `LocalMediaControls`.
- **Logic**: It uses `useParticipant(localId)` to listen to the *real* state of your device.
- **Feedback**: When you click "Mute", it calls `toggleMic()`. Once the SDK confirms the mic is off, the button turns RED and shows "Unmute". It also triggers a Toast notification explicitly on success or failure.

#### B. Normal Room Switch (Seamless)
- **User Action**: Click "Normal Switch".
- **Code Flow**:
  1. Checks if a Target Room ID is entered.
  2. Calls `leave()` to cleanly disconnect from current room.
  3. The `onMeetingLeft` event listener fires.
  4. It detects we are in "Switch Mode".
  5. It calls `onSwitchRoom(newId)` (passed from App.jsx).
  6. **Result**: You appear in the new room immediately.

#### C. Media Relay (HLS Demo)
- **User Action**: Click "Media Relay Switch".
- **Code Flow**: 
  1. Calls `startHls()` from VideoSDK.
  2. Configures a layout (Grid, prioritising speaker).
  3. This sends your stream to a global Video. Standard (HLS) URL which can be played anywhere.
  4. **Note**: In a real app, you would send this URL to the other room so they can watch you.

### 5. Participant Views (`ParticipantView.jsx`)
- Handles the actual `<video>` and `<audio>` tags.
- Uses `ReactPlayer` to render the media stream.
- Shows overlays for "Mic Off" or "Name".
- Handles the "Active Speaker" border (green glow).

---

## 🎨 Design System

- **Glassmorphism**: We use semi-transparent backgrounds with `backdrop-filter: blur(12px)` to create a modern, premium look.
- **Colors**:
  - `bg-gray-900`: Main background.
  - `text-gradient`: Custom class for the rainbow text effect.
  - `btn-primary`: Blue gradient button.
  - `btn-danger`: Red gradient for leaving/muting.

## 📂 Project Structure

```
videosdk-room-switch/
├── src/
│   ├── components/
│   │   ├── JoinScreen.jsx       # Landing Page
│   │   ├── MeetingView.jsx      # Main Video Interface
│   │   └── ParticipantView.jsx  # Individual Video Tile
│   ├── config/
│   │   └── videosdk.config.js   # API & Token Config
│   ├── App.jsx                  # State Manager
│   ├── main.jsx                 # Entry Point
│   └── index.css                # Tailwind & Global Styles
├── .env                         # API Token Storage
└── package.json                 # Dependencies
```

## 🎉 Acknowledgments

- Built with [VideoSDK](https://www.videosdk.live/)
- UI powered by [Tailwind CSS](https://tailwindcss.com/)
- Toast notifications by [React Hot Toast](https://react-hot-toast.com/)
