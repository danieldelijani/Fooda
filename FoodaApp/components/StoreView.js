import React, {useState} from 'react';
import {View, StyleSheet, Button, Modal, Dimensions} from 'react-native';
import { Avatar, Card, IconButton, Divider, Text } from 'react-native-paper';
import Swiper from 'react-native-swiper'
import StarRating from 'react-native-star-rating';


const StoreView = (props) => {
    console.log(props.storeInfo)
    store_name = props.storeInfo.title;
    const store_name_lower = store_name.toLowerCase().split(" ").join("")
    rating = props.storeInfo.rating;
    if (!Number.isFinite(rating)){
        rating = 0; // if rating is not a number we set it to 0
      }

    price_level = props.storeInfo.price_level;
    if (!Number.isFinite(price_level)){
        price_level = 0; // if price_level is not a number we set it to 0
    }

    items_available = Math.floor(Math.random() * 18);
    items_total = items_available + 1;
    total_price = Math.round(Math.random() * 10000) / 100;
    var stores = {}
    if (['amazon', 'costco', 'starmarket', 'targetgrocery', 'traderjoes', 'wholefoods', 'hongkongsupermarket'].indexOf(store_name_lower) !== -1) {
        var logo_image = '../resources/store-logos/' + store_name_lower
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
                <View style={{flex:4}}>
                <Swiper //Implements swiping functionality
                showsPagination={true}
                loop={false}
                index={0}
                dot={<View style={{backgroundColor:'#FBE0CE', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: -30,}} />}
                activeDot={<View style={{backgroundColor: '#CC7C48', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: -30,}} />}
                >
                    <View description="page one" style={{flex:1}}>
                        <View style={{flexDirection:'row', flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#FFF6F0', borderRadius: 10, margin:10}}>
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
                            
                        <View style={{flexDirection:'row', flex:1, backgroundColor: '#FFF6F0', alignItems:'center', margin: 10, justifyContent:'center', justifySelf:'center', borderRadius: 10}}>
                            <View styles={{flexDirection:'column', flex:1, backgroundColor: '#FFF6F0', borderRadius: 10, margin: 5, justifyContent:'flex-start'}}>
                                <Text style={{fontSize: 16}}> Items {"\n"} Available </Text>
                                <Text style={styles.itemAvail}>{items_available}</Text>
                                <Text style={styles.itemAvail}>━</Text>
                                <Text style={styles.itemAvail}>18</Text>
                            </View>
                            <View styles={{flexDirection:'column', flex:1, backgroundColor: '#FFF6F0', borderRadius: 10, margin: 5, justifyContent:'center', justifySelf:'center'}}>
                                <Text>Total Cost:</Text>
                                <Text style={{fontSize:32}}>${total_price}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', flex:.1}}> 
                        {/* empty row to add space for the page indicator dots 
                        (so theyre not overlayed on the content) */}
                        </View>
                    </View>
                    <View description="page two" style={{flex:1}}>
                        <View style={{flexDirection:'row', flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#FFF6F0', borderRadius: 10, margin:10}}>
                            <View styles={{}}>
                                <IconButton
                                icon="walk"
                                size={20}/>
                                <Text>12 min</Text>

                                <IconButton
                                icon="train"
                                size={20}/>
                                <Text>7 min</Text>
                            </View>
                        </View>
                            <View style={{flexDirection:'row', flex:1, alignItems:'center', margin: 10, justifyContent:'space-between', justifySelf:'center', borderRadius: 10, backgroundColor:'transparent'}}>
                                <View styles={{flexDirection:'column', flex:1, backgroundColor: '#FFF6F0', borderRadius: 10, margin: 5, justifyContent:'flex-start'}}>
                                <Text>Affordability: {'\n'}</Text>
                                <StarRating
                                    disabled={true}
                                    emptyStar={'currency-usd'}
                                    fullStar={'currency-usd'}
                                    halfStar={'currency-usd'}
                                    iconSet={'MaterialCommunityIcons'}
                                    maxStars={4}
                                    rating={price_level}
                                    starSize={30}
                                    fullStarColor={'black'}
                                />
                                </View>
                                <View styles={{flexDirection:'column', flex:1, backgroundColor: '#FFF6F0', borderRadius: 10, margin: 5}}>
                                    <Text>Rating: {'\n'}</Text>
                                    <StarRating
                                    disabled={true}
                                    emptyStar={'star-outline'}
                                    fullStar={'star'}
                                    halfStar={'star-half'}
                                    iconSet={'MaterialCommunityIcons'}
                                    maxStars={5}
                                    rating={rating}
                                    fullStarColor={"gold"}
                                    starSize={30}
                                />
                                </View>
                            </View>
                        <View style={{flexDirection:'row', flex:.1}}> 
                        {/* empty row to add space for the page indicator dots 
                        (so theyre not overlayed on the content) */}
                        </View>
                    </View>
                </Swiper>
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