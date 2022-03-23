
import React, {useState, setState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert, SectionList} from 'react-native';
import AddItem from '../../components/Additem';
import ListItem from '../../components/Listitem';
import AddDropdownMenu from '../../components/AddDropdownMenu';
import CategoryList from '../../components/CategoryList'; 

const GroceryList = ({ navigation, route }) => {
  // let name = route.params.name;

  const [items, setItems] = React.useState([]);
  const [CategoriesAndItems, updateCategoriesAndItems] = React.useState
    ([
        {title: "General", data: ["cat"]}, 
        {title: "Completed", data: ["DOG"]}
     ])

  const update = (json, text) => {
    json[0].data.push(text);
    return json;
  }

  const addItem = (text) => {
    if (!text) {
      Alert.alert(
        'Error',
        'Please enter an item',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      updateCategoriesAndItems(update(CategoriesAndItems, text));
    }
  };

  return (
    <View style = {styles.container}> 
      <AddDropdownMenu></AddDropdownMenu>
      <AddItem addItem={addItem} />
      <SectionList  
      sections = {CategoriesAndItems}
      renderItem={({item}) => ( <ListItem item={item} deleteItem={deleteItem} />)}
      renderSectionHeader={({section}) => (<Text>{section.title}</Text>)}
      keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#F55145',
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  checkboxView: {
    alignItems: 'flex-start',
    padding: 20,
  },
});

export default GroceryList;