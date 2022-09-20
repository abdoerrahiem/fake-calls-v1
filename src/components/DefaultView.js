import { StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { useIsFocused } from '@react-navigation/native'

import { colors } from '../utils'

export default function DefaultView({
  barStyle,
  backgroundColor,
  children,
  translucent,
}) {
  const isFocused = useIsFocused()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      {isFocused && (
        <StatusBar
          barStyle={barStyle ?? 'dark-content'}
          backgroundColor={backgroundColor ?? colors.white}
          translucent={translucent ?? false}
        />
      )}
      {children}
    </SafeAreaView>
  )
}
