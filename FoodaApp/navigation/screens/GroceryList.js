
import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert, SectionList, Input} from 'react-native';
import AddItem from '../../components/Additem';
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
    
  
    const update = (json, text, list) => {
      const myJson = [...json];
      myJson[list].data.push(text);
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

  const addItem = (text, currentOption, list=0) => {
    if (!text) {
      Alert.alert(
        'Error',
        'Please enter an item',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else if(currentOption == 'Add Item') {
      updateCategoriesAndItems(update(CategoriesAndItems, text, list));
    } else if(currentOption == 'Add Category'){
      updateCategoriesAndItems(addCategory(CategoriesAndItems, text));
    }
  };

 
  
 const deleteItem2 = (json, label, section, isTitle) =>{
  const prevJson = [...json]
  if(isTitle){
  } else {
    for(let i = 0;i < json.length;i++){
      if (json[i].title == section){
        json[i].data = json[i].data.filter(function(value){ return value != label;});
      }
    }
  }
  return prevJson
};

const deleteItem = (label, section, isTitle) =>{
 updateCategories(deleteItem2(CategoriesAndItems, label, section, isTitle));
};

//For moving to completed section after check
const addCompleted = (text) => {
  addItem(text, currentOption, listItem= 1);
};

 const moveCompleted = (text, id) => {
   deleteItem(id);
   addCompleted(text);
 }


  return (
    <View style = {styles.container}> 
    <AddItem addItem={addItem} />
    <Text> General </Text>
    <DraggableList sectionData = {CategoriesAndItems} deleteItem = {deleteItem} moveCompleted ={moveCompleted}/>
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