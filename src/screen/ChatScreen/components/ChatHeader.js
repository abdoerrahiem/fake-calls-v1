import { Image, StyleSheet, Linking, View } from 'react-native'
import React, { useContext } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu'
import Share from 'react-native-share'

import { colors, fonts } from '../../../utils'
import { DefaultText, Distance } from '../../../components'
import { ChatContext } from '../../../context/ChatContext'

export default function ChatHeader({ navigation, isWriting, isOnline }) {
  const { activeConversation } = useContext(ChatContext)

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="arrow-left"
        color={colors.white}
        size={24}
        onPress={() => navigation.goBack()}
      />
      <Distance width={10} />
      <Image
        source={{
          uri: activeConversation.image,
        }}
        resizeMode="cover"
        style={{
          width: 40,
          height: 40,
          backgroundColor: colors.grey,
          borderRadius: 999,
        }}
      />
      <Distance width={10} />
      <View style={{ flex: 1 }}>
        <DefaultText
          title={activeConversation.name}
          color={colors.white}
          numberOfLines={1}
          fontFamily={fonts.medium}
          fontSize={16}
        />
        <DefaultText
          title={
            isWriting ? 'typing...' : isOnline ? 'Online' : 'Seen recently'
          }
          fontSize={12}
          color={colors.white}
        />
      </View>
      <MaterialCommunityIcons
        name="video"
        color={colors.white}
        size={26}
        onPress={() => navigation.navigate('CallScreen')}
      />
      <Distance width={15} />
      <Menu>
        <MenuTrigger
          children={
            <MaterialCommunityIcons
              name="dots-vertical"
              color={colors.white}
              size={20}
            />
          }
        />
        <MenuOptions>
          <MenuOption
            onSelect={() =>
              Share.open({
                title: 'Fake Chat & Video Call',
                message:
                  'Download App: https://play.google.com/store/apps/details?id=com.ea.game.pvzfree_row&hl=en&gl=US',
              })
                .then(res => {
                  console.log(res)
                })
                .catch(err => {
                  err && console.log(err)
                })
            }>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="share-variant" size={20} />
              <Distance width={7} />
              <DefaultText title="Share" />
            </View>
          </MenuOption>
          <MenuOption
            onSelect={() =>
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.ea.game.pvzfree_row&hl=en&gl=US',
              )
            }>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="star-box-multiple" size={20} />
              <Distance width={7} />
              <DefaultText title="Rate App" />
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
