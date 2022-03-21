import React, {useState} from 'react';
import CheckBox from 'expo-checkbox';
import {StyleSheet, ScrollView, View, Text, SectionList, Button} from 'react-native';
import { render } from 'react-dom';
//import ListItem from './Listitem';
//import AddItem from '../navigation/screens/GroceryList';

//const [isSelected, setSelection] = useState(false);

/*
class CategoryList extends React.Component {
  render() {
    
*/

const CategoryList = () => {
  
  const [isSelected, setSelection] = useState(false);
  

  //render()

    return (
      <View style={styles.container}>
        <SectionList
           sections={[
            {
              title: 'General',
              data: [
                {txt:"pear", isSelected: false},
                {txt:"apples", isSelected: false}
              ],
            },
            {
              title: 'Completed',
              data: [
                {txt: "oranges", isSelected: true},
                {txt: "blueberries", isSelected: true}
              ],
            },
          ]}
          renderItem={({item}) =>
          
          <Text style={styles.item}>
            <View>
              <CheckBox
                value={item.isSelected}
                //onChange= {setSelection}
                onValueChange={setSelection}
                
              />
            </View>
            {item.txt}
          </Text>}
          
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
          >
          </SectionList>
      </View>
    );
  }
//}

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

export default CategoryList