import React from 'react'
import { StyleSheet, View, Pressable, Image, Dimensions } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'

import { colors, fonts, icons } from '../utils'
import { DefaultText } from '.'

const { width } = Dimensions.get('window')

export default function TabItem({
  isFocused,
  options,
  onPress,
  onLongPress,
  label,
  testID,
}) {
  const image = () => {
    if (label === 'HomeScreen') {
      return 'film'
    } else if (label === 'SearchScreen') {
      return 'search'
    } else if (label === 'ArchiveScreen') {
      return 'favorite'
    }
  }

  return (
    <View style={styles.main}>
      <Pressable
        android_ripple={{
          color: colors.white,
        }}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={testID}
        onPress={onPress}
        onLongPress={onLongPress}>
        <View style={styles.container}>
          <Fontisto
            name={image()}
            size={isFocused ? 30 : 24}
            color={isFocused ? colors.brown : colors.grey}
          />
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {},
  container: {},
})
