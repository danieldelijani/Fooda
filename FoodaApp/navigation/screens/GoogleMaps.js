import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {Component, useState, useEffect} from 'react';
import MapView, { Marker } from 'react-native-maps';
import Map from '../../components/Map';
import * as Location from 'expo-location';
import get_nearby_grocery_stores from '../../apis/places.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import StoreView from '../../components/StoreView';

const GoogleMaps = ({ navigation, route }) => {
  // let name = route.params.name;
  const [location, setLocation] = useState({
      "coords": {
        "longitude": -71.106918,
        "latitude": 42.350876
      }
    });

  // const [location, setLocation] = useState({
  //   "longitude": -71.106918,
  //   "latitude": 42.350876
  // });
  const [errorMsg, setErrorMsg] = useState("");

  const [groceryStores, setGroceryStores] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      let latitude = location["coords"]["latitude"].toString();
      let longitude = location["coords"]["longitude"].toString();
      let coordinates = latitude + "," + longitude;
      // TODO: change default radius to 1000 metres (from 500) for production
      get_nearby_grocery_stores(1000, coordinates, recieve_grocery_stores); 
    })();
  }, []);

  function recieve_grocery_stores(results) {
    results = results['results']
    let markers = []
    console.log(results)
    for (var i = 0; i < results.length; i++){
      let store = results[i];
      let store_name = store['name'];
      let latitude = store['geometry']['location']['lat'];
      let longitude = store['geometry']['location']['lng'];
      let store_loc = {
        latitude: latitude,
        longitude: longitude
      }
      let rating = store['rating'];
      let num_reviews = store['user_ratings_total']
      let price_level = store['price_level'];
      let open_now = store['opening_hours']['open_now']
      let place_id = store['place_id']
      
      markers.push({
        title: store_name,
        latlng: store_loc,
        description: "",
        price_level: price_level,
        rating: rating,
        num_reviews: num_reviews,
        open_now: open_now,
        place_id: place_id,
      })
    }
    setGroceryStores(markers)
  }

    return (
      <View style={styles.container}>
          <Map location = {location} groceryStores = {groceryStores}/>
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