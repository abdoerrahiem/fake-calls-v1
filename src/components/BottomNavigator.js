import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'

import { TabItem } from '.'
import { colors } from '../utils'

const { width } = Dimensions.get('window')

export default function BottomNavigator({ state, descriptors, navigation }) {
  return (
    <>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name

          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true })
            }
          }

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          }

          return (
            <TabItem
              key={index}
              isFocused={isFocused}
              label={label}
              onLongPress={onLongPress}
              onPress={onPress}
              options={options}
              testID={`tab-${index}`}
            />
          )
        })}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 40,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    backgroundColor: colors.white,
  },
})
