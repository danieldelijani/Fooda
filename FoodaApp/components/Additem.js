import React, {useState} from 'react';
import { Dropdown } from 'react-native-material-dropdown-v2';
import AppLoading from 'expo-app-loading';
import { useFonts, PTSerifCaption_400Regular} from '@expo-google-fonts/pt-serif-caption';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const AddItem = ({addItem}) => {
    let [fontsLoaded] = useFonts({ PTSerifCaption_400Regular});
    const [text, setText] = useState('');
    const onChange = (textValue) => setText(textValue);
    const [currentOption, updateOption] = useState('Add Item')

    let data = [{
      value: 'Add Item',
    }, {
      value: 'Add Category',
    }, {
      value: 'Scan Receipt',
    }];
    
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View>
          <Dropdown
            style= {styles.input}
            label='Options'
            data={data}
            onChangeText = {value => updateOption(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter an item here"
            onChangeText={onChange}
            value={text}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              addItem(text, currentOption);
              setText('');
            }}>
            <EvilIcons name="plus" size={60} color="black" padding= {5} />
          </TouchableOpacity>
          
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
          //backgroundColor: "#FBE0CE", #FFF6F0
          borderRadius: 10,
          width: 316,
           height: 50,
           marginLeft: "auto",
           marginRight: "auto"
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
      });


export default AddItem;