import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ec as EC } from 'elliptic'; // For generating public/private keys

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');

  // Login handler
  const handleLogin = async () => {
    console.log(process.env.BACKEND_URL)
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/api/users/verify`, {
        email,
        password,
      });
      console.log(response)
      const userId = response.data.user_id; // Capture the generated ID
      console.log('Generated User ID:', userId);

    axios.get(`${process.env.BACKEND_URL}/user_share/${userId}`).then

      ((response) => {
        console.log(response.data.data)
        if (response.data && response.data.data ){
          navigation.navigate('FormPage');
        }

        else{
          generateKeyPair(userId);
          navigation.navigate('FormPage');
        }

      }).catch((err) => console.log(err))
  
    
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert('Login Failed', 'Invalid email or password');
      } else {
        console.error('Login error:', error);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    }
  };

  // Generate Public/Private Key Pair
  const generateKeyPair = async (userId) => {
    try {
      // Initialize elliptic curve with secp256k1
      const ec = new EC('secp256k1');

      // Generate key pair
      const keyPair = ec.genKeyPair();
      const privateKeyHex = keyPair.getPrivate('hex'); // Private key in hex format
      const publicKeyHex = keyPair.getPublic('hex'); // Public key in hex format

      // Save keys to state
      setPrivateKey(privateKeyHex);
      setPublicKey(publicKeyHex);

      // Send public key to the backend
      await axios.post(`${process.env.BACKEND_URL}/api/usershare`, {
        user_id: userId,
        public_key: publicKeyHex,
      });

      Alert.alert('Success', 'Keys Generated and Shared Successfully!');
    } catch (error) {
      console.error('Error generating keys or sharing with backend:', error);
      Alert.alert('Error', 'Failed to generate or share keys.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ textAlign: 'center', marginTop: 20, color: 'blue' }}>
          Don't have an account? Register here
        </Text>
      </TouchableOpacity>
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