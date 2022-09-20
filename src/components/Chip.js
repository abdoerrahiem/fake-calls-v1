import { StyleSheet, View } from 'react-native'
import React from 'react'
import DefaultText from './DefaultText'
import { colors } from '../utils'

export default function Chip({ title }) {
  return (
    <View style={styles.container}>
      <DefaultText title={title} color={colors.blue} fontSize={12} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blueTwo,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
  },
})
