import React from 'react'
import { View } from 'react-native'
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'

import { admobs, colors } from '../utils'

export default function AdmobBanner() {
  return (
    <View style={{ alignItems: 'center', backgroundColor: '#000' }}>
      <BannerAd
        unitId={admobs.banner}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  )
}
