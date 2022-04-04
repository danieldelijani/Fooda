import React, {Component, useState, useEffect} from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import {StyleSheet, Dimensions} from 'react-native';
import * as Location from 'expo-location';
import StoreView from './StoreView';


class Map extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        region: {
          latitude: this.props.location["latitude"],
          longitude: this.props.location["longitude"],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
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
          {this.props.groceryStores.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              onPress={e => this.onPressMarker(marker)}
              //image={marker.image}
            />
          ))}
        </MapView>
      );
    };

    onPressMarker(marker){
      console.log(marker);
      //render(StoreView(markers[index]))
    }

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