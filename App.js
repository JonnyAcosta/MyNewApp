import React, { useState, useEffect } from 'react';
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
        <Stack.Screen name= "Challenge" component={ChallengeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({navigation}){
  return(
    <View style = {styles.container}>
      <Text style = {styles.title}>Welcome to the App</Text>
      <Button title="Flashcards" onPress={() => navigation.navigate('Flashcards')} />
      <Button title="Challenge" onPress={() => navigation.navigate('Challenge')} />
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
      style = {styles.card}
      onPress = {() => {SetShowAnswer(false);
        setIndex((prevIndex) => (revIndex + 1) % flashcards.length);
      }}>

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


// Challenge Screen (Multiple Choice Question)
function ChallengeScreen({ navigation }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    setQuestions([
      { text: "What is the output of console.log(2 + '2') in JavaScript?", options: ["22", "4", "NaN", "Error"], correct: "22" },
      { text: "Which of the following is a valid way to declare a function in Python?", options: ["def myFunction():", "function myFunction():", "func myFunction():", "declare myFunction():"], correct: "def myFunction():" },
      { text: "Which keyword is used to define a class in C#?", options: ["class", "Class", "define", "struct"], correct: "class" },
      { text: "Which keyword is used to declare a variable in JavaScript?", options: ["var", "define", "let", "const"], correct: "var" },
      { text: "What is the correct way to print 'Hello, World!' in Python?", options: ["echo 'Hello, World!'", "console.log('Hello, World!')", "print('Hello, World!')", "System.out.println('Hello, World!')"], correct: "print('Hello, World!')" },
      { text: "Which data type is used to store true or false values in C#?", options: ["bool", "boolean", "Boolean", "bit"], correct: "bool" },
      { text: "What does 'typeof null' return in JavaScript?", options: ["null", "undefined", "object", "string"], correct: "object" },
      { text: "How do you start a loop in Python?", options: ["for i = 0; i < 10; i++", "foreach i in range(10)", "for i in range(10)", "loop i 10"], correct: "for i in range(10)" },
      { text: "Which symbol is used for single-line comments in C#?", options: ["#", "//", "/*", "--"], correct: "//" },
      { text: "What is the default value of an uninitialized variable in C#?", options: ["null", "0", "undefined", "Depends on the type"], correct: "Depends on the type" }
    ]);
  }, []);

  const handleAnswerPress = (answer) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestionIndex].correct;
    setIsCorrect(correct);
    if (correct) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setSelectedAnswer(null);
      setIsCorrect(null);
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setQuizFinished(false);
  };

  const getGrade = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "A (Excellent! 🎉)";
    if (percentage >= 80) return "B (Great Job! 👍)";
    if (percentage >= 70) return "C (Good Effort!)";
    if (percentage >= 60) return "D (Needs Improvement.)";
    return "F (Try Again! 😢)";
  };

  if (quizFinished) {
    return (
      <View style={stylesChallenge.container}>
        <Text style={stylesChallenge.text}>Quiz Completed!</Text>
        <Text style={stylesChallenge.scoreText}>Your Score: {score} / {questions.length}</Text>
        <Text style={stylesChallenge.gradeText}>Grade: {getGrade()}</Text>
        <TouchableOpacity style={stylesChallenge.homeButton} onPress={() => navigation.navigate("Home")}>
          <Text style={stylesChallenge.homeButtonText}>🏠 Return to Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesChallenge.restartButton} onPress={restartQuiz}>
          <Text style={stylesChallenge.restartButtonText}>🔄 Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={stylesChallenge.container}>
      <Text style={stylesChallenge.text}>Challenge</Text>
      <Text style={stylesChallenge.scoreText}>Score: {score} / {questions.length}</Text>
      <Text style={stylesChallenge.question}>{questions[currentQuestionIndex].text}</Text>

      {questions[currentQuestionIndex].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            stylesChallenge.option,
            selectedAnswer === option
              ? isCorrect
                ? stylesChallenge.correct
                : stylesChallenge.incorrect
              : stylesChallenge.defaultOption,
          ]}
          onPress={() => handleAnswerPress(option)}
          disabled={selectedAnswer !== null}
        >
          <Text style={stylesChallenge.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {selectedAnswer && (
        <Text style={isCorrect ? stylesChallenge.correctText : stylesChallenge.incorrectText}>
          {isCorrect ? "Correct! 🎉" : "Wrong! ❌"}
        </Text>
      )}

      {selectedAnswer && (
        <TouchableOpacity style={stylesChallenge.nextButton} onPress={goToNextQuestion}>
          <Text style={stylesChallenge.nextButtonText}>Next Question ➡️</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Updated styles
const stylesChallenge = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  text: { fontSize: 20, marginBottom: 20, fontWeight: 'bold' },
  scoreText: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  gradeText: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: 'blue' },
  question: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  option: { width: '80%', padding: 15, marginVertical: 5, borderRadius: 10, alignItems: 'center' },
  defaultOption: { backgroundColor: '#ddd' },
  correct: { backgroundColor: 'green' },
  incorrect: { backgroundColor: 'red' },
  optionText: { fontSize: 16, fontWeight: 'bold', color: 'white' },
  correctText: { color: 'green', fontSize: 18, marginTop: 20 },
  incorrectText: { color: 'red', fontSize: 18, marginTop: 20 },
  nextButton: { marginTop: 20, padding: 10, backgroundColor: '#007BFF', borderRadius: 10 },
  nextButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  homeButton: { marginTop: 20, padding: 10, backgroundColor: '#28a745', borderRadius: 10 },
  homeButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  restartButton: { marginTop: 10, padding: 10, backgroundColor: '#dc3545', borderRadius: 10 },
  restartButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});




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
});


