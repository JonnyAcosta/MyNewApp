import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const robotImage = require('C:/Users/ethan/Downloads/AppliedProgrammingSprint1/CodeApp/MyNewApp/a cute little red robot without background.png');
const backgroundImageUri = 'https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?q=80&w=339&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const pythonTips = [
  
  {
    "tip": "len() – Returns the length of an object (e.g., string, list).",
    "code": "len(___)",
    "options": ["object", "string", "list", "number"],
    "answer": "object"
},
{
    "tip": "str() – Converts a value to a string.",
    "code": "str(___)",
    "options": ["int", "float", "bool", "list"],
    "answer": "int"
},
{
    "tip": "int() – Converts a value to an integer.",
    "code": "int(___)",
    "options": ["string", "float", "bool", "tuple"],
    "answer": "float"
},
{
    "tip": "sum() – Sums the items of an iterable.",
    "code": "sum(___)",
    "options": ["dict", "list", "set", "str"],
    "answer": "list"
},
{
    "tip": "max() – Returns the largest item in an iterable.",
    "code": "max(___)",
    "options": ["string", "int", "list", "dict"],
    "answer": "list"
},
{
    "tip": "min() – Returns the smallest item in an iterable.",
    "code": "min(___)",
    "options": ["string", "tuple", "set", "dict"],
    "answer": "tuple"
},
{
    "tip": "type() – Returns the type of an object.",
    "code": "type(___)",
    "options": ["value", "object", "variable", "function"],
    "answer": "object"
},
{
    "tip": "abs() – Returns the absolute value of a number.",
    "code": "abs(___)",
    "options": ["negative", "float", "string", "list"],
    "answer": "negative"
},
{
    "tip": "sorted() – Returns a sorted list of the specified iterable.",
    "code": "sorted(___)",
    "options": ["tuple", "set", "dict", "list"],
    "answer": "list"
},
{
    "tip": "round() – Rounds a number to a specified number of decimal places.",
    "code": "round(___)",
    "options": ["int", "float", "str", "bool"],
    "answer": "float"
},
{
    "tip": "eval() – Parses the expression passed to it and runs python expression (python code) within program.",
    "code": "eval(___)",
    "options": ["function", "string", "list", "dictionary"],
    "answer": "string"
},
{
    "tip": "divmod() – Returns a tuple containing quotient and remainder when argument1 is divided by argument2.",
    "code": "divmod(___)",
    "options": ["int", "str", "float", "dict"],
    "answer": "int"
},
{
    "tip": "repr() – Returns a printable representation of the given object.",
    "code": "repr(___)",
    "options": ["function", "list", "tuple", "dict"],
    "answer": "list"
},
{
    "tip": "map() – Applies a given function to each item of an iterable and returns a list of the results.",
    "code": "map(___)",
    "options": ["string", "function", "int", "dict"],
    "answer": "function"
},
{
    "tip": "all() – Returns True if all elements of the iterable are true.",
    "code": "all(___)",
    "options": ["string", "list", "tuple", "set"],
    "answer": "list"
},
{
    "tip": "any() – Returns True if any element of the iterable is true.",
    "code": "any(___)",
    "options": ["string", "list", "tuple", "set"],
    "answer": "list"
},
{
    "tip": "format() – Formats a string according to the specified format string.",
    "code": "format(___)",
    "options": ["string", "int", "float", "bool"],
    "answer": "string"
},
{
    "tip": "chr() – Converts an integer to its Unicode character.",
    "code": "chr(___)",
    "options": ["string", "int", "list", "set"],
    "answer": "int"
},
{
    "tip": "ord() – Converts a character to its Unicode integer.",
    "code": "ord(___)",
    "options": ["string", "char", "int", "list"],
    "answer": "char"
},
{
    "tip": "bin() – Converts an integer to its binary representation.",
    "code": "bin(___)",
    "options": ["string", "char", "int", "list"],
    "answer": "int"
}


  // Add more Python tips here...
];

