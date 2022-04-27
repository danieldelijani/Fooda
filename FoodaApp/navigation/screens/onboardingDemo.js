import { Image, StyleSheet, Alert, StatusBar,Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

import Onboarding from 'react-native-onboarding-swiper';

import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';

import AppLoading from 'expo-app-loading';
import { useFonts, PTSerifCaption_400Regular} from '@expo-google-fonts/pt-serif-caption';

import cherry from '../../assets/cherry.png'
import leaf from '../../assets/leaf.png'
import pear from '../../assets/pear.png'
import tomato from '../../assets/tomato.png'

const AddName = ({addName}) => {
  const [text, setText] = React.useState("");
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({ PTSerifCaption_400Regular});

  if (!fontsLoaded) {
    return <AppLoading />;
  } else { 
  return (
      <View>
        <TextInput
          label="Name"
          value={text}
          onChangeText={text => setText(text)}
        />
        <TouchableOpacity
          //title={'I got it :)'}
          //containerViewStyle={{ marginTop: 20 }}
          //backgroundColor={'white'}
          //borderRadius={5}
          textStyle={{ color: 'black' }}
          onPress={() => {
            addName(text);
            setText('');

          }} >
            <Button
            style={{width:150, alignSelf:'center'}}
              title={'I got it :)'}
              mode='outlined' 
              color='#CC7C48'
              onPress={() => {
                navigation.navigate("Profile", {name: addName})}
                //navigation.navigate("Home")}
              }
            >I got it :)</Button>
          </TouchableOpacity>
      </View>
    )};
  };


const OnboardingDemo = ({addName}) => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({ PTSerifCaption_400Regular});

  if (!fontsLoaded) {
    return <AppLoading />;
  } else { 
    return (
      <Onboarding
        onDone={() => console.log('done')}
        showSkip = {false}
        showNext = {false}
        showDone = {false}

        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
        bottomBarColor= '#FFEBDD'
        bottomBarHeight={80}
        imageContainerStyles= {{paddingBottom: 30, size:20}}
        containerStyles={{paddingBottom: 250}}
        pages={[
          {
            backgroundColor: '#FFEBDD',
            image: <Image source={pear} size= {20}/>,
            title: "Welcome to mart. Let's help you shop smarter! \n \n How it works: \n \n 1. Create your Grocery List",
            subtitle: '',
            color: '#813300',
            
          },
          {
            backgroundColor: '#FFEBDD',
            image: <Image source= {cherry} size= {20} />,
            title: '2. Select your grocery list from the drop down on the homepage',
            subtitle: '',
            paddingBottom: 0,
          },
          {
            backgroundColor: '#FFEBDD',
            image: <Image source={leaf} size= {20}  />,
            title: '3. Choose your grocery store, check for item availability, trip time, and more!',
            subtitle: "",
          },
          {
            backgroundColor: '#FFEBDD',
            image: <Image source={tomato} size= {20} />,
            title: '4. Start your trip and find items with ease!',
            subtitle: "",
          },
          {
            backgroundColor: '#FFEBDD',
            image: <Image source={tomato} size= {20}  />,
            //titleStyles: {position: 'absolute'},
            title: 'Enter your name here!',
            subtitle: (
              <View style={styles.container}>
                <AddName addName ={addName}/>
              </View>
                ),
            
          },
        ]}
      /> 
      )};
  };

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    textAlign: "center",
    color: '#813300',
    fontFamily: 'PTSerifCaption_400Regular',
    backgroundColor: '#FFEBDD',
    fontWeight: '400',
    //paddingBottom: 20,
    //position: 'absolute',
   // width: 269,
    //height: 49,
    //left: 56,
    //top: 346,
    
    
  },
  subtitle: {

    fontSize: 16,
    textAlign: "left",
    color: '#813300',
    fontFamily: 'PTSerifCaption_400Regular',
    backgroundColor: '#FFEBDD',
    fontWeight: '400',
    paddingLeft: 0, 
    paddingBottom: 0,
    
    
  },
  container: {
    backgroundColor: "#FFEBDD", 
    flex: 1,
    width: 250,
    paddingTop: 0,
    paddingBottom: 0,
    height: 50
  },
  addBtnText:{
    fontFamily: 'PTSerifCaption_400Regular',
    textAlign: "center",
    fontStyle: 'normal',
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 30,
    color: "#000000"
  }
  
});

export default OnboardingDemo;

