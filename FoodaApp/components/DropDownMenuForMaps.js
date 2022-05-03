import React, {useState} from 'react';
import { View,} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const DropDownMenuForMaps = ({updateList}) => {
    const [GroceryListHashTable, updateGroceryListHashTable] = useState({});
    const [DropdownLabel, updateDropdownLabel] =useState("No grocery lists have been created");
    const [DropDownOptions, updateDropDownOptions] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
          let isActive = true;

          const getData = async () => {
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
              if (isActive) {
                updateGroceryListHashTable(newGroceryListHashTable);
                updateDropdownLabel("Pick a grocery list")
                updateDropDownOptions(newDropDownOptions)
              }
            } catch(e) {
                console.log("Error in accessing data")
                console.log(e)
            }
          }
      
          getData();
      
          return () => {
            isActive = false;
          };
        }, [GroceryListHashTable, DropdownLabel, DropDownOptions])
      );

    return(
        <View>
                <Dropdown
                    label = {DropdownLabel}
                    data = {DropDownOptions}
                    onChangeText = {value => updateList(GroceryListHashTable[value])}
                />
         </View>
    )
};

export default DropDownMenuForMaps; 