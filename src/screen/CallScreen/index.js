import React, { useContext } from 'react'
import { StyleSheet, View, Image, BackHandler } from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Sound from 'react-native-sound'
import Video from 'react-native-video'
import { useFocusEffect } from '@react-navigation/native'

import {
  DefaultView,
  DefaultText,
  Distance,
  ApplovinBanner,
} from '../../components'
import { colors, fonts } from '../../utils'
import { ChatContext } from '../../context/ChatContext'

export default function CallScreen({ navigation }) {
  const { activeConversation } = useContext(ChatContext)

  const videoRef = React.useRef()

  const devices = useCameraDevices()
  const device = devices.front

  const [cameraPermission, setCameraPermission] = React.useState()
  const [microphonePermission, setMicrophonePermission] = React.useState()
  const [isConnect, setIsConnect] = React.useState(false)
  const [audio, setAudio] = React.useState()
  const [showButtons, setShowButtons] = React.useState(true)
  const [isFront, setIsFront] = React.useState(true)
  const [isZoom, setIsZoom] = React.useState(false)

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        audio && audio.stop()
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [audio]),
  )

  React.useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission)
    Camera.getMicrophonePermissionStatus().then(setMicrophonePermission)

    const whoosh = new Sound('whatsapp.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error)
        return
      }

      whoosh.play(success => {
        if (success) {
          console.log('successfully finished playing')
        } else {
          console.log('playback failed due to audio decoding errors')
        }
      })

      whoosh.setNumberOfLoops(-1)
    })

    setAudio(whoosh)
  }, [])

  React.useEffect(() => {
    setTimeout(() => {
      setIsConnect(true)
      audio && audio.stop()
    }, 10000)
  }, [audio])

  if (cameraPermission == null || microphonePermission == null || !device) {
    return null
  }

  // https://assets.mixkit.co/videos/preview/mixkit-family-walking-together-in-nature-39767-large.mp4

  // http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4

  return (
    <DefaultView
      translucent
      backgroundColor="transparent"
      barStyle="light-content">
      {isConnect ? (
        <>
          <Video
            controls={false}
            source={{
              uri: 'https://assets.mixkit.co/videos/preview/mixkit-family-walking-together-in-nature-39767-large.mp4',
            }}
            ref={videoRef}
            onBuffer={data => console.log('buffer: ', data)}
            onError={err => console.log('err play video: ', err)}
            style={
              isZoom
                ? {
                    width: 90,
                    height: 120,
                    alignSelf: 'flex-end',
                    top: 40,
                    right: 15,
                    zIndex: 2,
                  }
                : {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    backgroundColor: '#000',
                  }
            }
            resizeMode="cover"
            repeat={true}
            onTouchStart={() => isZoom && setIsZoom(false)}
          />
        </>
      ) : (
        <View
          style={{
            position: 'absolute',
            top: 70,
            left: 0,
            right: 0,
            zIndex: 2,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: activeConversation.image,
            }}
            resizeMode="cover"
            style={{
              width: 70,
              height: 70,
              backgroundColor: colors.grey,
              borderRadius: 999,
            }}
          />
          <Distance height={15} />
          <DefaultText
            title={activeConversation.name}
            color={colors.white}
            fontFamily={fonts.medium}
            fontSize={18}
          />
          <Distance height={5} />
          <DefaultText title="Video Call" color={colors.white} />
        </View>
      )}

      <Camera
        style={{
          position: isZoom ? 'absolute' : 'relative',
          width: isZoom ? '100%' : isConnect ? 90 : '100%',
          height: isZoom ? '100%' : isConnect ? 120 : '100%',
          alignSelf: 'flex-end',
          top: isZoom ? 0 : isConnect ? 40 : 0,
          right: isZoom ? 0 : isConnect ? 15 : 0,
          zIndex: 1,
        }}
        device={isFront ? devices.front : devices.back}
        isActive={true}
        onTouchStart={() => !isZoom && setIsZoom(true)}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#213037',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          zIndex: 3,
        }}>
        <MaterialCommunityIcons
          name={showButtons ? 'chevron-up' : 'chevron-down'}
          color={'#767D82'}
          size={30}
          style={{ alignSelf: 'center', top: -2 }}
          onPress={() => setShowButtons(!showButtons)}
        />

        {showButtons && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
              paddingBottom: 10,
            }}>
            <MaterialCommunityIcons
              name="camera-flip"
              color={colors.white}
              size={25}
              style={{}}
              onPress={() => setIsFront(!isFront)}
            />
            <MaterialCommunityIcons
              name="video-off"
              color={colors.white}
              size={25}
              style={{}}
            />
            <MaterialCommunityIcons
              name="microphone-off"
              color={colors.white}
              size={25}
              style={{}}
            />
            <MaterialCommunityIcons
              name="phone-hangup"
              color={colors.white}
              size={25}
              style={{
                backgroundColor: 'red',
                borderRadius: 999,
                padding: 10,
              }}
              onPress={() => {
                navigation.goBack()
                audio && audio.stop()
              }}
            />
          </View>
        )}
        <ApplovinBanner />
      </View>
    </DefaultView>
  )
}

const styles = StyleSheet.create({})
