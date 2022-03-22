import React, {Component, useState, useEffect} from 'react';
import MapView, { Marker } from 'react-native-maps';
import {StyleSheet, Dimensions} from 'react-native';
import * as Location from 'expo-location';


class Map extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        region: {
          latitude: this.props.location["latitude"],
          longitude: this.props.location["longitude"],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        },
        markers: [
          {
            latlng: {latitude: this.props.location["latitude"], longitude: this.props.location["longitude"]},
            title: 'Foo Place',
            description: 'Da crib'
          }
        ]
      };
      this.onRegionChange = this.onRegionChange.bind(this);
    }

    componentDidUpdate(prevProps) {
      if (this.props.location != prevProps.location) {
        this.setState({
          region: {
            latitude: this.props.location["coords"]["latitude"],
            longitude: this.props.location["coords"]["longitude"],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }
        })
      }
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

export default Map;