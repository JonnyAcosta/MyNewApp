import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export function LearningScreen() {
  const tips = [
    "len() – Returns the length of an object (e.g., string, list).",
    "max() – Returns the largest item from an iterable.",
    "min() – Returns the smallest item from an iterable.",
    "sorted() – Returns a sorted list from the elements of any iterable.",
    "sum() – Sums up the elements of an iterable.",
    "abs() – Returns the absolute value of a number.",
    "round() – Rounds a floating-point number to a specified number of decimal places.",
    "type() – Returns the type of an object.",
    "input() – Allows the user to input data from the keyboard.",
    "str() – Converts an object to a string."
  ];

  const javaTips = [
    'Use const to define a constant value.',
    'Use let for variables that might change.',
    'Always close resources like files and database connections.',
    'Use meaningful names for variables and methods.',
    'Use try-catch blocks for error handling.',
    'Avoid using null, prefer Optional.',
    'Use Java’s standard library classes for common tasks.',
    'Write unit tests to ensure code reliability.',
    'Use streams for processing collections.',
    'Use interfaces to achieve abstraction in Java.'
  ];

  const [currentPythonTip, setCurrentPythonTip] = useState(-1);
  const [currentJavaTip, setCurrentJavaTip] = useState(-1);

  const showNextPythonTip = () => {
    setCurrentPythonTip((prevIndex) => (prevIndex + 1) % tips.length);
  };

  const showNextJavaTip = () => {
    setCurrentJavaTip((prevIndex) => (prevIndex + 1) % javaTips.length);
  };

  return (
    <View style={learningScreenStyles.container}>
      {currentPythonTip >= 0 && (
        <>
          <Text style={learningScreenStyles.topText}>Python Coding Function:</Text>
          <Text style={learningScreenStyles.tipText}>{tips[currentPythonTip]}</Text>
        </>
      )}
      <Button title="Next Python Function" onPress={showNextPythonTip} />
      {currentJavaTip >= 0 && (
        <>
          <Text style={learningScreenStyles.topText}>Java Coding Tip:</Text>
          <Text style={learningScreenStyles.tipText}>{javaTips[currentJavaTip]}</Text>
        </>
      )}
      <Button title="Next Java Tip" onPress={showNextJavaTip} />
    </View>
  );
}

const learningScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
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
});