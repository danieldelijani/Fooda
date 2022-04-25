import React  from 'react';
import {View, Text} from 'react-native';
import OnboardingDemo from './onboardingDemo';


const Profile = ({ navigation, route }) => {
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
            <Text>Profile Screen!</Text>
         
            
        </View>
    );
  };

  export default Profile;