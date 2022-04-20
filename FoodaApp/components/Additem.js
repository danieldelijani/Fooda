import React, {useState} from 'react';
import { Dropdown } from 'react-native-material-dropdown-v2';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const AddItem = ({addItem}) => {
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
    
    return (
        <View>
          <Dropdown
            style= {styles.input}
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
            <EvilIcons name="plus" size={80} color="black" />
          </TouchableOpacity>
          
        </View>
      );
    };

    const styles = StyleSheet.create({
        input: {
          height: 50,
          padding: 8,
          fontSize: 12,
          textAlign: "center",
          color: '#8B4513',
          fontFamily: 'serif',
          backgroundColor: 'oldlace',
          
        },
        btn: {
          padding: 10,
          margin: 5,
          width: 150,
          
        },
        btnText: {
          color: '#8B4513',
          fontSize: 20,
          textAlign: 'center',
          fontFamily: 'serif',
        },
        numInput: {
          height: 60, 
          fontSize: 16, 
          textAlign: "center",
          padding: 8,
        },
      });


export default AddItem;