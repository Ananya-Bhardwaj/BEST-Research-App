import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as Crypto from 'expo-crypto';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const generateKeys = async () => {
    try {
      const privateKey = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, username + Date.now());
      const publicKey = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, privateKey);

      Alert.alert(`Keys Generated, Public Key: ${publicKey}\nPrivate Key: ${privateKey}`);
    } catch (error) {
      console.error('Error generating keys:', error);
      Alert.alert('Error', 'Failed to generate keys');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Generate Public and Private Key" onPress={generateKeys} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});

export default LoginScreen;