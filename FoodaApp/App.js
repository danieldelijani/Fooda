import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
// import { Button } from 'react-native-web';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to Fooda</Text>
      <Button title="Google Maps API"/>
      <Button title="Shopping List"/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
