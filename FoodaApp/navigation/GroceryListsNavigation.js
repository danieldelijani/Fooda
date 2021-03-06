import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ListsOfGroceryList from './screens/ListsOfGroceryList'
import GroceryList from './screens/GroceryList'

const Stack = createStackNavigator();

const GroceryListsNavigation = () => {
  return (
    <NavigationContainer independent = {true}>
      <Stack.Navigator initialRouteName="ListOfGroceryList" screenOptions={{headerShown: false}}>   
        <Stack.Screen
          name="ListsOfGroceryList"
          component={ListsOfGroceryList}
          initialParams = {{name: "grocerylist0", num: 3}}
        />
        <Stack.Screen
          name="GroceryList"
          component={GroceryList}
          initialParams = {{name: "grocerylist0", num: 3}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default GroceryListsNavigation;