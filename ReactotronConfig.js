import Reactotron, { trackGlobalErrors } from 'reactotron-react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure()
  .use(trackGlobalErrors()) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
