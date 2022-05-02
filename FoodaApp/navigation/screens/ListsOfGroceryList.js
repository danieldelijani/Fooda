import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, SectionList, Image} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, PTSerifCaption_400Regular} from '@expo-google-fonts/pt-serif-caption';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import fruits from '../../assets/fruits.png'

const ListsOfGroceryList = ({ navigation, route }) => {
    let [fontsLoaded] = useFonts({ PTSerifCaption_400Regular});
    const [currentID, setNewID] = useState(0)
    const [listsOfGroceryLists, updateListsOfGroceryLists] = useState([])
    const [groceryListsDisplay, updateGroceryListsDisplay] = useState([])

    const storeData = async (key, value) => {
        try {
            ///await AsyncStorage.removeItem(key)
          await AsyncStorage.setItem(key, value)
          console.log(value)
        } catch (e) {
          console.log(e)
        }
      }

    const countNumOfItem = (GroceryList) =>{
        let count = 0
        for(let i = 0; i < GroceryList.length;i++){
            count += GroceryList[i].data.length
        }
        return count 
    }

    const convertListToString = (GroceryList) => {
        let stringArray = []
        for(let i = 0; i < GroceryList.length;i++){
            for(let j = 0; j < GroceryList[i].data.length;j++){
                stringArray.push(GroceryList[i].data[j])
            }
        }
        return stringArray
    }

    if (route.params.alreadyCreated){
        MyJsonGroceryListsDisplay = [...groceryListsDisplay]
        MyJsonListsOfGroceryLists = [...listsOfGroceryLists]
        for(let i = 0; i < groceryListsDisplay.length;i++){
            if(groceryListsDisplay[i].ID == route.params.ID){
                MyJsonGroceryListsDisplay[i] = {
                    ID: route.params.ID,
                    name: route.params.name,
                    num: countNumOfItem(route.params.list),
                    items: route.params.list
                }
                MyJsonListsOfGroceryLists[i] = {
                    ID: route.params.ID,
                    name: route.params.name,
                    items: convertListToString(route.params.list)
                }
            }
        }
        storeData('ListsOfLists', JSON.stringify({ListsOfLists: listsOfGroceryLists}))
        delete route.params.list
        delete route.params.name
    } else if(route.params.list){
        updateGroceryListsDisplay([...groceryListsDisplay,{
            ID: currentID,
            name: route.params.name,
            num: countNumOfItem(route.params.list),
            items: route.params.list
        }])
        myJson = [...listsOfGroceryLists, {
            ID: currentID,
            name: route.params.name,
            items: convertListToString(route.params.list)
        }]
        updateListsOfGroceryLists(myJson)
        setNewID(currentID+1)
        storeData('ListsOfLists', JSON.stringify({ListsOfLists: myJson}))
        delete route.params.list
        delete route.params.name
    }

    if (!fontsLoaded) {
        return <AppLoading />;
      } else { 
        return(
            <View style = {styles.container}>
                <Text style = {styles.header}> Grocery Lists</Text>
                <Image source={fruits} />
                <FlatList
                    data={groceryListsDisplay}
                    renderItem = { ({item}) => 
                                    <View style = {styles.card}>
                                    <TouchableOpacity
                                        onPress={() => {navigation.navigate("GroceryList", {
                                            ID: item.ID,
                                            name: item.name,
                                            list: item.items
                                        })}}
                                    >
                                        <Text style = {styles.cardtext}> {item.name} </Text>
                                        <Text style = {styles.cardtext}> {item.num} items </Text>
                                    </TouchableOpacity>
                                    </View>
                                }
                    contentContainerStyle={styles.listView}
                    
                />
                <TouchableOpacity 
                    style = {styles.addBtn}
                    onPress={() => {navigation.navigate("GroceryList")}}
                >
                    <Text style = {styles.addBtnText}> Create New List </Text>
                </TouchableOpacity>
            </View>
        )
      }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF6F0",
        flex: 1
    }, 
    header: {
        fontFamily: 'PTSerifCaption_400Regular', 
        fontStyle: 'normal',
        fontWeight: "bold",
        fontSize: 30,
        lineHeight: 40,
        color: "#813300", 
    }, 
    addBtn: {
        backgroundColor: "#FBE0CE",
        borderRadius: 10,
        width: 316,
        height: 50,
        marginLeft: "auto",
        marginRight: "auto"
    },
    addBtnText:{
        fontFamily: 'PTSerifCaption_400Regular', 
        textAlign: "center",
        fontStyle: 'normal',
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: 40,
        color: "#000000"
    }, 
    listView: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }, 
    card: {
        backgroundColor: "#FFEBDD",
        borderRadius: 10, 
        width: 142,
        height: 142,
        marginLeft: 10,
        marginTop: 10
    },
    cardtext: {
        fontFamily: 'PTSerifCaption_400Regular',
        fontStyle: 'normal',
        fontWeight: "700",
        fontSize: 16,
        lineHeight: 21,
        color: "#813300"
    }
});
export default ListsOfGroceryList;