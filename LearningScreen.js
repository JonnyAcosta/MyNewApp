import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const robotImage = require('C:/Users/ethan/Downloads/AppliedProgrammingSprint1/CodeApp/MyNewApp/a cute little red robot without background.png');

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
  const [showGreenFlash, setShowGreenFlash] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [completedModules, setCompletedModules] = useState({
    python: false,
    java: false,
    csharp: false,
    cpp: false,
  });
  const [incorrectQuestions, setIncorrectQuestions] = useState({
    python: [],
    java: [],
    csharp: [],
    cpp: [],
  });
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [initialTipsCount, setInitialTipsCount] = useState(0);

  const resetAnswers = () => {
    setSelectedOption(null);
    setShowNextButton(false);
  };

  const handleGuess = (option, tips) => {
    setSelectedOption(option);
    if (option === tips[currentTipIndex].answer) {
      setShowGreenFlash(true);
      setTimeout(() => setShowGreenFlash(false), 500);
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    } else {
      setIncorrectQuestions((prevQuestions) => ({
        ...prevQuestions,
        [selectedLanguage]: [...prevQuestions[selectedLanguage], tips[currentTipIndex]],
      }));
    }
    setShowNextButton(true);
  };

  const handleNextQuestion = (tips) => {
    if (correctAnswersCount === initialTipsCount) {
      setCompletedModules((prevModules) => ({
        ...prevModules,
        [selectedLanguage]: true,
      }));
      setSelectedLanguage(null);
      setCurrentTipIndex(0);
      setCorrectAnswersCount(0);
      resetAnswers();
    } else if (currentTipIndex + 1 === tips.length) {
      setCurrentTipIndex(0);
      resetAnswers();
    } else {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
      resetAnswers();
    }
  };

  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language);
    setCurrentTipIndex(0);
    resetAnswers();
    setCorrectAnswersCount(0);
    setInitialTipsCount(language === 'python' ? pythonTips.length :
                        language === 'java' ? javaTips.length :
                        language === 'csharp' ? csharpTips.length :
                        cppTips.length);
    setIncorrectQuestions((prevQuestions) => ({
      ...prevQuestions,
      [language]: [],
    }));
  };

  const renderTip = (tips) => (
    <View>
      <Image source={robotImage} style={styles.robotImage} />
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
            selectedOption !== null && option === tips[currentTipIndex].answer && styles.correctButton,
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

  const renderLanguageSelection = () => {
    const completedCount = Object.values(completedModules).filter(Boolean).length;
    let status = 'Novice';
    if (completedCount === 2 || completedCount === 3) {
      status = 'Intermediate';
    } else if (completedCount === 4) {
      status = 'Master';
    }

    return (
      <View>
        <Image source={robotImage} style={styles.robotImage} />
        <Text style={styles.topText}>Select a Language</Text>
        <Text style={styles.topText}>{completedCount}/4 Modules Completed - {status}</Text>
        <TouchableOpacity
          style={[styles.button, completedModules.python && styles.completedButton]}
          onPress={() => handleLanguageSelection('python')}
        >
          <Text style={styles.buttonText}>Python</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, completedModules.java && styles.completedButton]}
          onPress={() => handleLanguageSelection('java')}
        >
          <Text style={styles.buttonText}>Java</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, completedModules.csharp && styles.completedButton]}
          onPress={() => handleLanguageSelection('csharp')}
        >
          <Text style={styles.buttonText}>C#</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, completedModules.cpp && styles.completedButton]}
          onPress={() => handleLanguageSelection('cpp')}
        >
          <Text style={styles.buttonText}>C++</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, showGreenFlash && styles.greenFlash]}>
      {selectedLanguage === null ? (
        renderLanguageSelection()
      ) : (
        <>
          <Text style={styles.topText}>Learning Tips</Text>
          {selectedLanguage === 'python' && renderTip([...pythonTips, ...incorrectQuestions.python])}
          {selectedLanguage === 'java' && renderTip([...javaTips, ...incorrectQuestions.java])}
          {selectedLanguage === 'csharp' && renderTip([...csharpTips, ...incorrectQuestions.csharp])}
          {selectedLanguage === 'cpp' && renderTip([...cppTips, ...incorrectQuestions.cpp])}
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
    backgroundColor: '#d3d3d3', // Changed background color to a slightly darker gray
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
  completedButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  robotImage: {
    width: 150, // Increased width
    height: 150, // Increased height
    marginBottom: 20,
    alignSelf: 'center', // Center the image
  },
});