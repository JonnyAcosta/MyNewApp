import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, Alert, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LearningScreen } from './LearningScreen';
import { Ionicons } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

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
    <ImageBackground source={{uri:'https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?q=80&w=339&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
    style={styles.background}>
    
      <View style = {styles.overlay}>
      <Text style = {styles.title}>Welcome to the App</Text>

      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Flashcards')}>
        <Ionicons name="book-outline" size={24} color="white"/>
        <Text style={styles.buttonText}>Flashcards</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Challenge')}>
        <Ionicons name="game-controller-outline" size={24} color="white"/>
        <Text style={styles.buttonText}>Challenge</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Learning')}>
        <Ionicons name="school-outline" size={24} color="white"/>
        <Text style={styles.buttonText}>Learning</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

function FlashcardsScreen(){
  const flashcardsByCategory = {
    Python: [
    {question: "What is Python", answer: "It is a programming language."},
    {question: "what is the print statement in Python", answer: "print('Hello, World')"},
    {question: "What is Visual Studios Code", answer: "It is a program to code"},
  ],
  JavaScript: [
    {question: "What is Javascript", answer: "It is a programming language for websites."},
    {question: "Which keyword declares a variable?", answer: "'var', 'let', or 'const' "},
    {question: "How do you print something?", answer: "console.log('Hello')"},
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
    const questionPool = [
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
    ];

    // Shuffle the questions and select the first 10
    setQuestions(questionPool.sort(() => Math.random() - 0.5).slice(0, 10));
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
    setQuestions(prevQuestions => prevQuestions.sort(() => Math.random() - 0.5)); // Shuffle again
  };

  const getGrade = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "A (Excellent! 🎉)";
    if (percentage >= 80) return "B (Great Job! 👍)";
    if (percentage >= 70) return "C (Good Effort!)";
    if (percentage >= 60) return "D (Needs Improvement.)";
    return "F (Try Again! 😢)";
  };

  if (questions.length === 0) {
    return (
      <View style={stylesChallenge.container}>
        <Text style={stylesChallenge.text}>Loading questions...</Text>
      </View>
    );
  }

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

// Styles for Challenge Screen
const stylesChallenge = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#333',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007BFF',
  },
  gradeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#007BFF',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#444',
  },
  option: {
    width: '85%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  defaultOption: {
    backgroundColor: 'white',
  },
  correct: {
    backgroundColor: '#4CAF50',
    borderColor: '#388E3C',
  },
  incorrect: {
    backgroundColor: '#F44336',
    borderColor: '#D32F2F',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  correctText: {
    color: '#4CAF50',
    fontSize: 18,
    marginTop: 15,
    fontWeight: 'bold',
  },
  incorrectText: {
    color: '#F44336',
    fontSize: 18,
    marginTop: 15,
    fontWeight: 'bold',
  },
  nextButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    width: '75%',
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#28a745',
    borderRadius: 8,
    width: '75%',
    alignItems: 'center',
  },
  homeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  restartButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#dc3545',
    borderRadius: 8,
    width: '75%',
    alignItems: 'center',
  },
  restartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});





const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
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
});


