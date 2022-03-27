import CheckBox from 'expo-checkbox';
import { Button } from 'native-base';

import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

//Make ListItem into taskRow, 
const ListItem = ({item, deleteItem}) => {
  const [isSelected, setSelection] = useState(false);

  return (
    <TouchableOpacity style={styles.listItem} >
      <View style={styles.listItemView}>
        <View style={styles.checkboxView}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
          />
        </View>
        <Text style={styles.listItemText} >{item}</Text>
        <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              deleteItem(item.id);
            }}>
            <Text style={styles.btnText}>
                Delete
            </Text>
          </TouchableOpacity>
        
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    listItem: {
      padding: 20,
      backgroundColor: '#f8f8f2',
      borderBottomWidth: 2,
      borderColor: '#eee',
    },
    listItemView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    listItemText: {
      fontSize: 20,
    },
    checkboxView: {
      alignItems: 'flex-start',
      padding: 20,
    },
    btn: {
      backgroundColor: '#c2bad8',
      padding: 9,
      margin: 5,
    },
    btnText: {
      color: 'darkslateblue',
      fontSize: 20,
      textAlign: 'center',
    },
  });

export default ListItem;