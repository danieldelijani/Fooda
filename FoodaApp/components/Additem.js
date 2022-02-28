import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, } from 'react-native';

const AddItem = ({addItem}) => {
    const [text, setText] = useState('');
    const onChange = (textValue) => setText(textValue);

    return (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter an item here"
            onChangeText={onChange}
            value={text}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              addItem(text);
              setText('');
            }}>
            <Text style={styles.btnText}>
                Add item 
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
      });

export default AddItem;