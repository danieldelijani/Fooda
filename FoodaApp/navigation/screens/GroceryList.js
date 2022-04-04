
import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert, SectionList, Input} from 'react-native';
import Collapsible from 'react-native-collapsible';
import AddItem from '../../components/Additem';
import ListItem from '../../components/Listitem';
import DraggableList from '../../components/DraggableList';

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
      const myJson = [...json];
      myJson[0].data.push(text);
      return myJson;
  }
  

  const addCategory = (json, text) => {
    const myJson = [...json];
    var newCategory = {
      title: text,
      data:[]
    };
    var completed = myJson[myJson.length - 1];
    myJson[myJson.length - 1] = newCategory;
    myJson.push(completed);
    return myJson;
  }

  const addItem = (text, currentOption) => {
    if (!text) {
      Alert.alert(
        'Error',
        'Please enter an item',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else if(currentOption == 'Add Item') {
      updateCategoriesAndItems(update(CategoriesAndItems, text));
    } else if(currentOption == 'Add Category'){
      updateCategoriesAndItems(addCategory(CategoriesAndItems, text));
    }
  };
  
 const deleteItem2 = (json, id) =>{
  const prevJson = [...json]
  prevJson[0].data.pop(id);
  return prevJson
  
};
const deleteItem = (id) =>{
 updateCategories(deleteItem2(CategoriesAndItems, id));
};


  return (
    <View style = {styles.container}> 
    <AddItem addItem={addItem} />
    <DraggableList sectionData = {CategoriesAndItems} />
      {/* <SectionList  
      sections = {CategoriesAndItems}
      renderItem = {({item}) => (<ListItem item={item} deleteItem={deleteItem} />)}
      renderSectionHeader={({section}) => (<Text>{section.title}</Text>)}
      keyExtractor={(item, index) => item+index}
      /> */}
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