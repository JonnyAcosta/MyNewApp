import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LearningScreen } from './LearningScreen';
import { FlashcardsScreen } from './FlashcardsScreen';
import { ChallengeScreen } from './ChallengeScreen';
import { ChallengeMenuScreen } from './ChallengeMenuScreen';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Flashcards" component={FlashcardsScreen} />
        <Stack.Screen name="Learning" component={LearningScreen} />
        <Stack.Screen name="ChallengeMenu" component={ChallengeMenuScreen} />
        <Stack.Screen name="Challenge" component={ChallengeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?q=80&w=339&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>CodeLingo</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Flashcards')}>
          <Ionicons name="book-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Flashcards</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChallengeMenu')}>
          <Ionicons name="game-controller-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Challenge</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Learning')}>
          <Ionicons name="school-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Learning</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '85%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});