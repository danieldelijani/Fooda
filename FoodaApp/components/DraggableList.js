import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
//import ListItem from './Listitem';
import Swipeout from 'react-native-swipeout';

import CheckBox from 'expo-checkbox';
import { Button } from 'native-base';


const DraggableList = ({sectionData, deleteItem, moveCompleted}) => {
    const [flatData, setFlatData] = useState([])
    //const [isSelected, setSelection] = useState(false);
    

    renderItem = ({ item, index, drag, isActive }) => {
      const [isSelected, setSelection] = useState(false);
        let deleteBtn = [
            {
                text: 'Delete',
                backgroundColor: 'red',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => {
                    deleteItem(index);
                    setFlatData(flatData.filter(Element => Element.label != item.label ));
                }
            }
        ]
        /*let moveToComplete = [
          {
            backgroundColor: 'white',
    
            onclick: () => {
              setSelection;
              moveCompleted(item.label, index);
              setFlatData(flatData.filter(Element => Element.label != item.label ));
          }
          }
        ] */
        
        if (!item.isTitle){
            return (
                <Swipeout right ={deleteBtn}>
                    <TouchableOpacity onLongPress={item.isTitle?()=>{}: drag} >
                    {/*<ListItem item={item.label} deleteItem = {deleteItem} /> */}
                      
                        <View style={styles2.listItemView}>
                            <View style={styles2.checkboxView}>
                              {/*<Button  
                                style={styles2.btn}
                                //</View>onPress= {() => {moveCompleted(item.label, index)} }
                              ></Button>*/}
                              <CheckBox action={moveCompleted}
                                  color= 'sienna'
                                  value={isSelected}
                                  onValueChange={setSelection}
                                  //onClick={moveCompleted(item.label, index)}
                              /> 
                            </View>
                          <Text style={styles2.listItemText} >{item.label} </Text>
                          <View>


                          </View>
                        </View> 
                    </TouchableOpacity>
                </Swipeout>
            );
        } else {
            return (
                <TouchableOpacity onLongPress={item.isTitle?()=>{}: drag} >
                  <Text> 
                      {item.label}
                  </Text>
                </TouchableOpacity>
            )
        }
      };

    useEffect(()=>{
        const flatSection = sectionData.map((section, index)=> {
                return [{key: `${section.title}${index}`, label: section.title, isTitle: true}, ...(section.data.map((sectionItem, index) => {
                return {key: `${sectionItem}${index}`, label: sectionItem, isTitle: false}
            }))]
          })
        
          setFlatData(flatSection.flat(1))
    },[sectionData])

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
};
const styles2 = StyleSheet.create({
    listItem: {
      padding: 20,
      backgroundColor: 'oldlace',
      borderBottomWidth: 2,
      borderColor: '#eee',
    },
    listItemView: {
      flexDirection: 'row',
      
      alignItems: 'center',
      backgroundColor: 'oldlace',
    },
    listItemText: {
      fontSize: 18,
      color:'#8B4513',
      fontFamily: 'serif',
      paddingLeft: 15,
    },
    checkboxView: {
      alignItems: 'flex-start',
      padding: 20,
      color: 'white',
    },
    btn: {
      backgroundColor: 'oldlace',
      padding: 9,
      margin: 5,
    },
    btnText: {
      color: 'darkslateblue',
      fontSize: 20,
      textAlign: 'center',
    },
  });


export default DraggableList