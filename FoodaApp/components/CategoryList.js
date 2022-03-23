import React, {useState} from 'react';
import CheckBox from 'expo-checkbox';
import {StyleSheet, ScrollView, View, Text, SectionList, Button} from 'react-native';
import { render } from 'react-dom';
//import ListItem from './Listitem';
import AddItem from '../navigation/screens/GroceryList';

//const [isSelected, setSelection] = useState(false);

/*
class CategoryList extends React.Component {
  render() {
    
*/

const CategoryList = ({newItem}) => {
  
  const [isSelected, setSelection] = useState(false);
  const generalData = [
    {txt:"pear", isSelected: false},
    {txt:"apples", isSelected: false}
  ]

  //render()

    return (
      <View style={styles.container}>
        <SectionList
           sections={[
            {
              title: 'General',
              data: generalData,
            },
            {
              title: 'Completed',
              data: {items},
            },
          ]}
          renderItem={({item}) =>
          <Text style={styles.item}>
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
    alignItems: 'center',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  checkboxView: {
    alignItems: 'center',
    padding: 20,
    
  },
});

export default CategoryList