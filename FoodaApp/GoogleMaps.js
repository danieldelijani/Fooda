import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import GroceryList from './GroceryList.js';

const GoogleMaps = ({ navigation, route }) => {
    let name = route.params.name;
    return (
      <Text>This is the Demo for Google Maps</Text>
    );
  };

  export default GoogleMaps;