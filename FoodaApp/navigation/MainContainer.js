import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import GoogleMaps from './screens/GoogleMaps';
import Profile from './screens/Profile';
import GroceryListsNavigation from './GroceryListsNavigation';
import ListsOfGroceryList from './screens/ListsOfGroceryList'
import GroceryList from './screens/GroceryList'

const homeName = 'Home';
const ListsOfGroceryListName = 'ListsOfGroceryList';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;
                    if (rn == homeName) { 
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (rn == GroceryListsNavigationName) {
                        iconName = focused ? 'list' : 'list-outline';
                    }
                    else if (rn == profileName) {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name = {iconName} size = {size} color = {color}></Ionicons>
                },
                "tabBarActiveTintColor": "sienna",
                "tabBarInactiveTintColor": "sienna",
                "tabBarLabelStyle": {
                    "paddingBottom": 0,
                    "fontSize": 10
                },
                "tabBarStyle": [
                    {
                    "display": "flex"
                    },
                    null
                ]
            })}
            >

                <Tab.Screen name = {homeName} component = {GoogleMaps}/>
                <Tab.Screen name = {GroceryListsNavigationName } component = {GroceryListsNavigation}/>
                <Tab.Screen name = {profileName} component = {Profile}/>
            </Tab.Navigator>
            <Stack.Screen
            name="GroceryList"
            component={GroceryList}
            />
        </NavigationContainer>
    )
}