import { StyleSheet, View } from 'react-native'
import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'

import { DefaultText } from './'
import { colors, fonts } from '../utils'

export default function Header({ title, Component }) {
  return (
    <View style={styles.container}>
      <Fontisto name="left-align" size={16} color={colors.brown} />
      {title && (
        <DefaultText
          title={title}
          fontSize={16}
          fontFamily={fonts.bold}
          color={colors.brown}
        />
      )}
      {Component && Component}
      <Fontisto name="bell" size={20} color={colors.brown} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'green',
    padding: 15,
  },
})
