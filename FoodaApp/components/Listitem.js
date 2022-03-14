import { CheckBox } from 'native-base';
//import CheckBox from '@react-native-community/checkbox';
//import CheckBox from 'expo-checkbox';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ListItem = ({item, deleteItem}) => {
  
  return (
    <TouchableOpacity style={styles.listItem} >
      <View style={styles.listItemView}>
        <CheckBox></CheckBox>
        <Text style={styles.listItemText} >{item.text}</Text>
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
  });

export default ListItem;