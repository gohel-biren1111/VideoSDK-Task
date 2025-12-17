# Setup Guide - VideoSDK Room Switch Demo

## Step-by-Step Setup Instructions

### 1. Get Your VideoSDK Token

1. Visit [VideoSDK Dashboard](https://app.videosdk.live/)
2. Sign up for a free account (if you don't have one)
3. Navigate to **API Keys** section
4. Copy your API token

### 2. Configure the Application

1. Open the `.env` file in the project root
2. Paste your token:
   ```env
   VITE_VIDEOSDK_TOKEN=10c1b03d6c3f14b3f0ea8529b5b9454a1b3ea36fda0e59b53d6721a292851655
   ```
3. Save the file

### 3. Install Dependencies (if not already done)

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173` (or another port if 5173 is busy).

### 5. Test the Application

#### Single User Test

1. Open the application in your browser
2. Enter your name
3. Click "Create New Room"
4. You'll join Room A
5. Click "Create Room B" in the controls panel
6. Try both switching methods:
   - **Normal Switch**: Disconnects and reconnects
   - **Media Relay**: Demonstrates HLS streaming

#### Multi-User Test

1. **Browser 1**: Create a new room
2. **Browser 2** (incognito or different browser): Join the same room using the Room ID
3. Both users should see each other
4. **Browser 1**: Create Room B and switch
5. Observe the behavior in both browsers

## Troubleshooting

### Issue: "Please configure your VideoSDK token"

**Solution**: Make sure you've added your token to the `.env` file and restarted the dev server.

### Issue: Camera/Microphone not working

**Solution**: 
- Check browser permissions
- Make sure you're using HTTPS or localhost
- Try a different browser

### Issue: Can't see other participants

**Solution**:
- Make sure both users are in the same room
- Check your internet connection
- Verify the room ID is correct

### Issue: HLS/Media Relay not working

**Solution**:
- This is a demonstration feature
- Full implementation requires backend setup
- Check the README for production implementation details

## Next Steps

1. **Customize the UI**: Edit `src/index.css` and Tailwind config
2. **Add Features**: Implement screen sharing, chat, recording
3. **Deploy**: Build for production with `npm run build`
4. **Backend Setup**: Implement full media relay with backend server

## Production Deployment

### Build the Application

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deploy Options

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use `gh-pages` package
- **Custom Server**: Serve the `dist` folder with any web server

### Environment Variables in Production

Make sure to set `VITE_VIDEOSDK_TOKEN` in your hosting platform's environment variables section.

## Resources

- [VideoSDK Documentation](https://docs.videosdk.live/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Review the VideoSDK documentation
3. Open an issue in the repository
4. Contact VideoSDK support

---


