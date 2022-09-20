import { StyleSheet, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { DefaultText, Distance } from '../../../components'
import { colors, fonts } from '../../../utils'

export default function GalleryHeader({ navigation }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="menu"
        size={20}
        onPress={() => navigation.goBack()}
        color={colors.white}
      />
      <Distance width={15} />
      <DefaultText
        title="GALLERY"
        fontFamily={fonts.bold}
        fontSize={18}
        flex={1}
        color={colors.white}
      />
      <MaterialCommunityIcons name="magnify" size={24} color={colors.white} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.blue,
  },
})
