import React, {useEffect, useState } from 'react';
import { View, StyleSheet, Modal, Dimensions } from 'react-native';
import { Avatar, Card, IconButton, Divider, Text, Button } from 'react-native-paper';
import Swiper from 'react-native-swiper'
import StarRating from 'react-native-star-rating';
import { color } from 'react-native-reanimated';
import get_directions from '../apis/directions';
import {getTargetPrice, getTraderJoesPrice, getUnimplementedPrices} from '../apis/prices';

const StoreView = (props) => {
    // getTargetPrice("Milk");
    // getTraderJoesPrice("Milk");

    const [walkingDist, setWalkingDist] = useState("- mi");
    const [walkingTime, setWalkingTime] = useState("- min");
    const [transitTime, setTransitTime] = useState("- min");
    let placeID = 'place_id:' + props.storeInfo.place_id;
    let user_lat = props.userLocation["coords"]["latitude"];
    let user_long = props.userLocation["coords"]["longitude"];
    let user_loc = user_lat + ',' + user_long;

    useEffect(() => {
        console.log("called directions api");
        let resp = get_directions(user_loc, placeID, 'walking');
        resp.then((res) => {
            if (res) {
                var route = res['routes'][0];
                var leg = route['legs'][0]
                var walking_time = leg['duration']['text'];
                setWalkingTime(walking_time);
                var walking_dist = leg['distance']['text'];
                setWalkingDist(walking_dist + ' away');
            }
        })
        console.log("called directions api");
        let respt = get_directions(user_loc, placeID, 'transit');
        respt.then((rest) => {
            if (rest) {
                var route = rest['routes'][0];
                var leg = route['legs'][0]
                var transit_time = leg['duration']['text']
                setTransitTime(transit_time)
            }
        })
      }, [props.storeInfo.place_id]);

    let store_name = props.storeInfo.title;
    let store_name_lower = store_name.toLowerCase().replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '').split(" ").join("")
    let rating = props.storeInfo.rating;
    if (!Number.isFinite(rating)) {
        rating = 0; // if rating is not a number we set it to 0
    }
    let num_reviews = props.storeInfo.num_reviews;
    if (!Number.isFinite(num_reviews)) {
        num_reviews = 0; // if rating is not a number we set it to 0
    }
    let open_now = props.storeInfo.open_now;
    let price_level = props.storeInfo.price_level;
    if (!Number.isFinite(price_level)) {
        price_level = 0; // if price_level is not a number we set it to 0
    }

    let items_available = Math.floor(Math.random() * 18);
    let items_total = items_available + 1;
    let total_price = Math.round(Math.random() * 10000) / 100;
    let stores = {
        'amazonhublocker': require("../resources/store-logos/amazon.jpg"),
        'costco': require("../resources/store-logos/costco.jpg"),
        'starmarket': require("../resources/store-logos/starmarket.jpg"),
        'targetgrocery': require("../resources/store-logos/targetgrocery.jpg"),
        'traderjoes': require("../resources/store-logos/traderjoes.jpg"),
        'wholefoodsmarket': require("../resources/store-logos/wholefoodsmarket.jpg"),
        'hongkongsupermarket': require("../resources/store-logos/hongkongsupermarket.jpg"),
    }
    let logo_image;
    if (store_name_lower in stores) {
        logo_image = stores[store_name_lower]
    } else {
        logo_image = require("../resources/store-logos/default.png")
        //<Avatar.Icon size={50} icon="food-apple" color='#813300' style={{backgroundColor:'transparent'}}/>
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1 }}>
                    <Card.Title
                        title={store_name}
                        subtitle={walkingDist}
                        left={(props) => <Avatar.Image size={50} source={logo_image} style={{ backgroundColor: 'transparent' }} />
                        }
                        style={{ flex: 1 }}
                    />
                </View>
                <View style={{ flex: 4 }}>
                    <Swiper //Implements swiping functionality
                        showsPagination={true}
                        loop={false}
                        index={0}
                        dot={<View style={{ backgroundColor: '#FBE0CE', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: -30, }} />}
                        activeDot={<View style={{ backgroundColor: '#CC7C48', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: -30, }} />}
                    >
                        <View description="page one" style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'column', flex: 1, backgroundColor: '#FFF6F0', borderRadius: 10, margin: 10 }}>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <IconButton
                                        icon="walk"
                                        size={25} />
                                    <Text>{walkingTime}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <IconButton
                                        icon="train"
                                        size={25} />
                                    <Text>{transitTime}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', margin: 10, justifyContent: 'space-around', justifySelf: 'center', borderRadius: 10 }}>
                                <View styles={{ flexDirection: 'column', flex: 1, borderRadius: 10, margin: 5, justifyContent: 'flex-start' }}>
                                    <Text style={{ fontSize: 16 }}> Items {"\n"} Available </Text>
                                    <Text style={styles.itemAvail}>{items_available}</Text>
                                    <Text style={styles.itemAvail}>━</Text>
                                    <Text style={styles.itemAvail}>{items_total}</Text>
                                </View>
                                <View styles={{ flexDirection: 'column', flex: 1, borderRadius: 10, margin: 5, justifyContent: 'flex-start' }}>
                                    <Text>Total Cost:</Text>
                                    <Text style={{ fontSize: 32 }}>${total_price}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', flex: .1 }}>
                                {/* empty row to add space for the page indicator dots 
                                (so theyre not overlayed on the content) */}
                            </View>
                        </View>
                        <View description="page two" style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'column', flex: 1, backgroundColor: '#FFF6F0', borderRadius: 10, margin: 10 }}>
                                <View styles={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <IconButton
                                        icon="store"
                                        size={20} />
                                    {open_now ? <Text style={{ color: 'green' }}>Open Now</Text> : <Text style={{ color: 'red' }}>Closed</Text>}
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', margin: 10, justifyContent: 'space-around', justifySelf: 'center', borderRadius: 10 }}>
                                <View styles={{ flexDirection: 'column', flex: 1, backgroundColor: '#FFF6F0', borderRadius: 10, margin: 5, justifyContent: 'flex-start' }}>
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
                                <View styles={{ flexDirection: 'column', flex: 1, backgroundColor: '#FFF6F0', borderRadius: 10, margin: 5 }}>
                                    <Text>Rating: ({num_reviews} Reviews){'\n'}</Text>
                                    <StarRating
                                        disabled={true}
                                        maxStars={5}
                                        rating={rating}
                                        fullStarColor={"gold"}
                                        halfStarColor={"gold"}
                                        emptyStarColor={"gold"}
                                        starSize={30}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', flex: .1 }}>
                                {/* empty row to add space for the page indicator dots 
                                (so theyre not overlayed on the content) */}
                            </View>
                        </View>
                    </Swiper>
                </View>
                <View style={{ flexDirection: 'row', flex: .6, justifyContent: 'space-around', justifySelf: 'center', alignItems: 'center', }}>
                    <Button mode='outlined' color='#CC7C48' onPress={props.closeModal} title="Close">Close</Button>
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
        alignSelf: "center",
        justifyContent: "space-around",
        padding: 5,
        width: 330,
        height: 460,
        // justifyContent: "center",
        top: 234,
        backgroundColor: "#FFFFFF"
    },
    itemAvail: {
        fontSize: 28
    }
});

export default StoreView;