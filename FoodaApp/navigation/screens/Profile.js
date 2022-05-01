import React  from 'react';
import {View, Text} from 'react-native';
import OnboardingDemo from './onboardingDemo';
import {IconButton, Divider, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const Profile = ({ navigation, route }) => {
    
    //"John Smith"
    /*const onboardingState = useAppSelector(
        (state) => state.OnboardingDemo.viewedOnBoarding
    ) */
    //const [onboarded, setOnboarded] = React.useState(false) 
    
      //changed from onboarded to onboardedVal
    if(!onboarded){
        //setOnboarded();
        return (
            <OnboardingDemo></OnboardingDemo>
        );
    } 
    else{
    let user_name = 'John SMith' //route.params.addName
    //console.log('USERNAME: ', route.params.addName)
        return (
            <View>
                <IconButton
                icon="account-circle"
                size={65}/>
                <Text style={{fontSize:32}}>{user_name}</Text>

                
            </View>
        );
    }
  };

  export default Profile;