import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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

  const rTips = [
    'mean() – Calculates the mean of a numeric vector.',
    'sd() – Calculates the standard deviation of a numeric vector.',
    'sum() – Sums up the elements of a numeric vector.',
    'length() – Returns the length of a vector.',
    'seq() – Generates a sequence of numbers.',
    'rep() – Replicates the values in a vector.',
    'sort() – Sorts a vector.',
    'unique() – Extracts unique elements from a vector.',
    'table() – Creates a frequency table.',
    'sample() – Draws random samples from a vector.'
  ];

  const csharpTips = [
    'Use var for local variable declarations.',
    'Use using statements to manage resources.',
    'Use string interpolation for formatting strings.',
    'Use LINQ for querying collections.',
    'Use async and await for asynchronous programming.',
    'Use properties instead of public fields.',
    'Use exception handling for error management.',
    'Use the null-coalescing operator (??) for null checks.',
    'Use the nameof operator for argument validation.',
    'Use tuples for returning multiple values from a method.'
  ];

  const [currentPythonTip, setCurrentPythonTip] = useState(-1);
  const [currentJavaTip, setCurrentJavaTip] = useState(-1);
  const [currentRTip, setCurrentRTip] = useState(-1);
  const [currentCsharpTip, setCurrentCsharpTip] = useState(-1);
  const [showPythonButton, setShowPythonButton] = useState(true);
  const [showJavaButton, setShowJavaButton] = useState(true);
  const [showRButton, setShowRButton] = useState(true);
  const [showCsharpButton, setShowCsharpButton] = useState(true);
  const [pythonButtonText, setPythonButtonText] = useState('Learn Python');
  const [javaButtonText, setJavaButtonText] = useState('Learn Java');
  const [rButtonText, setRButtonText] = useState('Learn R');
  const [csharpButtonText, setCsharpButtonText] = useState('Learn C#');

  const showNextPythonTip = () => {
    setCurrentPythonTip((prevIndex) => (prevIndex + 1) % tips.length);
    setShowJavaButton(false);
    setShowRButton(false);
    setShowCsharpButton(false);
    setPythonButtonText('Next');
  };

  const showNextJavaTip = () => {
    setCurrentJavaTip((prevIndex) => (prevIndex + 1) % javaTips.length);
    setShowPythonButton(false);
    setShowRButton(false);
    setShowCsharpButton(false);
    setJavaButtonText('Next');
  };

  const showNextRTip = () => {
    setCurrentRTip((prevIndex) => (prevIndex + 1) % rTips.length);
    setShowPythonButton(false);
    setShowJavaButton(false);
    setShowCsharpButton(false);
    setRButtonText('Next');
  };

  const showNextCsharpTip = () => {
    setCurrentCsharpTip((prevIndex) => (prevIndex + 1) % csharpTips.length);
    setShowPythonButton(false);
    setShowJavaButton(false);
    setShowRButton(false);
    setCsharpButtonText('Next');
  };

  const resetTips = () => {
    setCurrentPythonTip(-1);
    setCurrentJavaTip(-1);
    setCurrentRTip(-1);
    setCurrentCsharpTip(-1);
    setShowPythonButton(true);
    setShowJavaButton(true);
    setShowRButton(true);
    setShowCsharpButton(true);
    setPythonButtonText('Learn Python');
    setJavaButtonText('Learn Java');
    setRButtonText('Learn R');
    setCsharpButtonText('Learn C#');
  };

  return (
    <View style={learningScreenStyles.container}>
      {(currentPythonTip >= 0 || currentJavaTip >= 0 || currentRTip >= 0 || currentCsharpTip >= 0) && (
        <TouchableOpacity style={learningScreenStyles.button} onPress={resetTips}>
          <Text style={learningScreenStyles.buttonText}>Back</Text>
        </TouchableOpacity>
      )}
      {currentPythonTip >= 0 && (
        <>
          <Text style={learningScreenStyles.topText}>Python Coding Function:</Text>
          <Text style={learningScreenStyles.tipText}>{tips[currentPythonTip]}</Text>
        </>
      )}
      {showPythonButton && (
        <TouchableOpacity style={learningScreenStyles.button} onPress={showNextPythonTip}>
          <Text style={learningScreenStyles.buttonText}>{pythonButtonText}</Text>
        </TouchableOpacity>
      )}
      {currentJavaTip >= 0 && (
        <>
          <Text style={learningScreenStyles.topText}>Java Coding Tip:</Text>
          <Text style={learningScreenStyles.tipText}>{javaTips[currentJavaTip]}</Text>
        </>
      )}
      {showJavaButton && (
        <TouchableOpacity style={learningScreenStyles.button} onPress={showNextJavaTip}>
          <Text style={learningScreenStyles.buttonText}>{javaButtonText}</Text>
        </TouchableOpacity>
      )}
      {currentRTip >= 0 && (
        <>
          <Text style={learningScreenStyles.topText}>R Coding Tip:</Text>
          <Text style={learningScreenStyles.tipText}>{rTips[currentRTip]}</Text>
        </>
      )}
      {showRButton && (
        <TouchableOpacity style={learningScreenStyles.button} onPress={showNextRTip}>
          <Text style={learningScreenStyles.buttonText}>{rButtonText}</Text>
        </TouchableOpacity>
      )}
      {currentCsharpTip >= 0 && (
        <>
          <Text style={learningScreenStyles.topText}>C# Coding Tip:</Text>
          <Text style={learningScreenStyles.tipText}>{csharpTips[currentCsharpTip]}</Text>
        </>
      )}
      {showCsharpButton && (
        <TouchableOpacity style={learningScreenStyles.button} onPress={showNextCsharpTip}>
          <Text style={learningScreenStyles.buttonText}>{csharpButtonText}</Text>
        </TouchableOpacity>
      )}
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
  button: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
});