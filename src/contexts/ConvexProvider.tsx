// src/contexts/ConvexProvider.tsx

import React, { ReactNode } from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error('EXPO_PUBLIC_CONVEX_URL environment variable is not set');
}

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
};