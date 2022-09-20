import { AppRegistry, LogBox } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import AppLovinMAX from 'react-native-applovin-max'
import mobileAds from 'react-native-google-mobile-ads'

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    console.log('initialize admob: ', adapterStatuses)
  })

AppLovinMAX.initialize(
  '7kF18ZoOa6m-I0IruqcGNsK5bfUpOlS9JxOhZ3aB4VnSNaInKQ2Zacn_hb6yq4RMn_LoPpPCFir3dquJis7rGS',
  configuration => {
    console.log('initialize applovin: ', configuration)
  },
)

LogBox.ignoreLogs(['new NativeEventEmitter()'])

AppRegistry.registerComponent(appName, () => App)
