
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Modal, TextInput } from 'react-native';
import AddItem from '../../components/Additem';
import { useFonts, PTSerifCaption_400Regular } from '@expo-google-fonts/pt-serif-caption';
import AppLoading from 'expo-app-loading';
import DraggableList from '../../components/DraggableList';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons';

const GroceryList = ({ navigation, route }) => {
  let [fontsLoaded] = useFonts({ PTSerifCaption_400Regular });
  const [isOldList, setOldList] = useState(false);
  const [text, setText] = useState('');
  const [ID, setID] = useState(-1);
  const [addBtnHeader, setAddBtnHeader] = useState("Name this Grocery List")
  const onChange = (textValue) => setText(textValue);
  const [modalVisible, setModalVisible] = useState(false);

  const [CategoriesAndItems, updateCategoriesAndItems] = useState([
    {
      title: "General",
      data: []
    },
    {
      title: "Completed",
      data: []
    }
  ])

  if (route.params.list) {
    setOldList(true)
    setAddBtnHeader("Rename this Grocery List")
    setID(route.params.ID)
    updateCategoriesAndItems(route.params.list)
    setText(route.params.name)
    delete route.params.name
    delete route.params.list
  }

  const update = (json, text, list) => {
    const myJson = [...json];
    myJson[list].data.push(text);
    return myJson;
  }


  const addCategory = (json, text) => {
    const myJson = [...json];
    var newCategory = {
      title: text,
      data: []
    };
    var completed = myJson[myJson.length - 1];
    myJson[myJson.length - 1] = newCategory;
    myJson.push(completed);
    return myJson;
  }

  const addSave = (text, currentOption, list, option) => {
    console.log("add")
    if (option == 0) {
      if (!text) {
        Alert.alert(
          'Error',
          'Please enter an item',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false },
        );
      } else if (currentOption == 'Add Item') {
        updateCategoriesAndItems(update(CategoriesAndItems, text, list));
      } else if (currentOption == 'Add Category') {
        updateCategoriesAndItems(addCategory(CategoriesAndItems, text));
      }
    } else if (option == 1) {
      setModalVisible(!modalVisible)
    }
  };


  const deleteItem2 = (json, label, section, isTitle) => {
    const prevJson = [...json]
    if (isTitle) {
    } else {
      for (let i = 0; i < json.length; i++) {
        if (json[i].title == section) {
          json[i].data = json[i].data.filter(function (value) { return value != label; });
        }
      }
    }
    return prevJson
  };

  const deleteItem = (label, section, isTitle) => {
    updateCategories(deleteItem2(CategoriesAndItems, label, section, isTitle));
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{backgroundColor: "#FFF6F0", flex: 1,}}>
        <TouchableOpacity onPress={() => { navigation.navigate("ListsOfGroceryList") }} style={{margin:5 }}>
          <EvilIcons name="arrow-left" size={40} color="black" padding={0} />
        </TouchableOpacity>
        <View style={styles.container}>
          <DraggableList sectionData={CategoriesAndItems} deleteItem={deleteItem} />
          <View style={styles.bottomBar}>
            <AddItem addSave={addSave} />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.addGroceryNamePopUpView}>
              <View style={styles.parent}>
                <Text style={styles.addGroceryNamePopUpHeader}> {addBtnHeader} </Text>
                <TouchableOpacity
                  style={styles.right}
                  onPress={() => { setModalVisible(!modalVisible) }}
                >
                  <EvilIcons name="close-o" size={30} color="black" padding={5} />
                </TouchableOpacity>
              </View>
              <Text style={styles.addbtntext}> Name: </Text>
              <TextInput
                style={styles.textInput}
                onChangeText={onChange}
                value={text}
              />
              <TouchableOpacity
                style={styles.addbtn}
                onPress={() => {
                  navigation.navigate("ListsOfGroceryList", {
                    alreadyCreated: isOldList,
                    ID: ID,
                    name: text,
                    list: CategoriesAndItems
                  })
                }}
              >
                <Text style={styles.addbtntext}> Add List</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF6F0",
    flex: 1,
    padding: 20
  },
  addGroceryNamePopUpView: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "space-around",
    padding: 5,
    width: 230,
    height: 180,
    alignItems: "stretch",
    top: 250,
    backgroundColor: "#F2DACA"
  },
  parent: {
    flexDirection: "row"
  },
  addGroceryNamePopUpHeader: {
    fontFamily: 'PTSerifCaption_400Regular',
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 21,
    color: "#000000",
  },
  right: {
    textAlign: 'right'
  },
  textInput: {
    width: 220,
    height: 28,
    backgroundColor: "#FFF6F0"
  },
  addbtntext: {
    fontFamily: 'PTSerifCaption_400Regular',
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 17,
    alignSelf: 'center',

  },
  addbtn: {
    backgroundColor: "#FFF6F0",
    width: 60,
    height: 30,
    marginLeft: 'auto',
    borderRadius: 5,
    justifyContent: 'center',
    alignContent: 'center'
  },
  bottomBar: {
    flex: 1,
    alignContent: "center",
    justifyContent: 'flex-end',
  }
});

export default GroceryList;