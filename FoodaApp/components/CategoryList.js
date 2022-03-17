import React, {useState} from 'react';
import CheckBox from 'expo-checkbox';
import {StyleSheet, ScrollView, View, Text, SectionList} from 'react-native';

class CategoryList extends React.Component {
  render() {
    
    return (
      <View style={styles.container}>
        <SectionList
           sections={[
            {
              title: 'General',
              data: [
                "bananas",
                "apples"
              ],
            },
            {
              title: 'Completed',
              data: [
                "oranges",
                "blueberries"
              ],
            },
          ]}
          renderItem={({item}) => 
          <Text style={styles.item}>
            <CheckBox
            />{item}
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
}

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
});

export default CategoryList