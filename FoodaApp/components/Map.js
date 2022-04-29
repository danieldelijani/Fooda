import React, {Component, useState, useEffect} from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import {StyleSheet, Dimensions, View, Modal, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import StoreView from './StoreView';


class Map extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        region: {
          // latitude: this.props.location["latitude"],
          // longitude: this.props.location["longitude"],
          latitude: this.props.location["coords"]["latitude"],
          longitude: this.props.location["coords"]["longitude"],
          latitudeDelta: 0.02,
          longitudeDelta: 0.03,
        },
        modalVisible: false,
        // Change to whatever you want to pass to StoreView Object.
        // This we defaultly passed in
        currStore: {
          "description": "3.8",
          "image": {
            "uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
          },
          "latlng": {
            "latitude": 42.35139110000001,
            "longitude": -71.13172089999999,
          },
          "price_level": undefined,
          "title": "Allston Market",
          "place_id": 'ChIJf0QQ6cV544kR852uAss73Js'
        }
      };
      this.onRegionChange = this.onRegionChange.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.onPressMarker = this.onPressMarker.bind(this);
    }

    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }

    componentDidUpdate(prevProps) {
      if (this.props.location != prevProps.location) {
        this.setState({
          region: {
            latitude: this.props.location["coords"]["latitude"],
            longitude: this.props.location["coords"]["longitude"],
            latitudeDelta: 0.02,
            longitudeDelta: 0.03,
          }
        })
      }
    }
  
    onRegionChange(region) {
      this.setState({ region });
    }

    render() {
      return (
        <View>

          <StoreView userLocation = {this.props.location} storeInfo={this.state.currStore} modalVisible={this.state.modalVisible} closeModal={this.closeModal} />
    
          <MapView region={this.state.region} onRegionChange={this.onRegionChange} style={styles.map}>
            {this.props.groceryStores.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
                onPress={e => this.onPressMarker(marker)}
                image={require('../resources/redlocation.png')}
              />
            ))}
            <Marker coordinate={{latitude: this.props.location["coords"]["latitude"], longitude: this.props.location["coords"]["longitude"]}} 
                    image={require('../resources/street-view-80.png')}/>
          </MapView>
        </View>
      );
    };

    onPressMarker(marker){
      this.setModalVisible(true);
      this.setState({ currStore: marker });
      // console.log(marker);
    }

    closeModal() {
      this.setModalVisible(false);
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