import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, PTSerifCaption_400Regular} from '@expo-google-fonts/pt-serif-caption';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GroceryList from './GroceryList';

const ListsOfGroceryList = ({ navigation, route }) => {
    let [fontsLoaded] = useFonts({ PTSerifCaption_400Regular});
    let [count, updateCount] = useState(1);
    const [groceryLists, updateGroceryLists] = useState([]);
    const [groceryListsDisplay, updateGroceryListsDisplay] = useState([
        {name: "grocerylist0", num: 3}
    ])

    const countNumOfItem = (GroceryList) =>{
        count = 0
        for(let i = 0; i < GroceryList.length;i++){
            count += GroceryList[i].data.length
        }
        return count 
    }

    if(route.params.list){
        console.log("we made it")
        updateGroceryLists([...groceryLists, route.params.list])
        updateGroceryListsDisplay([...groceryListsDisplay,{
            name: "grocerylist" + count.toString(),
            num: countNumOfItem(route.params.list)
        }]
            )
        updateCount(count + 1);
        delete route.params.list
    }

    if (!fontsLoaded) {
        return <AppLoading />;
      } else { 
        return(
            <View style = {styles.container}>
                <Text style = {styles.header}> Grocery Lists</Text>
                <FlatList
                    data={groceryListsDisplay}
                    renderItem = { ({item}) => 
                                    <View style = {styles.card}>
                                    <Text style = {styles.cardtext}> {item.name} </Text>
                                    <Text style = {styles.cardtext}> {item.num} items </Text>
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