import React, {useState} from 'react';
import { Dropdown } from 'react-native-material-dropdown-v2';
import AppLoading from 'expo-app-loading';
import { useFonts, PTSerifCaption_400Regular} from '@expo-google-fonts/pt-serif-caption';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const AddItem = ({addSave, updatePopUp}) => {
    let [fontsLoaded] = useFonts({ PTSerifCaption_400Regular});
    const [text, setText] = useState('');
    const onChange = (textValue) => setText(textValue);
    const [currentOption, updateOption] = useState('Add Item')
    const [optionsModalVisible, setOptionsModalVisible] = useState(false);
    const [addModelVisible, setAddModelVisible] = useState(false)
    const [addBtnHeader, setAddBtnHeader] = useState("Name this item")

    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={addModelVisible}
            >
              <View style = {styles.addPopUpView}>
                <View style = {styles.parent}>
                  <Text style = {styles.addGroceryNamePopUpHeader}> {addBtnHeader} </Text>
                  <TouchableOpacity
                    style = {styles.right}
                    onPress={() => {setAddModelVisible(!addModelVisible);}}
                  >
                    <EvilIcons name="close-o" size={30} color="black" padding= {5} />
                  </TouchableOpacity>
                </View>
                <Text style = {styles.addbtntext}> Name: </Text>
                <TextInput
                  style = {styles.textInput}
                  onChangeText={onChange}
                  value={text}
                />
                <TouchableOpacity
                  style = {styles.addbtn}
                  onPress={() => {
                    addSave(text, currentOption, 0, 0);
                    setAddModelVisible(!addModelVisible);
                    setText("");
                  }}
                >
                  <Text style = {styles.addbtntext}>{currentOption}</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <Modal
              animationType='fade'
              transparent={true}
              visible={optionsModalVisible}
            >
              <View style = {styles.card}>
                <TouchableOpacity 
                  style = {styles.cardButton}
                  onPress={() => {
                    setOptionsModalVisible(!optionsModalVisible);
                    setAddModelVisible(!addModelVisible);
                    updateOption('Add Item');
                    setAddBtnHeader('Name this item');
                  }}>
                  <Text style = {styles.cardText}>Add item</Text>
                </TouchableOpacity>
                <View style = {styles.cardLine}/>
                <TouchableOpacity 
                  style = {styles.cardButton}
                  onPress={() => {
                    setOptionsModalVisible(!optionsModalVisible);
                    setAddModelVisible(!addModelVisible);
                    updateOption('Add Category');
                    setAddBtnHeader('Name this Category');
                  }}>
                  <Text style = {styles.cardText}>Add Category</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          <View style = {styles.row}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setOptionsModalVisible(!optionsModalVisible)
            }}>
            <EvilIcons name="plus" size={60} color="black" padding= {5} />
          </TouchableOpacity>
            <TouchableOpacity 
              style = {styles.addBtn} 
              onPress={() => {
                addSave(text, currentOption, 0, 1);
              }
            }>
              <Text style = {styles.addBtnText}> Save Grocery List</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      );
    }
    };

    const styles = StyleSheet.create({
        input: {
          height: 50,
          padding: 8,
          fontSize: 12,
          textAlign: "center",
          color: '#8B4513',
          fontFamily: 'serif',
          backgroundColor: '#FFF6F0',
          
        },
        btn: {
          textAlign: "center",
          borderRadius: 10,
        },
        row:{
          flexDirection:"row",
        },
        btnText: {
          fontFamily: 'PTSerifCaption_400Regular',
          textAlign: "center",
          fontStyle: 'normal',
          fontWeight: "bold",
          fontSize: 20,
          lineHeight: 40,
          color: "#000000"
        },
        addBtn: {
          textAlign: "center",
          backgroundColor: "#FBE0CE",
          borderRadius: 10,
          width: 250,
          height: 50,
        },
        addBtnText:{
          fontFamily: 'PTSerifCaption_400Regular',
          textAlign: "center",
          fontStyle: 'normal',
          fontWeight: "bold",
          fontSize: 20,
          lineHeight: 40,
          color: "#000000"
        },
        optionPopUpView:{
          width: 117,
          height: 100,
        }, card: {
          backgroundColor: "#FFEBDD",
          width: 117,
          height: 100,
          flexDirection: 'column',
          alignItems:'center',
          justifyContent:'center',
          borderRadius: 5,
          left: 10,
          top: 570,
        }, 
        cardButton: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        cardText:{
          fontFamily: 'PTSerifCaption_400Regular',
          fontWeight: "400",
          fontSize: 15,
          lineHeight: 17,
        },
        cardLine:{
          width: 75,
          height: 1,
          backgroundColor: 'black'
        },
        addPopUpView:{
          display: 'flex',
              flexDirection: 'column',
              borderRadius: 10,
              alignSelf:"center",
              justifyContent: "space-around",
              padding:5,
              width: 230,
              height: 180,
              alignItems: "stretch",
              top: 250,
              backgroundColor: "#F2DACA"
        },
        parent:{
          flexDirection:"row"
        },
        addGroceryNamePopUpHeader:{
          fontFamily: 'PTSerifCaption_400Regular',
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: 16,
          lineHeight: 21,
          color: "#000000",
        }, 
        right:{
          textAlign: 'right'
        },
        addbtntext:{
          fontFamily: 'PTSerifCaption_400Regular',
          fontWeight: "400",
          fontSize: 13,
          lineHeight: 17, 
        },
        addbtn: {
          backgroundColor: "#FFF6F0", 
          marginLeft: 'auto',
          height: 30,
          borderRadius: 5,
          justifyContent: 'center'
        }, 
        textInput:{
          width: 220,
          height: 28,
          backgroundColor: "#FFF6F0"
        },
      });


export default AddItem;