import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';


const FacultyRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/api/users/register`, {
        email,
        password,
        name,
      });
      console.log(response.data.user_id);
      // console.log(response);
      // console.log('Server response:', response.data);


      const userId = response.data.user_id; // Capture the generated ID
      console.log('Generated User ID:', userId);


      // Alert.alert('Registration Successful',hurray!!);
      // console.log('Registration Successful', Your ID is: ${userId}) 
      // console.log('Share Response:', shareResponse.data);
      setEmail('');
      setPassword('');
      setName('');

      // Navigate to login page, optionally pass the user ID

      navigation.navigate('LoginScreen');

      // } else {
      //   Alert.alert('Registration Failed', response.data.message || 'Please try again.');
      
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Something went wrong during registration. Please try again.');
    }
  };
  //     if (response.data.success) {
  //       Alert.alert('Registration Successful', 'You can now log in.');
  //       // Optionally reset the form
  //       setEmail('');
  //       setPassword('');
  //       setName('');
  //     } else {
  //       Alert.alert('Registration Failed', response.data.message || 'Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Registration error:', error);
  //     Alert.alert('Error', 'Something went wrong during registration. Please try again.');
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default FacultyRegistration;