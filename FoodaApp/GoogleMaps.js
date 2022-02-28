import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {Component} from 'react';
import GroceryList from './GroceryList.js';
import MapView, { Marker } from 'react-native-maps';

const GoogleMaps = ({ navigation, route }) => {
    // let name = route.params.name;

    return (
      <View style={styles.container}>
        <Map />
      </View>
    );
  };

class Map extends Component {
  constructor() {
    super();
    
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      markers: [
        {
          latlng: {latitude: 37.78825, longitude: -122.4324},
          title: 'Foo Place',
          description: 'Da crib'
        }
      ]
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <MapView region={this.state.region} onRegionChange={this.onRegionChange} style={styles.map}>
        {this.state.markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    );
  };
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