import React, { Component, useState } from 'react';
import { Dropdown } from 'react-native-material-dropdown-v2';
import { Button, Text, View, Modal } from "react-native";
import AddDropdownMenu from './AddDropdownMenu';


const AddCategory = ({addCategory}) => {
  
    const [text, setText] = useState('');
    const onChange = (textValue) => setText(textValue);

    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => { setModalVisible(!isModalVisible);
    
    
    return (
      <View style={{flex: 1 }}>
          <Button title = "Add Category" onPress= {toggleModal}/>
          <Modal isVisible = {isModalVisible}>
              <View style= {{flex: 1}}>
                <TextInput label= "Name"
                    placeholder=""
                    onChangeText={onChange}
                    value={text}
                 />
                  <Text>Priority </Text>
                  <Button title = "Low"/><Button title = "Medium"/><Button title = "High"/>
                  <Button title = "Add" onPress={toggleModal}/>
              </View>
          </Modal>
      </View>
    );
  }
};

export default AddCategory