const javaTips = [
  {
    tip: "Declare an integer variable.",
    code: "___ number = 5;",
    options: ["let", "var", "int", "const"],
    answer: "int"
  },
  {
    tip: "Declare a string variable.",
    code: "___ name = \"John\";",
    options: ["String", "str", "char", "int"],
    answer: "String"
  },
  {
    tip: "Declare a character variable.",
    code: "___ initial = 'A';",
    options: ["char", "string", "int", "var"],
    answer: "char"
  },
  {
    tip: "Declare a double variable.",
    code: "___ price = 19.99;",
    options: ["double", "float", "int", "var"],
    answer: "double"
  },
  {
    tip: "Declare a boolean variable.",
    code: "___ isTrue = true;",
    options: ["Boolean", "bool", "true", "int"],
    answer: "Boolean"
  },
  {
    tip: "Print a message to the console.",
    code: "System.___.println(\"Hello World\");",
    options: ["out", "print", "in", "console"],
    answer: "out"
  },
  {
    tip: "Create a new object of the class.",
    code: "___ myObject = new MyClass();",
    options: ["Object", "var", "int", "MyClass"],
    answer: "MyClass"
  },
  {
    tip: "Call a method on an object.",
    code: "myObject.___();",
    options: ["method", "call", "execute", "run"],
    answer: "method"
  },
  {
    tip: "Define a new class.",
    code: "___ MyClass { }",
    options: ["class", "Class", "structure", "struct"],
    answer: "class"
  },
  {
    tip: "Create an array of integers.",
    code: "int[] numbers = ___ int[5];",
    options: ["new", "create", "make", "define"],
    answer: "new"
  }
];

const csharpTips = [
  {
      "tip": "Returns the length of an array or string.",
      "code": "array.____",
      "options": ["Length", "Size", "Count", "Measure"],
      "answer": "Length"
  },
  {
      "tip": "Converts an object to a string representation.",
      "code": "object.____()",
      "options": ["ToString", "Convert", "Stringify", "Print"],
      "answer": "ToString"
  },
  {
      "tip": "Converts a string to an integer.",
      "code": "Convert.____(str)",
      "options": ["ToInt32", "ToInt", "ConvertInt", "GetInt"],
      "answer": "ToInt32"
  },
  {
      "tip": "Sorts the elements of an array.",
      "code": "Array.____(array)",
      "options": ["Sort", "Order", "Arrange", "Sequence"],
      "answer": "Sort"
  },
  {
      "tip": "Returns the maximum of two values.",
      "code": "Math.____(a, b)",
      "options": ["Max", "Maximum", "Larger", "Highest"],
      "answer": "Max"
  },
  {
      "tip": "Returns the minimum of two values.",
      "code": "Math.____(a, b)",
      "options": ["Min", "Minimum", "Smaller", "Lowest"],
      "answer": "Min"
  },
  {
      "tip": "Returns a substring from the specified string.",
      "code": "str.____(beginIndex, endIndex)",
      "options": ["Substring", "Sub", "Section", "Slice"],
      "answer": "Substring"
  },
  {
      "tip": "Checks if a string contains a specified sequence of characters.",
      "code": "str.____(sequence)",
      "options": ["Contains", "Has", "Includes", "Holds"],
      "answer": "Contains"
  },
  {
      "tip": "Adds an element to a List.",
      "code": "list.____(element)",
      "options": ["Add", "Append", "Insert", "Put"],
      "answer": "Add"
  },
  {
      "tip": "Associates the specified value with the specified key in a Dictionary.",
      "code": "dictionary.____(key, value)",
      "options": ["Add", "Insert", "Put", "Set"],
      "answer": "Add"
  }
];


