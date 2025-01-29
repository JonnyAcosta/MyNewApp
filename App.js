import React from 'react';
import { View, Text, Button, Image, Alert, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, my name is Joshua 🚀</Text>
      
      {/* Button added here */}
      <Button 
        title="Press Me"
        onPress={() => Alert.alert("You pressed the button! 🎉")}
      />
      
      <Image 
  source={{ uri: "https://source.unsplash.com/random" }} 
  style={{ width: 200, height: 200, borderRadius: 10 }} 
  />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});


