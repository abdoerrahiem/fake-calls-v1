import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import { addStorage, getStorage, URL } from '../utils'

export const chatType = {
  SET_CONVERSATIONS: 'SET_CONVERSATIONS',
  SET_ACTIVE_CONVERSATIONS: 'SET_ACTIVE_CONVERSATIONS',
}

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    conversations: [],
    activeConversation: null,
    people: [
      {
        id: 1,
        name: 'Abdur Rahim',
        image:
          'https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: 2,
        name: 'John Doe',
        image:
          'https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: 3,
        name: 'Jane Doe',
        image:
          'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
      },
      {
        id: 4,
        name: 'Cristoper Jordan',
        image:
          'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
      },
      {
        id: 5,
        name: 'Cristy Arum',
        image:
          'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
      },
      {
        id: 6,
        name: 'Alex',
        image:
          'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
      },
      {
        id: 7,
        name: 'Jamaludin',
        image:
          'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
      },
    ],
  }

  const chatReducer = (state, action) => {
    const type = action.type

    switch (type) {
      case chatType.SET_CONVERSATIONS:
        addStorage('conversations', action.payload)
        return {
          ...state,
          conversations: action.payload,
        }
      case chatType.SET_ACTIVE_CONVERSATIONS:
        return {
          ...state,
          activeConversation: action.payload,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

  const getConversations = async () => {
    const conversations = await getStorage('conversations')

    if (conversations) {
      dispatch({ type: chatType.SET_CONVERSATIONS, payload: conversations })
    } else {
      dispatch({ type: chatType.SET_CONVERSATIONS, payload: [] })
    }
  }

  return (
    <ChatContext.Provider
      value={{
        ...state,
        dispatch,
        getConversations,
      }}>
      {children}
    </ChatContext.Provider>
  )
}

// export const getConversations = () => async dispatch => {
//   const conversations = await getStorage('conversations')

//   console.log('convers: ', conversations)

//   //   dispatch({ type: chatType.GET_NOW_MOVIES_LOADING, payload: true })

//   //   axios
//   //     .get(`${URL}/movies/now?page=1`)
//   //     .then(res => {
//   //       const data = res.data.data
//   //       dispatch({ type: chatType.GET_NOW_MOVIES, payload: data.results })
//   //       dispatch({ type: chatType.GET_NOW_MOVIES_PAGE, payload: page + 1 })
//   //       dispatch({
//   //         type: chatType.GET_NOW_MOVIES_MAX_PAGE,
//   //         payload: data.total_pages,
//   //       })
//   //     })
//   //     .catch(err => console.log('err get now movies: ', err.response))
//   //     .finally(() =>
//   //       dispatch({ type: chatType.GET_NOW_MOVIES_LOADING, payload: false }),
//   //     )
// }