const cppTips = [
  {
      "tip": "Returns the size of a vector.",
      "code": "vector.____()",
      "options": ["size", "length", "count", "measure"],
      "answer": "size"
  },
  {
      "tip": "Converts a value to a string.",
      "code": "std::____(value)",
      "options": ["to_string", "convert", "stringify", "print"],
      "answer": "to_string"
  },
  {
      "tip": "Converts a string to an integer.",
      "code": "std::____(str)",
      "options": ["stoi", "to_int", "convert_int", "get_int"],
      "answer": "stoi"
  },
  {
      "tip": "Sorts the elements of a container.",
      "code": "std::____(container.begin(), container.end())",
      "options": ["sort", "order", "arrange", "sequence"],
      "answer": "sort"
  },
  {
      "tip": "Returns the maximum of two values.",
      "code": "std::____(a, b)",
      "options": ["max", "maximum", "larger", "highest"],
      "answer": "max"
  },
  {
      "tip": "mReturns the minimum of two values.",
      "code": "std::____(a, b)",
      "options": ["min", "minimum", "smaller", "lowest"],
      "answer": "min"
  },
  {
      "tip": "Returns a substring from the specified string.",
      "code": "str.____(begin, length)",
      "options": ["substr", "sub", "section", "slice"],
      "answer": "substr"
  },
  {
      "tip": "Finds the first occurrence of a substring.",
      "code": "str.____(substring)",
      "options": ["find", "search", "locate", "get"],
      "answer": "find"
  },
  {
      "tip": "Adds an element to the end of a vector.",
      "code": "vector.____(element)",
      "options": ["push_back", "add", "append", "insert"],
      "answer": "push_back"
  },
  {
      "tip": "Inserts elements into a map.",
      "code": "map.____(pair)",
      "options": ["insert", "add", "put", "set"],
      "answer": "insert"
  }
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

  useEffect(() => {
    const loadState = async () => {
      try {
        const savedState = await AsyncStorage.getItem('learningState');
        if (savedState) {
          const state = JSON.parse(savedState);
          setCurrentTipIndex(state.currentTipIndex);
          setShowGreenFlash(state.showGreenFlash);
          setSelectedLanguage(state.selectedLanguage);
          setSelectedOption(state.selectedOption);
          setShowNextButton(state.showNextButton);
          setCompletedModules(state.completedModules);
          setIncorrectQuestions(state.incorrectQuestions);
          setCorrectAnswersCount(state.correctAnswersCount);
          setInitialTipsCount(state.initialTipsCount);
        }
      } catch (error) {
        console.error('Failed to load state', error);
      }
    };

    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      try {
        const state = {
          currentTipIndex,
          showGreenFlash,
          selectedLanguage,
          selectedOption,
          showNextButton,
          completedModules,
          incorrectQuestions,
          correctAnswersCount,
          initialTipsCount,
        };
        await AsyncStorage.setItem('learningState', JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save state', error);
      }
    };

    saveState();
  }, [
    currentTipIndex,
    showGreenFlash,
    selectedLanguage,
    selectedOption,
    showNextButton,
    completedModules,
    incorrectQuestions,
    correctAnswersCount,
    initialTipsCount,
  ]);

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

  const handleBackButton = () => {
    setSelectedLanguage(null);
    setCurrentTipIndex(0);
    resetAnswers();
    setCorrectAnswersCount(0);
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
    <ImageBackground source={{ uri: backgroundImageUri }} style={styles.background}>
      <View style={[styles.container, showGreenFlash && styles.greenFlash]}>
        {selectedLanguage === null ? (
          renderLanguageSelection()
        ) : (
          <>
            <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.topText}>Learning Tips</Text>
            {selectedLanguage === 'python' && renderTip([...pythonTips, ...incorrectQuestions.python])}
            {selectedLanguage === 'java' && renderTip([...javaTips, ...incorrectQuestions.java])}
            {selectedLanguage === 'csharp' && renderTip([...csharpTips, ...incorrectQuestions.csharp])}
            {selectedLanguage === 'cpp' && renderTip([...cppTips, ...incorrectQuestions.cpp])}
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(211, 211, 211, 0.5)', // Changed background color to a slightly darker gray with transparency
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  robotImage: {
    width: 150, // Increased width
    height: 150, // Increased height
    marginBottom: 20,
    alignSelf: 'center', // Center the image
  },
});