import React  from 'react';
import {View, Text} from 'react-native';
import OnboardingDemo from './onboardingDemo';
import {IconButton, Divider, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const Profile = ({ navigation, route }) => {
    
    if(!onboarded){
        return (
            <OnboardingDemo></OnboardingDemo>
        );
    } 
    else{
    let user_name = route.params.text  
    console.log('USERNAME: ', route.params.text)
        return (
            <View style={{flexDirection:'column', alignContent:'space-between', padding:10}}>
                <View style={{flexDirection:'column', alignItems:'center', justifyContent:'space-around', alignContent:'space-around', borderRadius:10, backgroundColor: '#FFF6F0', margin:10, padding:20}}>
                    <IconButton
                    icon="account"
                    size={65}
                    color='black'
                    style={{backgroundColor:'#CC7C48'}}/>
                    <Text style={{fontSize:32, color:'black'}}>{user_name}</Text>
                </View>
                <View style={{borderRadius:10, backgroundColor: '#FFF6F0', margin:10, padding:20}}>
                    <Text style={{fontSize:32, color:'black'}}>Try creating a grocery list in the list tab!</Text>
                </View>
                <View style={{borderRadius:10, backgroundColor: '#FFF6F0', margin:10, padding:20}}>
                    <Text style={{fontSize:32, color:'black'}}>Shopping metrics and insights coming soon...</Text>
                </View>
            </View>
        );
    }
  };

  export default Profile;