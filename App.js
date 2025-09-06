// App.js

// React Native gesture handler ko import karna zaruri hai (navigation ke gestures ke liye)
import 'react-native-gesture-handler';
import React from 'react';

// Navigation ke liye required packages
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Cart context (global state management) ko wrap karne ke liye
import { CartProvider } from './context/CartContext';

// 📌 Saare screen components import kiye
import StarterScreen from './screens/StarterScreen';
import MainCourseScreen from './screens/MainCourseScreen';
import DessertScreen from './screens/DessertScreen';
import SidesScreen from './screens/SidesScreen';
import IngredientsScreen from './screens/IngredientsScreen';

// ✅ Top Tab Navigator (menu categories ke liye)
const Tab = createMaterialTopTabNavigator();
// ✅ Stack Navigator (different screens ke beech navigation ke liye)
const Stack = createNativeStackNavigator();

// 📌 Tabs component banaya jo starter, main course, dessert aur sides ko dikhayega
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        // Tab bar ke labels ka styling
        tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
        // Active tab indicator ki styling
        tabBarIndicatorStyle: { backgroundColor: '#ff6600', height: 3 },
        // Tab bar ki overall styling
        tabBarStyle: { backgroundColor: '#fff' },
      }}
    >
      {/* Har ek Tab ek screen represent karta hai */}
      <Tab.Screen name="Starters" component={StarterScreen} />
      <Tab.Screen name="Main Course" component={MainCourseScreen} />
      <Tab.Screen name="Desserts" component={DessertScreen} />
      <Tab.Screen name="Sides" component={SidesScreen} />
    </Tab.Navigator>
  );
}

// 🔴 App ka main entry point
export default function App() {
  return (
    // CartProvider pura app wrap karta hai taake cart ka data globally accessible ho
    <CartProvider>
      {/* NavigationContainer app ke andar navigation ka root wrapper hai */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Menu">
          
          {/* Main Tabs ko stack ka default screen banaya */}
          <Stack.Screen
            name="Menu"
            component={MainTabs}
            options={{ headerShown: false }} // header hataya (kyunki tab bar already hai)
          />

          {/* Ingredients screen (detail view ke liye) */}
          <Stack.Screen
            name="Ingredients"
            component={IngredientsScreen}
            options={{ title: 'Ingredient list' }} // custom header title
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
