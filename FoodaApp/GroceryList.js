import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import AddItem from './components/Additem';
import ListItem from './components/Listitem';
import AddDropdownMenu from './components/AddDropdownMenu';
import CategoryList from './components/CategoryList';

const GroceryList = ({ navigation, route }) => {
  let name = route.params.name;

  const [items, setItems] = React.useState([]);

  const deleteItem = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const addItem = (text) => {
    if (!text) {
      Alert.alert(
        'Error',
        'Please enter an item',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      setItems((prevItems) => {
        return [{id: Math.random(), text}, ...prevItems];
      });
    }
  };

  return (
    <View style = {styles.container}> 
      <AddDropdownMenu></AddDropdownMenu>
      <AddItem addItem={addItem} />
      {/* <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem item={item} deleteItem={deleteItem} />
        )}
      /> */}
      <CategoryList></CategoryList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default GroceryList;