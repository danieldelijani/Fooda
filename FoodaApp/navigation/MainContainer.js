import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import GoogleMaps from './screens/GoogleMaps';
import GroceryList from './screens/GroceryList';
import Profile from './screens/Profile';

const homeName = 'Home';
const groceryListName = 'GroceryList';
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
                    } else if (rn == groceryListName) {
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

            tabBarOptions = {{
                activeTintColor: 'tomato',
                inactiveTintColor: 'white',
                labelStyle: {paddingBottom: 10, fontSize: 10},
                style: {padding:10, height:70}
            }}
            >

                <Tab.Screen name = {homeName} component = {GoogleMaps}/>
                <Tab.Screen name = {groceryListName} component = {GroceryList}/>
                <Tab.Screen name = {profileName} component = {Profile}/>

            </Tab.Navigator>
        </NavigationContainer>
    )
}