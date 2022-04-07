import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Modal, Dimensions} from 'react-native';

const StoreView = (props) => {
    console.log(props.storeInfo); 
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                this.setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalView}>
              <Text>Hello World</Text>
              <Button onPress={props.closeModal} title="close pop-up"/>
            </View>
            {/* <View
                style={{
                flexDirection: "row",
                height: 100,
                padding: 20,
                backgroundColor: "white"
            }}> 
                <image 
                    style={{}}
                    source={marker.image}>
                </image>

                <Text>{marker.name}</Text>
                <Text>{marker.rating}</Text>
                <Text>{marker.price_level}</Text>
            </View> */}
        </Modal>
    );
  }

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

  export default StoreView;