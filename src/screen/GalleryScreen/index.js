import React from 'react'
import { Image, Pressable, View, Dimensions, ScrollView } from 'react-native'
import ImageView from 'react-native-image-viewing'

import {
  DefaultView,
  DefaultText,
  Distance,
  ApplovinNativeGallery,
  AdmobBanner,
} from '../../components'
import { colors, fonts } from '../../utils'
import GalleryHeader from './components/GalleryHeader'

const { width } = Dimensions.get('window')

const Tab = ({ onPress }) => {
  return (
    <Pressable android_ripple={{ color: colors.grey }} onPress={onPress}>
      <View
        style={{
          backgroundColor: colors.white,
          elevation: 5,
          width: width / 2.3,
          height: width / 2,
          borderRadius: 10,
          // marginBottom: 15,
        }}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
          }}
          resizeMode="cover"
          style={{
            width: width / 2.3,
            height: width / 2,
            backgroundColor: colors.grey,
            borderRadius: 10,
          }}
        />
      </View>
    </Pressable>
  )
}

export default function GalleryScreen({ navigation }) {
  const [data] = React.useState([
    1,
    2,
    3,
    'ads',
    4,
    5,
    'ads',
    6,
    7,
    8,
    9,
    'ads',
  ])
  const [visible, setIsVisible] = React.useState(false)

  return (
    <DefaultView backgroundColor={colors.blue} barStyle="light-content">
      <GalleryHeader navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 15 }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          {data.map((item, index) => {
            return item === 'ads' ? (
              <ApplovinNativeGallery key={index} />
            ) : (
              <Tab key={index} onPress={() => setIsVisible(true)} />
            )
          })}
        </View>
      </ScrollView>

      <ImageView
        images={[
          {
            uri: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
          },
        ]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />

      <AdmobBanner />
    </DefaultView>
  )
}
