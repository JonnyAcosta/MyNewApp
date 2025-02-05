import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ChallengeMenuScreen({ navigation }) {
  const [previousScores, setPreviousScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const scores = await AsyncStorage.getItem('scores');
        if (scores !== null) {
          setPreviousScores(JSON.parse(scores));
        }
      } catch (error) {
        console.error('Failed to load scores', error);
      }
    };

    fetchScores();
  }, []);

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?q=80&w=339&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Select a Challenge</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Challenge')}>
          <Text style={styles.buttonText}>Start Challenge</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>Previous Scores:</Text>
        {previousScores.map((score, index) => (
          <Text key={index} style={styles.scoreText}>Challenge {index + 1}: {score}/10</Text>
        ))}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  scoreText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
});