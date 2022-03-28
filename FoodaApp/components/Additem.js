import React, {useState} from 'react';
import { Dropdown } from 'react-native-material-dropdown-v2';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, } from 'react-native';

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
    };

    const styles = StyleSheet.create({
        input: {
          height: 60,
          padding: 8,
          fontSize: 16,
          textAlign: "center",
        },
        btn: {
          backgroundColor: '#c2bad8',
          padding: 9,
          margin: 5,
        },
        btnText: {
          color: 'darkslateblue',
          fontSize: 20,
          textAlign: 'center',
        },
        numInput: {
          height: 60, 
          fontSize: 16, 
          textAlign: "center",
          padding: 8,
        },
      });


export default AddItem;