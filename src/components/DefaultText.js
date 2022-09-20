import { Text } from 'react-native'
import React from 'react'

import { colors, fonts } from '../utils'

export default function DefaultText({
  title,
  fontFamily,
  fontSize,
  color,
  numberOfLines,
  selectable,
  children,
  onPress,
  testID,
  ...otherStyles
}) {
  return (
    <Text
      testID={testID}
      onPress={onPress}
      numberOfLines={numberOfLines}
      selectable={selectable}
      style={{
        fontFamily: fontFamily ?? fonts.regular,
        fontSize: fontSize ?? 14,
        color: color ?? colors.black,
        ...otherStyles,
      }}>
      {title}
      {children && children}
    </Text>
  )
}
