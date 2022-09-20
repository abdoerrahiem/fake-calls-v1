import { StyleSheet, View } from 'react-native'
import React from 'react'
import AppLovinMAX from 'react-native-applovin-max'

import { applovin } from '../utils'

export default function ApplovinBanner() {
  return (
    <View>
      <AppLovinMAX.AdView
        adUnitId={applovin.banner}
        adFormat={AppLovinMAX.AdFormat.BANNER}
        style={styles.banner}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  banner: {
    // Set background color for banners to be fully functional
    backgroundColor: 'transparent',
    // position: 'absolute',
    width: '100%',
    height: AppLovinMAX.isTablet() ? 90 : 50,
    bottom: Platform.select({
      ios: 36, // For bottom safe area
      android: 0,
    }),
  },
})
