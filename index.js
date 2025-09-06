/**
 * @format
 * Ye auto-generated comment hota hai jo batata hai
 * ki ye file project ka entry point hai.
 */

// ✅ Gesture handling ke liye import (React Navigation me required hai)
import 'react-native-gesture-handler';

// ✅ React Native ke core module se AppRegistry import kiya
import { AppRegistry } from 'react-native';

// ✅ Apna main App component import kiya (yahi UI aur navigation ka root hai)
import App from './App';

// ✅ app.json me jo name diya hai (project ka identifier) usse import kiya
import { name as appName } from './app.json';

// ✅ Register kar rahe hain App ko React Native ke AppRegistry me
// iska matlab: jab app run hoga toh yehi component sabse pehle load hoga
AppRegistry.registerComponent(appName, () => App);
