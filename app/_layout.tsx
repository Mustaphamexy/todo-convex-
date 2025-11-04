import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { ConvexClientProvider } from '../src/contexts/ConvexProvider';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ConvexClientProvider>
        <ThemeProvider>
          <Stack 
            screenOptions={{ 
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' }
            }} 
          />
        </ThemeProvider>
      </ConvexClientProvider>
    </GestureHandlerRootView>
  );
}