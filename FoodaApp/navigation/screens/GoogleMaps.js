import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {Component, useState, useEffect} from 'react';
import MapView, { Marker } from 'react-native-maps';
import Map from '../../components/Map';
import * as Location from 'expo-location';
import get_nearby_grocery_stores from '../../apis/places.js';
import DropDownMenuForMaps from '../../components/DropDownMenuForMaps';

const GoogleMaps = ({ navigation, route }) => {
  const [currentlySelectedList, updateCurrentlySelectedList] = useState([])
  const [location, setLocation] = useState({
      "coords": {
        "longitude": -71.106918,
        "latitude": 42.350876
      }
    });
  const [errorMsg, setErrorMsg] = useState("");
  const [groceryStores, setGroceryStores] = useState([]);

  const updatelistForDropDown = (list) => {
    updateCurrentlySelectedList(list)
    console.log("this is the data that is uploaded to maps")
  }

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

      markers.push({
        title: store_name,
        latlng: store_loc,
        description: "",
        price_level: price_level,
        rating: rating,
        num_reviews: num_reviews,
        open_now: open_now,
      })
    }
    setGroceryStores(markers)
  }

    return (
      <View >
          <DropDownMenuForMaps updateList = {updatelistForDropDown}/>
          <Map location = {location} groceryStores = {groceryStores} list = {currentlySelectedList}/>
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
    width: Dimensions.get('window').width - 1000,
    height: Dimensions.get('window').height,
  },
});

  export default GoogleMaps;