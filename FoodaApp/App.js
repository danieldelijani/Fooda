import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MainContainer from './navigation/MainContainer.js';

export default function App() {
  return (
    <MainContainer />
  )
}

// const Stack = createNativeStackNavigator();

// const MyStack = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{ title: 'Welcome' }}
//         />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="GoogleMaps" component={GoogleMaps} />
//         <Stack.Screen name="GroceryList" component={GroceryList} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

//       // {/* <View style={styles.container}>
//       //   <Text>Welcome to Fooda</Text>
//       //   <Button title="Google Maps API"/>
//       //   <Button title="Shopping List"/>
//       //   <StatusBar style="auto" />
//       // </View> */}

// const HomeScreen = ({ navigation }) => {
//   return (
//     <View>
//       <Text>
//         This is the HomeScreen
//       </Text>
//       <Button
//         title="Go to Google Maps Demo"
//         onPress={() =>
//           navigation.navigate('GoogleMaps', { name: 'Jane' })
//         }
//       />
//       <Button
//         title="Go to Grocery List Demo"
//         onPress={() =>
//           navigation.navigate('GroceryList', { name: 'Jane' })
//         }
//       />
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});