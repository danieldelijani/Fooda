import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {Component} from 'react';
import GroceryList from './GroceryList.js';
import MapView, { Marker } from 'react-native-maps';
import Map from './components/Map';

const GoogleMaps = ({ navigation, route }) => {
    // let name = route.params.name;

    return (
      <View style={styles.container}>
        <Map />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

  export default GoogleMaps;