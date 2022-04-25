import * as React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import GoogleMaps from './screens/GoogleMaps';
import Profile from './screens/Profile';
import GroceryListsNavigation from './GroceryListsNavigation';
//import OnboardingDemo from './screens/OnboardingDemo';



const homeName = 'Home';
const GroceryListsNavigationName = 'GroceryListsNavigation';
const profileName = 'Profile';
const onboardingName = 'Onboarding';

//const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    /*const onboardingState = useAppSelector(
        (state) => state.OnboardingDemo.viewedOnBoarding
    ) */
    const [onboarded, setOnboarded] = React.useState(false) 

    return (
        <NavigationContainer>
                <Tab.Navigator
                    initialRouteName={
                        onboarded ==true ? homeName : profileName}  //changed from homeName
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
                    {/*<Tab.Screen name = {onboardingName} component = {OnboardingDemo}/>  */}
                    <Tab.Screen name = {homeName} component = {GoogleMaps} />
                    <Tab.Screen name = {GroceryListsNavigationName } component = {GroceryListsNavigation}/>
                    <Tab.Screen name = {profileName} component = {Profile}/>
                    
                </Tab.Navigator>
             
        </NavigationContainer>
    )
}