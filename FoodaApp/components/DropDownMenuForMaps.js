import React, {Component, useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

class DropDownMenuForMaps extends Component {
    constructor(props){
        super(props);
        this.state = {
            DropdownLabel: "No Grocery lists have been created",
            DropDownOptions: [],
            GroceryListHashTable: {}
        }
    }

    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('ListsOfLists')
          let myjson = JSON.parse(value)
          let listoflists = myjson.ListsOfLists
          let newGroceryListHashTable = {}
          let newDropDownOptions = []
          for(let i = 0; i < listoflists.length;i++){
              let listname = listoflists[i].name
              let listItems = listoflists[i].items
              newGroceryListHashTable[listname] = listItems
              newDropDownOptions.push({value: listname})
          }
          this.state.GroceryListHashTable = newGroceryListHashTable
          this.state.DropdownLabel = "Pick a grocery list"
          this.state.DropDownOptions = newDropDownOptions
          console.log(this.state.GroceryListHashTable)
          return listoflists
        } catch(e) {
            console.log("Error in accessing data")
            console.log(e)
        }
      }


    componentDidMount() {
        this.getData()
    }

    render(){
        return(
            <View>
                <Dropdown
                    label = {this.state.DropdownLabel}
                    data = {this.state.DropDownOptions}
                    onChangeText = {value => this.props.updateList(this.state.GroceryListHashTable[value])}
                />
            </View>
        )
    }
}

export default DropDownMenuForMaps;