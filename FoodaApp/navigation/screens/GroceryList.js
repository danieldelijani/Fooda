
import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert, SectionList} from 'react-native';
import AddItem from '../../components/Additem';
import ListItem from '../../components/Listitem';
import AddDropdownMenu from '../../components/AddDropdownMenu';
import CategoryList from '../../components/CategoryList';
import { Button } from 'native-base';

const GroceryList = ({ navigation, route }) => {
  // let name = route.params.name;

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
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem item={item} deleteItem={deleteItem}
          />
        )}
        /> 
        {/*<CategoryList> {addItem} </CategoryList>*/}
        {/*<SectionList
           sections={[
            {title: 'General'}, {title: 'Completed'}
          ]}
          renderItem={({item}) =>
          
          <Text style={styles.item}>
            <View>
              {/*<CheckBox
                value={item.isSelected}
                //onChange= {setSelection}
                onValueChange={setSelection}
                
            />
            </View>
            {addItem}
          </Text>}
          
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
          >
          </SectionList> */}
         
        
     
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default GroceryList;