import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Pressable,
  FlatList,
} from 'react-native'
import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'

import { colors, fonts } from '../utils'
import Distance from './Distance'
import DefaultText from './DefaultText'
import Chip from './Chip'

const { width } = Dimensions.get('window')

export default function CardSmall({ item, onPress }) {
  const [categories] = React.useState([1, 2, 3])

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        }}
        resizeMode="cover"
        style={styles.image}
      />
      <Distance width={10} />
      <View style={styles.content}>
        <DefaultText
          title="Venom Let There Be Carnage"
          fontFamily={fonts.medium}
          fontSize={16}
          lineHeight={22}
        />
        <Distance height={10} />
        <View style={styles.rating}>
          <Fontisto name="star" color={colors.yellow} />
          <Distance width={5} />
          <DefaultText
            title="9.1/10 IMDb"
            flex={1}
            color={colors.grey}
            fontSize={12}
          />
        </View>
        <Distance height={10} />
        <View style={styles.cts}>
          {categories.map((item, index) => (
            <Chip key={index} title="HORROR" />
          ))}
        </View>
        <Distance height={10} />
        <View style={styles.rating}>
          <Fontisto name="clock" color={colors.black} />
          <Distance width={5} />
          <DefaultText title="1h 47m" flex={1} />
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  image: {
    width: width / 4,
    height: width / 3,
    backgroundColor: colors.grey,
    borderRadius: 5,
  },
  content: {
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cts: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
})
