import AsyncStorage from '@react-native-async-storage/async-storage'

export const colors = {
  brown: '#262D6B',
  white: '#fff',
  black: '#383838',
  grey: '#e9e9e9',
  yellow: '#fabe19',
  blue: '#008069',
  blueTwo: '#a0bddb',
  blueThree: '#E7FFDB',
}

export const fonts = {
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold',
  // semiBold: 'Montserrat-SemiBold',
}

export const URL = 'https://the-movies4u.herokuapp.com/api'

export const addStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.log(e)
  }
}

export const getStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return JSON.parse(value)
    }
  } catch (e) {
    console.log(e)
  }
}

export const removeStorage = async key => {
  await AsyncStorage.removeItem(key)
}

export const clearStorage = async () => {
  await AsyncStorage.clear()
}

export const applovin = {
  banner: '120a07659c8a3d39',
  interstitial: '90d57524932b8700',
  native: '8861bfa61a7a5d2e',
}

export const admobs = {
  banner: 'ca-app-pub-3940256099942544/6300978111',
}
