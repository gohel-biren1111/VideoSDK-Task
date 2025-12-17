# 🚀 Quick Start Guide

## Get Started in 5 Minutes!

### Step 1: Get Your VideoSDK Token (2 minutes)

1. Go to [https://app.videosdk.live/](https://app.videosdk.live/)
2. Sign up for a free account
3. Navigate to **API Keys** section
4. Copy your API token

### Step 2: Configure the App (1 minute)

1. Open the `.env` file in the project root
2. Paste your token:
   ```env
   VITE_VIDEOSDK_TOKEN=10c1b03d6c3f14b3f0ea8529b5b9454a1b3ea36fda0e59b53d6721a292851655
   ```
3. Save the file

### Step 3: Start the App (2 minutes)

```bash
# If dependencies aren't installed yet
npm install

# Start the development server
npm run dev
```

The app will open at `http://localhost:5173` (or another port if 5173 is busy).

### Step 4: Test Room Switching

#### Solo Test (Quick)
1. Enter your name
2. Click "Create New Room" - You're now in **Room A**
3. Click "Create Room B" in the controls panel
4. Try "Normal Switch" - You'll leave Room A
5. Try "Media Relay Switch" - Demonstrates HLS streaming

#### Multi-User Test (Recommended)
1. **Browser 1**: Create a new room
2. Copy the Room ID shown
3. **Browser 2** (incognito/different browser): Join using that Room ID
4. Both users should see each other
5. **Browser 1**: Create Room B and switch
6. Observe the switching behavior

## 🎯 What to Try

### Basic Features
- ✅ Toggle your microphone
- ✅ Toggle your camera
- ✅ See active speaker indicator
- ✅ View participant count

### Room Switching
- ✅ **Normal Switch**: Clean disconnect and reconnect
- ✅ **Media Relay**: HLS streaming demonstration

## 📸 Expected UI

You should see:
- **Beautiful gradient background** (purple-blue)
- **Glassmorphism cards** with blur effects
- **Smooth animations** on hover
- **Video tiles** with participant info
- **Control panel** with room switching options

## ⚠️ Common Issues

### "Please configure your VideoSDK token"
- Make sure `.env` file exists
- Check that token is pasted correctly
- Restart the dev server (`Ctrl+C` then `npm run dev`)

### Camera/Mic not working
- Allow browser permissions when prompted
- Check if another app is using the camera
- Try a different browser (Chrome recommended)

### Can't see other participants
- Verify both users joined the same Room ID
- Check internet connection
- Look for errors in browser console (F12)

## 🎨 Customization

Want to customize the look?

1. **Colors**: Edit `src/index.css`
2. **Layout**: Edit components in `src/components/`
3. **Config**: Edit `src/config/videosdk.config.js`

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [SETUP.md](SETUP.md) for deployment instructions
- Review [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

## 🆘 Need Help?

- Check the browser console for errors (Press F12)
- Review [VideoSDK Documentation](https://docs.videosdk.live/)
- Open an issue in the repository

---

**Enjoy building with VideoSDK! 🎉**
