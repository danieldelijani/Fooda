import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import GoogleMaps from './GoogleMaps.js';

const GroceryList = ({ navigation, route }) => {
  let name = route.params.name;
  return (
    <Text>This is the Demo for Grocery List</Text>
  );
};

export default GroceryList;