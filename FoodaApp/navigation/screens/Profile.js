import React  from 'react';
import {View, Text} from 'react-native';
import OnboardingDemo from './onboardingDemo';
import {IconButton, Divider, Button } from 'react-native-paper';


const Profile = ({ navigation, route }) => {
    let user_name = "John Smith"
    /*const onboardingState = useAppSelector(
        (state) => state.OnboardingDemo.viewedOnBoarding
    ) */
    const [onboarded, setOnboarded] = React.useState(false) 

    if(!onboarded){
        return (
            <OnboardingDemo></OnboardingDemo>
        );
    } 
    return (
        <View>
            <IconButton
            icon="account-circle"
            size={65}/>
            <Text style={{fontSize:32}}>{user_name}</Text>

            
        </View>
    );
  };

  export default Profile;