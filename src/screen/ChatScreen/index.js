import React, { useContext } from 'react'
import { FlatList, View, ImageBackground } from 'react-native'
import axios from 'axios'

import { DefaultView, DefaultText, AdmobBanner } from '../../components'
import { ChatContext, chatType } from '../../context/ChatContext'
import { colors } from '../../utils'
import ChatFooter from './components/ChatFooter'
import ChatHeader from './components/ChatHeader'
import conversations1 from '../../assets/json/conversations1.json'

const Chat = ({ isLeft, text }) => {
  return (
    <View
      style={{
        alignSelf: isLeft ? 'flex-start' : 'flex-end',
        backgroundColor: isLeft ? colors.white : colors.blueThree,
        marginBottom: 10,
        padding: 15,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: colors.grey,
        maxWidth: '90%',
      }}>
      <DefaultText title={text} />
    </View>
  )
}

export default function ChatScreen({ navigation }) {
  const { dispatch, activeConversation, conversations } =
    useContext(ChatContext)

  const [text, setText] = React.useState('')
  const [data, setData] = React.useState(
    [],
    // conversations.filter(item => item.id === activeConversation.id),
  )
  const [isWriting, setisWriting] = React.useState(false)
  const [isOnline, setIsOnline] = React.useState(false)
  const [questionIndex, setQuestionIndex] = React.useState(0)
  const [Questions] = React.useState(conversations1)

  const onPress = () => {
    if (text.length > 0) {
      const currentText = text

      setData(old => [
        { isLeft: false, text: text.trim(), id: activeConversation.id },
        ...old,
      ])

      // dispatch({
      //   type: chatType.SET_CONVERSATIONS,
      //   payload: [
      //     { isLeft: false, text: text.trim(), id: activeConversation.id },
      //     ...conversations,
      //   ],
      // })

      setText('')

      setTimeout(() => {
        setIsOnline(true)
      }, 500)

      setTimeout(() => {
        setisWriting(true)
        //   axios
        //     .post(`https://www.conversationstarters.com/random.php`)
        //     .then(res => {
        //       const data = res.data
        //       if (data) {
        //         const question = data.split('>')[1]

        //         setData(old => [
        //           {
        //             isLeft: true,
        //             text: question,
        //             id: activeConversation.id,
        //           },
        //           ...old,
        //         ])

        //         dispatch({
        //           type: chatType.SET_CONVERSATIONS,
        //           payload: [
        //             {
        //               isLeft: true,
        //               text: question,
        //               id: activeConversation.id,
        //             },
        //             {
        //               isLeft: false,
        //               text: currentText.trim(),
        //               id: activeConversation.id,
        //             },
        //             ...conversations,
        //           ],
        //         })
        //       }
        //     })
        //     .catch(err => console.log('err get question: ', err.response))
        //     .finally(() => {
        //       setisWriting(false)
        //       setTimeout(() => {
        //         setIsOnline(false)
        //       }, 15000)
        //     })
      }, 1500)

      setTimeout(() => {
        if (Questions.length - (questionIndex + 1) === -1) {
          setData(old => [
            {
              isLeft: true,
              text: 'Thanks',
              id: activeConversation.id,
            },
            ...old,
          ])
          setisWriting(false)
          setQuestionIndex(questionIndex + 1)
        } else if (Questions.length - (questionIndex + 1) < 0) {
          setisWriting(false)
        } else {
          setData(old => [
            {
              isLeft: true,
              text: Questions[questionIndex],
              id: activeConversation.id,
            },
            ...old,
          ])
          setisWriting(false)
          setQuestionIndex(questionIndex + 1)

          if (Questions[questionIndex]?.toLowerCase().includes('nice')) {
            setIsOnline(true)
            setisWriting(true)

            setTimeout(() => {
              setData(old => [
                {
                  isLeft: true,
                  text: Questions[questionIndex + 1],
                  id: activeConversation.id,
                },
                ...old,
              ])
              setisWriting(false)
              setQuestionIndex(questionIndex + 2)
            }, 1000)
          }
        }
      }, 3000)

      setTimeout(() => {
        setIsOnline(false)
      }, 30000)
    }
  }

  return (
    <DefaultView backgroundColor={colors.blue} barStyle="light-content">
      <ChatHeader
        navigation={navigation}
        isWriting={isWriting}
        isOnline={isOnline}
      />
      <ImageBackground
        source={require('../../assets/images/wa-background.png')}
        resizeMode="cover"
        style={{ flex: 1 }}>
        <FlatList
          inverted
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return <Chat isLeft={item.isLeft} text={item.text} />
          }}
          contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 5 }}
        />
        <ChatFooter
          value={text}
          handleChangeText={value => setText(value)}
          onPress={onPress}
        />
      </ImageBackground>
      <AdmobBanner />
    </DefaultView>
  )
}
