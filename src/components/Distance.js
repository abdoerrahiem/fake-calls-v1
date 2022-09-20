import React from 'react'
import { View } from 'react-native'

export default function Distance({
  height,
  width,
  backgroundColor,
  ...otherStyles
}) {
  return <View style={{ height, width, backgroundColor, ...otherStyles }} />
}
