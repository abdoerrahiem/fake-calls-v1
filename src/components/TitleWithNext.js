import { StyleSheet, View } from 'react-native'
import React from 'react'

import { DefaultText } from '.'
import { colors, fonts } from '../utils'

export default function TitleWithNext({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <DefaultText
        title={title}
        fontFamily={fonts.bold}
        fontSize={16}
        color={colors.brown}
      />
      <DefaultText title={subtitle} color={colors.grey} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
})
