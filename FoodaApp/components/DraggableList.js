import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import ListItem from './Listitem';

const DraggableList = ({sectionData}) => {
    const [flatData, setFlatData] = useState([])

    renderItem = ({ item, index, drag, isActive }) => {
        if (!item.isTitle){
            return (
                <TouchableOpacity onLongPress={item.isTitle?()=>{}: drag} >
                  <ListItem item={item.label} />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onLongPress={item.isTitle?()=>{}: drag} >
                  <Text> {item.label}</Text>
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
}

export default DraggableList