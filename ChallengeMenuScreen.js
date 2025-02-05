import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.title}>Select a Challenge</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Challenge')}>
        <Text style={styles.buttonText}>Start Challenge</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Previous Scores:</Text>
      {previousScores.map((score, index) => (
        <Text key={index} style={styles.scoreText}>Challenge {index + 1}: {score}/10</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
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
    color: '#333',
  },
  scoreText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
});