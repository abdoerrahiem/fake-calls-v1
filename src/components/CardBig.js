import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
} from 'react-native'
import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'

import { colors, fonts } from '../utils'
import Distance from './Distance'
import DefaultText from './DefaultText'

const { width } = Dimensions.get('window')

export default function CardBig({ item, onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        }}
        resizeMode="cover"
        style={styles.image}
      />
      <Distance height={5} />
      <DefaultText
        title="Spiderman: No Way Home"
        fontFamily={fonts.medium}
        fontSize={16}
        lineHeight={22}
      />
      <Distance height={5} />
      <View style={styles.content}>
        <Fontisto name="star" color={colors.yellow} />
        <Distance width={5} />
        <DefaultText
          title="9.1/10 IMDb"
          flex={1}
          color={colors.grey}
          fontSize={12}
        />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    width: width / 2.5,
  },
  image: {
    width: '100%',
    height: width / 2,
    backgroundColor: colors.grey,
    borderRadius: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
