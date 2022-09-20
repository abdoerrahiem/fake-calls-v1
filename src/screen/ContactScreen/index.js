import React, { useContext } from 'react'
import { FlatList, Pressable, View, Image } from 'react-native'

import {
  DefaultView,
  DefaultText,
  Distance,
  Input,
  AdmobBanner,
} from '../../components'
import ApplovinNative from '../../components/ApplovinNative'
import { ChatContext, chatType } from '../../context/ChatContext'
import { colors, fonts } from '../../utils'
import ContactHeader from './components/ContactHeader'

const Tab = ({ title, image, onPress }) => {
  return (
    <Pressable android_ripple={{ color: colors.grey }} onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          borderBottomWidth: 1,
          borderBottomColor: colors.grey,
        }}>
        <Image
          source={{
            uri: image,
          }}
          resizeMode="cover"
          style={{
            width: 50,
            height: 50,
            backgroundColor: colors.grey,
            borderRadius: 999,
          }}
        />
        <Distance width={15} />
        <DefaultText title={title} flex={1} fontFamily={fonts.medium} />
      </View>
    </Pressable>
  )
}

export default function ContactScreen({ navigation }) {
  const { dispatch, people } = useContext(ChatContext)

  const [data, setData] = React.useState(people)
  const [showSearch, setShowSearch] = React.useState(false)
  const [search, setSearch] = React.useState('')

  const handleChangeText = value => {
    setSearch(value)

    const filtered = people.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    )

    value.length > 0 ? setData(filtered) : setData(people)
  }

  const handlePress = item => {
    navigation.navigate('ChatScreen')
    dispatch({ type: chatType.SET_ACTIVE_CONVERSATIONS, payload: item })
  }

  return (
    <DefaultView backgroundColor={colors.blue} barStyle="light-content">
      <ContactHeader
        handleSearch={() => setShowSearch(!showSearch)}
        navigation={navigation}
        setDefaultData={() => {
          setData(people)
          setSearch('')
        }}
      />
      {showSearch && (
        <Input
          autoFocus
          placeholder="Search"
          marginHorizontal={15}
          marginVertical={10}
          returnKeyType="search"
          value={search}
          handleChangeText={handleChangeText}
        />
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <>
            <Tab
              title={item.name}
              image={item.image}
              onPress={() => handlePress(item)}
            />
            {index !== 0 && (index + 1) % 3 === 0 && <ApplovinNative />}
          </>
        )}
        contentContainerStyle={{ paddingVertical: 5 }}
      />

      <AdmobBanner />
    </DefaultView>
  )
}
