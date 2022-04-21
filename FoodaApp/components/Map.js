import React, {Component, useState, useEffect} from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import {StyleSheet, Dimensions, View, Modal, Text} from 'react-native';
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
        <View>

          <StoreView storeInfo={this.state.currStore} modalVisible={this.state.modalVisible} closeModal={this.closeModal} />
            
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