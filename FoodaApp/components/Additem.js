import React, {useState} from 'react';
import { Dropdown } from 'react-native-material-dropdown-v2';
import AppLoading from 'expo-app-loading';
import { useFonts, PTSerifCaption_400Regular} from '@expo-google-fonts/pt-serif-caption';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, } from 'react-native';

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
            label='options'
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
            <Text style={styles.btnText}>
                Add
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    };

    const styles = StyleSheet.create({
        input: {
          height: 60,
          padding: 8,
          fontSize: 16,
          textAlign: "center",
        },
        btn: {
          textAlign: "center",
          backgroundColor: "#FBE0CE",
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