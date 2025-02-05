import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function ChallengeScreen({ navigation }) {
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
      <View style={styles.container}>
        <Text style={styles.text}>Loading questions...</Text>
      </View>
    );
  }

  if (quizFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Quiz Completed!</Text>
        <Text style={styles.scoreText}>Your Score: {score} / {questions.length}</Text>
        <Text style={styles.gradeText}>Grade: {getGrade()}</Text>
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.homeButtonText}>🏠 Return to Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
          <Text style={styles.restartButtonText}>🔄 Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Challenge</Text>
      <Text style={styles.scoreText}>Score: {score} / {questions.length}</Text>
      <Text style={styles.question}>{questions[currentQuestionIndex].text}</Text>

      {questions[currentQuestionIndex].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selectedAnswer === option
              ? isCorrect
                ? styles.correct
                : styles.incorrect
              : styles.defaultOption,
          ]}
          onPress={() => handleAnswerPress(option)}
          disabled={selectedAnswer !== null}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {selectedAnswer && (
        <Text style={isCorrect ? styles.correctText : styles.incorrectText}>
          {isCorrect ? "Correct! 🎉" : "Wrong! ❌"}
        </Text>
      )}

      {selectedAnswer && (
        <TouchableOpacity style={styles.nextButton} onPress={goToNextQuestion}>
          <Text style={styles.nextButtonText}>Next Question ➡️</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Styles for Challenge Screen
const styles = StyleSheet.create({
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