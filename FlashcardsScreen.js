import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export function FlashcardsScreen(){
  const flashcardsByCategory = {
    Python: [
    {question: "How do you declare a variable?", answer: "x = 10"},
    {question: "what is the print output?", answer: "print('Hello, World')"},
    {question: "How do you write an if statement?", answer: "if x > 5:\n print('x is greater')"},
    {question: "How do you write a for loop?", answer: "for i in range(5):\n print(i)"},
    {question: "How do you define a function?", answer: "def greet(name):\n return 'Hello' + name"},
    {question: "How do you create a list?", answer: "my_list = [1, 2, 3]"},
    {question: "How do you create a dictionary?", answer: "my_dict = {'name':'Jonathan', 'age': 23}"},
  ],
  JavaScript: [
    {question: "What is Javascript", answer: "It is a programming language for websites."},
    {question: "Which keyword declares a variable?", answer: "'var', 'let', or 'const' "},
    {question: "How do you print something?", answer: "console.log('Hello')"},
    {question: "How do you declare a variable?", answer: "let x = 10; or const x = 10;"},
    {question: "How do you write an if statement?", answer: "if (x > 5){\n console.log('x is greater')}"},
    {question: "How do you define a function?", answer: "function greet(name){\n return 'Hello,' + name;}"},
    {question: "How do you create an object?", answer: "let myObj = {name: 'Jonathan', age: 23};"},
    {question: "How do you add a click event listener?", answer: "document.getElementById('myButton').addEventListener('click', function(){\n console.log('Button clicked');});"},

  ],
  Csharp: [
    {question: "How do you declare a variable?", answer: "int x = 10;"},
    {question: "How do you print something?", answer: "Console.WriteLine('Hello')"},
    {question: "How do you write an if statement?", answer: "if (x > 5)\n{\n Console.WriteLine('X is greater');}"},
    {question: "How do you loop 5 times?", answer: "for (int i = 0; i < 5; i++)\n{\n Console.WriteLine(i)}"},
    {question: "How do you create a function?", answer: "void Greet()\n{\n Console.WriteLine('Hello');"},
    {question: " How do you make an array?", answer: "int[] numbers = {1, 2, 3};"},
    {question: "How do you make a list?", answer: "List<int> myList = new List<int> {1, 2, 3};"},
    {question: "How do you create a class and object?", answer: "class Person {\npublic string Name;\n Person p = new Person();\n p.Name = 'Alice';"},
    
  ],
  Java: [
    {question: "How do you declare a variable?", answer: "int x = 10;"},
    {question: "How do you print something?", answer: "System.out.println('Hello');"},
    {question: "How do you write an if statement?", answer: "if (x > 5)\n{\n System.out.printIn('X is greater');}"},
    {question: "How do you loop 5 times?", answer: "for (int i = 0; i < 5; i++)\n{\n System.out.printIn(i);}"},
    {question: "How do you create a function?", answer: "void Greet()\n{\n System.out.printIn('Hello');"},
    {question: " How do you make an array?", answer: "int[] numbers = {1, 2, 3};"},
    {question: "How do you make a ArrayList?", answer: "ArrayList<int> myList = new ArrayList<int>();\n my.List.add(1);\n my.List.add(2);\n my.List.add(3);"},
    {question: "How do you create a class and object?", answer: "class Person {\npublic String name;\n Person p = new Person();\n p.Name = 'Alice';"},
    
  ],
};


  const categories = Object.keys(flashcardsByCategory);
  const[selectedCategory, setSelectedCategory] = useState(null);
  const[flashcards, setFlashcards] = useState([]);
  const[index, setIndex] = useState(0);
  const[showAnswer, SetShowAnswer] = useState(false);

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setFlashcards(flashcardsByCategory[category]);
    setIndex(0);
    SetShowAnswer(false);
  };

  return(
    <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?q=80&w=339&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
          style={styles.background}
        >
    <View style={styles.overlay}>
    <View style = {styles.container}>
      <Text style = {styles.text}>Flashcards</Text>
      {!selectedCategory ?(
      <View>
        <Text style={styles.text}>Select a Category:</Text>
        {categories.map((category) =>(
          <TouchableOpacity
          key={category}
          style={styles.button}
          onPress={()=> selectCategory(category)}
          >
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      ) : (
      <View>
      <Text style={styles.text}>{selectedCategory}Flashcards</Text>
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

      <TouchableOpacity style={styles.button} onPress={() => setSelectedCategory(null)}>
        <Text style={styles.buttonText}>Back to Categories</Text>
      </TouchableOpacity>
      </View>
      )}
    </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
      backgroundColor: 'pink',
     },
     background: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
     },
     overlay: {
       backgroundColor: 'rgba(0, 0, 0, 0.6)',
       padding: 20,
       borderRadius:15,
       alignItems: 'center',
       width: '85%',
     },
     text: {
       fontSize: 20,
       marginBottom: 20,
       fontWeight: 'bold',
     },
   
     title:{
       fontSize: 28,
       fontWeight:'bold',
       color: 'white',
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
       flexDirection:"row",
       // marginTop: 20,
       backgroundColor: '#007BFF',
       padding: 15,
       borderRadius: 10,
       width: '80%',
       alignItems:'center',
       marginBottom: 10,
     },
     buttonText: {
       color: 'white',
       fontSize: 18,
       fontWeight: 'bold',
      // marginLeft: 8,
     },
     overlay: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
   },
   });
   