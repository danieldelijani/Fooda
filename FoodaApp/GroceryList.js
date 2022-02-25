import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddItem from './components/AddItem';

const GroceryList = ({ navigation, route }) => {
  let name = route.params.name;

  const addItem = (text) => {
    if (!text) {
      Alert.alert(
        'Error',
        'Please enter an item',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      setItems((prevItems) => {
        return [{id: Math.random(), text}, ...prevItems];
      });
    }
  };
  
  return (
    <View>
      <Text>This is the Demo for Grocery List</Text>
      <AddItem addItem={addItem} />
    </View>
  );
};

export default GroceryList;