import React, { useState } from 'react';
import { View, Text, Button, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= "Home" component={HomeScreen}/>
        <Stack.Screen name= "Flashcards" component={FlashcardsScreen}/>
        <Stack.Screen name= "Learning" component={LearningScreen}/>
        <Stack.Screen name= "Trivia" component={TriviaScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({navigation}){
  return(
    <View style = {styles.container}>
      <Text style = {styles.title}>Welcome to the App</Text>
      <Button title="Flashcards" onPress={() => navigation.navigate('Flashcards')} />
      <Button title="Trivia" onPress={() => navigation.navigate('Trivia')} />
      <Button title="Learning" onPress={() => navigation.navigate('Learning')} />
    </View>
  );
}

function FlashcardsScreen(){
  const flashcards = [
    {question: "What is Python", answer: "It is a programming language."},
    {question: "what is the most common print statement", answer: "Hello, World"},
    {question: "What is Visual Studios Code", answer: "It is a program to code"},
  ];

  const[index, setIndex] = useState(0);
  const[showAnswer, SetShowAnswer] = useState(false);

  return(
    <View style = {styles.container}>
      <Text style = {styles.text}> This is the Flashcards tab</Text>
      <TouchableOpacity
        style = {styles.card}
        onPress = {() => SetShowAnswer(!showAnswer)}
        > 
        <Text style={styles.text}>
          {showAnswer ? flashcards[index].answer : flashcards[index].question}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
      style ={styles.button}
      onPress = {() => {SetShowAnswer(false);
        setIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
      }}>
        <Text style={styles.buttonText}>Next Card</Text>
      </TouchableOpacity>
      
    </View>
  );
}

function LearningScreen(){
  return(
    <View style = {styles.container}>
      <Text style = {styles.text}> This is the Learning tab</Text>
    </View>
  );
}

function TriviaScreen(){
  return(
    <View style = {styles.container}>
      <Text style = {styles.text}> This is the Trivia tab</Text>
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

  title:{
    fontSize: 24,
    fontWeight:'bold',
    marginBottom: 20,
  },

  card: {
    width: 300,
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    elevation: 5,
    padding: 20,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems:'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});


