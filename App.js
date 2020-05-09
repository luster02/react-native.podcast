import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import Navigation from './app/navigation/Navigation'
import { AuthProvider } from './app/context/authContext'
import { PodcastProvider } from './app/context/podcastContext'

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <PodcastProvider>
          <Navigation />
        </PodcastProvider>
      </AuthProvider>
    </PaperProvider>
  );
}


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5f6caf',
    accent: '#ffb677',
  },
};

