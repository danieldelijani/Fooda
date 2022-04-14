import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import ListItem from './Listitem';
import Swipeout from 'react-native-swipeout';

const DraggableList = ({sectionData, deleteItem}) => {
    const [flatData, setFlatData] = useState([])

    renderItem = ({ item, index, drag, isActive }) => {
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
                        <ListItem item={item.label} deleteItem = {deleteItem} />
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
                return [{key: `${section.title}${index}`, label: section.title, isTitle: true, section: ""}, ...(section.data.map((sectionItem, index) => {
                return {key: `${sectionItem}${index}`, label: sectionItem, isTitle: false, section: section.title}
            }))]
          })
          setFlatData(flatSection.flat(1))
          console.log(flatData)
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
}

export default DraggableList