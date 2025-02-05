import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const pythonTips = [
  {
    tip: "len() – Returns the length of an object (e.g., string, list).",
    code: "len(___)",
    options: ["object", "string", "list", "number"],
    answer: "object"
  },
  {
    tip: "max() – Returns the largest item from an iterable.",
    code: "max(___)",
    options: ["iterable", "list", "string", "number"],
    answer: "iterable"
  },
  // Add more Python tips here...
];

const javaTips = [
  {
    tip: "Use const to define a constant value.",
    code: "const ___ = 10;",
    options: ["int", "let", "var", "const"],
    answer: "int"
  },
  {
    tip: "Use let for variables that might change.",
    code: "let ___ = 20;",
    options: ["int", "let", "var", "const"],
    answer: "var"
  },
  // Add more Java tips here...
];

const csharpTips = [
  {
    tip: "Use var for local variable declarations.",
    code: "var ___ = 30;",
    options: ["int", "let", "var", "const"],
    answer: "int"
  },
  {
    tip: "Use exception handling for error management.",
    code: "try { ___ } catch (Exception ex) { }",
    options: ["throw", "catch", "finally", "try"],
    answer: "throw"
  },
  // Add more C# tips here...
];

const cppTips = [
  {
    tip: "Use #include to include standard libraries.",
    code: "#include <___>",
    options: ["iostream", "stdio.h", "stdlib.h", "string"],
    answer: "iostream"
  },
  {
    tip: "Use cout to print to the console.",
    code: "cout << ___ << endl;",
    options: ["'Hello'", "Hello", "\"Hello\"", "Hello"],
    answer: "\"Hello\""
  },
  // Add more C++ tips here...
];

export function LearningScreen() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [showGreenFlash, setShowGreenFlash] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);

  const handleGuess = (option, tips) => {
    setSelectedOption(option);
    if (option === tips[currentTipIndex].answer) {
      setShowGreenFlash(true);
      setTimeout(() => setShowGreenFlash(false), 500);
      setLives((prevLives) => prevLives + 1);
    } else {
      setLives((prevLives) => prevLives - 2);
    }
    setShowNextButton(true);
  };

  const handleNextQuestion = (tips) => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    setSelectedOption(null);
    setShowNextButton(false);
  };

  const renderTip = (tips) => (
    <View>
      <Text style={styles.tipText}>{tips[currentTipIndex].tip}</Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>Complete the code: {tips[currentTipIndex].code.replace("___", "_____")}</Text>
      </View>
      {tips[currentTipIndex].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            selectedOption === option && option === tips[currentTipIndex].answer && styles.correctButton,
            selectedOption === option && option !== tips[currentTipIndex].answer && styles.incorrectButton,
          ]}
          onPress={() => handleGuess(option, tips)}
          disabled={selectedOption !== null}
        >
          <Text style={styles.buttonText}>{option}</Text>
        </TouchableOpacity>
      ))}
      {showNextButton && (
        <TouchableOpacity style={styles.nextButton} onPress={() => handleNextQuestion(tips)}>
          <Text style={styles.buttonText}>Next Question</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderLanguageSelection = () => (
    <View>
      <Text style={styles.topText}>Select a Language</Text>
      <TouchableOpacity style={styles.button} onPress={() => setSelectedLanguage('python')}>
        <Text style={styles.buttonText}>Python</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelectedLanguage('java')}>
        <Text style={styles.buttonText}>Java</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelectedLanguage('csharp')}>
        <Text style={styles.buttonText}>C#</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelectedLanguage('cpp')}>
        <Text style={styles.buttonText}>C++</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, showGreenFlash && styles.greenFlash]}>
      {selectedLanguage === null ? (
        renderLanguageSelection()
      ) : (
        <>
          <Text style={styles.topText}>Learning Tips</Text>
          {selectedLanguage === 'python' && renderTip(pythonTips)}
          {selectedLanguage === 'java' && renderTip(javaTips)}
          {selectedLanguage === 'csharp' && renderTip(csharpTips)}
          {selectedLanguage === 'cpp' && renderTip(cppTips)}
          <Text style={styles.tipText}>Lives: {lives}</Text>
          {lives <= 0 && <Text style={styles.tipText}>Game Over</Text>}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  greenFlash: {
    backgroundColor: 'green',
  },
  topText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  codeBox: {
    backgroundColor: 'black',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  codeText: {
    color: 'white',
    fontFamily: 'monospace',
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  correctButton: {
    backgroundColor: 'green',
  },
  incorrectButton: {
    backgroundColor: 'red',
  },
  nextButton: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
});