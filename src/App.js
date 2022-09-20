import React from 'react'
import SplashScreen from 'react-native-splash-screen'
import { MenuProvider } from 'react-native-popup-menu'
import { Camera } from 'react-native-vision-camera'

import Navigation from './navigation'
import { MovieContextProvider } from './context/MovieContext'
import { ChatContextProvider } from './context/ChatContext'

export default function App() {
  React.useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 2000)
  }, [])

  React.useEffect(() => {
    Camera.requestCameraPermission()
    Camera.requestMicrophonePermission()
  }, [])

  return (
    <ChatContextProvider>
      <MovieContextProvider>
        <MenuProvider>
          <Navigation />
        </MenuProvider>
      </MovieContextProvider>
    </ChatContextProvider>
  )
}
