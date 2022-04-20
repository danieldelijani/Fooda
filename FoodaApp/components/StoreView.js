import React, {useState} from 'react';
import {View, StyleSheet, Button, Modal, Dimensions} from 'react-native';
import { Avatar, Card, IconButton, Divider, Text } from 'react-native-paper';


const StoreView = (props) => {
    console.log(props.storeInfo);
    store_name = props.storeInfo.title;
    rating = props.storeInfo.description;
    items_available = Math.floor(Math.random() * 18);
    items_total = items_available + 1;
    total_price = Math.round(Math.random() * 10000) / 100;
    const store_name_lower = store_name.toLowerCase().split(" ").join("")
    console.log(store_name_lower)
    var stores = {}
    if (store_name_lower in ['amazon', 'costco', 'starmarket', 'targetgrocery', 'traderjoes', 'wholefoods']) {
        const logo_image = '../resources/store-logos/' + store_name_lower
        console.log(logo_image)
    }
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
                <View style={{flexDirection:'row', justifyContent:'space-around', flex:1}}>
                <Card.Title
                title={store_name}
                subtitle="0.5 mi away" //TODO: add accurate distance info 
                left={(props) => <Avatar.Icon size={50} icon="food-apple" color='#813300' style={{backgroundColor:'transparent'}}/>}
                style={{flex:1}}
                />
                </View>

                <View style={{flexDirection:'row', flex:2, justifyContent:'center', alignItems:'center', backgroundColor: '#FFF6F0', borderRadius: 10, margin:10}}>
                    <View styles={{}}>
                        <IconButton
                        icon="walk"
                        size={20}/>
                        <Text> 12 min</Text>

                        <IconButton
                        icon="train"
                        size={20}/>
                        <Text> 7 min</Text>

                    </View>
                </View>
                    
                <View style={{flexDirection:'row', flex:2, backgroundColor: '#FFF6F0', alignItems:'center', margin: 10, justifyContent:'center', justifySelf:'center', borderRadius: 10}}>
                    <View styles={{flexDirection:'column', flex:1, backgroundColor: '#FFF6F0', borderRadius: 10, margin: 5, justifyContent:'flex-start'}}>
                        <Text style={{fontSize: 16}}> Items {"\n"} Available </Text>
                        <Text style={styles.itemAvail}>{items_available}</Text>
                        <Text style={styles.itemAvail}>━</Text>
                        <Text style={styles.itemAvail}>18</Text>
                    </View>
                    <View styles={{flexDirection:'column', flex:1, backgroundColor: 'white', borderRadius: 10, margin: 5, justifyContent:'center', justifySelf:'center'}}>
                        <Text>Total Cost:</Text>
                        <Text style={{fontSize:32}}>${total_price}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row', flex: .5, justifyContent:'center', justifySelf:'center', alignItems:'flex-end'}}>
                    <Button onPress={props.closeModal} title="Close"/>
                    <Button title="Start Trip"/>
                </View>
                
            </View>
        </Modal>
    );
  }

const styles = StyleSheet.create({
    title: {
        // alignSelf:"flex-start",
        marginTop: 30,
        // position: "relative",
        // "fontStyle": "normal",
        fontWeight: "700",
        fontSize: 25,
        flex: 4,
        alignSelf: 'center'
        // "color": "#000000"
    },
    modalView: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        // position: "absolute",
        alignSelf:"center",
        justifyContent: "space-around",
        padding:5,
        width: 330,
        height: 460,
        // justifyContent: "center",
        alignItems: "stretch",
        top: 234,
        backgroundColor: "#FFFFFF"
    },
    itemAvail:{
        fontSize: 28
    }
});

  export default StoreView;