import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import Swipeout from 'react-native-swipeout';
import CheckBox from 'expo-checkbox';
import AppLoading from 'expo-app-loading';
import { useFonts, PTSerifCaption_400Regular} from '@expo-google-fonts/pt-serif-caption';


const DraggableList = ({sectionData, deleteItem, moveCompleted}) => {
    let [fontsLoaded] = useFonts({ PTSerifCaption_400Regular});
    const [flatData, setFlatData] = useState([])

    renderItem = ({ item, index, drag, isActive }) => {
      const [isSelected, setSelection] = useState(false);
        let deleteBtn = [
            {
                text: 'Delete',
                backgroundColor: 'red',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => {
                    deleteItem(item.label, item.section, item.isTitle);
                    setFlatData(flatData.filter(Element => Element.label != item.label ));
                }
            }
        ]
        
        if (!item.isTitle){
            return (
                <Swipeout right ={deleteBtn}>
                    <TouchableOpacity onLongPress={item.isTitle?()=>{}: drag} >
                        <View style={styles2.listItemView}>
                            <View style={styles2.checkboxView}>
                              <CheckBox action={moveCompleted}
                                  color= 'sienna'
                                  value={isSelected}
                                  onValueChange={setSelection}
                              /> 
                            </View>
                          <Text style={styles2.itemText} >{item.label} </Text>
                        </View> 
                    </TouchableOpacity>
                </Swipeout>
            );
        } else {
            return (
                <TouchableOpacity onLongPress={item.isTitle?()=>{}: drag} >
                  <Text style = {styles2.sectionText}> 
                      {item.label}
                  </Text>
                </TouchableOpacity>
            )
        }
      };

    useEffect(()=>{
        const flatSection = sectionData.map((section, index)=> {
                return [{key: `${section.title}${index}`, label: section.title, isTitle: true, section: ""}, ...(section.data.map((sectionItem, index) => {
                return {key: `${sectionItem}${index}`, label: sectionItem, isTitle: false, section: section.title}
            }))]
          })
          setFlatData(flatSection.flat(1))
          console.log(flatData)
    },[sectionData])

    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
          <View>
              <DraggableFlatList
                  data={flatData}
                  renderItem = {renderItem}
                  keyExtractor={(item, index) => `${item.key}`}
                  onDragEnd={({ data }) => setFlatData( data )}
              />
          </View>
      ) 
    }
};

const styles2 = StyleSheet.create({
    listItem: {
      padding: 20,
      backgroundColor: '#FFF6F0',
      borderBottomWidth: 2,
      borderColor: '#eee',
    },
    listItemView: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFF6F0',
    },
    checkboxView: {
      alignItems: 'flex-start',
      padding: 20,
      color: 'white',
    },
    btn: {
      backgroundColor: '#FFF6F0',
      padding: 9,
      margin: 5,
    },
    btnText: {
      color: 'darkslateblue',
      fontSize: 20,
      textAlign: 'center',
    },
    sectionText: {
      fontFamily: 'PTSerifCaption_400Regular',
      fontStyle: 'normal',
      fontWeight: "bold",
      fontSize: 20,
      lineHeight: 26,
      color: "#000000"
    }, 
    itemText:{
      fontFamily: 'PTSerifCaption_400Regular',
      fontSize: 16,
      lineHeight: 21,
      color: "#000000"
    }
  });

export default DraggableList