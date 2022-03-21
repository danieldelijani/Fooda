import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, } from 'react-native';

const AddItem = ({addItem}) => {
    const [text, setText] = useState('');
    const [quantity, setQuantity] = useState(0);
    const onChange = (textValue) => setText(textValue);
    
  
    return (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter an item here"
            onChangeText={onChange}
            value={text}
           
          />
           {/*<TextInput
            style= {styles.numInput}
             placeholder="Enter an item Quantity"
             onChangeQ={onChange}
             number={quantity}
           />*/}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              addItem(text);
              setText('');
              //setQuantity(0);
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