# Contributing to VideoSDK Room Switch Demo

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/videosdk-room-switch.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes thoroughly
6. Commit your changes: `git commit -m "Add your feature"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request

## 🎯 Areas for Contribution

### High Priority

- **Full Media Relay Implementation**: Backend server for HLS/RTMP relay
- **Screen Sharing**: Add screen sharing functionality
- **Chat Feature**: Real-time text chat between participants
- **Recording**: Meeting recording functionality
- **Virtual Background**: Background blur/replacement

### Medium Priority

- **UI Improvements**: Enhanced animations and transitions
- **Mobile Optimization**: Better mobile experience
- **Accessibility**: ARIA labels, keyboard navigation
- **Internationalization**: Multi-language support
- **Dark/Light Mode**: Theme switching

### Low Priority

- **Documentation**: Improve docs and add tutorials
- **Tests**: Unit and integration tests
- **Performance**: Optimization and monitoring
- **Analytics**: Usage tracking and metrics

## 📝 Code Style

### JavaScript/React

- Use functional components with hooks
- Follow ESLint configuration
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused

### CSS/Tailwind

- Use Tailwind utility classes
- Follow the existing design system
- Add custom classes in `index.css` if needed
- Maintain responsive design

### File Structure

```
src/
├── components/       # React components
├── config/          # Configuration files
├── hooks/           # Custom React hooks (if added)
├── utils/           # Utility functions (if added)
└── index.css        # Global styles
```

## 🧪 Testing

Before submitting a PR:

1. Test in multiple browsers (Chrome, Firefox, Safari)
2. Test on different screen sizes
3. Test with multiple participants
4. Check console for errors
5. Verify no ESLint warnings

## 📋 Pull Request Guidelines

### PR Title

Use conventional commits format:
- `feat: Add screen sharing feature`
- `fix: Resolve participant video issue`
- `docs: Update README with new instructions`
- `style: Improve button hover effects`
- `refactor: Simplify room switching logic`

### PR Description

Include:
- What changes were made
- Why the changes were necessary
- How to test the changes
- Screenshots/videos (if UI changes)
- Related issues (if any)

### Example PR Description

```markdown
## Description
Added screen sharing functionality to the meeting view.

## Changes
- Added screen sharing button to controls
- Implemented screen stream handling
- Updated participant view to show screen shares
- Added UI for screen sharing indicator

## Testing
1. Join a meeting
2. Click "Share Screen" button
3. Select a screen/window
4. Verify other participants can see the screen
5. Stop sharing and verify it stops for all

## Screenshots
[Add screenshots here]

## Related Issues
Closes #123
```

## 🐛 Bug Reports

When reporting bugs, include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Detailed steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, OS, version
6. **Screenshots**: If applicable
7. **Console Errors**: Any error messages

## 💡 Feature Requests

When requesting features, include:

1. **Use Case**: Why is this feature needed?
2. **Description**: What should it do?
3. **Mockups**: UI mockups if applicable
4. **Alternatives**: Other solutions considered

## 🔧 Development Setup

### Prerequisites

- Node.js 20.18.0 or higher
- npm or yarn
- VideoSDK account and token

### Setup Steps

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env`
3. Add your VideoSDK token to `.env`
4. Start dev server: `npm run dev`

### Useful Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## 📚 Resources

- [VideoSDK Documentation](https://docs.videosdk.live/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

## ❓ Questions?

If you have questions:
- Open a discussion in the repository
- Check existing issues and PRs
- Review the documentation
---


