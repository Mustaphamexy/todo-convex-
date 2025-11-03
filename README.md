# Todo App with Convex & Theme Switcher

A sophisticated React Native Todo application with real-time backend integration using Convex and smooth theme switching.

## Features
- Full CRUD operations with real-time sync
- Light/Dark theme with persistent preferences
-  Responsive design


## Prerequisites
- Node.js v18+
- Expo CLI
- Convex account

## Setup Instructions

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/todo-app-convex.git
cd todo-app-convex
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Configure Convex
\`\`\`bash
npx convex dev
\`\`\`

### 4. Setup environment variables
Create `.env` file:
\`\`\`
EXPO_PUBLIC_CONVEX_URL=your_convex_deployment_url
\`\`\`

### 5. Start development
\`\`\`bash
npm run dev
\`\`\`

## Building APK

### For Android
\`\`\`bash
eas build --platform android --profile preview
\`\`\`

## Project Structure
\`\`\`
todo-app-convex/
├── app/                 # Expo Router pages
├── convex/             # Backend functions
├── src/
│   ├── components/    # React components
│   ├── contexts/      # Context providers
│   ├── hooks/         # Custom hooks
│   └── constants/     # Theme and constants
\`\`\`

## Technologies Used
- React Native with Expo
- Convex (Real-time backend)
- Expo Router (Navigation)
- AsyncStorage (Theme persistence)
- TypeScript
