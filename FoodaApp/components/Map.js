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
        modalVisible: false
      };
      this.onRegionChange = this.onRegionChange.bind(this);
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
      const modalVisible = this.state.modalVisible;
      return (
        <View>
            
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModalVisible(!modalVisible);
            }}
            >
              <View style={styles.modalView}>
              <Text>Hello World</Text>
              </View>
          </Modal>
            
          <MapView region={this.state.region} onRegionChange={this.onRegionChange} style={styles.map}>
            {this.props.groceryStores.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
                onPress={e => this.setModalVisible(true)}
              />
            ))}
          </MapView>
        </View>
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
modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  height: 700,
  width: 700
},
map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
},
});

export default Map;