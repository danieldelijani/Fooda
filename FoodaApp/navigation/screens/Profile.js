import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OnboardingDemo from './onboardingDemo';
import { IconButton, Divider, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const Profile = ({ navigation, route }) => {

    if (!onboarded) {
        return (
            <OnboardingDemo></OnboardingDemo>
        );
    }
    else {
        if (route.params.text) {
            var user_name = route.params.text
        } else {
            var user_name = ""
        }
        return (
            <View style={{ flexDirection: 'column', alignContent: 'space-between', padding: 10, backgroundColor: "#FFF6F0", flex: 1 }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', alignContent: 'space-around', borderRadius: 10, backgroundColor: '#FDEBDF', margin: 10, padding: 20 }}>
                    <IconButton
                        icon="account"
                        size={65}
                        color='#F2DACA'
                        style={{ backgroundColor: '#CC7C48' }} />
                    <Text style={styles.name}>{user_name}</Text>
                </View>
                <View style={{ borderRadius: 10, backgroundColor: '#FDEBDF', margin: 10, padding: 20 }}>
                    <Text style={styles.text}>Try creating a grocery list in the list tab, then use the map to see where is best to shop!</Text>
                </View>
                <View style={{ borderRadius: 10, backgroundColor: '#FDEBDF', margin: 10, padding: 20 }}>
                    <Text style={styles.text}>Shopping metrics and insights coming here soon...</Text>
                </View>
            </View>
        );
    }
};

var styles = StyleSheet.create({
    text: {
        fontFamily: 'PTSerifCaption_400Regular',
        fontStyle: 'normal',
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: 40,
        color: '#813300'
    }, 
    name: {
        fontFamily: 'PTSerifCaption_400Regular',
        fontStyle: 'normal',
        fontWeight: "bold",
        fontSize: 30,
        lineHeight: 40,
    }
});
export default Profile;