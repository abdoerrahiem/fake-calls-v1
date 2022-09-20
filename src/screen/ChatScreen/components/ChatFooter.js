import { StyleSheet, View, TextInput } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { colors, fonts } from '../../../utils'
import { Distance } from '../../../components'

export default function ChatFooter({ value, handleChangeText, onPress }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Message"
        style={styles.input}
        multiline
        value={value}
        onChangeText={handleChangeText}
      />
      <Distance width={10} />
      <MaterialCommunityIcons
        name="send-circle"
        size={50}
        color={colors.blue}
        selectionColor={colors.white}
        onPress={onPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: colors.blue,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 120,
  },
  input: {
    fontFamily: fonts.regular,
    fontSize: 14,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: colors.white,
    elevation: 1,
  },
})
