import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Modal, Dimensions} from 'react-native';

const StoreView = (props) => {
    console.log(props.storeInfo);
    store_name = props.storeInfo.title;
    rating = props.storeInfo.description;
    items_available = Math.floor(Math.random() * 18);
    items_total = items_available + 1;
    total_price = Math.round(Math.random() * 10000) / 100;
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
                <Text style={styles.title}>{store_name}</Text>
                <View style={{flexDirection:'row', flex:1}}>
                    <View style={{flexDirection:'column', flex:1, justifyContent:'center', alignItems:'center'}}>
                        <View styles={styles.square}>
                            <Text>Hello1</Text>
                        </View>
                        <View styles={styles.square}>
                            <Text>Hello2</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'column', flex:1, justifyContent:'center',alignItems:'center'}}>
                        <View styles={styles.square}>
                            <Text>Hello3</Text>
                        </View>
                        <View styles={styles.square}>
                            <Text>Hello4</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row', marginBottom: 30}}>
                    <Button onPress={props.closeModal} title="Close"/>
                    <Button title="Start Trip"/>
                </View>
                
            </View>
        </Modal>
    );
  }

const styles = StyleSheet.create({
    square: {
        height: 100,
        width: 100,
        backgroundColor: "#FFEBDD",
        flex:1
    },
    title: {
        // alignSelf:"flex-start",
        marginTop: 30,
        // position: "relative",
        // "fontStyle": "normal",
        fontWeight: "700",
        fontSize: 25,
        // "color": "#000000"
    },
    // container: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    modalView: {
        borderRadius: 10,
        // position: "absolute",
        alignSelf:"center",
        justifyContent: "space-between",
        width: 330,
        height: 460,
        // justifyContent: "center",
        alignItems: "center",
        // "flex":1,
        top: 234,
        backgroundColor: "#FFFFFF"
    },
});

  export default StoreView;