const StoreView = (marker) => {
    return (
        <View
        style={{
          flexDirection: "row",
          height: 100,
          padding: 20,
          backgroundColor: "white"
        }}> 
            <image 
                style={{}}
                source={marker.image}>
            </image>

            <Text>{marker.name}</Text>
            <Text>{marker.rating}</Text>
            <Text>{marker.price_level}</Text>
        </View>
    );
  }
  
  export default StoreView;