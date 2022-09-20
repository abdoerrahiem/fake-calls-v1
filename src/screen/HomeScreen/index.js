import { View, Pressable, ScrollView, Linking } from 'react-native'
import React, { useContext } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Share from 'react-native-share'
import LinearGradient from 'react-native-linear-gradient'

import {
  AdmobBanner,
  ApplovinBanner,
  DefaultText,
  DefaultView,
  Distance,
} from '../../components'
import { colors, fonts } from '../../utils'
import { ChatContext } from '../../context/ChatContext'
import ApplovinNative from '../../components/ApplovinNative'

const Tab = ({ title, subtitle, iconName, onPress, allColors }) => {
  return (
    <Pressable android_ripple={{ color: colors.grey }} onPress={onPress}>
      <LinearGradient
        colors={allColors}
        style={{
          flex: 1,
          paddingHorizontal: 15,
          borderRadius: 7,
          marginVertical: 5,
          marginHorizontal: 15,
          flexDirection: 'row',
          alignItems: 'center',
          elevation: 3,
          backgroundColor: 'transparent',
        }}>
        <MaterialCommunityIcons
          name={iconName}
          size={40}
          color={colors.white}
        />
        <Distance width={15} />
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 15,
          }}>
          <Distance width={10} />
          <View style={{ flex: 1 }}>
            <DefaultText
              title={title}
              fontFamily={fonts.medium}
              fontSize={16}
            />
            <Distance height={5} />
            <DefaultText title={subtitle} color="#c6c6c6" />
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={50}
            color={allColors[1]}
          />
        </View>
      </LinearGradient>
    </Pressable>
  )
}

export default function HomeScreen({ navigation }) {
  const { getConversations } = useContext(ChatContext)

  const [showAds, setShowAds] = React.useState(false)

  React.useEffect(() => {
    getConversations()

    setTimeout(() => {
      setShowAds(true)
    }, 5000)
  }, [])

  return (
    <DefaultView backgroundColor="#B129E0" barStyle="light-content">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}>
        <LinearGradient
          colors={['#B129E0', '#D36249']}
          style={{
            backgroundColor: colors.blue,
            height: 150,
            justifyContent: 'center',
          }}>
          <DefaultText
            title="FAKE CHAT & VIDEO CALL"
            fontFamily={fonts.medium}
            fontSize={18}
            textAlign="center"
            color={colors.white}
          />
        </LinearGradient>
        <Distance height={30} />
        <Tab
          title="CONTACTS"
          iconName="contacts"
          onPress={() => navigation.navigate('ContactScreen')}
          subtitle="Chat and call your hero"
          allColors={['#20D5B3', '#61EED4']}
        />
        <Tab
          title="GALLERY"
          iconName="image-album"
          onPress={() => navigation.navigate('GalleryScreen')}
          subtitle="See your hero photos"
          allColors={['#D527E1', '#ED4DF8']}
        />

        {showAds && <ApplovinNative />}

        <Tab
          title="SHARE"
          iconName="share-variant"
          onPress={() => {
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
          }}
          subtitle="Share it to your friends"
          allColors={['#EF7D36', '#FF9F63']}
        />
        <Tab
          title="RATE US"
          iconName="star-box-multiple"
          onPress={() =>
            Linking.openURL(
              'https://play.google.com/store/apps/details?id=com.ea.game.pvzfree_row&hl=en&gl=US',
            )
          }
          subtitle="Like 5 start & comment"
          allColors={['#2897E0', '#57BBFD']}
        />
        <Distance height={50} />
      </ScrollView>

      <AdmobBanner />
    </DefaultView>
  )
}
