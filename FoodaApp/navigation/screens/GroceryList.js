
import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert, SectionList, Input} from 'react-native';
import AddItem from '../../components/Additem';
import ListItem from '../../components/Listitem';

const GroceryList = ({ navigation, route }) => {

  const [Categories, updateCategories] = useState(["General", "Completed"]);
  const [CategoriesAndItems, updateCategoriesAndItems] = useState([
      {
        title: "General", 
        data: []
      }, 
      {
        title: "Completed", 
        data: []
      }
     ])

    const update = (json, text) => {
      const myJson = [...json]
      myJson[0].data.push(text);
      return myJson;
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

  return (
    <View style = {styles.container}> 
      <AddItem addItem={addItem} />
      <SectionList  
      sections = {CategoriesAndItems}
      renderItem = {({item}) => (<ListItem item={item} deleteItem={deleteItem} />)}
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