import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, } from 'react-native';

const AddItem = ({addItem}) => {
    const [text, setText] = useState('');
    const onChange = (textValue) => setText(textValue);

    return(
        <View>
            <TextInput
                placeholder='please enter an item name here'
                onChangeText={onChange}
                value={text}
            />
            <TouchableOpacity
                onPress={() => {
                    addItem(text);
                    setText('');
            }}>
            </TouchableOpacity>
        </View>
    );
}


export default AddItem;