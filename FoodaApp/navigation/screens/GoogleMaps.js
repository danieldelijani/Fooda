import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {Component, useState, useEffect} from 'react';
import MapView, { Marker } from 'react-native-maps';
import Map from '../../components/Map';
import * as Location from 'expo-location';

const GoogleMaps = ({ navigation, route }) => {
  // let name = route.params.name;
  const [location, setLocation] = useState({
      "longitude": -122.4324,
      "latitude": 37.78825,
    });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

    return (
      <View style={styles.container}>
        <Map location = {location}/>
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