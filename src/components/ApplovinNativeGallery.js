import React, { forwardRef } from 'react'
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native'
import AppLovinMAX from 'react-native-applovin-max'

import { applovin, colors } from '../utils'
import DefaultText from './DefaultText'

const { width } = Dimensions.get('window')

const NATIVE_AD_UNIT_ID = Platform.select({
  ios: 'ENTER_IOS_NATIVE_AD_UNIT_ID_HERE',
  android: applovin.native,
})

const ApplovinNativeGallery = forwardRef(() => {
  //   const { adUnitId } = props;
  const ref = React.useRef()

  React.useEffect(() => {
    // Native Ad Listeners
    AppLovinMAX.addEventListener('OnNativeAdLoadedEvent', adInfo => {
      console.log('Native ad loaded from: ' + adInfo.networkName)
    })
    AppLovinMAX.addEventListener('OnNativeAdLoadFailedEvent', errorInfo => {
      console.log(
        'Native ad failed to load with error code ' +
          errorInfo.code +
          ' and message: ' +
          errorInfo.message,
      )
    })
    AppLovinMAX.addEventListener('OnNativeAdClickedEvent', adInfo => {
      console.log('Native ad clicked')
    })
    AppLovinMAX.addEventListener('OnNativeAdRevenuePaid', adInfo => {
      console.log('Native ad revenue paid: ' + adInfo.revenue)
    })
  }, [])

  React.useEffect(() => {
    if (AppLovinMAX.isInitialized()) {
      //   ref.current?.loadAd()
    }
  }, [AppLovinMAX])

  return (
    <View
      style={{
        width: width / 2.3,
        height: width / 2,
        backgroundColor: '#000',
        marginBottom: 30,
        borderRadius: 10,
        padding: 5,
        elevation: 5,
      }}>
      <AppLovinMAX.NativeAdView
        adUnitId={NATIVE_AD_UNIT_ID}
        placement="myplacement"
        customData="mycustomdata"
        extraParameters={{
          key1: 'value1',
          key2: 'value2',
        }}
        ref={ref}
        style={styles.nativead}>
        <AppLovinMAX.NativeAdView.MediaView style={styles.mediaView} />
        <AppLovinMAX.NativeAdView.TitleView style={styles.title} />
        <AppLovinMAX.NativeAdView.CallToActionView
          style={styles.callToAction}
        />
        <DefaultText
          title="Ad"
          color={colors.blue}
          backgroundColor={colors.grey}
          position="absolute"
          padding={2}
          fontSize={10}
        />
      </AppLovinMAX.NativeAdView>
    </View>
  )
})

const styles = StyleSheet.create({
  nativead: {
    // height: width / 2.3,
  },
  title: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 15,
  },
  mediaView: {
    width: '100%',
    height: 100,
    backgroundColor: 'black',
  },
  callToAction: {
    width: '100%',
    height: 30,
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlignVertical: 'center',
    color: 'white',
    backgroundColor: colors.blue,
    position: 'absolute',
    bottom: 0,
  },
})

export default ApplovinNativeGallery
