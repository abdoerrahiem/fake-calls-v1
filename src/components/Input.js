import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'

import { colors, fonts } from '../utils'
import Distance from './Distance'

export default function Input({
  placeholder,
  returnKeyType,
  onSubmitEditing,
  value,
  handleChangeText,
  autoFocus,
  ...style
}) {
  return (
    <View style={[styles.container, { ...style }]}>
      <Fontisto name="search" size={18} color={colors.grey} />
      <Distance width={15} />
      <TextInput
        autoFocus={autoFocus}
        style={styles.textInput}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        value={value}
        onChangeText={handleChangeText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    padding: 0,
    fontFamily: fonts.regular,
    fontSize: 14,
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.grey,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
})
