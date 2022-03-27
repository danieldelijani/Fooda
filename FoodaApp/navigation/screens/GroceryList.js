
import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert, SectionList, Input} from 'react-native';
import AddItem from '../../components/Additem';
import ListItem from '../../components/Listitem';
import AddDropdownMenu from '../../components/AddDropdownMenu';

const GroceryList = ({ navigation, route }) => {

  const [items, setItems] = useState([]);

  const [CategoriesAndItems, updateCategoriesAndItems] = useState([
      {
        title: "General", 
        data: [ "pear"]
      }, 
      {
        title: "Completed", 
        data: [ "apples"]
      }
     ])

  const update = (json, text) => {
    json[0].data.push(text);
    return json;
  }

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
      updateCategoriesAndItems(update(CategoriesAndItems, text));
    }
  };

  const renderItem = ({item}) => {
    return (
      <ListItem item={item} deleteItem={deleteItem} />
    )
  }

  return (
    <View style = {styles.container}> 
      <AddDropdownMenu></AddDropdownMenu>
      <AddItem addItem={addItem} />
      <SectionList  
      sections = {CategoriesAndItems}
      renderItem={renderItem}
      renderSectionHeader={({section}) => (<Text>{section.title}</Text>)}
      keyExtractor={(item, index) => item+index}
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